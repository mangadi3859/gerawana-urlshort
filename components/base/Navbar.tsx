"use client";
import * as React from "react";
import Link from "next/link";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

import Brand from "./Brand";
import { NavigationMenu, NavigationMenuContent, NavigationMenuLink, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Navbar() {
    let navRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <nav ref={navRef} className={`w-full poppins fixed z-[1000] transition bg-background/25 backdrop-blur-md`} id="navbar">
                <div className="conn flex items-center justify-between py-4 ">
                    <Brand />

                    <div className="flex items-center gap-2">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <Link href="#hero" legacyBehavior passHref>
                                        <Button variant="outline">Home</Button>
                                    </Link>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <Link href="#features" legacyBehavior passHref>
                                        <Button variant="outline">Features</Button>
                                    </Link>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <Link href="#faq" legacyBehavior passHref>
                                        <Button variant="outline">FAQ</Button>
                                    </Link>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                        <Separator orientation="vertical" className="h-[2rem]" />
                        <Button variant="outline" className="hover:bg-primary">
                            Sign in
                        </Button>
                    </div>
                </div>
            </nav>
        </>
    );
}
