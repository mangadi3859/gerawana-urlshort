import { getAuthHeader, getUserFromToken } from "@/lib/getHeadToken";
import Prisma from "@/lib/prisma";

export async function GET(req: Request) {
    let auth = getAuthHeader();
    if (!auth) return new Response(JSON.stringify({ status: "FAILED", message: "Missing Authorization" }), { status: 400 });
    let db = await getUserFromToken(auth);
    if (!db) return new Response(JSON.stringify({ status: "FAILED", message: "Unauthorized" }), { status: 401 });

    const now = new Date();
    const monthlyCounts: {
        visitedAt: number;
        _count: number;
    }[] = [];

    for (let i = 5; i >= 0; i--) {
        const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const startOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
        const endOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1);

        const visitCount = await Prisma.visit.count({
            where: {
                shortLink: { authorId: db.user.id },
                visitedAt: {
                    gte: startOfMonth,
                    lt: endOfMonth,
                },
            },
        });

        monthlyCounts.push({
            visitedAt: startOfMonth.getTime(),
            _count: visitCount,
        });
    }

    return new Response(JSON.stringify({ status: "OK", data: monthlyCounts }), { status: 200 });
}
