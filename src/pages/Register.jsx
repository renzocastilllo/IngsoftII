import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/common/FormInput';
import '../styles/register.css';
import imagen1 from '../images/imagen1.png'; // Asegúrate de tener la ruta correcta
import imagen2 from '../images/imagen2.png';

function Register() {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    codigo: '',
    contrasena: '',
    confirmarContrasena: '',
    role: 'usuario' // Rol por defecto: usuario
  });

  const [errors, setErrors] = useState({}); // Para manejar errores de validación
  const navigate = useNavigate(); // Para redirigir después del registro

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validación de datos (implementa tu lógica de validación aquí)
    if (!validateForm()) return; // Si hay errores, no enviar el formulario

    try {
      // 2. Enviar datos al servidor (o guardar en db.json en este caso)
      const response = await fetch('/api/register', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // 3. Redirigir al login
        navigate('/login');
      } else {
        // 4. Manejar errores del servidor
        const errorData = await response.json();
        setErrors(errorData.errors || { general: 'Error al registrar usuario' });
      }
    } catch (error) {
      // 5. Manejar errores de red
      console.error('Error al registrar:', error);
      setErrors({ general: 'Error de conexión. Inténtalo de nuevo más tarde.' });
    }
  };

  // Función de validación (ejemplo básico)
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validación de campos obligatorios
    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) {
        newErrors[key] = 'Este campo es obligatorio';
        isValid = false;
      }
    }

    // Validación de correo electrónico
    if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = 'El correo electrónico no es válido';
      isValid = false;
    }

    // Validación de contraseñas coincidentes
    if (formData.contrasena !== formData.confirmarContrasena) {
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
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            error={errors.nombres}
          />
          <FormInput
            label="Apellidos"
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            error={errors.apellidos}
          />
        </div>

        <div className="input-row">
          <FormInput
            label="Correo"
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            error={errors.correo}
          />
          <FormInput
            label="Contraseña"
            type="password"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            error={errors.contrasena}
          />
        </div>

        <div className="input-row">
          <FormInput
            label="Código"
            type="text"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            error={errors.codigo}
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
