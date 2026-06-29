import client from "../client";
import retryRequest from "../utils/retryRequest";
import { extractErrorMessage } from "../utils/errorHandler";

export const getLogs = async (page = 1, limit = 10, search = "") => {
    try {
        const response = await retryRequest(() => client.get("/log/user", { params: { page, limit, search } }));
        return response.data;
    } catch (error) {
        throw new Error(extractErrorMessage(error));
    };
};