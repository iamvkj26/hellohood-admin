import client from "../client";
import retryRequest from "../utils/retryRequest";
import { extractErrorMessage } from "../utils/errorHandler";

export const getContacts = async () => {
    try {
        const response = await retryRequest(() => client.get("/query/get"));
        return response.data;
    } catch (error) {
        throw new Error(extractErrorMessage(error));
    };
};

export const updateContact = async (id, status) => {
    try {
        return await client.patch(`/query/update/${id}/${status}`);
    } catch (error) {
        throw new Error(extractErrorMessage(error));
    };
};

export const deleteContact = async (id) => {
    try {
        return await client.delete(`/query/delete/${id}`);
    } catch (error) {
        throw new Error(extractErrorMessage(error));
    };
};