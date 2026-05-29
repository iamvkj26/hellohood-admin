import FormInput from "../FormInput";

const SeasonForm = ({ seasonData, onChange, isEdit = false }) => {

    return (
        <div className="row">
            <FormInput
                col="col-4"
                label="Enter season number..."
                name="sNumber"
                id="sNumber"
                value={seasonData.sNumber}
                onChange={onChange}
                placeholder="Eg: 1"
                disabled={isEdit}
            />
            <FormInput
                col="col-4"
                label="Enter episode count..."
                name="sEpisodeCount"
                id="sEpisodeCount"
                value={seasonData.sEpisodeCount}
                onChange={onChange}
                placeholder="Eg: 10"
            />
            <FormInput
                col="col-4"
                label="Select season status..."
                type="select"
                name="sStatus"
                id="sStatus"
                value={seasonData.sStatus}
                onChange={onChange}
                options={["released", "upcoming"]}
                isSelect
            />
            <FormInput
                label="Enter season poster..."
                name="sPoster"
                id="sPoster"
                value={seasonData.sPoster}
                onChange={onChange}
                placeholder="Eg: https://image.tmdb.org/t/p/original/poster.jpg"
            />
            <FormInput
                col="col-6"
                label="Enter release date..."
                type="date"
                name="sReleaseDate"
                id="sReleaseDate"
                value={seasonData.sReleaseDate}
                onChange={onChange}
            />
            <FormInput
                col="col-6"
                label="Watched Status..."
                type="select"
                name="sWatched"
                id="sWatched"
                value={seasonData.sWatched}
                onChange={onChange}
                options={[{ label: "Watched", value: true }, { label: "Not Watched", value: false }]}
                isSelect
            />
            <FormInput
                label="Enter season description..."
                name="sAbout"
                id="sAbout"
                value={seasonData.sAbout}
                onChange={onChange}
                placeholder="Season overview..."
                rows={4}
                isTextarea
            />
            {/* <div className="text-center mt-3">
                <button type="submit" className="btn btn-secondary btn-141414">
                    {loading ? (isEdit ? "Updating..." : "Adding...") : (isEdit ? "Update Season" : "Add Season")}
                </button>
            </div> */}
        </div>
    );
};

export default SeasonForm;