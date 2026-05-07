import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const SearchBar = ({ updateFilter, searchValue }) => {

    const [search, setSearch] = useState(searchValue || "");
    const navigate = useNavigate();

    useEffect(() => {
        setSearch(searchValue || "");
    }, [searchValue]);

    const handleSearch = () => {
        const term = search.trim();
        updateFilter("s", term);
        if (window.location.pathname !== "/movieseries") {
            navigate(`/movieseries?s=${encodeURIComponent(term)}`);
        };
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    const handleInputChange = (e) => {
        const val = e.target.value;
        setSearch(val);
        if (val === "") {
            updateFilter("s", "");
        };
    };

    return (
        <nav className="navbar navbar-expand-lg bg-141414">
            <div className="container">

                <input
                    type="search"
                    className="form-control form-none me-2 search-italic"
                    placeholder="Search for a movie, web series, person..."
                    value={search}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />

                <button
                    className="btn btn-212529"
                    type="button"
                    onClick={handleSearch}
                >
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>

            </div>
        </nav>
    );
};

export default SearchBar;