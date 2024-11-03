"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { State } from "./ResetPassword";
import { useState } from "react";
import { APIReturn } from "@/lib/apiFetch";

const FormSchema = z.object({
    otp: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
});

type Props = {
    setState: (v: State) => any;
    state: State;
    setOtpId: (v: string) => any;
};
export function OTP({ setState, state, setOtpId }: Props) {
    let { toast } = useToast();
    let [disabled, setDisabled] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            otp: "",
        },
    });

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        try {
            setDisabled(true);
            toast({ title: "Form sent", description: "Form is being validated" });
            let data = await fetch("/api/reset-password/otp", {
                method: "POST",
                body: JSON.stringify({ ...values }),
            });

            let api: APIReturn<any> = await data.json();

            if (api.status != "OK") {
                form.setError((api.type as any) ?? "otp", { message: api.message });
                toast({ title: "Failed", description: api.message });
                return;
            }

            setState(State.FORM);
            setOtpId(api.data);
        } catch (err) {
            console.log(err);
            toast({ title: "Unexpected server error", description: "Something went wrong!" });
        } finally {
            setDisabled(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>One-Time Password</FormLabel>
                            <FormControl className="mx-auto">
                                <InputOTP maxLength={6} {...field}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormDescription>
                                Please enter the one-time password sent to your email. <br /> (Coming soon... Check console.log to get the OTP)
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button variant="ghost" className="bg-white hover:bg-gray-400 !text-black" type="submit">
                    Submit
                </Button>
            </form>
        </Form>
    );
}
