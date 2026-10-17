import { useState } from 'react';

export default function Inicio({ setPaginaActual }) {
  const [rolSeleccionado, setRolSeleccionado] = useState('visitante');
  const [rolConfirmado, setRolConfirmado] = useState('Visitante');

 const manejarCambioRol = (e) => {
    e.preventDefault();
    const nombresRoles = {
      visitante: 'Visitante',
      usuario: 'Usuario',
      tecnico: 'Técnico',
      administrador: 'Administrador'
    };
    setRolConfirmado(nombresRoles[rolSeleccionado] || 'Visitante');
  };

  }