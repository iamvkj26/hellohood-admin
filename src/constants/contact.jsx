import Avatar from "react-avatar";

const contact = (handleUpdateContact, handleDeleteContact) => [
    { header: "", accessor: "name", render: (value) => (<div className="d-flex align-items-center gap-3"><Avatar round={true} size="30" name={value} /></div>) },
    { header: "Name", accessor: "name" },
    { header: "Message", accessor: "message" },
    { header: "Status", accessor: "status", render: (value) => (<span className={`badge ${value?.toLowerCase() === "resolved" ? "text-bg-success" : "text-bg-danger"}`}>{value}</span>) },
    { header: "Created At", accessor: "createdAt", type: "date", render: (value) => <span className="badge text-success">{value}</span> },
    { header: "Updated At", accessor: "updatedAt", type: "date", render: (value) => <span className="badge text-danger">{value}</span> },
    {
        header: "Action", render: (_, row) =>
            <div className="d-flex gap-3">
                {row.status === "pending" ? (<i className="fas fa-sync-alt text-info cp" title="Mark as Resolved" onClick={() => handleUpdateContact(row._id, "resolved")}></i>) : ("")}
                <i className="fa-solid fa-trash text-danger cp" title="Delete the query" onClick={() => handleDeleteContact(row._id)} />
            </div>
    }
];

export default contact;