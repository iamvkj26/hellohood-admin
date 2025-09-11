import MovieCard from "./MovieCard";

const MovieCardList = ({ movieSeries = [], onEdit, onDelete, deleteId, confirmDelete, cancelDelete, onWatched }) => {

    return (
        <>
            {
                movieSeries.length > 0 ? (
                    <div className="row">
                        {
                            movieSeries.map(movie => (
                                <MovieCard
                                    movie={movie}
                                    key={movie._id}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    deleteId={deleteId}
                                    confirmDelete={confirmDelete}
                                    cancelDelete={cancelDelete}
                                    onWatched={onWatched}
                                />
                            ))}
                    </div>
                ) : (
                    <div className="text-center mt-5">
                        <h5 className="text-muted">🎬 No Movie/Series Found</h5>
                    </div>
                )}
        </>
    );
};

export default MovieCardList;