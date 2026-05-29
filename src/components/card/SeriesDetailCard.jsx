import moment from "moment";
import { formatDate } from "../../utils/formatDate";

const SeriesDetailCard = ({ seasons = [] }) => {
    return (
        <>
            <div className="container mt-3">
                <h4 className="mt-3">All Season</h4>
                {
                    seasons.map((season, index) => (
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
                                    <hr className="border-secondary opacity-75" />
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