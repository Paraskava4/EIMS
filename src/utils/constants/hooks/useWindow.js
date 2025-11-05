import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const getWindowWidth = () => window.innerWidth;

export const useWindowWidth = (ref) => {
    const { pathname } = useLocation();
    const [windowWidth, setWindowSize] = useState(getWindowWidth());

    /**
     *  - toggle the "open" class for closing and opening <Sidebar /> component
     */
    useEffect(() => {
        const sidebar = document.querySelector(".sidebar");
        const closeBtn = document.querySelector("#btn");
        if (pathname !== "/login") {
            const handleClick = () => sidebar?.classList?.toggle("open");
            const element = ref?.current;
            element?.addEventListener("click", handleClick);
            closeBtn?.addEventListener("click", handleClick);

            return () => element?.removeEventListener("click", handleClick);
        }
    }, [pathname, ref]);

    /**
     *  - return and sets a width according to @Window width
     */
    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowWidth());
        }
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    /**
     *  - Open @MiniSidebar when window size is @lt [1600] and
     *  - Close @MiniSidebar when window size is @gt [1600]
     */
    useEffect(() => {
        const sidebar = document.querySelector(".sidebar");
        const isOpen = sidebar?.classList?.contains("open");
        if (windowWidth < 1600 && isOpen) sidebar?.classList?.remove("open");
        if (windowWidth > 1600 && !isOpen) sidebar?.classList?.add("open");
    }, [windowWidth]);

    return windowWidth;
};
