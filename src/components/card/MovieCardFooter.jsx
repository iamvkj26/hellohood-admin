import { useAuth } from "../../context/AuthContext";

const MovieCardFooter = ({ movie, onWatched }) => {

    const { role } = useAuth();

    return (
        <div className="card-footer d-flex justify-content-end align-items-end ">
            {(role === "dev" || role === "admin") ?
                <div className="form-check mt-1 mb-1">
                    <input className="form-check-input" type="checkbox" checked={movie.msWatched} onChange={onWatched} />
                    <label className="form-check-label text-secondary small">
                        {movie.msWatched ? "Watched" : "Mark as Watched"}
                    </label>
                </div> : <div></div>
            }
        </div>
    );
};

export default MovieCardFooter;