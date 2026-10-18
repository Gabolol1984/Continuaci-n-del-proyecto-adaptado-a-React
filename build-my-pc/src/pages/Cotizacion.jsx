import React, { useState, useMemo } from 'react';
import { formatearCLP, evaluarCompatibilidadBuild } from '../data/componentes';

export default function Cotizacion({ build, setPaginaActual }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [comentario, setComentario] = useState('');
  const [cotizacionGenerada, setCotizacionGenerada] = useState(null);
  const [mensajeError, setMensajeError] = useState('');

  const evaluacion = useMemo(() => {
    return evaluarCompatibilidadBuild(build.cpu, build.placa, build.ram, build.gpu, build.fuente);
  }, [build]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !correo.trim()) {
      setMensajeError('Debes ingresar tu nombre y correo electrónico obligatoriamente.');
      return;
    }

    setMensajeError('');

    const nuevaCotizacion = {
      id: Date.now(),
      cliente: {
        nombre: nombre.trim(),
        correo: correo.trim(),
        telefono: telefono.trim()
      },
      comentario: comentario.trim(),
      build: {
        cpu: build.cpu,
        placa: build.placa,
        ram: build.ram,
        gpu: build.gpu,
        fuente: build.fuente,
        total: evaluacion.total
      },
      fecha: new Date().toLocaleDateString('es-CL'),
      estado: 'Solicitada'
    };

    // Guardar en localStorage
    const cotizacionesPrevias = JSON.parse(localStorage.getItem('cotizaciones')) || [];
    cotizacionesPrevias.push(nuevaCotizacion);
    localStorage.setItem('cotizaciones', JSON.stringify(cotizacionesPrevias));

    setCotizacionGenerada(nuevaCotizacion);

    // Limpiar formulario
    setNombre('');
    setCorreo('');
    setTelefono('');
    setComentario('');
  };

  return (
    <main className="contenedor">
      {/* SECCIÓN HERO */}
      <section className="hero">
        <article>
          <h2>Cotización de tu Build</h2>
          <p>
            Revisa los componentes de tu configuración y solicita una cotización estimada para tu computador.
          </p>
        </article>
      </section>

      
    </main>
  );
}