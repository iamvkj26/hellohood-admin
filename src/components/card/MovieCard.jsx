import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utils/formatDate";
import MovieCardFooter from "./MovieCardFooter";

const MovieCard = ({ movie, onEdit, onDelete, deleteId, confirmDelete, cancelDelete, onWatched }) => {

    const { role } = useAuth();

    return (
        <>
            <div className="col-md-3 mt-3">
                <div className="card position-relative">
                    <span className="position-absolute top-n10 end-0 badge rounded-pill bg-warning text-black">
                        <i className="fa-solid fa-star"></i> {movie.msRating}
                    </span>
                    <Link to={`/details/${movie.hashedId}`} rel="noopener noreferrer">
                        <img src={movie.msPoster} className="card-img" alt="poster" />
                    </Link>
                    <div className="ms-details-overlay card-body">
                        <h5 className="card-title fw-medium">
                            <strong>{movie.msName}</strong>
                        </h5>
                        <p className="card-text small">
                            <i className="text-danger">{formatDate(movie.msReleaseDate)}</i>
                        </p>
                        <p className="card-text small clamp-text" title={movie.msAbout}>
                            {movie.msAbout?.slice(0, 105)}...
                        </p>
                    </div>
                    {
                        (role === "dev" || role === "admin") ? <MovieCardFooter
                            movie={movie}
                            deleteId={deleteId}
                            onEdit={onEdit}
                            confirmDelete={confirmDelete}
                            cancelDelete={cancelDelete}
                            requestDelete={() => onDelete(movie._id)}
                            onWatched={() => onWatched(movie._id)}
                        /> : <div></div>
                    }
                </div>
            </div>
        </>
    );
};

export default MovieCard;