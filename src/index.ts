import express from 'express'
import tasksRoute from './routes/tasksRoute'
import userRoute from './routes/userRoute'
import cors from 'cors'
import { authMiddleware } from './middleware/authMiddleware'
import cookieParser from 'cookie-parser'
const PORT = 3005
const app = express()
app.use(express.json())
app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://study-module-one.vercel.app',
  'https://study-module-two.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(authMiddleware)
app.use('/tasks', tasksRoute)
app.use('/user', userRoute)

app.listen(PORT, () => {
  console.log('server on')
})
