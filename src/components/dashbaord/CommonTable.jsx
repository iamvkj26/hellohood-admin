import moment from "moment";

const CommonTable = ({ columns = [], data = [], text }) => {

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
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((col, colIndex) => {
                                    let value = row[col.accessor];
                                    if (col.type === "date" && value) {
                                        value = moment(value).format("DD-MMM-YYYY");
                                    };
                                    return (
                                        <td key={colIndex} className="text-nowrap">
                                            {col.render ? col.render(value, row) : value || "-"}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CommonTable;