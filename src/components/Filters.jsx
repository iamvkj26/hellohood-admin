const Filters = ({ filters, updateFilter, resetFilters }) => {

    const { range, startDate, endDate } = filters;

    return (
        <div className="row">
            <div className="col-md-2">
                <select className="form-control py-3" value={range} onChange={(e) => { updateFilter("range", e.target.value); updateFilter("startDate", ""); updateFilter("endDate", ""); }}>
                    <option value="">Select Range</option>
                    <option value="7d">Last 7 Days</option>
                    <option value="15d">Last 15 Days</option>
                    <option value="45d">Last 45 Days</option>
                    <option value="60d">Last 60 Days</option>
                    <option value="90d">Last 90 Days</option>
                    <option value="all">All Time</option>
                </select>
            </div>
            <div className="col-md-2">
                <input type="date" className="form-control py-3" value={startDate} onChange={(e) => { updateFilter("startDate", e.target.value); updateFilter("range", ""); }} />
            </div>
            <div className="col-md-2">

                <input type="date" className="form-control py-3" value={endDate} onChange={(e) => { updateFilter("endDate", e.target.value); updateFilter("range", ""); }} />
            </div>
            {(range || startDate || endDate) && (
                <button className="btn btn-dark bg-141414 w-auto" onClick={resetFilters}>
                    Clear
                </button>
            )}
        </div>
    );
};

export default Filters;