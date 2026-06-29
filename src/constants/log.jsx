import Avatar from "react-avatar";

const log = [
    { header: "", accessor: "name", render: (value) => (<div className="d-flex align-items-center gap-3"><Avatar round={true} size="30" name={value} /></div>) },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Mobile", accessor: "mobile" },
    { header: "Role", accessor: "role", render: (value) => <span className="badge text-warning">{value} </span> },
    { header: "Status", accessor: "status", render: (value) => (<span className={`badge ${value?.toLowerCase() === "success" ? "text-bg-success" : "text-bg-danger"}`}>{value}</span>) },
    { header: "IP", accessor: "ip", render: (value) => <span className="badge text-info">{value} </span> },
    { header: "Browser", accessor: "browser" },
    { header: "OS", accessor: "os" },
    { header: "Login At", accessor: "loginAt", type: "date", render: (value) => <span className="badge text-success">{value}</span> },
    { header: "Logout At", accessor: "logoutAt", type: "date", render: (value) => <span className="badge text-danger">{value}</span> }
];

export default log;