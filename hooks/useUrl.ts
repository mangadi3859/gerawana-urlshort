import { useEffect, useState } from "react";

export default function useUrl() {
    let [url, setUrl] = useState<URL>();

    useEffect(() => {
        if (typeof window !== undefined && "location" in window) {
            setUrl(new URL(window.location.href));
        }
    }, []);
    return url;
}
