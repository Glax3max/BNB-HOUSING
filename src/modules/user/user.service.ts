import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepo from "./user.repository";
import {
    RegisterUserInput,
    LoginUserInput,
    JwtPayLoad,
} from "./user.types"


export const registerUser = async (input:RegisterUserInput) => {
    const existing = await userRepo.findUserByEmail(input.email);

    if(existing) {
        throw new Error("User already exist");
    }

    const hashedPassword = await bcrypt.hash(input.password,10);

    const user = await userRepo.createUser({
        email:input.email,
        password:hashedPassword,
    })

    return {
        id:user.id,
        email:user.email,
        role:user.role
    };
};


export const loginUser = async (input:LoginUserInput) => {
    const user = await userRepo.findUserByEmail(input.email);

    if(!user) {
        throw new Error("Invalid credential")
    }

    const isMatch = await bcrypt.compare(input.password,user.password);

    if(!isMatch) {
        throw new Error("Invalid credential");
    }

    const payload:JwtPayLoad = {
        userId:user.id,
        role:user.role,
    }

    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        {expiresIn:"1d"}
    );

    return {token};
}

export const getCurrentUser = async (userId:string) => {
    const user = await userRepo.findUserById(userId);
    if(!user) {
        throw new Error("User not found");
    }

    return user;
};
