import moment from "moment";
import { formatDate } from "../../utils/formatDate";
import ottLogos from "../../constants/ottLogos";
import GenreBadge from "../shared/GenreBadge";

const MovieDetailCard = ({ movieSeriesDetails }) => {
    return (
        <div className="container-fluid py-5"
            style={{ backgroundImage: `linear-gradient(rgba(20,20,20,0.92), rgba(20,20,20,0.95)), url(${movieSeriesDetails.msPoster})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
            <div className="container">
                <div className="row align-items-start">
                    <div className="col-md-4 text-center">
                        <div className="poster-card mx-auto">
                            <img src={movieSeriesDetails.msPoster} className="img-fluid card-details-img" alt={movieSeriesDetails.msName} />
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
                                movieSeriesDetails.msStatus && (
                                    <div className="col-6 col-md-4">
                                        <h6 className="fw-bold mb-1">
                                            Status
                                        </h6>
                                        <p className="text-capitalize text-light-emphasis mb-0">
                                            {movieSeriesDetails.msStatus}
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
                                    Added At
                                </h6>
                                <p className="text-primary mb-0">
                                    {moment(movieSeriesDetails.msAddedAt).format("DD/MM/YYYY | hh:mm A").toLocaleString("en-US", { timeZone: "Asia/Calcutta", hour12: true, hour: "numeric", minute: "numeric" })}
                                </p>
                            </div>
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
                            <div className="col-6 col-md-4">
                                <h6 className="fw-bold mb-1">
                                    Watched At
                                </h6>
                                <p className="text-primary mb-0">
                                    {
                                        movieSeriesDetails.msWatchedAt === null ? <span className="text-muted">Not watched yet</span> : <span className="text-success">{moment(movieSeriesDetails.msWatchedAt).format("DD/MM/YYYY | hh:mm A").toLocaleString("en-US", { timeZone: "Asia/Calcutta", hour12: true, hour: "numeric", minute: "numeric" })}</span>
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailCard;