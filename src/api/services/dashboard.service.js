import client from "../client";
import retryRequest from "../utils/retryRequest";
import { extractErrorMessage } from "../utils/errorHandler";

export const getDashboard = async (filters = {}) => {
    const { range, startDate, endDate } = filters;
    try {
        const query = new URLSearchParams();
        if (startDate && endDate ) {
            query.append("startDate", startDate);
            query.append("endDate", endDate);
        } else if (range) {
            query.append("range", range);
        };
        const response = await retryRequest(() => client.get(`/dashboard/dashboard?${query.toString()}`));
        return response.data;
    } catch (error) {
        console.error(error.message);
        throw new Error(extractErrorMessage(error));
    };
};