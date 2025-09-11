import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { getMovieSeries, deleteMovieSeries, watchedMovieSeries } from "../api/movieseries";

const useMovieSeries = () => {

    const [movieSeries, setMovieSeries] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleGetMovieSeries = async (filters = {}) => {
        try {
            setLoading(true);
            const response = await getMovieSeries(filters);
            setMovieSeries(Array.isArray(response) ? response : response?.data ?? []);
        } catch (error) {
            toast.error(error.message || "Failed to fetch movie/series.");
        } finally {
            setLoading(false);
        };
    };

    const clearMovieSeries = () => {
        setMovieSeries([]);
    };

    const handleDeleteMovieSeries = async (id) => {
        try {
            const response = await deleteMovieSeries(id);
            if (response.status === 200) {
                toast.success(response.data.message);
                navigate("/");
            };
        } catch (error) {
            toast.error(error.message || "Error deleting movie/series");
        };
    };

    const handleWatchedMovieSeries = async (id) => {
        try {
            const response = await watchedMovieSeries(id);
            if (response.status === 200) {
                toast.success(response.data.message);
                navigate("/");
            };
        } catch (error) {
            toast.error(error.message || "Error updating watched status");
        };
    };

    return { movieSeries, loading, handleGetMovieSeries, clearMovieSeries, handleDeleteMovieSeries, handleWatchedMovieSeries };
};

export default useMovieSeries;