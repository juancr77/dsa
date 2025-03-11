import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './SocialIcons.css';
import { FaWhatsapp } from 'react-icons/fa';

function SocialIcons() {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para el spinner

  // Inicializa EmailJS con tu Public Key
  emailjs.init('UJjjjsahnefmVXmvo'); // Reemplaza 'TU_PUBLIC_KEY' con tu Public Key

  const validateForm = (form) => {
    const name = form.name.value.trim();
    const department = form.department.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();

    if (!name) {
      setMessage('El campo "Nombre" es obligatorio.');
      setIsError(true);
      return false;
    }

    if (!department) {
      setMessage('El campo "Departamento" es obligatorio.');
      setIsError(true);
      return false;
    }

    if (!email) {
      setMessage('El campo "Correo" es obligatorio.');
      setIsError(true);
      return false;
    }

    if (!subject) {
      setMessage('El campo "Asunto" es obligatorio.');
      setIsError(true);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Por favor, ingresa un correo electrónico válido.');
      setIsError(true);
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm(e.target)) {
      return;
    }

    // Activar el spinner y deshabilitar el botón
    setIsLoading(true);

    emailjs.sendForm('service_rgtfjev', 'template_umuizfz', e.target)
      .then((result) => {
        setMessage('Mensaje enviado con éxito. ¡Gracias por contactarnos!');
        setIsError(false);
        e.target.reset();
      })
      .catch((error) => {
        setMessage('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
        setIsError(true);
      })
      .finally(() => {
        // Desactivar el spinner y habilitar el botón
        setIsLoading(false);
      });
  };

  return (
    <div className="social-icons-container">
      <h1>Dirección de sistemas Arteaga</h1>

      {/* Botón de WhatsApp */}
      <a href="https://wa.me/528445855829" target="_blank" rel="noopener noreferrer" className="whatsapp-button">
        <FaWhatsapp className="whatsapp-icon" /> Contacto 1
      </a>

      <p>O también puedes mandarme un correo electrónico con el siguiente formulario:</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <h2>Envíame un mensaje</h2>

        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" name="name" />
        </div>

        <div className="form-group">
          <label htmlFor="department">Departamento:</label>
          <input type="text" id="department" name="department" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo:</label>
          <input type="email" id="email" name="email" />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Tel: (opcional)</label>
          <input type="tel" id="phone" name="phone" />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Asunto:</label>
          <textarea id="subject" name="subject" rows="4"></textarea>
        </div>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>

        {/* Spinner de carga */}
        {isLoading && <div className="spinner"></div>}

        {message && (
          <div className={`message ${isError ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default SocialIcons;