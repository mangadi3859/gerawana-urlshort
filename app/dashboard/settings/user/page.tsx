import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import WrapperSidebar from "@/components/base/sidebar/SideWrapper";
import { redirect } from "next/navigation";
import { getAuth, getUserFromCookie, isAuthenticated } from "@/lib/auth";
import BreadCrumb from "@/components/base/sidebar/BreadCrumb";
import EditProfile from "./(components)/EditProfile";
import { UserDB } from "@/lib/types";

export default async function Overview() {
    let isAuth = await isAuthenticated();
    if (!isAuth) return redirect("/");
    let token = await getAuth();
    let user = await getUserFromCookie();

    return (
        <SidebarProvider>
            <WrapperSidebar />
            <SidebarInset>
                <BreadCrumb navs={[{ title: "Dashboard", href: "/dashboard" }, { title: "Settings", href: "/dashboard/settings" }, { title: "User" }]} />
                {/* main */}
                <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <EditProfile token={token?.value as string} user={user as UserDB} />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
