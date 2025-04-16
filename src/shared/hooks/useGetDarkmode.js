import { useEffect, useState } from "react";

const useGetDarkmode = () => {
    const [mode, setMode] = useState(() => document.body.className);
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setMode(document.body.className);
        });
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ["class"],
        });
        return () => {
            observer.disconnect();
        };
    }, []);
    return { mode };
};

export { useGetDarkmode };
