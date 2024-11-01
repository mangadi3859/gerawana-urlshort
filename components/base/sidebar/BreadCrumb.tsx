import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import React from "react";

type Props = {
    navs: { title: string; href?: string }[];
};
export default function BreadCrumb({ navs }: Props) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {navs.map((nav, i) => (
                            <React.Fragment key={i}>
                                {i > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                                {nav.href ? (
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="#">{nav.title}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                ) : (
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{nav.title}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                )}
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
}
