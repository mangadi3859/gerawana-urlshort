import { getAuthHeader, getUserFromToken } from "@/lib/getHeadToken";
import Prisma from "@/lib/prisma";
import { randomBytes } from "crypto";

export async function POST(req: Request) {
    try {
        let auth = getAuthHeader();
        if (!auth) return new Response(JSON.stringify({ status: "FAILED", message: "Missing Authorization" }), { status: 400 });
        let db = await getUserFromToken(auth);
        if (!db) return new Response(JSON.stringify({ status: "FAILED", message: "Unauthorized" }), { status: 401 });

        let { redirect }: Partial<{ redirect: string }> = await req.json();
        if (!redirect) return new Response(JSON.stringify({ status: "FAILED", message: "Redirect url is required" }), { status: 400 });
        let short = await Prisma.shortLink.findFirst({ where: { redirect, authorId: db.user.id } });
        if (short) return new Response(JSON.stringify({ status: "FAILED", message: "Redirect url already exist" }), { status: 400 });

        let link = randomBytes(5).toString("hex");
        await Prisma.shortLink.create({ data: { name: link, link, redirect, authorId: db.user.id } });
        return new Response(JSON.stringify({ status: "OK" }), { status: 201 });
    } catch (err: any) {
        console.log(err.toString());
        return new Response(JSON.stringify({ status: "FAILED", message: "Server Error" }), { status: 500 });
    }
}
