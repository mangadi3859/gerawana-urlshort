import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import WrapperSidebar from "@/components/base/sidebar/SideWrapper";
import { redirect } from "next/navigation";
import { getAuth, getUserFromCookie, isAuthenticated } from "@/lib/auth";
import BreadCrumb from "@/components/base/sidebar/BreadCrumb";
import { TableData } from "./(components)/TableData";
import getBaseUrl from "@/lib/getBaseUrl";

async function getShorts(token: string) {
    try {
        let res = await fetch(`${getBaseUrl()}/api/short`, { headers: { Authorization: token }, cache: "no-cache" });
        let data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export default async function Overview() {
    let isAuth = await isAuthenticated();
    if (!isAuth) return redirect("/");
    let token = (await getAuth())?.value ?? "";
    let data = await getShorts(token);

    return (
        <SidebarProvider>
            <WrapperSidebar />
            <SidebarInset>
                <BreadCrumb navs={[{ title: "Dashboard", href: "/dashboard" }, { title: "Shortlink" }]} />
                {/* main */}
                <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <TableData data={data.data} />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
