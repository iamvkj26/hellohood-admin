import { useState, useRef } from "react";
import toast from "react-hot-toast";
import useMovieSeries from "../../hooks/useMovieSeries";
import MovieCardList from "./MovieCardList";
import EditMovieSeries from "../../pages/EditMovieSeries";

const Card = ({ movieSeries }) => {

    const { handleDeleteMovieSeries, handleWatchedMovieSeries } = useMovieSeries();

    const [movieList, setMovieList] = useState(movieSeries);

    const [editMovieSeries, setEditMoviSeries] = useState({ msName: "", msAbout: "", msPoster: "", msLink: "", msFormat: "", msIndustry: "", msCast: [], msGenre: [], msRating: "", msReleaseDate: "", sStatus: "", sTSeasons: "" });

    const [deleteMoviSeries, setDeleteMoviSeries] = useState(null);

    const refOpenCanvas = useRef(null);

    const updateMovieSeries = (currentMovieSeies) => {
        setEditMoviSeries(currentMovieSeies);
        refOpenCanvas.current.click();
    };

    const handleUpdateSuccess = (updatedItem) => {
        setMovieList((prev) => prev.map((item) => item._id === updatedItem._id ? updatedItem : item));
    };

    const handleDeleteSuccess = async (id) => {
        try {
            await handleDeleteMovieSeries(id);
            setMovieList((prev) => prev.filter((item) => item._id !== id));
        } catch (error) {
            toast.error(error);
        };
    };

    const handleWatchedSuccess = async (id) => {
        try {
            const updatedItem = await handleWatchedMovieSeries(id);
            setMovieList((prev) => prev.map((item) => item._id === id ? updatedItem : item));
        } catch (error) {
            toast.error(error);
        };
    };

    return (
        <>
            <div className="container mb-3">
                <MovieCardList
                    movieSeries={movieList}
                    deleteId={deleteMoviSeries}
                    onDelete={setDeleteMoviSeries}
                    confirmDelete={handleDeleteSuccess}
                    cancelDelete={() => setDeleteMoviSeries(null)}
                    onWatched={handleWatchedSuccess}
                    onEdit={updateMovieSeries}
                />
            </div>
            <EditMovieSeries
                refOpenCanvas={refOpenCanvas}
                editMovieSeries={editMovieSeries}
                onUpdateSuccess={handleUpdateSuccess}
            />
        </>
    );
};

export default Card;