import { useEffect } from "react";
import useContact from "../hooks/useContact";
import usePageTitle from "../hooks/usePageTitle";
import ContactCard from "../components/card/ContactCard";

const Contact = () => {

    const { contacts, loading, handleGetContact } = useContact();

    usePageTitle("Query");

    useEffect(() => {
        handleGetContact();
    }, [handleGetContact]);

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                {
                    !loading && contacts.length > 0 ? (
                        <div className="row">
                            {
                                contacts.map(contact => (
                                    <ContactCard
                                        contact={contact}
                                        key={contact._id}
                                    />
                                ))}
                        </div>
                    ) : (
                        <div className="text-center mt-5">
                            <h5 className="text-muted">No Query Found!</h5>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default Contact;