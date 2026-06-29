import client from "../client";
import retryRequest from "../utils/retryRequest";
import { extractErrorMessage } from "../utils/errorHandler";

export const getMovieSeries = async (filters = {}) => {

    const { s = "" } = filters;

    try {
        const query = new URLSearchParams();
        if (s) query.append("search", s);

        const response = await retryRequest(() => client.get(`/movieseries/get?${query.toString()}`));
        return response.data;
    } catch (error) {
        console.error(error.message);
        throw new Error(extractErrorMessage(error));
    };
};

export const getMovieSeriesDetails = async (id) => {
    try {
        const response = await client.get(`/movieseries/details/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(extractErrorMessage(error));
    };
};

export const createMovieSeries = async (addData) => {
    try {
        return await client.post("/movieseries/post", addData);
    } catch (error) {
        throw new Error(extractErrorMessage(error));
    };
};

export const updateMovieSeries = async (_id, tmdbId, msName, msAbout, msPoster, msLink, msFormat, msIndustry, msGenre, msRating, msReleaseDate, msStatus) => {
    try {
        return await client.patch(`/movieseries/update/${_id}`, { tmdbId, msName, msAbout, msPoster, msLink, msFormat, msIndustry, msGenre, msRating, msReleaseDate, msStatus });
    } catch (error) {
        console.error(error.message);
        throw new Error(extractErrorMessage(error));
    };
};

export const deleteMovieSeries = async (id) => {
    try {
        return await client.delete(`/movieseries/delete/${id}`);
    } catch (error) {
        throw new Error(extractErrorMessage(error));
    };
};

export const watchedMovieSeries = async (id) => {
    try {
        return await client.patch(`/movieseries/watched/${id}`);
    } catch (error) {
        throw new Error(extractErrorMessage(error));
    };
};