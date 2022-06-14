const mongoose = require('mongoose');

const ToDoSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  edit: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Todo', ToDoSchema);
