import {Request, Response} from "express";
import * as userService from "./user.service";

export const register = async (req:Request , res:Response) => {
    const user = await userService.registerUser(req.body);

    res.status(201).json(user);
}


export const login = async (req:Request,res:Response) => {
    const token = await userService.loginUser(req.body);

    res.json(token);
}

export const me = async (req:Request,res:Response) => {
    const userId = req.user!.userId;
    const user = await userService.getCurrentUser(userId);

    res.json(user);
}

