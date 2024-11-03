import { createTransport } from "nodemailer";

const transportCreate = () => {
    return createTransport({
        port: 587,
        host: process.env.MAIL_HOST,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });
};

// declare const globalThis: {
//     prismaGlobal: ReturnType<typeof prismaClientSingleton>;
// } & typeof global;

declare global {
    var __mailGlobal: ReturnType<typeof transportCreate>;
}

const Mail = global.__mailGlobal ?? transportCreate();

export default Mail;
if (process.env.NODE_ENV !== "production") global.__mailGlobal = Mail;
