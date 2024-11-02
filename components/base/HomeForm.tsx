"use client";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

type FormProps = {
    setOpen: (state: boolean) => any;
};
export function FormRegister({ setOpen }: FormProps) {
    let { toast } = useToast();
    let [disabled, setDisabled] = useState(false);

    const formSchema = zod.object({
        email: zod.string().email(),
        username: zod.string().trim().regex(/^\S+$/, { message: "White spaces is not allowed" }).min(5, {
            message: "Username must be at least 5 characters.",
        }),
        password: zod.string().min(5, {
            message: "Username must be at least 5 characters.",
        }),
    });

    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: zod.infer<typeof formSchema>) {
        try {
            setDisabled(true);
            toast({ title: "Form sent", description: "Form is being validated" });

            let apiPromise = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify(values),
                cache: "no-cache",
            });
            let api = await apiPromise.json();

            if (api.status != "OK") {
                form.setError(api.type ?? "email", { message: api.message });
                return toast({ title: "Register failed", description: api.message });
            }

            return toast({ title: "Register success", description: "Please login to your new created account" });
        } catch (err) {
            console.log(err);
            toast({ title: "Unexpected server error", description: "Something went wrong!" });
        } finally {
            setDisabled(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Register</CardTitle>
                        <CardDescription>Start creating your own gerawana account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input required type="email" placeholder="verycool@email.com" {...field} />
                                    </FormControl>
                                    <FormDescription>This is your email.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input required placeholder="verycoolusername" {...field} />
                                    </FormControl>
                                    <FormDescription>This is your public display name.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" required {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button disabled={disabled}>Submit</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}

export function FormLogin({ setOpen }: FormProps) {
    let { toast } = useToast();
    let [disabled, setDisabled] = useState(false);
    let router = useRouter();

    const formSchema = zod.object({
        username: zod.string().trim().regex(/^\S+$/, { message: "White spaces is not allowed" }).min(5, {
            message: "Username must be at least 5 characters.",
        }),
        password: zod.string().min(5, {
            message: "Username must be at least 5 characters.",
        }),
    });

    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    async function onSubmit(values: zod.infer<typeof formSchema>) {
        try {
            setDisabled(true);
            toast({ title: "Form sent", description: "Form is being validated" });

            let apiPromise = await fetch("/api/login", {
                method: "POST",
                body: JSON.stringify(values),
                cache: "no-cache",
            });
            let api = await apiPromise.json();

            if (api.status != "OK") {
                form.setError(api.type ?? "email", { message: api.message });
                return toast({ title: "Login failed", description: api.message });
            }

            toast({ title: "Login success", description: "Logged in successfully" });
            router.replace("/dashboard");
        } catch (err) {
            console.log(err);
            toast({ title: "Unexpected server error", description: "Something went wrong!" });
        } finally {
            setDisabled(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Already have an account? Sign in to your amazing account!</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input required placeholder="verycoolusername" {...field} />
                                    </FormControl>
                                    <FormDescription>This is your public display name.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" required {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button disabled={disabled}>Submit</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}
