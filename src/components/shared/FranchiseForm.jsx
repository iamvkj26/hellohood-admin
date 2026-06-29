import FormInput from "../FormInput";

const FranchiseForm = ({ franchiseData, onChange, loading, onSubmit, isEdit = false }) => {
    return (
        <form className="row" onSubmit={onSubmit}>
            <FormInput
                label="Franchise Name..."
                name="name"
                id="name"
                value={franchiseData.name}
                onChange={onChange}
                placeholder="Eg: Marvel Cinematic Universe"
            />
            <FormInput
                label="Description..."
                name="description"
                id="description"
                value={franchiseData.description}
                onChange={onChange}
                placeholder="Eg: A shared universe consisting of Marvel Studios films."
                rows={4}
                isTextarea
                required={false}
            />
            <div className="text-center">
                <button type="submit" className="btn btn-secondary btn-141414">
                    {loading ? (isEdit ? "Updating..." : "Adding...") : (isEdit ? "Update Franchise" : "Add Franchise")}
                </button>
            </div>
        </form>
    );
};

export default FranchiseForm;