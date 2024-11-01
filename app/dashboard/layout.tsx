import type { Metadata } from "next";
import { metadata as mainMeta } from "@/app/layout";

export const metadata: Metadata = {
    ...mainMeta,
    title: "Gerawana | Dashboard",
    description: "Dashboard",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
