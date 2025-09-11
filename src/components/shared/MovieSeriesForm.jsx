import FormInput from "../FormInput";

const MovieSeriesForm = ({ movieData, onChange, loading, onSubmit, isEdit = false }) => {
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
                label="Enter the poster link..."
                name="msPoster"
                id="poster"
                value={movieData.msPoster}
                onChange={onChange}
                placeholder="Eg: https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
            />
            <FormInput
                label="Enter the ott link..."
                name="msLink"
                id="link"
                value={movieData.msLink}
                onChange={onChange}
                placeholder="Eg: https://www.primevideo.com/detail/0PUNMGZEWOMYFKR1XIGOLTL2YM"
            />
            <FormInput
                col="col-6"
                label="Select the format..."
                type="select"
                name="msFormat"
                id="format"
                value={movieData.msFormat}
                onChange={onChange}
                options={["Movie", "Series"]}
                isSelect
            />
            <FormInput
                col="col-6"
                label="Select the industry..."
                type="select"
                name="msIndustry"
                id="industry"
                value={movieData.msIndustry}
                onChange={onChange}
                options={["Bollywood", "Hollywood", "Other"]}
                isSelect
            />
            <FormInput
                label="Enter the genre (comma-separated)..."
                name="msGenre"
                id="genre"
                value={movieData.msGenre?.join(", ")}
                onChange={onChange}
                placeholder="Eg: Action, Adventure, Intense, Si-Fi"
            />
            <FormInput
                col="col-6"
                label="Enter the part/season..."
                name="msSeason"
                id="season"
                value={movieData.msSeason}
                onChange={onChange}
                placeholder="Eg: 0"
                maxLength={3}
            />
            <FormInput
                col="col-6"
                label="Enter the release date..."
                type="date"
                name="msReleaseDate"
                id="releaseDate"
                value={movieData.msReleaseDate}
                onChange={onChange}
            />
            <FormInput
                col="col-6"
                label="Enter the imdb rating..."
                name="msRating"
                id="rating"
                value={movieData.msRating}
                onChange={onChange}
                placeholder="Eg: 8.7"
                maxLength={3}
            />
            <FormInput
                col="col-6"
                label="Select the uploader..."
                type="select"
                name="msUploadedBy"
                id="uploadedBy"
                value={movieData.msUploadedBy}
                onChange={onChange}
                options={["Trisha Sharma", "Vijayant Joshi"]}
                isSelect
            />
            <div className="text-center">
                <button type="submit" className="btn btn-secondary">
                    {loading ? (isEdit ? "Updating..." : "Adding...") : (isEdit ? "Update Movie/Series" : "Add Movie/Series")}
                </button>
            </div>
        </form>
    );
};

export default MovieSeriesForm;