import client from "../client";
import retryRequest from "../utils/retryRequest";
import { extractErrorMessage } from "../utils/errorHandler";

export const getFranchises = async () => {
    try {
        const response = await retryRequest(() => client.get("/franchise/get"));
        return response.data;
    } catch (error) {
        throw new Error(extractErrorMessage(error));
    };
};

export const addFranchise = async (data) => {
    try {
        return await retryRequest(() => client.post("/franchise/post", data));
    } catch (error) {
        throw new Error(extractErrorMessage(error));
    };
};

export const updateFranchise = async (id, data) => {
    try {
        return await retryRequest(() => client.patch(`/franchise/update/${id}`, data));
    } catch (error) {
        throw new Error(extractErrorMessage(error));
    };
};

export const deleteFranchise = async (id) => {
    try {
        return await retryRequest(() => client.delete(`/franchise/delete/${id}`));
    } catch (error) {
        throw new Error(extractErrorMessage(error));
    };
};