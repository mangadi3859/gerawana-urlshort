import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import WrapperSidebar from "@/components/base/sidebar/SideWrapper";
import { redirect } from "next/navigation";
import { getAuth, getUserFromCookie, isAuthenticated } from "@/lib/auth";
import BreadCrumb from "@/components/base/sidebar/BreadCrumb";
import { TableData } from "./(components)/TableData";
import getBaseUrl from "@/lib/getBaseUrl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateLink from "./(components)/CreateLink";
import { UserDB } from "@/lib/types";

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
    let user = await getUserFromCookie();

    return (
        <SidebarProvider>
            <WrapperSidebar />
            <SidebarInset>
                <BreadCrumb navs={[{ title: "Dashboard", href: "/dashboard" }, { title: "Shortlink" }]} />
                {/* main */}
                <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <Card className="bg-background overflow-x-auto">
                        <CardHeader>
                            <CardTitle>Shortlink Table</CardTitle>
                            <CardDescription>Manage your link here</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CreateLink token={token} user={user as UserDB} />
                            <TableData data={data.data} token={token} />
                        </CardContent>
                    </Card>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
