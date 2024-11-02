import { getAuthHeader, getUserFromToken } from "@/lib/getHeadToken";
import Prisma from "@/lib/prisma";
import { NextApiRequest } from "next";
import { redirect } from "next/navigation";

export async function GET(req: NextApiRequest) {
    let auth = getAuthHeader();
    if (!auth) return new Response(JSON.stringify({ status: "FAILED", message: "Missing Authorization" }), { status: 400 });
    let db = await getUserFromToken(auth);
    if (!db) return new Response(JSON.stringify({ status: "FAILED", message: "Unauthorized" }), { status: 401 });

    const now = new Date();
    const monthlyCounts: {
        visitedAt: number; // Represents the respective month
        _count: number;
    }[] = [];

    // Iterate from current month back to five months ago
    for (let i = 5; i >= 0; i--) {
        // Calculate the month we're currently processing
        const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);

        // Get the start and end dates for this month
        const startOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
        const endOfMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1);

        // Query to get count of visits within the month
        const visitCount = await Prisma.visit.count({
            where: {
                visitedAt: {
                    gte: startOfMonth,
                    lt: endOfMonth,
                },
            },
        });

        // Push the result in the desired format
        monthlyCounts.push({
            visitedAt: startOfMonth.getTime(), // Represents the respective month
            _count: visitCount,
        });
    }

    return new Response(JSON.stringify({ status: "OK", data: monthlyCounts }), { status: 200 });
}
