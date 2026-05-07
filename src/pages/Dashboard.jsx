import { useState, useEffect } from "react";
import moment from "moment";
import useFilters from "../hooks/useFilters";
import useDashboard from "../hooks/useDashboard";
import Filters from "../components/Filters";
import usePageTitle from "../hooks/usePageTitle";
import NumberCard from "../components/dashbaord/NumberCard";
import CommonLineChart from "../components/dashbaord/CommonLineChart";
import CommonTable from "../components/dashbaord/CommonTable";
import CommonDoughnutChart from "../components/dashbaord/CommonDoughnutChart";
import CommonBarChart from "../components/dashbaord/CommonBarChart";
import recentlyAddedAndWatchedColumns from "../constants/recentlyAddedAndWatchedColumns";
import upcomingColoumns from "../constants/upcomingColoumns";
import ottColors from "../constants/ottColors";
import industryColors from "../constants/industryColors";

const Dashboard = () => {

    const [limit] = useState(10);

    const { filters, ready, updateFilter, resetFilters } = useFilters();
    const { dashboard, loading, error, handleGetDashboard } = useDashboard();

    const { range, startDate, endDate } = filters;
    const page = Number(filters.page) || 1;

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

    const titleFilter = [
        filters.range && filters.range !== "all" ? filters.range.toUpperCase() : null,
        filters.startDate ? `From ${filters.startDate}` : null,
        filters.endDate ? `To ${filters.endDate}` : null
    ].filter(Boolean).join(" - ");

    usePageTitle(titleFilter ? `Dashboard (${titleFilter})` : "Dashboard");

    useEffect(() => {
        if (!ready) return;
        handleGetDashboard({ range, startDate, endDate, page, limit });
    }, [ready, range, startDate, endDate, page, limit, handleGetDashboard]);

    useEffect(() => {
        updateFilter("page", 1);
    }, [range, startDate, endDate]);

    if (!ready) return null;
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
                    </div>
                    <hr />
                </div>
                <Filters filters={filters} updateFilter={updateFilter} resetFilters={resetFilters} />
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
                                    setPage={(newPage) => updateFilter("page", newPage)}
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