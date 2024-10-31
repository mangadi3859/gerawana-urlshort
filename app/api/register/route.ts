import { NextApiRequest } from "next";
import { redirect } from "next/navigation";
import { register, isAuthenticated } from "@/lib/auth";
import Prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        if (await isAuthenticated()) return new Response(JSON.stringify({ status: "FAILED", message: "Already logged in" }), { status: 400 });
        let { email, password, username }: Partial<{ email: string; username: string; password: string }> = await req.json();
        if (!email || !password || !username) return new Response(JSON.stringify({ status: "FAILED", message: "Bad Request" }), { status: 400 });

        username = username.toLowerCase();
        email = email.toLowerCase();
        let user = await Prisma.user.findFirst({ where: { OR: [{ username }, { email }] } });
        if (user) {
            if (user.email == email) return new Response(JSON.stringify({ status: "FAILED", message: "This email is already registered, did you mean to login?", type: "email" }), { status: 400 });
            if (user.username == username)
                return new Response(JSON.stringify({ status: "FAILED", message: "This username is already registered, did you mean to login?", type: "username" }), { status: 400 });
        }

        await register({ email, username, password });
        return new Response(JSON.stringify({ status: "OK" }), { status: 200 });
    } catch (err: any) {
        return new Response(JSON.stringify({ status: "FAILED", message: err.toString() }), { status: 500 });
    }
}
