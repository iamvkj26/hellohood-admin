import { useState, useRef } from "react";
import useFranchiseForm from "../../hooks/useFranchiseForm";
import FranchiseForm from "../shared/FranchiseForm";

const initialState = { name: "", description: "" };

const AddFranchise = ({ handleAddFranchise }) => {

    const { formData, onChange, resetForm } = useFranchiseForm(initialState);

    const [loading, setLoading] = useState(false);
    const refCloseCanvas = useRef(null);

    const handleAdd = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await handleAddFranchise(formData);
            resetForm();
            refCloseCanvas.current.click();
        } finally {
            setLoading(false);
        };
    };

    return (
        <>
            <button className="btn btn-round btn-141414" data-bs-toggle="offcanvas" data-bs-target="#addFranchiseCanvas" aria-controls="addFranchiseCanvas">
                <i className="fas fa-plus me-2"></i> Add Franchise
            </button>

            <div className="offcanvas offcanvas-end w-25 bg-141414" data-bs-backdrop="static" tabIndex="-1" id="addFranchiseCanvas" aria-labelledby="addFranchiseCanvasLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="addFranchiseCanvasLabel">Add Franchise</h5>
                    <button ref={refCloseCanvas} className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
                </div>
                <div className="offcanvas-body">
                    <FranchiseForm
                        franchiseData={formData}
                        onChange={onChange}
                        onSubmit={handleAdd}
                        loading={loading}
                    />
                </div>
            </div>
        </>
    );
};

export default AddFranchise;