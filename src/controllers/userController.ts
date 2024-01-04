import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { ApiError, BadRequestError } from "../erros";
import { UserCollection } from "../models/mongo";

export class UserController{
     public createUser = async (req: Request, res: Response) => {
      try { 
        const { name, email, password, confirmPassword} = await req.body
        
        await UserService.validateUserCreation(email, password, confirmPassword)
        const user = UserService.createUser(name, email, password)
        res.json(user);
      } catch (error) {
        if(error instanceof BadRequestError){
          res.status(400).send({message: error.message})
          return;
        }
        if(error instanceof ApiError){
          res.status(500).send({message: error.message})
          return;
        }
      
      }
    }
}