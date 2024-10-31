import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
    title: "Gerawana | Short your link",
    description: "Generated by create next app",
    icons: ["images/brand-icon-gerawana.png"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`antialiased dark relative`}>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
