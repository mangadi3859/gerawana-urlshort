import { useEffect, useState } from "react";

export default function useUrl() {
    let [url, setUrl] = useState<URL>();

    useEffect(() => {
        if (window !== undefined) {
            setUrl(new URL(window.location.href));
        }
    }, []);
    return url;
}
