const router = require('express').Router();
const Project = require('../../models/Project');

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
    if (project.user !== req.user._id) {
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
    const project = await Project.create({
      ...req.body,
      user: req.user._id,
      // The user ID needs to be added here - done.
    });
    res.status(201).json(project);
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

module.exports = {
  createProject, 
  getAllProjects, 
  getProjectById, 
  updateProjectById, 
  deleteProjectById,
  createTask,
  getTasksByProject
};

// router.post('/', verifyAuthentication. createProject);
// router.get('/', verifyAuthentication, getAllProjects);
// router.get('/:id', verifyAuthentication, getProjectById);
// router.put('/:id', verifyAuthentication, updateProjectById);
// router.delete('/:id', verifyAuthentication, deleteProjectById);

// // split below into child router later
// router.post('/:projectId/tasks', verifyAuthentication, createTask); // see what happens when put last.  after all / routes okay.  Also see what happens if importing.
// router.get('/:projectId/tasks', verifyAuthentication, getTasksByProject);