"use client";
import { useRouter } from "next/navigation";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import { useState, useEffect } from "react";

export default function SearchUrl({ drawerStateHook }: { drawerStateHook: [boolean, (v: any) => any] }) {
    const placeholders = ["Enter URL", "https://s.gerawana.com/r/verycool"];
    let [y, setY] = useState(0);
    let [input, setInput] = useState("");
    let route = useRouter();

    useEffect(() => {
        window.addEventListener("scroll", parallax);
        return () => window.removeEventListener("scroll", parallax);
    }, []);

    function parallax() {
        setY(window.scrollY);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        drawerStateHook[1](true);
    };
    return (
        <div style={{ transform: `translateY(${Math.min((y - 400) * 0.5, 100)}px) translateX(-50%)` }} className="absolute left-1/2 top-0 conn w-full">
            <h2 className="mb-10 text-center text-xl poppins dark:text-white text-black">Looking for URL?</h2>
            <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />
        </div>
    );
}
