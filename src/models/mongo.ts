import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost:27017/tasks')

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
})

const UsersSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
})
const TaskCollection = mongoose.model('tasks', TaskSchema)
const UserCollection = mongoose.model('users', UsersSchema)
export { TaskCollection, UserCollection }
