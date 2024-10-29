"use client";

import Link from "next/link";
import Brand from "./Brand";

export default function Footer() {
    return (
        <footer id="footer" className="bg-background border border-1 text-neutral-300 py-8">
            <div className="conn mx-auto  flex flex-col gap-4">
                <div className="flex tablet:flex-col gap-[3rem]">
                    <div className="max-w-[25rem] mr-auto">
                        <Brand className="h-[4rem] w-auto tablet:h-[2rem]" />
                        <p className="mt-2 text-sm">Simplifying link sharing, one URL at a time. Join us to make your links short and memorable.</p>
                    </div>

                    <div className="flex flex-col tablet:flex-row tablet:gap-[1rem] gap-[3rem]">
                        <div className="flex flex-col gap-2 text-neutral-400">
                            <div className="font-bold text-foreground">Pages</div>
                            <Link href="/#hero" className="transition hover:text-primary">
                                Home
                            </Link>
                            <Link href="/#features" className="transition hover:text-primary">
                                Features
                            </Link>
                            <Link href="/#faq" className="transition hover:text-primary">
                                FAQ
                            </Link>
                        </div>

                        <div className="flex flex-col gap-2 text-neutral-400">
                            <div className="font-bold text-foreground">Socials</div>
                            <Link href="" className="transition hover:text-primary">
                                Twitter
                            </Link>
                            <Link href="" className="transition hover:text-primary">
                                Facebook
                            </Link>
                            <Link href="" className="transition hover:text-primary">
                                Instagram
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="text-right text-sm ml-auto mt-auto text-neutral-400">© {new Date().getFullYear()} GERAWANA. All rights reserved.</div>
            </div>
        </footer>
    );
}
