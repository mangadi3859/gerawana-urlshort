"use client";

type Props = {
    children: React.ReactNode;
    className?: string;
};

export default function Main({ children, className }: Props) {
    return <main className={`overflow-x-hidden min-h-dvh ${className ?? ""}`}>{children}</main>;
}
