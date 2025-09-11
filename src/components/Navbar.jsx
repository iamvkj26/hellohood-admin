import { Link } from "react-router";
import Avatar from "react-avatar";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {

    const { token, role, clearAuth } = useAuth();

    return (
        <>
            <nav className="navbar">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <Link className="navbar-brand hello-hood" to="/">
                        HelloHood
                    </Link>
                    {token ? (
                        <div className="d-flex align-items-center gap-2">
                            <Avatar round={true} size="30" name={role} />
                            <Link className="text-items text-decoration-none" to="/addMovieSeries">
                                +  Add Movie/Series
                            </Link>
                            <div className="text-items cp" onClick={clearAuth}>Logout</div>
                        </div>
                    ) : (
                        <Link className="custom-button" to="/login">
                            <i className="fas fa-sign-in-alt"></i> Login
                        </Link>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;