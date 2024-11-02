export type UserDB = {
    username: string;
    email: string;
    id: string;
};

export type UnPromisifiedReturn<T extends (...args: any) => any> = ReturnType<T> extends Promise<infer R> ? R : never;
