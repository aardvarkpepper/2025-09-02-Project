const router = require('express').Router();
const Project = require('../models/Project');
const Task = require('../models/Task');

// split out child router later

// Using verifyAuthentication in projectRoutes instead of here.
// const { authMiddleware } = require('../../utils/auth');
// router.use(authMiddleware);

// GET /api/projects - Get all projects for the logged-in user
const getAllProjects = async (req, res) => {
  try {
    if (!req.user._id) {
      throw new Error("No user._id detected.  The user may not be logged in.")
    }
    const projects = await Project.find({ user: req.user._id });
    res.json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
}; //getAllProjects

const getProjectById = async (req, res) => {
  try {
    if (!req.user._id) {
      throw new Error("No user._id detected.  The user may not be logged in.")
    }
    const project = await Project.findOne({ _id: req.params.id }); // why didn't I use findById?  Practice, why not.
    // could just pop another field in the findOne argument, but eh.
    if (!project) {
      return res.status(404).json({ message: 'No project found with this id!' });
    }
    if (String(project.user) !== req.user._id) {
      return res.status(403).json({ messsage: '403 Forbidden; user is not authorized to view this project.' });
    }
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json(err);
  }
}; // getProjectById

const createProject = async (req, res) => {
  try {
    if (!req.user._id) {
      throw new Error("No user._id detected.  The user may not be logged in.")
    }
    const createdProject = await Project.create({
      ...req.body,
      user: req.user._id,
      // The user ID needs to be added here - done.
    });
    res.status(201).json(createdProject);
  } catch (err) {
    res.status(400).json(err);
  }
}; // createProject

const updateProjectById = async (req, res) => {
  try {
    if (!req.user._id) {
      throw new Error("No user._id detected.  The user may not be logged in.")
    }
    // This needs an authorization check
    const project = await Project.findById(req.params.id);
    // console.log('Put: project found: project.user:', project.user);
    if (!project) {
      return res.status(404).json({ message: 'No project found with this id!' });
    }
    // project.user is of a type defined in the schema that needs to be recast as String.
    if (String(project.user) !== req.user._id) {
      //console.log('put', String(project.user), req.user._id, String(project.user) === req.user._id);
      return res.status(403).json({ messsage: '403 Forbidden; user is not authorized to alter this project.' });
    }
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProject);
  } catch (err) {
    res.status(500).json(err);
  }
}; //updateProjectById

const deleteProjectById = async (req, res) => {
  try {
    if (!req.user._id) {
      throw new Error("No user._id detected.  The user may not be logged in.")
    }
    // This needs an authorization check
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'No project found with this id!' });
    }
    if (String(project.user) !== req.user._id) {
      return res.status(403).json({ messsage: '403 Forbidden; user is not authorized to delete this project.' });
    }
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted!', project: deletedProject });
  } catch (err) {
    res.status(500).json(err);
  }
}; // deleteProjectById

// Below will require { mergeParams: true } when split into child router, invoked in router (?)
const createTask = async (req, res) => {
  try {
    if (!req.user._id) {
      throw new Error("No user._id detected.  The user may not be logged in.")
    }
    // replicating getProjectById functionality; later figure out passing reference.
    const projectRetrieved = await Project.findOne({ _id: req.params.projectId }); // why didn't I use findById?  Practice, why not.
    // could just pop another field in the findOne argument, but eh.
    if (!projectRetrieved) {
      return res.status(404).json({ message: 'No project found with this id!' });
    }
    if (String(projectRetrieved.user) !== req.user._id) {
      return res.status(403).json({ messsage: '403 Forbidden; user is not authorized to add a task to this project as project does not belong to this user.' });
    }

    // By now, we know the user is logged in, the project exists, and the project belongs to the user.  Execution halts either by throwing Error or returning res if any of the previous is true; the execution by err stops as it's the last command in the function (also explicit return added).

    // So we can now create a task belonging to the project belonging to the user.
    const createdTask = await Task.create({
      ...req.body,
      project: req.params.projectId,
      // The user ID needs to be added here - done.
    });
    return res.status(201).json(createdTask); // note that projectId must be added to sampleData for sample reference!
  } catch (err) {
    return res.status(400).json(err);
  }
}; // createTask

const getAllTasksByProject = async (req, res) => {
  try {
    if (!req.user._id) {
      throw new Error("No user._id detected.  The user may not be logged in.")
    }
    // replicating getProjectById functionality; later figure out passing reference.
    const projectRetrieved = await Project.findById(req.params.projectId);
    if (!projectRetrieved) {
      return res.status(404).json({ message: `No project found with ID:${req.params.projectId}!` });
    }
    if (String(projectRetrieved.user) !== req.user._id) {
      return res.status(403).json({ messsage: `403 Forbidden; user is not authorized to access all tasks of ${req.params.projectId} as project does not belong to this user.` });
    }

    // By now, we know the user is logged in, the project exists, and the project belongs to the user.  Execution halts either by throwing Error or returning res if any of the previous is true; the execution by err stops as it's the last command in the function (also explicit return added).

    // So we can now create a task belonging to the project belonging to the user.
    const tasks = await Task.find({ project: req.params.projectId });
    return res.json({ tasks, message: `All tasks for project:${req.params.projectId}`});
  } catch (err) {
    return res.status(500).json(err);
  }
}; //getAllProjects

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  createTask,
  getAllTasksByProject
};

// // split below into child router later
// router.post('/:projectId/tasks', verifyAuthentication, createTask); // see what happens when put last.  after all / routes okay.  Also see what happens if importing.
// router.get('/:projectId/tasks', verifyAuthentication, getTasksByProject);