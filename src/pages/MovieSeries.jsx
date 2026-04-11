import { useState, useEffect } from "react";
import useFilters from "../hooks/useFilters";
import useMovieSeries from "../hooks/useMovieSeries";
import usePageTitle from "../hooks/usePageTitle";
import SearchBar from "../components/SearchBar";
import Card from "../components/card/Card";

const MovieSeries = () => {

    const { filters, ready, updateFilter } = useFilters();
    const { movieSeries, loading, handleGetMovieSeries, clearMovieSeries } = useMovieSeries();

    const capitalizeWords = (str) => str?.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") || "";
    usePageTitle(filters?.s ? `Search: ${capitalizeWords(filters.s)}` : "Movie/Series");

    const [searchDone, setSearchDone] = useState(false);

    useEffect(() => {
        if (ready && filters?.s) {
            setSearchDone(true);
            handleGetMovieSeries({ ...filters, s: filters.s });
        };
        // eslint-disable-next-line
    }, [ready, filters?.s]);

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