"use client";
import * as React from "react";
import { FileSymlink, BookOpen, Bot, Command, Frame, GalleryVerticalEnd, Map, PieChart, Settings2, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/base/sidebar/nav-main";
import { NavUser } from "@/components/base/sidebar/nav-user";
import SidebarHead from "./SidebarHead";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

// This is sample data.
const data = {
    navMain: [
        {
            title: "Overview",
            url: "/dashboard/overview",
            icon: SquareTerminal,
            items: [],
        },
        {
            title: "Shortlink",
            url: "/dashboard/shortlink",
            isActive: true,
            icon: FileSymlink,
            items: [
                {
                    title: "Manage Shortlink",
                    url: "/dashboard/shortlink#manage",
                },
                {
                    title: "Create Shortlink",
                    url: "/dashboard/shortlink#create?open",
                },
                {
                    title: "Generate QR Code",
                    url: "/dashboard/shortlink#qr>qr",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "Profile",
                    url: "/dashboard/settings/user",
                },
                {
                    title: "Coming soon...",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "https://github.com/mangadi3859/gerawana-urlshort/blob/main/README.md",
            icon: BookOpen,
            items: [],
        },
    ],
};

type Props = {
    isAuth: boolean;
    user: {
        username: string;
        email: string;
    };
};
export function AppSidebar({ isAuth, user, ...props }: React.ComponentProps<typeof Sidebar> & Props) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarHead />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
