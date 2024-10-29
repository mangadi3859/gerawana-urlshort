"use client";
import Image from "next/image";
import Link from "next/link";

import BrandImg from "@/public/images/brand-gerawana.png";
import { cn } from "@/lib/utils";

type Props = {
    light?: boolean;
    className?: string;
} & React.HTMLProps<HTMLAnchorElement>;

export default function Brand({ light, className, ...props }: Props) {
    return (
        <Link {...props} href="/" className={cn(`${light ? "text-white" : "text-black"} flex font-bold text-2xl f-poppins`, className ?? "")}>
            <Image alt="brand" src={BrandImg} className="w-auto" />
        </Link>
    );
}
