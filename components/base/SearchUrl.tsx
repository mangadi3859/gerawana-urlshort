"use client";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import { useState, useEffect } from "react";

export default function SearchUrl() {
    const placeholders = ["Enter URL", "https://s.gerawana.com/r/verycool"];
    let [y, setY] = useState(0);

    useEffect(() => {
        window.addEventListener("scroll", parallax);
        return () => window.removeEventListener("scroll", parallax);
    }, []);

    function parallax() {
        setY(window.scrollY);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted");
    };
    return (
        <div style={{ top: `${Math.min((y - 400) * 0.5, 100)}px` }} className="absolute left-1/2 -translate-x-1/2 conn w-full">
            <h2 className="mb-10 text-center text-xl poppins dark:text-white text-black">Looking for URL?</h2>
            <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />
        </div>
    );
}
