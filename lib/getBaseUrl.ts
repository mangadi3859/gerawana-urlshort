import { headers } from "next/headers";

export default function getBaseUrl(): string {
    const host = <string>headers().get("host");
    const protocol = host.includes("localhost") ? "http" : "https"; // Use http for localhost, https otherwise
    const baseUrl = `${protocol}://${host}`;
    return baseUrl;
}
