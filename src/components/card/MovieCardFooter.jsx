const MovieCardFooter = ({ movie, onEdit, deleteId, requestDelete, confirmDelete, cancelDelete, onWatched }) => (
    <div className="card-footer">
        <div className="d-flex justify-content-end align-items-center px-2 mb-1">
            <div className="d-flex gap-2">
                <span className="badge text-141414">
                    <i className="fa-solid fa-pen-to-square cp" onClick={() => onEdit(movie)} title="Edit"></i>
                </span>
                {deleteId === movie._id ? (
                    <>
                        <span className="badge bg-warning text-dark cp">Confirm delete?</span>
                        <span className="badge bg-success"><i className="fa-solid fa-check cp" onClick={() => confirmDelete(movie._id)}></i></span>
                        <span className="badge bg-secondary"><i className="fa-solid fa-xmark cp" onClick={cancelDelete}></i></span>
                    </>
                ) : (
                    <span className="badge text-141414">
                        <i className="fa-solid fa-trash cp" onClick={requestDelete} title="Delete"></i>
                    </span>
                )}
                <span>
                    <input className="form-check-input cp" type="checkbox" checked={movie.msWatched} onChange={onWatched} title={movie.msWatched ? "Watched" : "Mark as Watched"} />
                </span>
            </div>
        </div>
    </div>
);

export default MovieCardFooter;