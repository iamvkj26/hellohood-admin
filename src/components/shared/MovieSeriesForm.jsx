import FormInput from "../FormInput";

const MovieSeriesForm = ({ movieData, onChange, loading, onSubmit, isEdit = false }) => {

    const isSeries = movieData.msFormat === "series";

    return (
        <form className="row" onSubmit={onSubmit}>
            <FormInput
                col="col-3"
                label="TMDB ID..."
                name="tmdbId"
                id="tmdbId"
                value={movieData.tmdbId}
                onChange={onChange}
                placeholder="Eg: 157336"
            />
            <FormInput
                col="col-9"
                label="Title..."
                name="msName"
                id="name"
                value={movieData.msName}
                onChange={onChange}
                placeholder="Eg: Interstellar"
            />
            <FormInput
                label="Description..."
                name="msAbout"
                id="about"
                value={movieData.msAbout}
                onChange={onChange}
                placeholder="A team of explorers travel beyond this galaxy through a newly discovered wormhole to discover whether mankind has a future among the stars."
                rows={3}
                isTextarea
            />
            <FormInput
                col="col-6"
                label="Poster Link..."
                name="msPoster"
                id="poster"
                value={movieData.msPoster}
                onChange={onChange}
                placeholder="Eg: https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
            />
            <FormInput
                col="col-6"
                label="OTT Link..."
                name="msLink"
                id="link"
                value={movieData.msLink}
                onChange={onChange}
                placeholder="Eg: https://www.primevideo.com/detail/0PUNMGZEWOMYFKR1XIGOLTL2YM"
            />
            <FormInput
                col={isSeries ? "col-4" : "col-6"}
                label="Format..."
                type="select"
                name="msFormat"
                id="format"
                value={movieData.msFormat}
                onChange={onChange}
                options={["movie", "series"]}
                isSelect
            />
            {movieData.msFormat === "series" && (
                <FormInput
                    col="col-4"
                    label="Series Status..."
                    type="select"
                    name="msStatus"
                    id="status"
                    value={movieData.msStatus}
                    onChange={onChange}
                    options={["ongoing", "completed"]}
                    isSelect
                />
            )}
            <FormInput
                col={isSeries ? "col-4" : "col-6"}
                label="Industry..."
                type="select"
                name="msIndustry"
                id="industry"
                value={movieData.msIndustry}
                onChange={onChange}
                options={["bollywood", "hollywood", "other"]}
                isSelect
            />
            <FormInput
                col="col-6"
                label="Genre (comma-separated)..."
                name="msGenre"
                id="genre"
                value={movieData.msGenre?.join(", ")}
                onChange={onChange}
                placeholder="Eg: Action, Adventure, Intense, Si-Fi"
            />
            <FormInput
                col="col-3"
                label="IMDB Rating..."
                name="msRating"
                id="rating"
                value={movieData.msRating}
                onChange={onChange}
                placeholder="Eg: 8.7"
                maxLength={3}
            />
            <FormInput
                col="col-3"
                label="Release Date..."
                type="date"
                name="msReleaseDate"
                id="releaseDate"
                value={movieData.msReleaseDate}
                onChange={onChange}
            />
            <div className="text-center">
                <button type="submit" className="btn btn-secondary btn-141414">
                    {loading ? (isEdit ? "Updating..." : "Adding...") : (isEdit ? "Update Movie/Series" : "Add Movie/Series")}
                </button>
            </div>
        </form>
    );
};

export default MovieSeriesForm;