import { Request, Response } from "express";
import { TaskCollection } from "../dataBase/mongo";

export class TasksController{
   public createTask = async (req: Request, res: Response) => {
        try {
          const { title, description } = await req.body;
          
          const task = new TaskCollection({ title, description, completed: false });
          await task.save();
          res.json(task);
        } catch (error) {
          res.status(500).json({ error: `Erro ao salvar a tarefa no MongoDB: ${error}` });
        }
      }

      public listTasks = async (req: Request, res: Response) => {
        try {
          const tasks = await TaskCollection.find();
          res.json(tasks);
        } catch (error) {
          res.status(500).json({ error: `Erro ao salvar a tarefa no MongoDB: ${error}` });
        }
      }

      public deleteTask = async (req: Request, res: Response) => {
        try {
          const {taskId} = req.params
          if(!taskId){
            res.status(400).json({ error: `Id de tarefa invalido!`});
            return
          }
           await TaskCollection.findByIdAndDelete(taskId);
           res.json({message: "Tarefa deletada com sucesso"})
        } catch (error) {
          res.status(500).json({ error: `Erro ao deletar a tarefa no MongoDB: ${error}` });
        }
      }
    
      public updateTask = async (req: Request, res: Response) => {
        try {
          const {taskId} = req.query
          if(!taskId){
            res.status(400).json({ error: `Id de tarefa invalido!`});
            return
          }
           await TaskCollection.findByIdAndUpdate(taskId,{
            title: "atualizado"
           }, {new: true})
           res.json({message: "Tarefa atualizada com sucesso"})
        } catch (error) {
          res.status(500).json({ error: `Erro ao atualizar a tarefa no MongoDB: ${error}` });
        }
      }
}