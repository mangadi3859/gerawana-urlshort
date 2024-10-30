"use client";

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { FormRegister, FormLogin } from "./HomeForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
    drawerStateHook: [boolean, (v: boolean) => any];
};

export default function LoginDrawer({ drawerStateHook }: Props) {
    let [open, setOpen] = drawerStateHook;
    let route = useRouter();

    console.log(route);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent className="z-[101]">
                <div className="conn max-w-[35rem] phone:max-w-[var(--max-width)] w-full flex flex-col items-center">
                    <DrawerHeader>
                        <DrawerTitle>Start making short link</DrawerTitle>
                        <DrawerDescription>The first step to the greatest!</DrawerDescription>
                    </DrawerHeader>

                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="register">Register</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <FormLogin />
                        </TabsContent>
                        <TabsContent value="register">
                            <FormRegister />
                        </TabsContent>
                    </Tabs>

                    <DrawerFooter className="w-full">
                        <div className="flex flex-col items-center">
                            <p>Forgot your password?</p>
                            <div>
                                <Link className="underline text-primary" href="/reset-password">
                                    Click here to reset your password
                                </Link>
                            </div>
                        </div>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
