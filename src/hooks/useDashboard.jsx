import { useState, useCallback } from "react";
import { getDashboard } from "../api/services/dashboard.service";

const useDashboard = () => {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGetDashboard = useCallback(async (filters = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await getDashboard(filters);
            setDashboard({
                cards: response?.card || {},
                recentlyAddedStats: response?.recentlyAddedStats || {},
                watchedStats: response?.watchedStats || {},
                recentAddedAndWatched: response?.recentAddedAndWatched || { data: [], total: 0, page: 1, limit: 10, totalPages: 1 },
                industryStats: response?.industryStats || { data: {} },
                genreStats: response?.genreStats || { data: [] },
                ottStats: response?.ottStats || { data: [] },
                upcoming: response?.upcoming || {},
                filters: response?.filters || {}
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        };
    }, []);

    return { dashboard, loading, error, handleGetDashboard };
};

export default useDashboard;