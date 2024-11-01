import * as React from "react";
import Link from "next/link";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

import Brand from "./Brand";
import { NavigationMenu, NavigationMenuContent, NavigationMenuLink, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu, X } from "lucide-react";
import { UserDB } from "@/lib/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverAnchor } from "@/components/ui/popover";
import { LogOut } from "lucide-react";

type Props = {
    drawerStateHook: [boolean, (v: boolean) => any];
    isAuth: boolean;
    user?: UserDB;
};

export function Navbar({ drawerStateHook, isAuth, user }: Props) {
    let [open, setOpen] = drawerStateHook;
    let [openPop, setOpenPop] = useState(false);

    let navRef = useRef<HTMLDivElement>(null);
    let [navOpen, setNavOpen] = useState<boolean>(false);

    function handleSidebarBtn() {
        setNavOpen(!navOpen);
    }

    function closeSide() {
        setNavOpen(false);
    }

    function handleDrawer() {
        setOpen(!open);
        closeSide();
    }

    function handlePopover() {
        setOpenPop(!openPop);
    }

    return (
        <>
            <nav ref={navRef} className={`w-full poppins fixed z-[100] transition bg-background/25 backdrop-blur-md`} id="navbar">
                <div className="conn flex items-center justify-between py-4 ">
                    <Brand className="tablet:h-8 h-12" />

                    <div className="flex items-center gap-2 phone:hidden">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {isAuth && (
                                    <NavigationMenuItem>
                                        <Link href="/dashboard" legacyBehavior passHref>
                                            <Button variant="outline">Dashboard</Button>
                                        </Link>
                                    </NavigationMenuItem>
                                )}

                                <NavigationMenuItem>
                                    <Link href="/#hero" legacyBehavior passHref>
                                        <Button variant="outline">Home</Button>
                                    </Link>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <Link href="/#features" legacyBehavior passHref>
                                        <Button variant="outline">Features</Button>
                                    </Link>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <Link href="/#faq" legacyBehavior passHref>
                                        <Button variant="outline">FAQ</Button>
                                    </Link>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                        <Separator orientation="vertical" className="h-[2rem]" />
                        {isAuth ? (
                            <Popover open={openPop} onOpenChange={setOpenPop}>
                                <PopoverAnchor asChild>
                                    <div onClick={handlePopover} className="grid place-items-center cursor-pointer">
                                        <Avatar className="rounded-md">
                                            <AvatarFallback className="rounded-md uppercase">{user?.username.slice(0, 2)}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                </PopoverAnchor>
                                <PopoverContent className="z-[110]">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex gap-2 items-center">
                                            <Avatar className="h-12 rounded-md w-12">
                                                <AvatarFallback className="rounded-md uppercase">{user?.username.slice(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <h5 className="font-bold text-xl capitalize">{user?.username}</h5>
                                                <p className="font-bold text-slate-500 text-sm">{user?.email}</p>
                                            </div>
                                        </div>
                                        <Separator orientation="horizontal" />
                                        <Link href="/api/logout" className="outline-none border-none">
                                            <Button variant="outline" className="outline-none">
                                                Logout <LogOut />
                                            </Button>
                                        </Link>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        ) : (
                            <Button onClick={handleDrawer} variant="outline" className="hover:bg-primary">
                                Sign in
                            </Button>
                        )}
                    </div>

                    <button onClick={handleSidebarBtn} className="text-white hidden phone:block text-2xl p-1 rounded-sm border border-white">
                        <Menu />
                    </button>
                </div>
            </nav>

            <aside className={cn(`fixed bg-zinc-950 z-[100] transition p-4 w-full h-full top-0 left-0 flex flex-col gap-2`, !navOpen && "translate-x-full")}>
                <div className="flex justify-between w-full">
                    <Brand className="tablet:h-8 h-12" />
                    <button onClick={handleSidebarBtn} className="hidden phone:block text-2xl p-1 rounded-sm border">
                        <X />
                    </button>
                </div>
                <Separator orientation="horizontal" />
                <div className="list-none m-0 p-0 flex flex-col gap-4 w-full">
                    {isAuth && (
                        <Link href="/dashboard" legacyBehavior passHref>
                            <Button onClick={closeSide} variant="outline">
                                Dasbhboard
                            </Button>
                        </Link>
                    )}
                    <Link href="/#hero" legacyBehavior passHref>
                        <Button onClick={closeSide} variant="outline">
                            Home
                        </Button>
                    </Link>
                    <Link href="/#features" legacyBehavior passHref>
                        <Button onClick={closeSide} variant="outline">
                            Features
                        </Button>
                    </Link>
                    <Link href="/#faq" legacyBehavior passHref>
                        <Button onClick={closeSide} variant="outline">
                            FAQ
                        </Button>
                    </Link>
                </div>
                <Separator orientation="horizontal" className="mt-auto" />
                <div className="flex justify-between w-full">
                    {isAuth ? (
                        <Link href="/api/logout" className="ml-auto">
                            <Button variant="outline" className="hover:bg-primary ml-auto">
                                Logout <LogOut />
                            </Button>
                        </Link>
                    ) : (
                        <Button onClick={handleDrawer} variant="outline" className="hover:bg-primary ml-auto">
                            Sign in
                        </Button>
                    )}
                </div>
            </aside>
        </>
    );
}
