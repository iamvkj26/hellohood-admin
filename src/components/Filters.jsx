const Filters = ({ filters, updateFilter, resetFilters }) => {

    const { range, startDate, endDate } = filters;

    return (
        <div className="row gap-3">
            <select className="form-control p-3 w-auto" value={range} onChange={(e) => { updateFilter("range", e.target.value); updateFilter("startDate", ""); updateFilter("endDate", ""); }}>
                <option value="">Select Range</option>
                <option value="7d">Last 7 Days</option>
                <option value="15d">Last 15 Days</option>
                <option value="45d">Last 45 Days</option>
                <option value="60d">Last 60 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="all">All Time</option>
            </select>
            <input type="date" className="form-control p-3 w-auto" value={startDate} onChange={(e) => { updateFilter("startDate", e.target.value); updateFilter("range", ""); }} />
            <input type="date" className="form-control p-3 w-auto" value={endDate} onChange={(e) => { updateFilter("endDate", e.target.value); updateFilter("range", ""); }} />
            {(range || startDate || endDate) && (
                <button className="btn btn-dark bg-141414 w-auto" onClick={resetFilters}>
                    Clear
                </button>
            )}
        </div>
    );
};

export default Filters;