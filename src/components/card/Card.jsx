import { useState, useRef } from "react";
import useMovieSeries from "../../hooks/useMovieSeries";
import MovieCardList from "./MovieCardList";
import EditMovieSeries from "../../pages/EditMovieSeries";

const Card = ({ movieSeries }) => {

    const { handleDeleteMovieSeries, handleWatchedMovieSeries } = useMovieSeries();

    const [editMovieSeries, setEditMoviSeries] = useState({ msName: "", msAbout: "", msPoster: "", msLink: "", msSeason: "", msFormat: "", msIndustry: "", msReleaseDate: "", msGenre: [], msRating: "" });
    const [deleteMoviSeries, setDeleteMoviSeries] = useState(null);

    const refOpenCanvas = useRef(null);

    const updateMovieSeries = (currentMovieSeies) => {
        setEditMoviSeries({ _id: currentMovieSeies._id, msName: currentMovieSeies.msName, msAbout: currentMovieSeies.msAbout, msPoster: currentMovieSeies.msPoster, msLink: currentMovieSeies.msLink, msSeason: currentMovieSeies.msSeason, msFormat: currentMovieSeies.msFormat, msIndustry: currentMovieSeies.msIndustry, msReleaseDate: currentMovieSeies.msReleaseDate, msGenre: currentMovieSeies.msGenre, msRating: currentMovieSeies.msRating });
        refOpenCanvas.current.click();
    };

    return (
        <>
            <div className="container mt-5 mb-5">
                <MovieCardList
                    movieSeries={movieSeries}
                    deleteId={deleteMoviSeries}
                    onDelete={setDeleteMoviSeries}
                    confirmDelete={handleDeleteMovieSeries}
                    cancelDelete={() => setDeleteMoviSeries(null)}
                    onWatched={handleWatchedMovieSeries}
                    onEdit={updateMovieSeries}
                />
            </div>
            <EditMovieSeries
                refOpenCanvas={refOpenCanvas}
                editMovieSeries={editMovieSeries}
            />
        </>
    );
};

export default Card;