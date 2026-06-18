import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {

    const { clearAuth } = useAuth();

    return (
        <nav className="sidebar">
            <div className="sidebar-logo">HelloHood</div>
            <ul className="sidebar-menu">
                <li className="menu-title">
                    Dashboard
                </li>
                <NavLink to="/" className="sidebar-link">
                    <i className="fas fa-chart-line"></i>
                    <span>Dashboard</span>
                </NavLink>
                <li className="menu-title">
                    Content
                </li>
                <NavLink to="/movieSeries" className="sidebar-link">
                    <i className="fas fa-film"></i>
                    <span>Movies / Series</span>
                </NavLink>
                <NavLink to="/addMovieSeries" className="sidebar-link">
                    <i className="fas fa-plus-circle"></i>
                    <span>Add Movie / Series</span>
                </NavLink>
                <NavLink to="/franchise" className="sidebar-link">
                    <i className="fas fa-layer-group"></i>
                    <span>Franchises</span>
                </NavLink>
                <li className="menu-title">
                    Support
                </li>
                <NavLink to="/query" className="sidebar-link">
                    <i className="fas fa-envelope"></i>
                    <span>Queries</span>
                </NavLink>
                <li className="menu-title">
                    Account
                </li>
                <NavLink to="/logs" className="sidebar-link">
                    <i className="fas fa-list"></i>
                    <span>Logs</span>
                </NavLink>
                <div className="sidebar-link logout-btn" onClick={clearAuth}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                </div>
            </ul>
        </nav>
    );
};

export default Sidebar;