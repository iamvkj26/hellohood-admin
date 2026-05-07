import { useEffect } from "react";
import moment from "moment";
import { useParams } from "react-router";
import useMovieSeries from "../hooks/useMovieSeries";
import usePageTitle from "../hooks/usePageTitle";
import SearchBar from "../components/SearchBar";
import CastBadge from "../components/shared/CastBadge";
import GenreBadge from "../components/shared/GenreBadge";
import { formatDate } from "../utils/formatDate";
import ottLogos from "../constants/ottLogos";

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

            <div className="container-fluid py-5"
                style={{ backgroundImage: `linear-gradient(rgba(20,20,20,0.92), rgba(20,20,20,0.95)), url(${movieSeriesDetails.msPoster})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                <div className="container">
                    <div className="row align-items-start gy4">
                        <div className="col-md-4 text-center">
                            <div className="poster-card mx-auto">
                                <img
                                    src={movieSeriesDetails.msPoster}
                                    className="img-fluid card-details-img"
                                    alt={movieSeriesDetails.msName}
                                />

                                {
                                    movieSeriesDetails.msLink === "/" ? (
                                        <div className="blockquote-footer py-3 mb-0 text-white">
                                            No OTT or direct links are available.
                                        </div>
                                    ) : (
                                        <a
                                            href={movieSeriesDetails.msLink}
                                            className="btn btn-dark watch-btn  py-3"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            🔗 Watch Now
                                        </a>
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-md-8">
                            <h1 className="fw-bold display-6 mb-2">
                                {movieSeriesDetails.msName}
                                <span className="text-secondary fw-normal"> ({moment(movieSeriesDetails.msReleaseDate).format("YYYY")})</span>
                            </h1>
                            <div className="d-flex flex-wrap gap-2 align-items-center text-light opacity-75 mb-2">
                                <span className="text-dange">
                                    • {formatDate(movieSeriesDetails.msReleaseDate)} (RD)
                                </span>
                                <span className="text-capitalize">
                                    • {movieSeriesDetails.msFormat}
                                </span>
                                <span className="text-capitalize">
                                    • {movieSeriesDetails.msIndustry}
                                </span>
                            </div>
                            <p className="fs-5 text-light">
                                Overview:
                            </p>
                            <p className="fs-6 text-light-emphasis">
                                {movieSeriesDetails.msAbout}
                            </p>
                            <p className="mb-2">
                                IMDb Rating: <strong className="text-warning">{movieSeriesDetails.msRating}/10</strong>
                            </p>
                            <GenreBadge genres={movieSeriesDetails.msGenre} />
                            <div className="row mt-4 gy-4">
                                <div className="col-6 col-md-4">
                                    <h6 className="fw-bold mb-1">
                                        Cast
                                    </h6>
                                    <p className="text-light-emphasis mb-0">
                                        {movieSeriesDetails?.msCast?.length > 0 ? movieSeriesDetails.msCast?.join(", ") : "Not Available"}
                                    </p>
                                </div>
                                <div className="col-6 col-md-4">
                                    <h6 className="fw-bold mb-1">
                                        Streaming On
                                    </h6>
                                    <div className="d-flex justify-content-start">
                                        {
                                            movieSeriesDetails.msOTT === "none" ? "None" : (
                                                <img
                                                    src={ottLogos[movieSeriesDetails.msOTT]}
                                                    alt={movieSeriesDetails.msOTT}
                                                    className="rounded"
                                                    style={{
                                                        width: "40px",
                                                        height: "40px",
                                                        objectFit: "contain",
                                                        objectPosition: "left",
                                                        display: "block"
                                                    }}
                                                />
                                            )
                                        }
                                    </div>
                                </div>
                                {
                                    movieSeriesDetails.sStatus && (
                                        <div className="col-6 col-md-4">
                                            <h6 className="fw-bold mb-1">
                                                Status
                                            </h6>

                                            <p className="text-capitalize text-light-emphasis mb-0">
                                                {movieSeriesDetails.sStatus}
                                            </p>
                                        </div>
                                    )
                                }
                                {
                                    movieSeriesDetails.sTSeasons && (
                                        <div className="col-6 col-md-4">
                                            <h6 className="fw-bold mb-1">
                                                Seasons
                                            </h6>
                                            <p className="text-light-emphasis mb-0">
                                                {movieSeriesDetails.sTSeasons}
                                            </p>
                                        </div>
                                    )
                                }
                                <div className="col-6 col-md-4">
                                    <h6 className="fw-bold mb-1">
                                        Watched
                                    </h6>
                                    <p className="mb-0">
                                        {movieSeriesDetails.msWatched ? (
                                            <span className="text-success">
                                                Yes
                                            </span>
                                        ) : (
                                            <span className="text-danger">
                                                No
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieSeriesDetails;