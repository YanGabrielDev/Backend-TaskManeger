import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const mongoCredentials = process.env.MONGO_CREDENTIALS;

if (!mongoCredentials) {
  throw new Error('As credenciais do MongoDB não foram fornecidas.');
}

mongoose.connect(mongoCredentials)

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
