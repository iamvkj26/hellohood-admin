import { NavLink } from "react-router";
import Avatar from "react-avatar";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {

    const { token, role, clearAuth } = useAuth();

    return (
        <>
            <nav className="navbar">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <NavLink className="navbar-brand hello-hood" to="/">
                        HelloHood
                    </NavLink>
                    {token ? (
                        <div className="d-flex align-items-center gap-2">
                            <Avatar round={true} size="30" name={role} />
                            <NavLink className="text-items text-decoration-none" to="/addMovieSeries">
                                +  Add Movie/Series
                            </NavLink>
                            <NavLink className="text-items text-decoration-none" to="/query">
                                Query
                            </NavLink>
                            <div className="text-items cp" onClick={clearAuth}>Logout</div>
                        </div>
                    ) : (
                        <NavLink className="custom-button" to="/login">
                            <i className="fas fa-sign-in-alt"></i> Login
                        </NavLink>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;