import api from "./api";
import retryRequest from "./retryRequest";

const extractErrorMessage = (error) => error.response?.data?.message || error.message || "Something went wrong";

export const login = async (credentials) => {
    try {
        return await api.post("/auth/login", credentials);
    } catch (error) {
        console.error(error.message);
        throw new Error(extractErrorMessage(error));
    };
};

export const postMovieSeries = async (addData) => {
    try {
        return await api.post("/admin/post", addData);
    } catch (error) {
        console.error(error.message);
        throw new Error(extractErrorMessage(error));
    };
};

export const getMovieSeries = async (filters = {}) => {

    const { s = "" } = filters;

    try {
        const query = new URLSearchParams();
        if (s) query.append("search", s);

        const response = await retryRequest(() => api.get(`/admin/get?${query.toString()}`));
        return response.data;
    } catch (error) {
        console.error(error.message);
        throw new Error(extractErrorMessage(error));
    };
};

export const updateMovieSeries = async (_id, msName, msAbout, msPoster, msLink, msSeason, msFormat, msIndustry, msReleaseDate, msGenre, msRating) => {
    try {
        return await api.patch(`/admin/update/${_id}`, { msName, msAbout, msPoster, msLink, msSeason, msFormat, msIndustry, msReleaseDate, msGenre, msRating });
    } catch (error) {
        console.error(error.message);
        throw new Error(extractErrorMessage(error));
    };
};

export const deleteMovieSeries = async (id) => {
    try {
        return await api.delete(`/admin/delete/${id}`);
    } catch (error) {
        console.error(error.message);
        throw new Error(extractErrorMessage(error));
    };
};

export const watchedMovieSeries = async (id) => {
    try {
        return await api.patch(`/admin/watched/${id}`);
    } catch (error) {
        console.error(error.message);
        throw new Error(extractErrorMessage(error));
    };
};

export const getContact = async () => {
    try {
        const response = await retryRequest(() => api.get("/query/get"));
        return response.data;
    } catch (error) {
        console.error(error.message);
        throw new Error(extractErrorMessage(error));
    };
};

export const updateContact = async (id, status) => {
    try {
        return await api.patch(`/query/update/${id}/${status}`);
    } catch (error) {
        console.error(error.message);
        throw new Error(extractErrorMessage(error));
    };
};

export const deleteContact = async (id) => {
    try {
        return await api.delete(`/query/delete/${id}`);
    } catch (error) {
        console.error(error.message);
        throw new Error(extractErrorMessage(error));
    };
};