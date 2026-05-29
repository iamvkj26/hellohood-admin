const FormInput = ({ col, label, type = "text", id, name, value, onChange, placeholder, rows, options = [], isSelect = false, isTextarea = false }) => {
    return (
        <div className={`mb-3 ${col}`}>
            <label htmlFor={id} className="form-label fw-semibold">{label}</label>
            {isTextarea ? (
                <textarea itemType={type} className="form-control" rows={rows} id={id} name={name} value={value} onChange={onChange} placeholder={placeholder} autoComplete="off" required />
            ) : isSelect ? (
                <select className="form-select text-capitalize" id={id} name={name} value={value} onChange={onChange} autoComplete="off" required>
                    <option value="">---Select---</option>
                    {options?.map((option, index) => (
                      <option
            key={index}
            value={typeof option === "object" ? option.value : option}
        >
            {typeof option === "object" ? option.label : option}
        </option>
                    ))}
                </select>
            ) : (
                <input type={type} className="form-control" id={id} name={name} value={value} onChange={onChange} placeholder={placeholder} autoComplete="off" required />
            )}
        </div>
    );
};

export default FormInput;