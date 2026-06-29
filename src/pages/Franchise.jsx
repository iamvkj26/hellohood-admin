import { useState, useRef, useEffect } from "react";
import useFranchise from "../hooks/useFranchise";
import usePageTitle from "../hooks/usePageTitle";
import AllTable from "../components/AllTable";
import franchise from "../constants/franchise";
import AddFranchise from "../components/franchise/AddFranchise";
import EditFranchise from "../components/franchise/EditFranchise";

const Franchise = () => {

    const { franchises, loading, handleGetFranchise, handleAddFranchise, handleUpdateFranchise, handleDeleteFranchise } = useFranchise();

    const [editFranchise, setEditFranchise] = useState(null);
    const refOpenCanvas = useRef(null);

    const handleEdit = (row) => {
        setEditFranchise(row);
        refOpenCanvas.current.click();
    };

    usePageTitle("Franchise");

    useEffect(() => {
        handleGetFranchise();
    }, [handleGetFranchise]);

    if (!franchises && loading) return <p className="text-center my-3">Loading…</p>;

    return (
        <>
            <div className="container mt-3 mb-3">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <h3 className="page-title">Franchise!</h3>
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item">
                                <span className="breadcrumb">Dashboard</span>
                            </li>
                            <li className="breadcrumb-item">
                                <span className="breadcrumb-active">Franchise</span>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                        <AddFranchise handleAddFranchise={handleAddFranchise} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <AllTable columns={franchise(handleEdit, handleDeleteFranchise)} data={franchises} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <EditFranchise refOpenCanvas={refOpenCanvas} editFranchise={editFranchise} handleUpdateFranchise={handleUpdateFranchise} />
        </>
    );
};

export default Franchise;