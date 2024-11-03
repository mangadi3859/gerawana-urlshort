import { getAuthHeader, getUserFromToken } from "@/lib/getHeadToken";
import Prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        let auth = getAuthHeader();
        if (!auth) return new Response(JSON.stringify({ status: "FAILED", message: "Missing Authorization" }), { status: 400 });
        let db = await getUserFromToken(auth);
        if (!db) return new Response(JSON.stringify({ status: "FAILED", message: "Unauthorized" }), { status: 401 });

        let { redirect, name, link, id }: Partial<{ redirect: string; name: string; link: string; id: string }> = await req.json();
        if (!redirect || !name || !link || !id) return new Response(JSON.stringify({ status: "FAILED", message: "Bad Request", type: "name" }), { status: 400 });

        let originalShort = await Prisma.shortLink.findFirst({ where: { id } });
        if (!originalShort) return new Response(JSON.stringify({ status: "FAILED", message: "Short link not found", type: "name" }), { status: 404 });

        let similarShort = await Prisma.shortLink.findFirst({ where: { NOT: { id }, OR: [{ redirect }, { link }] } });
        if (similarShort?.link == link) return new Response(JSON.stringify({ status: "FAILED", message: "Link url already exist", type: "link" }), { status: 400 });
        if (similarShort?.authorId == db.user.id && similarShort.redirect == redirect)
            return new Response(JSON.stringify({ status: "FAILED", message: "Redirect url already exist", type: "redirect" }), { status: 400 });

        await Prisma.shortLink.update({ where: { id }, data: { name, link, redirect } });
        return new Response(JSON.stringify({ status: "OK" }), { status: 200 });
    } catch (err: any) {
        console.log(err.toString());
        return new Response(JSON.stringify({ status: "FAILED", message: "Server Error" }), { status: 500 });
    }
}
