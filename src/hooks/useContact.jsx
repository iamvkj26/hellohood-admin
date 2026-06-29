import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import { getContacts, updateContact, deleteContact } from "../api/services/contact.service";

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
        };
    }, []);

    const handleUpdateContact = async (id, status) => {
        try {
            const response = await updateContact(id, status);
            setContacts(prev => prev.map(contact => contact._id === id ? { ...contact, status, updatedAt: response.data.updatedAt } : contact));
            toast.success(response.data.message);
            await handleGetContact();
        } catch (error) {
            toast.error(error.message);
        };
    };

    const handleDeleteContact = async (id) => {
        try {
            const response = await deleteContact(id);
            setContacts(prev => prev.filter(contact => contact._id !== id));
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.message);
        };
    };

    return { contacts, loading, handleGetContact, handleUpdateContact, handleDeleteContact };
};

export default useContact;