import FormInput from "../FormInput";

const MovieSeriesForm = ({ movieData, onChange, loading, onSubmit, isEdit = false }) => {

    const isSeries = movieData.msFormat === "series";

    return (
        <form className="row" onSubmit={onSubmit}>
            <FormInput
                label="Enter the title..."
                name="msName"
                id="name"
                value={movieData.msName}
                onChange={onChange}
                placeholder="Eg: Interstellar"
            />
            <FormInput
                label="Enter the description..."
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
                label="Enter the poster link..."
                name="msPoster"
                id="poster"
                value={movieData.msPoster}
                onChange={onChange}
                placeholder="Eg: https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
            />
            <FormInput
                col="col-6"
                label="Enter the ott link..."
                name="msLink"
                id="link"
                value={movieData.msLink}
                onChange={onChange}
                placeholder="Eg: https://www.primevideo.com/detail/0PUNMGZEWOMYFKR1XIGOLTL2YM"
            />
            <FormInput
                col={isSeries ? "col-4" : "col-6"}
                label="Select the format..."
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
                    label="Select series status..."
                    type="select"
                    name="sStatus"
                    id="status"
                    value={movieData.sStatus}
                    onChange={onChange}
                    options={["ongoing", "completed"]}
                    isSelect
                />
            )}
            <FormInput
                col={isSeries ? "col-4" : "col-6"}
                label="Select the industry..."
                type="select"
                name="msIndustry"
                id="industry"
                value={movieData.msIndustry}
                onChange={onChange}
                options={["bollywood", "hollywood", "other"]}
                isSelect
            />
            <FormInput
                label="Enter the cast (comma-separated)..."
                name="msCast"
                id="cast"
                value={movieData.msCast?.join(", ")}
                onChange={onChange}
                placeholder="Eg: Matthew McConaughey, Anne Hathaway, Michael Caine, Jessica Chastain, Casey Affleck"
            />
            <FormInput
                label="Enter the genre (comma-separated)..."
                name="msGenre"
                id="genre"
                value={movieData.msGenre?.join(", ")}
                onChange={onChange}
                placeholder="Eg: Action, Adventure, Intense, Si-Fi"
            />
            {movieData.msFormat === "series" && (<FormInput
                col={isSeries ? "col-4" : "col-6"}
                label="Enter the series seasons..."
                name="sSeasons"
                id="seasons"
                value={movieData.sSeasons}
                onChange={onChange}
                placeholder="Eg: 1"
                maxLength={2}
            />
            )}
            <FormInput
                col={isSeries ? "col-4" : "col-6"}
                label="Enter the imdb rating..."
                name="msRating"
                id="rating"
                value={movieData.msRating}
                onChange={onChange}
                placeholder="Eg: 8.7"
                maxLength={3}
            />
            <FormInput
                col={isSeries ? "col-4" : "col-6"}
                label="Enter the release date..."
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