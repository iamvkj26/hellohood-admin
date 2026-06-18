import { NavLink } from "react-router";
import Avatar from "react-avatar";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {

    const { role } = useAuth();

    return (
        <nav className="navbar">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <NavLink className="navbar-brand hello-hood" to="/">
                    HelloHood
                </NavLink>
                <div className="d-flex align-items-center gap-2">
                    <Avatar round={true} size="30" name={role} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;