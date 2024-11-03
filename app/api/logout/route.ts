import { NextApiRequest } from "next";
import { redirect } from "next/navigation";
import { logout } from "@/lib/auth";

export async function GET(req: Request) {
    await logout();
    return redirect("/");
}
