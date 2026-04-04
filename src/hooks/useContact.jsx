import { useState, useCallback } from "react";
import { getContacts } from "../api/services/contact.service";

const useContact = () => {

    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleGetContact = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getContacts();
            setContacts(Array.isArray(response) ? response : response?.data ?? []);
        } finally {
            setLoading(false);
        }
    }, []);

    return { contacts, loading, handleGetContact };
};

export default useContact;