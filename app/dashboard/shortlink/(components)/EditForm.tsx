import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
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

type Props = {
    setState: (v: boolean) => any;
    link?: LinkDB;
    token: string;
};
export default function LinkForm({ setState, token, link }: Props) {
    let { toast } = useToast();
    let [disabled, setDisabled] = useState(false);
    let router = useRouter();

    const formSchema = zod.object({
        name: zod.string().trim().min(5, { message: "Username must be at least 5 characters." }),
        link: zod.string().trim().regex(/^\S+$/, { message: "White spaces is not allowed" }).min(5, { message: "Link must be at least 5 characters." }),
        redirect: zod.string().url().trim().regex(/^\S+$/, { message: "White spaces is not allowed" }).min(5, {
            message: "Username must be at least 5 characters.",
        }),
    });

    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            redirect: link?.redirect ?? "",
            link: link?.link ?? "",
            name: link?.name ?? "",
        },
    });

    async function onSubmit(values: zod.infer<typeof formSchema>) {
        try {
            setDisabled(true);
            toast({ title: "Form sent", description: "Form is being validated" });
            let data = await fetch("/api/short/edit", {
                method: "POST",
                body: JSON.stringify({ ...values, id: link?.id ?? "" }),
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

            setState(false);
            router.refresh();
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input required placeholder="Name" {...field} />
                            </FormControl>
                            <FormDescription>Your url name</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input required placeholder="URL" {...field} />
                            </FormControl>
                            <FormDescription>The shortened id</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="redirect"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input required placeholder="URL" {...field} />
                            </FormControl>
                            <FormDescription>The destination url</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <Button disabled={disabled} variant="secondary" type="submit">
                        Save
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
