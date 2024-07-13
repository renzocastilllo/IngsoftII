import React from 'react';
import styles from '../../styles/FormInput.module.css'; // Ajusta la ruta según tu estructura de carpetas

const FormInput = ({ label, type, name, value, onChange, disabled }) => (
  <div className={styles.formInput}>
    <label htmlFor={name} className={styles.label}>
      {label}:
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={disabled ? styles.inputDisabled : styles.input}
    />
  </div>
);

export default FormInput;
