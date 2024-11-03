"use client";

import { Button } from "@/components/ui/button";
import { FormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z as zod } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DialogFooter } from "@/components/ui/dialog";
import { LinkDB } from "@/lib/types";
import type { APIReturn } from "@/lib/apiFetch";
import { useRouter } from "next/navigation";
import { State } from "./ResetPassword";

type Props = {
    setState: (v: State) => any;
    state: State;
    otpId?: string;
};
export default function ChangePassword({ setState, state, otpId }: Props) {
    let { toast } = useToast();
    let [disabled, setDisabled] = useState(false);
    let router = useRouter();

    const formSchema = zod.object({
        password: zod.string().min(5, {
            message: "Username must be at least 5 characters.",
        }),
        confirmPassword: zod.string().min(5, {
            message: "Username must be at least 5 characters.",
        }),
    });

    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: zod.infer<typeof formSchema>) {
        try {
            setDisabled(true);
            toast({ title: "Form sent", description: "Form is being validated" });

            if (values.confirmPassword !== values.password) return form.setError("confirmPassword", { message: "Password mismatch" });
            let data = await fetch("/api/reset-password/save", {
                method: "POST",
                body: JSON.stringify({ ...values, otp: otpId }),
            });

            let api: APIReturn<any> = await data.json();

            if (api.status != "OK") {
                form.setError((api.type as any) ?? "password", { message: api.message });
                toast({ title: "Failed", description: api.message });
                return;
            }

            toast({ title: "Success", description: "Your password has been reseted" });
            router.replace("/");
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
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input required type="password" placeholder="your password" {...field} />
                            </FormControl>
                            <FormDescription>Enter your new passowrd</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input required type="password" placeholder="confirm your password" {...field} />
                            </FormControl>
                            <FormDescription>Confirm new password</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button disabled={disabled} variant="secondary" type="submit">
                    Submit
                </Button>
            </form>
        </Form>
    );
}
