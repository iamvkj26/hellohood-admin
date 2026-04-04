export const extractErrorMessage = (error) => {
    return error.response?.data?.message || error.message || "Something went wrong";
};