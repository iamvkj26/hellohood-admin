import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { updateMovieSeries } from "../api/movieseries";
import useMovieForm from "../hooks/useMovieForm";
import MovieSeriesForm from "../components/shared/MovieSeriesForm";

const EditMovieSeries = ({ refOpenCanvas, editMovieSeries }) => {

    const { formData, setFormData, onChange } = useMovieForm(editMovieSeries);

    const [loading, setLoading] = useState(false);
    const refCloseCanvas = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (editMovieSeries) {
            setFormData(editMovieSeries);
        };
    }, [editMovieSeries, setFormData]);

    const handleUpdateMovieSeries = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await updateMovieSeries(formData._id, formData.msName, formData.msAbout, formData.msPoster, formData.msLink, formData.msSeason, formData.msFormat, formData.msIndustry, formData.msReleaseDate, formData.msGenre, formData.msRating, formData.msUploadedBy);
            if (response.status === 200) {
                toast.success(response.data.message);
                setLoading(false);
                refCloseCanvas.current.click();
                navigate("/");
            };
        } catch (error) {
            if (error.status === 400) toast.error("Server cannot process request right now, try again after sometimes.");
            else if (error.status === 409) toast.error(`The '${formData.emsName}' already exists.`);
            else toast.error(error.message);

        } finally {
            setLoading(false);
        };
    };

    if (!editMovieSeries) return null;

    return (
        <>
            <button ref={refOpenCanvas} className="d-none" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop"></button>

            <div className="offcanvas offcanvas-end" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="staticBackdropLabel">Update Movie/Series</h5>
                    <button ref={refCloseCanvas} className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <MovieSeriesForm
                        movieData={formData}
                        onChange={onChange}
                        onSubmit={handleUpdateMovieSeries}
                        loading={loading}
                        isEdit
                    />
                </div>
            </div>
        </>
    );
};

export default EditMovieSeries;