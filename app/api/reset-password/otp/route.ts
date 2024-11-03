import Prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        let { otp }: Partial<{ otp: string }> = await req.json();
        if (!otp) return new Response(JSON.stringify({ status: "FAILED", message: "Bad Request" }), { status: 400 });

        let otpApi = await Prisma.resetPassword.findFirst({ where: { otp } });
        if (!otpApi) return new Response(JSON.stringify({ status: "FAILED", message: "Invalid OTP" }), { status: 404 });

        return new Response(JSON.stringify({ status: "OK", data: otpApi.id }), { status: 201 });
    } catch (err: any) {
        console.log(err.toString());
        return new Response(JSON.stringify({ status: "FAILED", message: "Server Error" }), { status: 500 });
    }
}
