// based on Lab 2
const { Schema, model } = require('mongoose');
const User = require('./User');

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    //https://mongoosejs.com/docs/schematypes.html#objectids
    // for user's ObjectId.
    ref: 'User',
    required: true,
  }
});

const Project = model('Project', projectSchema);

module.exports = Project;