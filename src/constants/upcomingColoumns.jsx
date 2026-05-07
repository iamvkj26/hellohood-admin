const upcomingColoumns = [
    { header: "Poster", accessor: "msPoster", render: (value) => (<img src={value || "/no-image.png"} alt="poster" className="table-poster" onError={(e) => (e.target.src = "/no-image.png")} />) },
    { header: "Name", accessor: "msName" },
    { header: "Format", accessor: "msFormat" },
    { header: "Industry", accessor: "msIndustry" },
    { header: "Release Date", accessor: "msReleaseDate", type: "date", render: (value) => <span className="badge text-danger">{value}</span> },
    { header: "Rating", accessor: "msRating", render: (value) => <span className="badge text-warning">{value || "Not Available"}</span> },
    { header: "OTT", accessor: "msOTT", render: (value) => (<span className="badge bg-light text-dark text-capitalize">{value || "-"}</span>) }
];

export default upcomingColoumns;