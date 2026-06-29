import { useEffect } from "react";
import useLogs from "../hooks/useLogs";
import usePageTitle from "../hooks/usePageTitle";
import AllTable from "../components/AllTable";
import log from "../constants/log";

const Logs = () => {

    const { logs, loading, search, setSearch, page, setPage, limit, setLimit, total, totalPages, handleGetLogs } = useLogs();

    usePageTitle("Logs");

    useEffect(() => {
        handleGetLogs();
        // eslint-disable-next-line
    }, [page, limit, search]);

    if (!logs && loading) return <p className="text-center my-3">Loading…</p>;

    return (
        <div className="container mt-3 mb-3">
            <div className="row">
                <div className="col-md-12">
                    <h3 className="page-title">Logs!</h3>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <span className="breadcrumb">Dashboard</span>
                        </li>
                        <li className="breadcrumb-item">
                            <span className="breadcrumb-active">Logs</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-md-2">
                    <input type="text" className="form-control py-3" placeholder="Search by name..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
                </div>
                <div className="col-md-2">
                    <select className="form-select py-3" value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <AllTable columns={log} data={logs} pagination={{ page, totalPages, total, limit }} setPage={setPage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Logs;