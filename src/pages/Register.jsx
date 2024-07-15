import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/common/FormInput';
import '../styles/register.css';
import imagen1 from '../images/imagen1.png';
import imagen2 from '../images/imagen2.png';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    username: '',
    emailAddress: '',
    password: '',
    confirmarContrasena: '',
    role: 'USER' // Rol por defecto
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:8080/auth/register', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/');
      } else {
        const errorData = await response.json();
        setErrors(errorData.errors || { general: 'Error al registrar usuario' });
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      setErrors({ general: 'Error de conexión. Inténtalo de nuevo más tarde.' });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) {
        newErrors[key] = 'Este campo es obligatorio';
        isValid = false;
      }
    }

    if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = 'El correo electrónico no es válido';
      isValid = false;
    }

    if (formData.password !== formData.confirmarContrasena) {
      newErrors.confirmarContrasena = 'Las contraseñas no coinciden';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="register-container">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <h2 className="register-title">Crea tu cuenta</h2>

          <div className="input-row">
            <FormInput
              label="Nombres"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <FormInput
              label="Apellidos"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
          </div>

          <div className="input-row">
            <FormInput
              label="Correo"
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              error={errors.emailAddress}
            />
            <FormInput
              label="Contraseña"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
          </div>

          <div className="input-row">
            <FormInput
              label="Código"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
            />
            <FormInput
              label="Confirma tu contraseña"
              type="password"
              name="confirmarContrasena"
              value={formData.confirmarContrasena}
              onChange={handleChange}
              error={errors.confirmarContrasena}
            />
          </div>

          {errors.general && <p className="error-message">{errors.general}</p>}

          <button type="submit" className="register-button">Crea cuenta</button>
        </form>
      </div>
      <div className="image-wrapper">
        <img src={imagen1} alt="Imagen 1" className="image-left" />
      </div>
      <div className="image-wrapper">
        <img src={imagen2} alt="Imagen 2" className="image-right" />
      </div>
    </div>
  );
}

export default Register;