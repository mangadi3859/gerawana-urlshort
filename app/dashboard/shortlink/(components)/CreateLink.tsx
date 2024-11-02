"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserDB } from "@/lib/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Label } from "recharts";
import { useState } from "react";
import LinkForm from "./LinkForm";

type Props = {
    token: string;
    user: UserDB;
};
export default function CreateLink({ token, user }: Props) {
    let [dialogOpen, setDialogOpen] = useState(false);

    function handleNewLink() {
        setDialogOpen(!dialogOpen);
    }

    return (
        <div>
            <Button onClick={handleNewLink} variant="outline">
                <Plus /> Add new link
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add new short link</DialogTitle>
                        <DialogDescription>create amazing short link</DialogDescription>
                    </DialogHeader>
                    <LinkForm setState={setDialogOpen} token={token} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
