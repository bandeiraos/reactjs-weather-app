import { useEffect } from "react";

export const useScrollToggle = (): void => {
    const toggleScrollBtn = (): void => {
        const btn = document.getElementById("scrollToTopBtn");

        if (window.scrollY > 80) {
            btn?.classList.add('flex');
            btn?.classList.remove('hidden');
        } else {
            btn?.classList.add('hidden');
            btn?.classList.remove('flex');
        }
    };

    useEffect(() => {
        document.addEventListener('scroll', toggleScrollBtn);

        (): void => {
            document.removeEventListener('scroll', toggleScrollBtn);
        };
    }, []);
};