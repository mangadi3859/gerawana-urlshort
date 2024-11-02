import { getUserFromCookie } from "@/lib/auth";
import Prisma from "@/lib/prisma";
import { NextApiRequest } from "next";
import { redirect } from "next/navigation";

export async function GET(req: NextApiRequest) {
    let x = await getUserFromCookie();
    await Prisma.visit.create({ data: { shortLinkId: "c723ba8b-28a4-44c7-8097-9e7bdfb2b978" } });
    return new Response(JSON.stringify({ message: "OK" }), { status: 200 });
}
