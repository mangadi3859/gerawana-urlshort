import { randomBytes } from "crypto";

export default function generateOTP(): string {
    const randomNumber = randomBytes(3).toString("hex");
    const otp = parseInt(randomNumber, 16) % 1000000;
    return otp.toString().padStart(6, "0");
}
