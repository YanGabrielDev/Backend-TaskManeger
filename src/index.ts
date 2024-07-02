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

app.use(cors({
  origin: 'http://localhost:3000', // ou qualquer outra porta que seu front-end esteja rodando
  credentials: true
}));
app.use(authMiddleware)
app.use('/tasks', tasksRoute)
app.use('/user', userRoute)

app.listen(PORT, () => {
  console.log('server on')
})
