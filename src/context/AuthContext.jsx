import { createContext, useState, useContext } from "react";
import secureLocalStorage from "react-secure-storage";
import { logout } from "../api/services/auth.service";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuthState] = useState({
        token: secureLocalStorage.getItem("token"), role: JSON.parse(secureLocalStorage.getItem("role"))
    });

    const setAuth = (token, role) => {
        secureLocalStorage.setItem("token", token);
        secureLocalStorage.setItem("role", JSON.stringify(role));
        setAuthState({ token, role });
    };

    const clearAuth = async () => {
        try {
            await logout();
        } catch (error) {
            console.error(error.message);
        } finally {
            secureLocalStorage.removeItem("token");
            secureLocalStorage.removeItem("role");
            setAuthState({ token: null, role: "" });
            toast.success("Logged out successfully...");
            setTimeout(() => (window.location.href = "/"), 100);
        };
    };

    return (
        <AuthContext.Provider value={{ ...auth, setAuth, clearAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };