import { useState } from "react";
import useFilters from "../hooks/useFilters";
import SearchBar from "../components/SearchBar";
import Card from "../components/card/Card";
import useMovieSeries from "../hooks/useMovieSeries";

const MovieSeries = () => {

    const { filters, ready, updateFilter } = useFilters();
    const { movieSeries, loading, handleGetMovieSeries, clearMovieSeries } = useMovieSeries();

    const [searchDone, setSearchDone] = useState(false);

    if (!ready || !filters) return null;

    const handleSearch = (term) => {
        const s = term?.trim();

        if (!s) {
            clearMovieSeries();
            updateFilter("s", "");
            setSearchDone(false);
            return;
        };

        setSearchDone(true);
        handleGetMovieSeries({ ...filters, s });
    };

    return (
        <>
            <SearchBar updateFilter={updateFilter} searchValue={filters.s} onSearch={handleSearch} />
            {loading && <p className="text-center my-3">Loading…</p>}
            {!loading && movieSeries?.length > 0 && <Card movieSeries={movieSeries} />}
            {!loading && searchDone && movieSeries.length === 0 && (<p className="text-center my-3">No movie/series found.</p>)}
            {!loading && !searchDone && movieSeries.length === 0 && (<p className="text-center my-3">Search to see results.</p>)}
        </>
    );
};

export default MovieSeries;