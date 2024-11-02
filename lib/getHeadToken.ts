import { headers } from "next/headers";
import Prisma from "./prisma";

export function getAuthHeader() {
    let head = headers();
    return head.get("Authorization");
}

export async function getUserFromToken(token: string) {
    let data = await Prisma.session.findFirst({ where: { token, expires_at: { gt: new Date() } }, select: { user: { select: { email: true, username: true, id: true } } } });
    if (!data) return;
    return data;
}
