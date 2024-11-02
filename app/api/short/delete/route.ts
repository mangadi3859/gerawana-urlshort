import { getAuthHeader, getUserFromToken } from "@/lib/getHeadToken";
import Prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        let auth = getAuthHeader();
        if (!auth) return new Response(JSON.stringify({ status: "FAILED", message: "Missing Authorization" }), { status: 400 });
        let db = await getUserFromToken(auth);
        if (!db) return new Response(JSON.stringify({ status: "FAILED", message: "Unauthorized" }), { status: 401 });

        let { id }: Partial<{ id: string }> = await req.json();
        if (!id) return new Response(JSON.stringify({ status: "FAILED", message: "Bad Request", type: "name" }), { status: 400 });

        await Prisma.shortLink.delete({ where: { id, authorId: db.user.id } });
        return new Response(JSON.stringify({ status: "OK" }), { status: 200 });
    } catch (err: any) {
        console.log(err.toString());
        return new Response(JSON.stringify({ status: "FAILED", message: "Server Error" }), { status: 500 });
    }
}
