import { hash } from "@/lib/auth";
import Prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        let { otp, password }: Partial<{ otp: string; password: string }> = await req.json();
        if (!otp || !password) return new Response(JSON.stringify({ status: "FAILED", message: "Bad Request" }), { status: 400 });

        let otpApi = await Prisma.resetPassword.findFirst({ where: { id: otp } });
        if (!otpApi) return new Response(JSON.stringify({ status: "FAILED", message: "Session Expires" }), { status: 404 });

        let hashed = await hash(password);
        console.log(password, hashed);

        await Prisma.user.update({ where: { id: otpApi.userId }, data: { password: hashed } });
        await Prisma.session.deleteMany({ where: { userId: otpApi.userId } });
        await Prisma.resetPassword.delete({ where: { id: otpApi.id } });
        return new Response(JSON.stringify({ status: "OK" }), { status: 200 });
    } catch (err: any) {
        console.log(err.toString());
        return new Response(JSON.stringify({ status: "FAILED", message: "Server Error" }), { status: 500 });
    }
}
