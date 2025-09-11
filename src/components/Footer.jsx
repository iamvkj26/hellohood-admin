import { Link } from "react-router";

const Footer = () => {
    return (
        <>
            <footer className="bg-dark border-top py-3">
                <div className="container">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                        <div>
                            2025 © <Link className="text-primary fw-semibold" to="/">HelloHood</Link> | All Rights Reserved.
                        </div>
                        <div>
                            <Link to="/addMovieSeries" className="text-info fw-semibold text-decoration-none">
                                + Add Movie/Series
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;