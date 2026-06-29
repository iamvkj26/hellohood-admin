import { useEffect } from "react";
import useContact from "../hooks/useContact";
import usePageTitle from "../hooks/usePageTitle";
import AllTable from "../components/AllTable";
import contact from "../constants/contact";

const Contact = () => {

    const { contacts, loading, handleGetContact, handleUpdateContact, handleDeleteContact } = useContact();

    usePageTitle("Query");

    useEffect(() => {
        handleGetContact();
    }, [handleGetContact]);

    if (!contacts && loading) return <p className="text-center my-3">Loading…</p>;

    return (
        <div className="container mt-3 mb-3">
            <div className="row">
                <div className="col-md-12">
                    <h3 className="page-title">Query!</h3>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <span className="breadcrumb">Dashboard</span>
                        </li>
                        <li className="breadcrumb-item">
                            <span className="breadcrumb-active">Query</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <AllTable columns={contact(handleUpdateContact, handleDeleteContact)} data={contacts} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;