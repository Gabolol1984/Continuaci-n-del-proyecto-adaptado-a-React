import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButton from './components/FloatingButton';

import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo';
import ArmadorBuild from './pages/ArmadorBuild';
import Compatibilidad from './pages/Compatibilidad';
import Cotizacion from './pages/Cotizacion';
import DetalleProducto from './pages/DetalleProducto';
import Mantencion from './pages/Mantencion';

export default function App() {
  const [paginaActual, setPaginaActual] = useState('inicio');
  const [productoDetalleId, setProductoDetalleId] = useState('ram-001');

  // Estado de la Build sincronizado con localStorage
  const [build, setBuild] = useState(() => {
    try {
      const guardada = localStorage.getItem('buildSeleccionada');
      if (guardada) {
        const parsed = JSON.parse(guardada);
        return {
          cpu: parsed.cpu || null,
          placa: parsed.placa || null,
          ram: parsed.ram || null,
          gpu: parsed.gpu || null,
          fuente: parsed.fuente || null,
        };
      }
    } catch (e) {
      console.error('Error al cargar build guardada:', e);
    }
    return {
      cpu: null,
      placa: null,
      ram: null,
      gpu: null,
      fuente: null,
    };
  });

  // Scroll automático hacia arriba al cambiar de página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [paginaActual]);

  // Manejador para agregar componentes desde el catálogo o vista de detalle
  const manejarAgregarComponente = (producto) => {
    if (!producto || producto.descontinuado) return;

    let clave = '';
    if (producto.tipo === 'CPU') clave = 'cpu';
    else if (producto.tipo === 'Placa') clave = 'placa';
    else if (producto.tipo === 'RAM') clave = 'ram';
    else if (producto.tipo === 'GPU') clave = 'gpu';
    else if (producto.tipo === 'Fuente') clave = 'fuente';
    else {
      alert(`El componente tipo ${producto.tipo} se guardó en tus piezas seleccionadas.`);
      return;
    }

    const nuevaBuild = {
      ...build,
      [clave]: producto,
    };

    setBuild(nuevaBuild);
    localStorage.setItem('buildSeleccionada', JSON.stringify(nuevaBuild));
    alert(`Se agregó "${producto.marca} ${producto.modelo}" a tu Build.`);
    setPaginaActual('builds');
  };

  // Manejador para abrir la vista detallada de un producto
  const manejarVerDetalle = (id) => {
    setProductoDetalleId(id);
    setPaginaActual('detalle');
  };

  return (
    <>
      <Navbar paginaActual={paginaActual} setPaginaActual={setPaginaActual} />

      {paginaActual === 'inicio' && (
        <Inicio setPaginaActual={setPaginaActual} />
      )}

      {paginaActual === 'catalogo' && (
        <Catalogo
          onAgregarComponente={manejarAgregarComponente}
          onVerDetalle={manejarVerDetalle}
        />
      )}

      {paginaActual === 'builds' && (
        <ArmadorBuild
          build={build}
          setBuild={setBuild}
          setPaginaActual={setPaginaActual}
        />
      )}

      {paginaActual === 'compatibilidad' && (
        <Compatibilidad
          build={build}
          setPaginaActual={setPaginaActual}
        />
      )}

      {paginaActual === 'cotizacion' && (
        <Cotizacion
          build={build}
          setPaginaActual={setPaginaActual}
        />
      )}

      {paginaActual === 'detalle' && (
        <DetalleProducto
          productoId={productoDetalleId}
          onVolver={() => setPaginaActual('catalogo')}
          onAgregarABuild={manejarAgregarComponente}
        />
      )}

      {paginaActual === 'mantencion' && (
        <Mantencion setPaginaActual={setPaginaActual} />
      )}

      <Footer setPaginaActual={setPaginaActual} />

      <FloatingButton onClick={() => setPaginaActual('mantencion')} />
    </>
  );
}
