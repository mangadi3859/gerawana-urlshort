import { getAuthHeader, getUserFromToken } from "@/lib/getHeadToken";
import Prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        let auth = getAuthHeader();
        if (!auth) return new Response(JSON.stringify({ status: "FAILED", message: "Missing Authorization" }), { status: 400 });
        let db = await getUserFromToken(auth);
        if (!db) return new Response(JSON.stringify({ status: "FAILED", message: "Unauthorized" }), { status: 401 });

        let { email, username }: Partial<{ id: string; email: string; username: string }> = await req.json();
        if (!email || !username) return new Response(JSON.stringify({ status: "FAILED", message: "Bad Request", type: "name" }), { status: 400 });

        let similar = await Prisma.user.findFirst({ where: { NOT: { id: db.user.id }, OR: [{ email }, { username }] } });
        if (similar?.email == email) return new Response(JSON.stringify({ status: "FAILED", message: "Email already registered", type: "email" }), { status: 400 });
        if (similar?.username == username) return new Response(JSON.stringify({ status: "FAILED", message: "Username already registered", type: "username" }), { status: 400 });

        if (db.user.email != email) await Prisma.session.deleteMany({ where: { userId: db.user.id } });
        await Prisma.user.update({ where: { id: db.user.id }, data: { email, username } });
        return new Response(JSON.stringify({ status: "OK" }), { status: 200 });
    } catch (err: any) {
        console.log(err.toString());
        return new Response(JSON.stringify({ status: "FAILED", message: "Server Error" }), { status: 500 });
    }
}
