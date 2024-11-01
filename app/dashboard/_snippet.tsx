import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import WrapperSidebar from "@/components/base/sidebar/SideWrapper";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import BreadCrumb from "@/components/base/sidebar/BreadCrumb";

export default async function Overview() {
    let isAuth = await isAuthenticated();
    if (!isAuth) return redirect("/");

    return (
        <SidebarProvider>
            <WrapperSidebar />
            <SidebarInset>
                <BreadCrumb navs={[{ title: "Dashboard", href: "/dashboard" }, { title: "Overview" }]} />
                {/* main */}
                <main className="flex flex-1 flex-col gap-4 p-4 pt-0">{/* Code.. */}</main>
            </SidebarInset>
        </SidebarProvider>
    );
}
