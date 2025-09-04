
const router = require('express').Router();
const Project = require('../models/Project');
const Task = require('../models/Task');

const updateTaskById = async (req, res) => {
  try {
    if (!req.user._id) {
      throw new Error("No user._id detected.  The user may not be logged in.")
    }

    const taskRetrieved = await Task.findOne({ _id: req.params.id });

    if (!taskRetrieved) {
      return res.status(404).json({ message: 'No task found with this id!' });
    }

    const projectRetrieved = await Project.findOne({ _id: taskRetrieved.project });

    if (!projectRetrieved) {
      return res.status(404).json({ message: `No project with ID ${taskRetrieved.project} found!` });
    }

    if (String(projectRetrieved.user) !== req.user._id) {
      return res.status(403).json({ messsage: '403 Forbidden; user is not authorized to update task, as corresponding project does not belong to this user.' });
    }

    // By now, we know the user is logged in, the project exists, and the project belongs to the user.  Execution halts either by throwing Error or returning res if any of the previous is true; the execution by err stops as it's the last command in the function (also explicit return added).

    // So we can now update a task belonging to the project belonging to the user.
    const options = { new: true };
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, options);

    return res.status(201).json({ message: 'Updated task', updatedTask }); // note that projectId must be added to sampleData for sample reference!
  } catch (err) {
    return res.status(400).json(err);
  }
}; // updateTaskById

const deleteTaskById = async (req, res) => {
  try {
    if (!req.user._id) {
      throw new Error("No user._id detected.  The user may not be logged in.")
    }

    const taskRetrieved = await Task.findOne({ _id: req.params.id });

    if (!taskRetrieved) {
      return res.status(404).json({ message: 'No task found with this id!' });
    }

    const projectRetrieved = await Project.findOne({ _id: taskRetrieved.project });

    if (!projectRetrieved) {
      return res.status(404).json({ message: `No project with ID ${taskRetrieved.project} found!` });
    }

    if (String(projectRetrieved.user) !== req.user._id) {
      return res.status(403).json({ messsage: '403 Forbidden; user is not authorized to delete task, as corresponding project does not belong to this user.' });
    }

    // By now, we know the user is logged in, the project exists, and the project belongs to the user.  Execution halts either by throwing Error or returning res if any of the previous is true; the execution by err stops as it's the last command in the function (also explicit return added).

    // So we can now delete a task belonging to the project belonging to the user.
    const deletedTask = await User.findByIdAndDelete(userId);

    return res.status(201).json({ message: 'Deleted task', deletedTask }); // note that projectId must be added to sampleData for sample reference!
  } catch (err) {
    return res.status(400).json(err);
  }
}; // deleteTaskById

module.exports = {
  updateTaskById,
  deleteTaskById
}
