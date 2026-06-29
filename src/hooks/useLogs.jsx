import { useState, useCallback } from "react";
import { getLogs } from "../api/services/log.service";

const useLogs = () => {

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const handleGetLogs = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getLogs(page, limit, search);
            setLogs(response.data);
            setTotal(response.total);
            setTotalPages(response.totalPages);
        } finally {
            setLoading(false);
        };
    }, [page, limit, search]);

    return { logs, loading, search, setSearch, page, setPage, limit, setLimit, total, totalPages, handleGetLogs };
};

export default useLogs;