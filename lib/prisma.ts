import "dotenv/config";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../generated/prisma/client';

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5
});

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const prisma =  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if(process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

if (!process.env.DATABASE_HOST) {
  throw new Error("DATABASE_HOST missing");
}

export { prisma } 