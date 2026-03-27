import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-dark border-top py-3">
            <div className="container">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div>
                        2026 © <Link className="text-primary fw-bold" to="/">HelloHood</Link> | All Rights Reserved.
                    </div>
                    <div className="d-flex justify-content-center gap-3">
                        <Link to="/addMovieSeries" className="text-primary fw-bold text-decoration-none hover-white">
                            + Add Movie/Series
                        </Link>
                        <Link to="/query" className="text-primary fw-bold text-decoration-none hover-white">
                            Query
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;