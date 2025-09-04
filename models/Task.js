// based on Lab 2
const { Schema, model } = require('mongoose');
const Project = require('./Project');

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'], // using enum for example; actually wouldn't want to limit - or would import/export all potentially changing values in a single file.
    default: 'To Do'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  project: {
    type: Schema.Types.ObjectId,
    //https://mongoosejs.com/docs/schematypes.html#objectids
    // for user's ObjectId.
    ref: 'Project',
    required: true,
  }
});

const Task = model('Task', taskSchema);

module.exports = Task;