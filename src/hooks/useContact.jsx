import { useState } from "react";
import { toast } from "react-hot-toast";
import { getContact } from "../api/movieseries";

const useContact = () => {

    const [contactsData, setContactsData] = useState([]);

    const handleGetContact = async () => {
        try {
            const response = await getContact();
            setContactsData(Array.isArray(response) ? response : response?.data ?? []);
        } catch (error) {
            toast.error(error.message || "Failed to fetch contacts data.");
        };
    };

    return { contactsData, handleGetContact };
};

export default useContact;