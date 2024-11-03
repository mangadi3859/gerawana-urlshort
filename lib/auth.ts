import { cookies } from "next/headers";
import Prisma from "./prisma";
import * as bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import * as jwt from "jsonwebtoken";

const EXPIRES = 60000 * 60 * 24;
const SALT = 10;
const JWT_SECRET = "yukinopunyasaya";

export async function register(user: { email: string; username: string; password: string }) {
    let hashed = await hash(user.password);
    let userData = await Prisma.user.create({ data: { email: user.email, username: user.username, password: hashed } });
    return userData;
}

export async function login(user: { username: string; password: string }) {
    let userData = await Prisma.user.findFirst({ where: { OR: [{ email: user.username }, { username: user.username }] } });
    if (!userData) return;
    if (!(await verify(userData.password, user.password))) return;
    await createSession(userData.id, EXPIRES);
    return userData;
}

export async function getAuth() {
    return (await cookies()).get("auth");
}

export async function logout() {
    let auth = await getAuth();
    if (auth) await Prisma.session.delete({ where: { token: auth?.value } });
    (await cookies()).set("auth", "");
}

export async function isAuthenticated(): Promise<boolean> {
    let expires_at = Date.now() + EXPIRES;
    let token = await getAuth();
    if (!token) return false;
    let session = await Prisma.session.findFirst({
        where: {
            token: token.value,
            expires_at: {
                gt: new Date(),
            },
        },
        include: {
            user: true,
        },
    });
    await Prisma.session.deleteMany({ where: { expires_at: { lte: new Date() } } });

    if (!session) return false;
    let userFromCookie = await getUserFromCookie();
    if (!userFromCookie || userFromCookie.id != session.userId) {
        let jwtToken = generateJwt(session.user);
        (await cookies()).set("user", jwtToken, { expires: expires_at });
    }

    return true;
}

type UserFromCookie = { email: string; username: string; id: string } | undefined;
export async function getUserFromCookie(): Promise<UserFromCookie> {
    let user = (await cookies()).get("user");
    if (!user) return;
    return verifyJwt(user.value);
}

export async function createSession(id: string, expires: number) {
    let user = await Prisma.user.findFirst({ where: { id }, select: { email: true, username: true, id: true } });
    if (!user) return;
    let token = user.id + "." + randomBytes(21).toString("base64").replace(/=+/g, "");
    let expires_at = Date.now() + EXPIRES;
    let jwtToken = generateJwt(user);
    (await cookies()).set("auth", token, { expires: expires_at });
    (await cookies()).set("user", jwtToken, { expires: expires_at });
    await Prisma.session.create({ data: { token, expires_at: new Date(Date.now() + EXPIRES), userId: id } });
}

export async function hash(text: string) {
    return await bcrypt.hash(text, SALT);
}

export async function verify(hash: string, password: string) {
    return await bcrypt.compare(password, hash);
}

export function generateJwt(payload: string | object, options?: jwt.SignOptions): string {
    return jwt.sign(payload, JWT_SECRET, { ...options, algorithm: "HS384" });
}

export function verifyJwt(token: string, options?: jwt.VerifyOptions): any {
    try {
        return jwt.verify(token, JWT_SECRET, { ...options, algorithms: ["HS384"] });
    } catch (e) {
        return null;
    }
}
