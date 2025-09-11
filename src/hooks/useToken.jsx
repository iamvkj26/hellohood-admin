import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const useToken = () => {

    const { token, clearAuth } = useAuth();

    useEffect(() => {
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                if (payload.exp && Date.now() >= payload.exp * 1000) clearAuth();

            } catch (err) {
                console.error("Invalid token format:", err);
                clearAuth();
            };
        };
    }, [token, clearAuth]);
    return token;
};

export default useToken;