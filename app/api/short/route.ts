import { getAuthHeader, getUserFromToken } from "@/lib/getHeadToken";
import Prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        let auth = getAuthHeader();
        if (!auth) return new Response(JSON.stringify({ status: "FAILED", message: "Missing Authorization" }), { status: 400 });
        let db = await getUserFromToken(auth);
        if (!db) return new Response(JSON.stringify({ status: "FAILED", message: "Unauthorized" }), { status: 401 });
        let isSort: boolean = new URL(req.url).searchParams.has("sorted");

        let shorts = await Prisma.shortLink.findMany({ where: { authorId: db.user.id } });
        let visits = await Prisma.visit.groupBy({
            by: ["shortLinkId"],
            where: {
                shortLink: { authorId: db.user.id },
            },
            _count: {
                _all: true,
            },
        });

        // console.log(shorts);
        let res = shorts.map((e) => ({ ...e, createdAt: e.createdAt.getTime(), click: visits.find((el) => el.shortLinkId == e.id)?._count._all ?? 0 }));
        if (isSort) res = res.sort((a, b) => <number>b.click - <number>a.click);
        return new Response(JSON.stringify({ status: "OK", data: res }), { status: 200 });
    } catch (err: any) {
        console.log(err.toString());
        return new Response(JSON.stringify({ status: "FAILED", data: [], message: "Server Error" }), { status: 500 });
    }
}
