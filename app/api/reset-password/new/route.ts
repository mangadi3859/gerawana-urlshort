import Prisma from "@/lib/prisma";
import generateOTP from "@/lib/generateOTP";
import Mail from "@/lib/mail";

const EXPIRE = 6e4 * 5;
export async function POST(req: Request) {
    try {
        let { email }: Partial<{ email: string }> = await req.json();
        if (!email) return new Response(JSON.stringify({ status: "FAILED", message: "Bad Request" }), { status: 400 });

        let user = await Prisma.user.findFirst({ where: { email } });
        if (!user) return new Response(JSON.stringify({ status: "FAILED", message: "Email didn't exist", type: "email" }), { status: 404 });

        let otp = generateOTP();
        await Prisma.resetPassword.deleteMany({ where: { OR: [{ userId: user.id }] } });
        await Prisma.resetPassword.create({ data: { otp, userId: user.id, expires_at: new Date(Date.now() + EXPIRE) } });

        Mail.sendMail(
            {
                from: { address: "noreply@islacomp.my.id", name: "Gerawana" },
                to: { address: email, name: user.username },
                subject: "Reset Password Request",
                text: "Someone is issuing a password reset on your gerawana account",
                html: `<h1>Don't give this code to anyone</h1><br/><p>Code: ${otp}</p>`,
            },
            (err) => {
                if (err) {
                    console.log(err);
                    return new Response(JSON.stringify({ status: "FAILED", message: "Server Error" }), { status: 500 });
                }
            }
        );

        return new Response(JSON.stringify({ status: "OK", data: otp }), { status: 201 });
    } catch (err: any) {
        console.log(err.toString());
        return new Response(JSON.stringify({ status: "FAILED", message: "Server Error" }), { status: 500 });
    }
}
