import {prisma} from "../../../lib/prisma";
import {UserRole} from "./user.types";

export const createUser = (data: {
    email:string;
    password:string;
    role?:UserRole;
}) => {
    return prisma.user.create({
        data: {
            email:data.email,
            password:data.password,
            role:data.role ?? "USER",
        },
    });
};

export const findUserByEmail = (email:string) => {
    return prisma.user.findUnique({
        where:{email},
    });
};

export const findUserById = (id:string) => {
    return prisma.user.findUnique({
        where: {id},
        select: {
            id:true,
            email:true,
            role:true,
            createdAt:true,
        },
    });
};


