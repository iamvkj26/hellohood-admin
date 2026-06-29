import { useEffect, useRef, useState } from "react";
import useFranchiseForm from "../../hooks/useFranchiseForm";
import FranchiseForm from "../shared/FranchiseForm";

const initialState = { _id: "", name: "", description: "" };

const EditFranchise = ({ refOpenCanvas, editFranchise, handleUpdateFranchise }) => {

    const { formData, setFormData, onChange } = useFranchiseForm(initialState);

    const [loading, setLoading] = useState(false);
    const refCloseCanvas = useRef(null);

    useEffect(() => {
        if (editFranchise) {
            setFormData(editFranchise);
        };
    }, [editFranchise, setFormData]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await handleUpdateFranchise(formData._id, {
                name: formData.name,
                description: formData.description
            });
            refCloseCanvas.current.click();
        } finally {
            setLoading(false);
        };
    };

    return (
        <>
            <button ref={refOpenCanvas} className="d-none" data-bs-toggle="offcanvas" data-bs-target="#editFranchiseCanvas" aria-controls="editFranchiseCanvas" />

            <div className="offcanvas offcanvas-end w-25 bg-141414" data-bs-backdrop="static" tabIndex="-1" id="editFranchiseCanvas" aria-labelledby="editFranchiseCanvasLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="editFranchiseCanvasLabel">Update Franchise</h5>
                    <button ref={refCloseCanvas} className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
                </div>
                <div className="offcanvas-body">
                    <FranchiseForm
                        franchiseData={formData}
                        onChange={onChange}
                        onSubmit={handleUpdate}
                        loading={loading}
                        isEdit
                    />
                </div>
            </div>
        </>
    );
};

export default EditFranchise;