import client from "../client";
import retryRequest from "../utils/retryRequest";
import { extractErrorMessage } from "../utils/errorHandler";

export const getMovieSeries = async (filters = {}) => {

    const { s = "" } = filters;

    try {
        const query = new URLSearchParams();
        if (s) query.append("search", s);

        const response = await retryRequest(() => client.get(`/admin/get?${query.toString()}`));
        return response.data;
    } catch (error) {
        console.error(error.message);
        throw new Error(extractErrorMessage(error));
    };
};

export const createMovieSeries = async (addData) => {
    try {
        return await client.post("/admin/post", addData);
    } catch (error) {
        throw new Error(extractErrorMessage(error));
    };
};

export const updateMovieSeries = async (_id, msName, msAbout, msPoster, msLink, msFormat, msIndustry, msCast, msGenre, msRating, msReleaseDate, sStatus, sSeasons) => {
    try {
        return await client.patch(`/admin/update/${_id}`, { msName, msAbout, msPoster, msLink, msFormat, msIndustry, msCast, msGenre, msRating, msReleaseDate, sStatus, sSeasons });
    } catch (error) {
        console.error(error.message);
        throw new Error(extractErrorMessage(error));
    };
};

export const deleteMovieSeries = async (id) => {
    try {
        return await client.delete(`/admin/delete/${id}`);
    } catch (error) {
        throw new Error(extractErrorMessage(error));
    };
};

export const watchedMovieSeries = async (id) => {
    try {
        return await client.patch(`/admin/watched/${id}`);
    } catch (error) {
        throw new Error(extractErrorMessage(error));
    };
};