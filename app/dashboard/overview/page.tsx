import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import WrapperSidebar from "@/components/base/sidebar/SideWrapper";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import BreadCrumb from "@/components/base/sidebar/BreadCrumb";
import { Atom, Database, DatabaseBackup } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VisitChart } from "./(components)/VisitChart";
import { DataTableOverview } from "./(components)/TableOverview";

export default async function Overview() {
    let isAuth = await isAuthenticated();
    if (!isAuth) return redirect("/");

    return (
        <SidebarProvider>
            <WrapperSidebar />
            <SidebarInset className="overflow-x-hidden">
                <BreadCrumb navs={[{ title: "Dashboard", href: "/dashboard" }, { title: "Overview" }]} />
                {/* main */}
                <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex flex-row justify-start items-start gap-4 tablet:flex-wrap phone:flex-col">
                        <Card className="max-w-[20rem] phone:max-w-none w-full bg-background">
                            <CardHeader className="p-4 pb-0">
                                <CardTitle className="flex justify-between items-center font-medium">
                                    <Badge className="bg-muted text-background bg-white hover:bg-slate-100 tracking-wider">Shortlinks</Badge>
                                    <Atom className="size-[1.25em]" />
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-2xl font-bold pt-0 p-4">
                                <span>24 links</span>
                            </CardContent>
                        </Card>

                        <Card className="max-w-[20rem] phone:max-w-none w-full bg-background">
                            <CardHeader className="p-4 pb-0">
                                <CardTitle className="flex justify-between items-center font-medium">
                                    <Badge className="bg-muted text-background bg-white hover:bg-slate-100 tracking-wider">Total Visit</Badge>
                                    <Database className="size-[1.25em]" />
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-2xl font-bold pt-0 p-4">
                                <span>1524 visit</span>
                            </CardContent>
                        </Card>

                        <Card className="max-w-[20rem] phone:max-w-none w-full bg-background">
                            <CardHeader className="p-4 pb-0">
                                <CardTitle className="flex justify-between items-center font-medium">
                                    <Badge className="bg-muted text-background bg-white hover:bg-slate-100 tracking-wider">Monthly Visit</Badge>
                                    <DatabaseBackup className="size-[1.25em]" />
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-2xl font-bold pt-0 p-4">
                                <span>+154 visit</span>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex gap-4 w-full overflow-hidden flex-wrap">
                        <VisitChart />
                        <Card className="bg-background min-w-[30rem] phone:min-w-0 phone:w-full">
                            <CardHeader>
                                <CardTitle>Popular Links</CardTitle>
                                <CardDescription>Your most well performing links</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col">
                                <DataTableOverview />
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
