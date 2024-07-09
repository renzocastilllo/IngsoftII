import React from 'react';

function FormInput({ label, type, name, value, onChange, error }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}:</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

export default FormInput;
