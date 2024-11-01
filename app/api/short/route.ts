import { NextApiRequest } from "next";
import { redirect } from "next/navigation";

export async function GET(req: NextApiRequest) {
    return new Response(JSON.stringify({ message: "OK" }), { status: 200 });
}
