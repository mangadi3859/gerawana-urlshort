import { NextApiRequest } from "next";
import { redirect } from "next/navigation";
import { login, isAuthenticated } from "@/lib/auth";
import Prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        if (await isAuthenticated()) return new Response(JSON.stringify({ status: "FAILED", message: "Already logged in" }), { status: 400 });
        let { password, username }: Partial<{ username: string; password: string }> = await req.json();
        if (!password || !username) return new Response(JSON.stringify({ status: "FAILED", message: "Bad Request" }), { status: 400 });

        username = username.toLowerCase();
        let user = await Prisma.user.findFirst({ where: { OR: [{ username }, { email: username }] } });
        if (!user) return new Response(JSON.stringify({ type: "username", status: "FAILED", message: "Username or password invalid" }), { status: 404 });

        let state = await login({ username, password });
        if (!state) return new Response(JSON.stringify({ type: "password", status: "FAILED", message: "Username or password invalid" }), { status: 401 });

        return new Response(JSON.stringify({ status: "OK" }), { status: 200 });
    } catch (err: any) {
        return new Response(JSON.stringify({ status: "FAILED", message: err.toString() }), { status: 500 });
    }
}
