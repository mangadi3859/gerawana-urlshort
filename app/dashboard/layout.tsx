import type { Metadata } from "next";
import Footer from "@/components/base/Footer";

export const metadata: Metadata = {
    title: "Gerawana | Dashboard",
    description: "Dashboard",
    icons: ["images/brand-icon-gerawana.png"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
