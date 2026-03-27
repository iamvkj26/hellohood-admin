import { useEffect } from "react";
import useContact from "../hooks/useContact";
import ContactCard from "../components/card/ContactCard";

const Contact = () => {

    const { contactsData, handleGetContact } = useContact();

    useEffect(() => {
        handleGetContact();
    }, []);

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                {
                    contactsData.length > 0 ? (
                        <div className="row">
                            {
                                contactsData.map(contact => (
                                    <ContactCard
                                        contact={contact}
                                        key={contact._id}
                                    />
                                ))}
                        </div>
                    ) : (
                        <div className="text-center mt-5">
                            <h5 className="text-muted">🎬 No Movie/Series Found</h5>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default Contact;