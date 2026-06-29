import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { getFranchises, addFranchise, updateFranchise, deleteFranchise } from "../api/services/franchise.service";

const useFranchise = () => {

    const [franchises, setFranchises] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleGetFranchise = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getFranchises();
            setFranchises(response.data);
        } finally {
            setLoading(false);
        };
    }, []);

    const handleAddFranchise = async (data) => {
        try {
            const response = await addFranchise(data);
            toast.success(response.data.message);
            await handleGetFranchise();
        } catch (error) {
            toast.error(error.message);
        };
    };

    const handleUpdateFranchise = async (id, data) => {
        try {
            const response = await updateFranchise(id, data);
            toast.success(response.data.message);
            await handleGetFranchise();
        } catch (error) {
            toast.error(error.message);
        };
    };

    const handleDeleteFranchise = async (id) => {
        try {
            const response = await deleteFranchise(id);
            toast.success(response.data.message);
            await handleGetFranchise();
        } catch (error) {
            toast.error(error.message);
        };
    };

    return { franchises, loading, handleGetFranchise, handleAddFranchise, handleUpdateFranchise, handleDeleteFranchise, };
};

export default useFranchise;