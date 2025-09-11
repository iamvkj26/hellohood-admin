import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utils/formatDate";

const MovieCardFooter = ({ movie, onWatched }) => {

    const { role } = useAuth();

    return (
        <div className="card-footer d-flex justify-content-between align-items-center">
            {(role === "dev" || role === "admin") ?
                <div className="form-check mt-1 mb-1">
                    <input className="form-check-input" type="checkbox" checked={movie.msWatched} onChange={onWatched} />
                    <label className="form-check-label text-secondary small" title={movie.msWatchedAt ? `Watched on: ${formatDate(movie.msWatchedAt)}` : ""}>
                        {movie.msWatched ? "Watched" : "Mark as Watched"}
                    </label>
                </div> : <div></div>
            }
            <div className="blockquote-footer mt-1 mb-1">{movie.msUploadedBy}</div>
        </div>
    );
};

export default MovieCardFooter;