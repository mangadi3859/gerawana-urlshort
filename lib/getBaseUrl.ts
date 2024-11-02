import { headers } from "next/headers";

export default function getBaseUrl(): string {
    const host = <string>headers().get("host");
    const protocol = /(localhost|\d+\.\d+\.\d+\.\d+)/g.test(host) ? "http" : "https"; // Use http for localhost, https otherwise
    const baseUrl = `${protocol}://${host}`;
    return baseUrl;
}
