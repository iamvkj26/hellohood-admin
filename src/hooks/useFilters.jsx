import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const defaultFilters = { s: "", range: "", startDate: "", endDate: "", page: 1 };

const useFilters = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [filters, setFilters] = useState(defaultFilters);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setFilters({
            s: params.get("s") || "",
            range: params.get("range") || "",
            startDate: params.get("startDate") || "",
            endDate: params.get("endDate") || "",
            page: Number(params.get("page")) || 1
        });
        setReady(true);
    }, [location.search]);

    useEffect(() => {
        if (!filters) return;
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (key === "page" && Number(value) === 1) return;
            if (value !== "" && value !== null && value !== undefined) params.set(key, value);
        });
        navigate({ search: params.toString() }, { replace: true });
    }, [filters, navigate]);

    const updateFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

    const resetFilters = () => setFilters({ ...defaultFilters });

    return { filters, ready, updateFilter, resetFilters };
};

export default useFilters;