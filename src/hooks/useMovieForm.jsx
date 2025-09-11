import { useState } from "react";

const useMovieForm = (initialState) => {

    const [formData, setFormData] = useState(initialState);

    const onChange = (e) => {
        const { name, value } = e.target;
        if ((name.includes("Season") || name.includes("Rating")) && !/^(\d{0,2}(\.\d{0,1})?|\d{0,2}-\d{0,2})$/.test(value)) return;
        if (name.toLowerCase().includes("genre")) {
            setFormData((prev) => ({ ...prev, [name]: value.split(",").map((g) => g.trim()) }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        };
    };
    const resetForm = () => setFormData(initialState);

    return { formData, setFormData, onChange, resetForm };
};

export default useMovieForm;