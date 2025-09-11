import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utils/formatDate";
import GenreBadge from "../shared/GenreBadge";
import MovieCardActions from "./MovieCardActions";
import MovieCardFooter from "./MovieCardFooter";

const MovieCard = ({ movie, onEdit, onDelete, deleteId, confirmDelete, cancelDelete, onWatched }) => {

    const { role } = useAuth();

    return (
        <>
            <div className="col-md-3 mt-3">
                <div className="card position-relative cp">
                    <span className="position-absolute top-n10 end-0 badge rounded-pill bg-warning text-black">
                        <i className="fa-solid fa-star"></i> {movie.msRating}
                    </span>
                    <Link to={movie.msLink} target="_blank" rel="noopener noreferrer">
                        <img src={movie.msPoster} className="card-img" alt="poster" />
                    </Link>
                    <div className="ms-details-overlay card-body">
                        <h5 className="card-title fw-medium">
                            <strong>
                                {movie.msName}{movie.msSeason === "0" ? "" : ` - (Season ${movie.msSeason})`}
                            </strong>
                        </h5>
                        <p className="card-text small clamp-text" title={movie.msAbout}>
                            {movie.msAbout?.slice(0, 105)}...
                        </p>
                        <p className="card-text small">
                            <strong>Release Date:</strong>{" "}
                            <i className="text-danger">{formatDate(movie.msReleaseDate)}</i>
                        </p>
                        <p className="card-text small"><strong>F/I:</strong> {movie.msFormat}/{movie.msIndustry}</p>
                        <GenreBadge genres={movie.msGenre} />
                    </div>
                    {
                        role === "dev" ?
                            <MovieCardActions
                                movie={movie}
                                deleteId={deleteId}
                                onEdit={onEdit}
                                confirmDelete={confirmDelete}
                                cancelDelete={cancelDelete}
                                requestDelete={() => onDelete(movie._id)}
                            />
                            : <div></div>
                    }
                    <MovieCardFooter
                        movie={movie}
                        onWatched={() => onWatched(movie._id)}
                    />
                </div>
            </div>
        </>
    );
};

export default MovieCard;