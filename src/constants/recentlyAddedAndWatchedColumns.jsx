import moment from "moment";

const recentlyAddedAndWatchedColumns = [
    { header: "Poster", accessor: "msPoster", render: (value) => (<img src={value || "/no-image.png"} alt="poster" className="table-poster" onError={(e) => (e.target.src = "/no-image.png")} />) },
    { header: "Name", accessor: "msName" },
    { header: "Format/Industry", render: (_, row) => `${row.msFormat}/${row.msIndustry}` },
    { header: "Release Date", accessor: "msReleaseDate", type: "date", render: (value) => <span className="badge text-danger">{value}</span> },
    { header: "Rating", accessor: "msRating", render: (value) => <span className="badge text-warning">{value || "0"} <i className="bi bi-star-fill text-warning"></i></span> },
    { header: "Added On", accessor: "msAddedAt", type: "date", render: (value) => <span className="badge text-primary">{value}</span> },
    { header: "Watched On", accessor: "msWatchedAt", render: (value) => { if (!value) { return <span className="badge text-muted">Not watched yet</span> } return (<span className="badge text-success">{moment(value).format("DD-MMM-YYYY | hh:mm A").toLocaleString("en-US", { timeZone: "Asia/Calcutta", hour12: true, hour: "numeric", minute: "numeric" })} </span>) } },
    {
        header: "OTT", accessor: "msOTT", render: (value, row) => {
            const ott = (value || "").toLowerCase();
            const badgeMap = {
                netflix: "bg-danger",
                prime: "bg-primary",
                hotstar: "bg-info text-dark",
                zee5: "bg-dark",
                sonyliv: "bg-warning text-dark",
                lionsgateplay: "bg-secondary",
                other: "bg-secondary",
                none: "bg-light text-dark"
            };
            const badgeClass = badgeMap[ott] || "bg-secondary";
            const hasLink = row.msLink && row.msLink !== "/";
            const content = (<span className={`badge ${badgeClass} text-capitalize`}>{ott || "-"}</span>);
            return hasLink ? (<a href={row.msLink} target="_blank" rel="noopener noreferrer" className="text-decoration-none">{content}</a>) : (content);
        }
    }
];

export default recentlyAddedAndWatchedColumns;