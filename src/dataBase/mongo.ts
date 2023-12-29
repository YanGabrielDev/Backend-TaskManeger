import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost:27017/tasks');

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean
});

const TaskCollection = mongoose.model('Task', TaskSchema);

export {TaskCollection};
