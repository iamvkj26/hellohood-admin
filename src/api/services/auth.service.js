import client from "../client";
import { extractErrorMessage } from "../utils/errorHandler";

export const login = async (credentials) => {
    try {
        return await client.post("/auth/login", credentials);
    } catch (error) {
        throw new Error(extractErrorMessage(error));
    };
};