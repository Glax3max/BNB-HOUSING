export type UserRole = "USER" | "HOST";

export interface RegisterUserInput {
    email:string;
    password:string;
}

export interface LoginUserInput {
    email:string;
    password:string;
}

export interface JwtPayLoad {
    userId:string;
    role:UserRole;
}


