const { Schema } = require('mongoose');

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    // TODO: determine whether we should create an individual table
    // task category
    category: {
      type: String,
      required: true
    },
    // minimum age used for filtering available tasks
    min_age: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  {
    toJson: {}
  }
)

const Task = model('Task', taskSchema);

module.exports = Task;
