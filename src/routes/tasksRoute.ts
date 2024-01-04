import { Router } from 'express';
import { TasksController } from '../controllers/taskController';

const router = Router();
const tasksController = new TasksController()
// Rota para adicionar uma tarefa
router.post('/', tasksController.createTask);
router.get('/', tasksController.listTasks)
router.delete('/', tasksController.deleteTask)
router.put('/', tasksController.updateTask)


export default router
