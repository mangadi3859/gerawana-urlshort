import type Prisma from "./prisma";

export type UserDB = {
    username: string;
    email: string;
    id: string;
};

export type LinkDB = {
    id: string;
    redirect: string;
    name: string;
    link: string;
    authorId: string;
    createdAt: Date | number;
};

export type UnPromisifiedReturn<T extends (...args: any) => any> = ReturnType<T> extends Promise<infer R> ? R : never;
