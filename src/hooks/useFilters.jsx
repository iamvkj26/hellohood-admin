import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const defaultFilters = { s: "" };

const useFilters = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [filters, setFilters] = useState(defaultFilters);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setFilters({
            s: params.get("s") || ""
        });
        setReady(true);
    }, [location.search]);

    useEffect(() => {
        if (!filters) return;

        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value && key) params.set(key, value);
        });

        navigate({ search: params.toString() }, { replace: true });
    }, [filters, navigate]);

    const updateFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

    const resetFilters = () => setFilters({ ...defaultFilters });

    return { filters, ready, updateFilter, resetFilters };
};

export default useFilters;