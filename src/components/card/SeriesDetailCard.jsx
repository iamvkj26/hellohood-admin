import { useState } from "react";
import moment from "moment";
import { formatDate } from "../../utils/formatDate";

const SeriesDetailCard = ({ seasons = [] }) => {

    const latestSeason = seasons[seasons?.length - 1];
    const [showAllSeasons, setShowAllSeasons] = useState(false);

    return (
        <>
            <div className="container mt-3">
                <h4 className="fw-bold">Current Season</h4>
                <div className="card shadow-sm">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="bg-141414 py-3 px-3 rounded">
                                <div className="d-flex gap-3">
                                    <div>
                                        {
                                            latestSeason?.sPoster ? (
                                                <img
                                                    src={latestSeason?.sPoster}
                                                    alt={`Season ${latestSeason?.sNumber}`}
                                                    className="current-season-image"
                                                />
                                            ) : (
                                                <div className="current-season-placeholder">
                                                    No Poster
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="flex-grow-1">
                                        <h4 className="fw-bold">
                                            Season {latestSeason?.sNumber}
                                        </h4>
                                        <div className="d-flex gap-2 flex-wrap mb-2">
                                            {
                                                latestSeason?.sReleaseDate && (
                                                    <span className="fw-semibold">
                                                        {new Date(latestSeason?.sReleaseDate).getFullYear()}
                                                    </span>
                                                )
                                            }
                                            {
                                                latestSeason?.sEpisodeCount && (
                                                    <span className="fw-semibold">
                                                        • {latestSeason?.sEpisodeCount} Episodes
                                                    </span>
                                                )
                                            }
                                        </div>
                                        {
                                            latestSeason?.sAbout ? (
                                                <p className="text-muted small mb-2">
                                                    {latestSeason?.sAbout.slice(0, 220)}...
                                                </p>
                                            ) : (
                                                <p className="text-muted small">
                                                    No Description
                                                </p>
                                            )
                                        }
                                        <div className="d-flex gap-3 flex-wrap small">
                                            {
                                                latestSeason?.sReleaseDate && (
                                                    <span>
                                                        <i className="fa-regular fa-calendar"></i> {moment(latestSeason.sReleaseDate).format("DD/MM/YYYY | hh:mm A").toLocaleString("en-US", { timeZone: "Asia/Calcutta", hour12: true, hour: "numeric", minute: "numeric" })} <span className="badge bg-dark">Season Finale</span>
                                                    </span>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h6 className="fw-bold mt-2 mb-3 cp" onClick={() => setShowAllSeasons(!showAllSeasons)}><u>{showAllSeasons ? "Hide All Seasons" : "View All Seasons"}</u></h6>
                {
                    showAllSeasons && seasons.map((season, index) => (
                        <div key={season._id || index} className="card shadow-sm mb-3">
                            <div className="row">
                                <div className="col-md-2 d-flex justify-content-center align-items-center text-center">
                                    {
                                        season.sPoster ? (
                                            <img
                                                src={season.sPoster}
                                                alt={`Season ${season.sNumber}`}
                                                className="season-poster"
                                            />
                                        ) : (
                                            <div className="season-poster-placeholder">
                                                No Poster
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="col-md-10">
                                    <h4 className="fw-bold mt-2 mb-2">Season {season.sNumber}</h4>
                                    <div className="d-flex gap-2 align-items-center mb-3 flex-wrap">
                                        {
                                            season.sReleaseDate && (
                                                <span className="fw-semibold">
                                                    {new Date(season.sReleaseDate).getFullYear()}
                                                </span>
                                            )
                                        }
                                        {
                                            season.sEpisodeCount && (
                                                <span className="fw-semibold">
                                                    • {season.sEpisodeCount} Episodes
                                                </span>
                                            )
                                        }
                                        {
                                            season.sStatus && (
                                                <span className={`text-capitalize badge ${season.sStatus === "released" ? "bg-light text-dark" : "bg-dark"}`}>
                                                    • {season.sStatus}
                                                </span>
                                            )
                                        }
                                    </div>
                                    {
                                        season.sReleaseDate && (
                                            <p className="mb-3">
                                                Season {season.sNumber} premiered on{" "}
                                                <strong>
                                                    {formatDate(season.sReleaseDate)}
                                                </strong>
                                            </p>
                                        )
                                    }
                                    {
                                        season.sAbout ? (
                                            <p className="fs-6 mb-2">
                                                {season.sAbout}
                                            </p>
                                        ) : (
                                            <p className="text-muted mb-2">
                                                No Description
                                            </p>
                                        )
                                    }
                                    <hr />
                                    <div className="d-flex align-items-center justify-content-end flex-wrap gap-2 px-2 small text-muted mb-3">
                                        {
                                            season.sAddedAt && (
                                                <span className="badge text-primary">
                                                    <strong>Added:</strong>{" "}
                                                    {moment(season.sAddedAt).format("DD/MM/YYYY | hh:mm A").toLocaleString("en-US", { timeZone: "Asia/Calcutta", hour12: true, hour: "numeric", minute: "numeric" })}
                                                </span>
                                            )
                                        }
                                        <span className="badge">
                                            <strong>Watched:</strong>{" "}
                                            {
                                                season.sWatched ? (
                                                    <span className="text-success">
                                                        Yes
                                                    </span>
                                                ) : (
                                                    <span className="text-danger">
                                                        No
                                                    </span>
                                                )
                                            }
                                        </span>
                                        {
                                            season.sWatchedAt && (
                                                <span className="badge text-info">
                                                    <strong>Watched At:</strong>{" "}
                                                    {moment(season.sWatchedAt).format("DD/MM/YYYY | hh:mm A").toLocaleString("en-US", { timeZone: "Asia/Calcutta", hour12: true, hour: "numeric", minute: "numeric" })}
                                                </span>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default SeriesDetailCard;