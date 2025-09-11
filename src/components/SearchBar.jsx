import { useState, useEffect } from "react";

const SearchBar = ({ updateFilter, searchValue, onSearch }) => {

    const [search, setSearch] = useState(searchValue || "");

    useEffect(() => {
        setSearch(searchValue);
    }, [searchValue]);

    const handleSearch = () => {
        const term = search.trim();
        if (!term) return;
        updateFilter("s", term);
        onSearch?.(term);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    const handleInputChange = (e) => {
        const val = e.target.value;
        setSearch(val);
        if (val === "") {
            updateFilter("s", "");
            onSearch?.("");
        };
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg search-background">
                <div className="container">
                    <input type="search" className="form-control form-none me-2" placeholder="Search the movies, web series..." value={search} onChange={handleInputChange} onKeyDown={handleKeyDown} />
                    <button className="btn btn-212529" type="button" onClick={handleSearch}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </nav>
        </>
    );
};

export default SearchBar;