"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import EmailForm from "./EmailForm";
import { useRouter } from "next/navigation";
import useUrl from "@/hooks/useUrl";
import { OTP } from "./OTP";
import ChangePassword from "./ChangePassword";

export enum State {
    EMAIL,
    OTP,
    FORM,
}
export default function ResetPassword() {
    let [state, setState] = useState<State>(State.EMAIL);
    let [otpId, setOtpId] = useState<string>();

    return (
        <Card className="bg-background min-w-[30rem]">
            <CardHeader>
                <CardTitle>Password Reset</CardTitle>
                <CardDescription>Reset your password</CardDescription>
            </CardHeader>
            <CardContent>
                {state == State.EMAIL && <EmailForm setState={setState} state={state} />}
                {state == State.OTP && <OTP setState={setState} state={state} setOtpId={setOtpId} />}
                {state == State.FORM && <ChangePassword setState={setState} state={state} otpId={otpId} />}
            </CardContent>
        </Card>
    );
}
