import { useState } from "react";

const useForm = (initialState) => {

    const [formData, setFormData] = useState(initialState);

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const resetForm = () => setFormData(initialState);

    return { formData, setFormData, onChange, resetForm };
};

export default useForm;