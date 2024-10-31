import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    let isAuth = await isAuthenticated();

    if (!isAuth) return redirect("/");
    return redirect("/dashboard/overview");
}
