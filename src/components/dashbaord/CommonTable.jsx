import moment from "moment";

const CommonTable = ({ columns = [], data = [], pagination, setPage, text }) => {

    if (!data.length) return <p className="text-center mt-3">{text}</p>;

    return (
        <>
            <div className="table-responsive custom-scroll">
                <table className="table table-striped align-middle mb-0">
                    <thead>
                        <tr>
                            {columns.map((col, index) => (<th key={index}>{col.header}</th>))}
                        </tr>
                    </thead>
                    <tbody style={{ "--bs-table-bg": "#141414" }}>
                        {data?.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((col, colIndex) => {
                                    let value = row[col.accessor];
                                    if (col.type === "date" && value) {
                                        value = moment(value).format("DD/MM/YYYY | hh:mm A").toLocaleString("en-US", { timeZone: "Asia/Calcutta", hour12: true, hour: "numeric", minute: "numeric" });
                                    };
                                    return (
                                        <td key={colIndex} className="text-nowrap text-capitalize">
                                            {col.render ? col.render(value, row) : value || "-"}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {pagination && (
                <div className="d-flex justify-content-center align-items-center mt-3">
                    <div className="card-footer bg-141414">
                        <div className="pagination">
                            <div className="page-item">
                                <button className="page-link" disabled={pagination?.page === 1} onClick={() => setPage(1)}>
                                    1
                                </button>
                            </div>
                            <div className="page-item">
                                <button className="page-link" disabled={pagination?.page === 1} onClick={() => setPage(pagination.page - 1)}>
                                    &laquo; Previous
                                </button>
                            </div>
                            <div className="page-item">
                                <div className="page-link">
                                    {pagination?.page} of {pagination?.totalPages}
                                </div>
                            </div>
                            <div className="page-item">
                                <button className="page-link" disabled={pagination?.page === pagination?.totalPages} onClick={() => setPage(pagination.page + 1)}>
                                    Next &raquo;
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </>
    );
};

export default CommonTable;