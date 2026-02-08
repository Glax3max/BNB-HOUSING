import {Request ,Response,NextFunction} from "express";

export const requireHost = (req:Request,res:Response,next:NextFunction) => {
    if(req.user?.role !== "HOST") {
        return res.status(403).json({ message:"Host access required" });
    }

    next();
};