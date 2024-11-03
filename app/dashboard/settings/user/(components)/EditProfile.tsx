"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { FormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z as zod } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserDB } from "@/lib/types";
import type { APIReturn } from "@/lib/apiFetch";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

type Props = {
    token: string;
    user: UserDB;
};
export default function EditProfile({ token, user }: Props) {
    let { toast } = useToast();
    let [disabled, setDisabled] = useState(false);
    let router = useRouter();

    const formSchema = zod.object({
        email: zod.string().email(),
        username: zod.string().trim().regex(/^\S+$/, { message: "White spaces is not allowed" }).min(5, {
            message: "Username must be at least 5 characters.",
        }),
    });

    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: user.username ?? "",
            email: user.email ?? "",
        },
    });

    async function onSubmit(values: zod.infer<typeof formSchema>) {
        try {
            setDisabled(true);
            toast({ title: "Form sent", description: "Form is being validated" });

            let data = await fetch("/api/settings/user/edit", {
                method: "POST",
                body: JSON.stringify({ ...values }),
                headers: {
                    Authorization: token,
                },
            });

            let api: APIReturn<any> = await data.json();

            if (api.status != "OK") {
                form.setError((api.type as any) ?? "redirect", { message: api.message });
                toast({ title: "Failed", description: api.message });
                return;
            }

            router.replace("/dashboard");
            return toast({ title: "Edit success", description: "Process completed" });
        } catch (err) {
            console.log(err);
            toast({ title: "Unexpected server error", description: "Something went wrong!" });
        } finally {
            setDisabled(false);
        }
    }

    return (
        <Form {...form}>
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Profile</h1>
                <p className="text-gray-400">Edit your email and username here.</p>
            </div>
            <Separator orientation="horizontal" />
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-[50rem]">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input required placeholder="Username" {...field} />
                            </FormControl>
                            <FormDescription>Your public display username</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input required placeholder="Email" {...field} />
                            </FormControl>
                            <FormDescription>Your email (you will be logged out if your email changes)</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-4 items-center">
                    <Button disabled={disabled} variant="secondary" className="bg-white hover:bg-gray-400 text-black" type="submit">
                        Update profile
                    </Button>

                    <Link href={`/reset-password?id=${user.id}`}>
                        <Button disabled={disabled} variant="outline" className="">
                            Reset Password
                        </Button>
                    </Link>
                </div>
            </form>
        </Form>
    );
}
