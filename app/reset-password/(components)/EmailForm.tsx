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
};
export default function EmailForm({ setState, state }: Props) {
    let { toast } = useToast();
    let [disabled, setDisabled] = useState(false);
    let router = useRouter();

    const formSchema = zod.object({
        email: zod.string().email(),
    });

    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(values: zod.infer<typeof formSchema>) {
        try {
            setDisabled(true);
            toast({ title: "Form sent", description: "Form is being validated" });
            let data = await fetch("/api/reset-password/new", {
                method: "POST",
                body: JSON.stringify({ ...values }),
            });

            let api: APIReturn<any> = await data.json();

            if (api.status != "OK") {
                form.setError((api.type as any) ?? "redirect", { message: api.message });
                toast({ title: "Failed", description: api.message });
                return;
            }

            console.log("OTP", api.data);
            setState(State.OTP);
            return toast({ title: "OTP code have been sent to your email", description: "Process completed" });
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
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input required placeholder="youremail@mail.com" {...field} />
                            </FormControl>
                            <FormDescription>Enter your email</FormDescription>
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
