import { useState, useEffect } from "react";
import moment from "moment";
import useDashboard from "../hooks/useDashboard";
import usePageTitle from "../hooks/usePageTitle";
import NumberCard from "../components/dashbaord/NumberCard";
import CommonLineChart from "../components/dashbaord/CommonLineChart";
import CommonTable from "../components/dashbaord/CommonTable";
import CommonDoughnutChart from "../components/dashbaord/CommonDoughnutChart";
import CommonBarChart from "../components/dashbaord/CommonBarChart";

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

const industryColors = {
    Hollywood: "#A9A9A9",
    Bollywood: "#818589",
    Other: "#899499"
};

const ottColors = {
    netflix: "#E50914",
    prime: "#00A8E1",
    hotstar: "#1f80e0",
    zee5: "#6f42c1",
    sonyliv: "#ffc107",
    lionsgateplay: "#dc3545",
    none: "#6c757d",
    other: "#adb5bd"
};

const upcomingColoumns = [
    { header: "Poster", accessor: "msPoster", render: (value) => (<img src={value || "/no-image.png"} alt="poster" className="table-poster" onError={(e) => (e.target.src = "/no-image.png")} />) },
    { header: "Name", accessor: "msName" },
    { header: "Format", accessor: "msFormat" },
    { header: "Industry", accessor: "msIndustry" },
    { header: "Release Date", accessor: "msReleaseDate", type: "date", render: (value) => <span className="badge text-danger">{value}</span> },
    { header: "Rating", accessor: "msRating", render: (value) => <span className="badge text-warning">{value || "Not Available"}</span> },
    { header: "OTT", accessor: "msOTT", render: (value) => (<span className="badge bg-light text-dark text-capitalize">{value || "-"}</span>) }
];

const Dashboard = () => {

    usePageTitle("Dashboard");

    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [range, setRange] = useState("");

    const { dashboard, loading, error, handleGetDashboard } = useDashboard();

    const genreLabels = dashboard?.genreStats?.data?.map(item => item._id);
    const genreValues = dashboard?.genreStats?.data?.map(item => item.count);

    const upcomingData = dashboard?.upcoming?.graph?.map(item => {
        let rawDate = item._id?.replace(/-$/, "");
        return {
            month: moment(rawDate, "YYYY-MM").format("MMM YYYY"),
            movies: item.movies,
            series: item.series
        };
    });
    const labels = upcomingData?.map(item => item.month);

    useEffect(() => {
        handleGetDashboard({ range, startDate, endDate, page, limit });
    }, [range, startDate, endDate, page, limit, handleGetDashboard]);

    useEffect(() => {
        setPage(1);
    }, [range, startDate, endDate]);

    if (!dashboard && loading) return <p className="text-center my-3">Loading…</p>;
    if (error) return <p className="text-center my-3">{error}</p>;

    return (
        <>
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="page-title">Welcome Dashboard!</h3>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item">
                                <span className="breadcrumb-active">Dashboard</span>
                            </li>
                        </ul>
                        <hr />
                    </div>
                </div>
                <div className="row gap-3">
                    <select className="form-control p-3 w-auto" value={range} onChange={(e) => { setRange(e.target.value); setStartDate(""); setEndDate(""); }}>
                        <option value="">Select Range</option>
                        <option value="7d">Last 7 Days</option>
                        <option value="15d">Last 15 Days</option>
                        <option value="45d">Last 45 Days</option>
                        <option value="60d">Last 60 Days</option>
                        <option value="90d">Last 90 Days</option>
                        <option value="all">All Time</option>
                    </select>
                    <input type="date" className="form-control p-3 w-auto" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <input type="date" className="form-control p-3 w-auto" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    {(startDate || endDate) && (
                        <button className="btn btn-dark bg-141414 w-auto" onClick={() => { setStartDate(""); setEndDate(""); setRange(""); }}>
                            Clear
                        </button>
                    )}
                </div>
                <NumberCard cards={dashboard?.cards} />
                <div className="row mt-3">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <CommonLineChart
                                    data={dashboard?.recentlyAddedStats?.data}
                                    filters={dashboard?.filters}
                                    label="Recently Added"
                                    title="Recently Added"
                                    color="#8A9A5B"
                                    text="No recently added data is available!"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <CommonLineChart
                                    data={dashboard?.watchedStats?.data}
                                    filters={dashboard?.filters}
                                    label="Watched"
                                    title="Watched Activity"
                                    color="#8A9A5B"
                                    text="No watched data is available!"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 mt-3">
                        <div className="card">
                            <div className="card-header bg-141414">
                                <h4 className="card-title fw-bold mt-1">Recently Added and Watched</h4>
                            </div>
                            <div className="card-body">
                                <CommonTable
                                    columns={recentlyAddedAndWatchedColumns}
                                    data={dashboard?.recentAddedAndWatched?.data}
                                    pagination={dashboard?.recentAddedAndWatched}
                                    setPage={setPage}
                                    text="No recently added or watched data is available!"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="card">
                            <div className="card-body" style={{ height: "500px" }}>
                                <CommonDoughnutChart
                                    title="Industry Distribution"
                                    data={dashboard?.industryStats?.data}
                                    filters={dashboard?.filters}
                                    colorMap={industryColors}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="card">
                            <div className="card-body" style={{ height: "500px" }}>
                                <CommonBarChart
                                    title="Genre Distribution"
                                    filters={dashboard?.filters}
                                    labels={genreLabels}
                                    datasets={[{ label: "Genres", data: genreValues, backgroundColor: "#8A9A5B" }]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="card">
                            <div className="card-body" style={{ height: "500px" }}>
                                <CommonDoughnutChart
                                    title="OTT Distribution"
                                    data={dashboard?.ottStats?.data}
                                    filters={dashboard?.filters}
                                    colorMap={ottColors}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="card">
                            <div className="card-body" style={{ height: "500px" }}>
                                <CommonBarChart
                                    title="Upcoming Releases"
                                    labels={labels}
                                    datasets={[
                                        {
                                            label: "Movies",
                                            data: upcomingData?.map(item => item.movies),
                                            backgroundColor: "#8A9A5B"
                                        },
                                        {
                                            label: "Series",
                                            data: upcomingData?.map(item => item.series),
                                            backgroundColor: "#848884"
                                        }
                                    ]}
                                    stacked={false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 mt-3">
                        <div className="card">
                            <div className="card-header bg-141414">
                                <h4 className="card-title fw-bold mt-1">Upcoming Releases</h4>
                            </div>
                            <div className="card-body">
                                <CommonTable
                                    columns={upcomingColoumns}
                                    data={dashboard?.upcoming?.data}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;