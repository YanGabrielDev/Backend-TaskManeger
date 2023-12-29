import { Request, Response } from "express";
import { UserCollection } from "../dataBase/mongo";

export class UserController{
     public createUser = async (req: Request, res: Response) => {
      try { 
        const { name, email, password, confirmPassword} = await req.body

        if(password !== confirmPassword){
            res.status(400).send({message: "As senhas precisão ser iguais para a criação do usuário!"})
            return;
        }
       const user = new UserCollection({email, name, password})
       await user.save()
       res.json(user);
      } catch (error) {
        res.status(500).send({message: `Erro ao criar user: ${error}`})

      }
    }
}