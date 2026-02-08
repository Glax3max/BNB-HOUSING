import {Request , Response ,NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthPayload {
    userId:string;
    role:"USER"|"HOST";
}

/*------------------------Extent Express Request-------------------------*/

declare global {
    namespace Express {
        interface Request {
            user?:AuthPayload;
        }
    }
}


/*------------------------Auth Middleware-------------------------*/

export const authMiddleware = (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({message:"Unauthorized"});
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        )as AuthPayload;

        req.user = decoded;
        next();
    }catch(err) {
        return res.status(401).json({message:"Invalid or expired token"});
    }

};