import  express from 'express'
import tasksRoute from './routes/tasksRoute'
import userRoute from './routes/userRoute'

import cors from 'cors'
const PORT = 3000

const app = express()
app.use(express.json());
app.use(cors())
app.use("/tasks", tasksRoute)
app.use("/user", userRoute)



app.listen(PORT, () => {
    console.log("server on")
})