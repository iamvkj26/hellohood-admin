import { useEffect } from "react";
import { useParams } from "react-router";
import moment from "moment";
import useMovieSeries from "../hooks/useMovieSeries";
import usePageTitle from "../hooks/usePageTitle";
import SearchBar from "../components/SearchBar";
import MovieDetailCard from "../components/card/MovieDetailCard";
import CastCarousel from "../components/card/CastCarousel";
import SeriesDetailCard from "../components/card/SeriesDetailCard";

const MovieSeriesDetails = () => {

    const { id } = useParams();

    const { movieSeriesDetails, handleGetMovieSeriesDetails } = useMovieSeries({});
    const isValidId = /^[a-f0-9]{64}$/i.test(id || "");

    useEffect(() => {
        if (isValidId && id) handleGetMovieSeriesDetails(id);
        // eslint-disable-next-line
    }, [isValidId, id]);

    usePageTitle(`${movieSeriesDetails?.msName} (${moment(movieSeriesDetails.msReleaseDate).year()})`);

    if (!movieSeriesDetails) return <p>Loading...</p>;

    return (
        <>
            <SearchBar updateFilter={() => { }} searchValue="" />
            <MovieDetailCard movieSeriesDetails={movieSeriesDetails} />
            <CastCarousel casts={movieSeriesDetails?.msCast} format={movieSeriesDetails?.msFormat} />
            {movieSeriesDetails?.msFormat === "series" && (<SeriesDetailCard seasons={movieSeriesDetails?.sSeasons} />)}
        </>
    );
};

export default MovieSeriesDetails;