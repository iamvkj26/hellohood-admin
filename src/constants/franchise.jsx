import Avatar from "react-avatar";

const franchise = (handleEdit, handleDeleteFranchise) => [
    { header: "", accessor: "name", render: (value) => (<Avatar round={true} size="30" name={value} />) },
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
    { header: "Created At", accessor: "createdAt", type: "date", render: (value) => <span className="badge text-success">{value}</span> },
    { header: "Updated At", accessor: "updatedAt", type: "date", render: (value) => <span className="badge text-danger">{value}</span> },
    {
        header: "Action", render: (_, row) => (
            <div className="d-flex gap-3">
                <i className="fa-solid fa-edit text-primary cp" title="Edit the franchise" onClick={() => handleEdit(row)} />
                <i className="fa-solid fa-trash text-danger cp" title="Delete the franchise" onClick={() => handleDeleteFranchise(row._id)} />
            </div>
        )
    }
];

export default franchise;