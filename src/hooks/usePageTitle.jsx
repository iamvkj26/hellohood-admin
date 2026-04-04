import { useEffect } from "react";

const usePageTitle = (title) => {
    useEffect(() => {
        document.title = title ? `${title} | HelloHood - Admin Panel` : "HelloHood - Admin Panel";
    }, [title]);
};

export default usePageTitle;