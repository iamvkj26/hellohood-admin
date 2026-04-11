import { useState } from "react";
import { toast } from "react-hot-toast";
import { createMovieSeries } from "../api/services/movie.service";
import useMovieSeriesForm from "../hooks/useMovieSeriesForm";
import usePageTitle from "../hooks/usePageTitle";
import MovieSeriesForm from "../components/shared/MovieSeriesForm";

const initialState = { msName: "", msAbout: "", msPoster: "", msLink: "", msSeason: "", msFormat: "", msIndustry: "", msReleaseDate: "", msGenre: [], msRating: "" };

const AddMovieSeries = () => {

    const { formData, onChange, resetForm } = useMovieSeriesForm(initialState);
    const [loading, setLoading] = useState(false);

    const handleAddMovieSeries = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await createMovieSeries(formData);
            if (response.status === 201) {
                toast.success(response.data.message);
                setLoading(false);
                resetForm();
            };
        } catch (error) {
            if (error.status === 400) toast.error("Server busy. Try again later.");
            else if (error.status === 409) toast.error(`The '${formData.msName}' already exists.`);
            else toast.error(error.message);
        } finally {
            setLoading(false);
        };
    };

    usePageTitle("Add Movie, Web Series");

    return (
        <>
            <div className="container mt-5 mb-5">
                <div className="card p-3">
                    <div className="card-body text-center">
                        <h2 className="bg-dark-subtle text-dark-emphasis">Add Movie/Series</h2><hr />
                    </div>
                    <MovieSeriesForm movieData={formData} onChange={onChange} onSubmit={handleAddMovieSeries} loading={loading} />
                </div >
            </div >
        </>
    );
};

export default AddMovieSeries;