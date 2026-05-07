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
    usePageTitle(filters?.s ? `${capitalizeWords(filters.s)}` : "Movie/Series");

    const [searchDone, setSearchDone] = useState(false);

    useEffect(() => {
        if (!ready) return;
        if (filters?.s?.trim()) {
            setSearchDone(true);
            handleGetMovieSeries(filters);
        } else {
            clearMovieSeries();
            setSearchDone(false);
        };
        // eslint-disable-next-line
    }, [ready, filters]);

    return (
        <>
            <SearchBar updateFilter={updateFilter} searchValue={filters.s} />
            {loading && <p className="text-center my-3">Loading…</p>}
            {!loading && movieSeries?.length > 0 && <Card movieSeries={movieSeries} />}
            {!loading && searchDone && movieSeries.length === 0 && (<p className="text-center my-3">No movie/series found.</p>)}
            {!loading && !searchDone && movieSeries.length === 0 && (<p className="text-center my-3">Search to see results.</p>)}
        </>
    );
};

export default MovieSeries;