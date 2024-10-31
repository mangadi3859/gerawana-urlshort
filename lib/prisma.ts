import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    return new PrismaClient();
};

// declare const globalThis: {
//     prismaGlobal: ReturnType<typeof prismaClientSingleton>;
// } & typeof global;

declare global {
    var __prismaGlobal: ReturnType<typeof prismaClientSingleton>;
}

const Prisma = global.__prismaGlobal ?? prismaClientSingleton();

export default Prisma;
if (process.env.NODE_ENV !== "production") global.__prismaGlobal = Prisma;
