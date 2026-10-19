import React, { useMemo } from 'react';
import { inventarioComponentes, formatearCLP, evaluarCompatibilidadBuild } from '../data/componentes';

export default function ArmadorBuild({ build, setBuild, setPaginaActual }) {
  // Filtrar componentes no descontinuados para cada selector
  const cpus = useMemo(() => inventarioComponentes.filter(c => c.tipo === 'CPU' && !c.descontinuado), []);
  const placas = useMemo(() => inventarioComponentes.filter(c => c.tipo === 'Placa' && !c.descontinuado), []);
  const rams = useMemo(() => inventarioComponentes.filter(c => c.tipo === 'RAM' && !c.descontinuado), []);
  const gpus = useMemo(() => inventarioComponentes.filter(c => c.tipo === 'GPU' && !c.descontinuado), []);
  const fuentes = useMemo(() => inventarioComponentes.filter(c => c.tipo === 'Fuente' && !c.descontinuado), []);

  // Evaluar compatibilidad de la configuración actual
  const evaluacion = useMemo(() => {
    return evaluarCompatibilidadBuild(build.cpu, build.placa, build.ram, build.gpu, build.fuente);
  }, [build]);

  // Manejar cambio en los selectores
  const manejarCambioComponente = (tipoClave, id) => {
    const item = inventarioComponentes.find(c => c.id === id) || null;
    const nuevaBuild = {
      ...build,
      [tipoClave]: item
    };
    setBuild(nuevaBuild);

    // Persistir en localStorage
    const evaluacionActual = evaluarCompatibilidadBuild(
      tipoClave === 'cpu' ? item : build.cpu,
      tipoClave === 'placa' ? item : build.placa,
      tipoClave === 'ram' ? item : build.ram,
      tipoClave === 'gpu' ? item : build.gpu,
      tipoClave === 'fuente' ? item : build.fuente
    );

    const datosStorage = {
      ...nuevaBuild,
      compatible: evaluacionActual.compatible,
      motivo: evaluacionActual.motivo,
      total: evaluacionActual.total,
      wattsBase: evaluacionActual.wattsBase,
      wattsMargen: evaluacionActual.wattsMargen
    };

    localStorage.setItem('buildSeleccionada', JSON.stringify(datosStorage));
  };

  const handleValidarClick = () => {
    if (!evaluacion.completa) {
      alert("Aún faltan componentes obligatorios, selecciona los 5 componentes.");
    } else if (evaluacion.compatible) {
      alert("Excelente, La configuración es técnicamente y energéticamente compatible.");
    } else {
      alert(`Incompatibilidad detectada:\n${evaluacion.motivo}`);
    }
  };

  const colorEstado = () => {
    if (!evaluacion.completa) return 'var(--alerta)';
    if (evaluacion.compatible) return 'var(--primario)';
    return 'var(--error)';
  };

  return (
    <main className="contenedor">
      {/* PORTADA */}
      <section className="portada">
        <span className="etiqueta">Configurador Personalizado</span>
        <h1 className="titulo-degradado">Arma tu PC Gamer</h1>
        <p>
          Selecciona los 5 componentes esenciales. Evaluaremos el consumo eléctrico
          y la compatibilidad técnica en tiempo real.
        </p>
      </section>    

      {/* LAYOUT DE 2 COLUMNAS */}
      <div className="armador-layout">
        {/* COLUMNA IZQUIERDA: SELECTORES */}
        <section className="panel">
          <h3 style={{ marginBottom: '8px' }}>1. Selección de Componentes</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: '24px', color: 'var(--texto-suave)' }}>
            Elige una opción para cada categoría obligatoria:
          </p>

          <form onSubmit={(e) => e.preventDefault()}>
            {/* 1. CPU */}
            <div className="campo-form">
              <label htmlFor="select-cpu">Procesador (CPU):</label>
              <select
                id="select-cpu"
                value={build.cpu?.id || ''}
                onChange={(e) => manejarCambioComponente('cpu', e.target.value)}
              >
                <option value="">-- Seleccionar Procesador --</option>
                {cpus.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.marca} {c.modelo} ({c.socket}, {c.tdp}W) - {formatearCLP(c.precio)}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Placa Madre */}
            <div className="campo-form">
              <label htmlFor="select-placa">Placa Madre:</label>
              <select
                id="select-placa"
                value={build.placa?.id || ''}
                onChange={(e) => manejarCambioComponente('placa', e.target.value)}
              >
                <option value="">-- Seleccionar Placa Madre --</option>
                {placas.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.marca} {c.modelo} ({c.socket}, {c.tiposMemoriaSoportados?.join('/')}) - {formatearCLP(c.precio)}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Memoria RAM */}
            <div className="campo-form">
              <label htmlFor="select-ram">Memoria RAM:</label>
              <select
                id="select-ram"
                value={build.ram?.id || ''}
                onChange={(e) => manejarCambioComponente('ram', e.target.value)}
              >
                <option value="">-- Seleccionar Memoria RAM --</option>
                {rams.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.marca} {c.modelo} ({c.tipoMemoria}, {c.capacidadGB}GB) - {formatearCLP(c.precio)}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Tarjeta Gráfica */}
            <div className="campo-form">
              <label htmlFor="select-gpu">Tarjeta Gráfica (GPU):</label>
              <select
                id="select-gpu"
                value={build.gpu?.id || ''}
                onChange={(e) => manejarCambioComponente('gpu', e.target.value)}
              >
                <option value="">-- Seleccionar Tarjeta Gráfica --</option>
                {gpus.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.marca} {c.modelo} ({c.vramGB}GB, {c.tdp}W) - {formatearCLP(c.precio)}
                  </option>
                ))}
              </select>
            </div>

            {/* 5. Fuente de Poder */}
            <div className="campo-form">
              <label htmlFor="select-fuente">Fuente de Poder (PSU):</label>
              <select
                id="select-fuente"
                value={build.fuente?.id || ''}
                onChange={(e) => manejarCambioComponente('fuente', e.target.value)}
              >
                <option value="">-- Seleccionar Fuente de Poder --</option>
                {fuentes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.marca} {c.modelo} ({c.potenciaWatts}W, {c.certificacion}) - {formatearCLP(c.precio)}
                  </option>
                ))}
              </select>
            </div>
             {/* Botón para reiniciar selección */}
            {(build.cpu || build.placa || build.ram || build.gpu || build.fuente) && (
              <button
                type="button"
                className="btn-plantilla"
                style={{ marginTop: '12px' }}
                onClick={() => {
                  const buildVacia = { cpu: null, placa: null, ram: null, gpu: null, fuente: null };
                  setBuild(buildVacia);
                  localStorage.removeItem('buildSeleccionada');
                }}
              >
                Reiniciar Configuración
              </button>
            )}
          </form>
        </section>

        {/* COLUMNA DERECHA: ASIDE DE ESTADO Y CONSUMO */}
        <aside className="tarjeta" style={{ position: 'sticky', top: '20px' }}>
          <h3 style={{ borderBottom: '1px solid var(--borde)', paddingBottom: '10px', marginBottom: '16px' }}>
            Resumen de la Build
          </h3>

          {/* Estado de la build */}
          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--texto-suave)' }}>Estado técnico:</span>
            <p style={{ fontWeight: 'bold', color: colorEstado(), marginTop: '4px' }}>
              {evaluacion.estadoTexto}
            </p>
          </div>

          {/* Consumo acumulado en Watts */}
          <div
            style={{
              marginBottom: '16px',
              background: 'var(--superficie-2)',
              padding: '12px',
              borderRadius: 'var(--radio-borde)',
              border: '1px solid var(--borde)'
            }}
          >
            <span style={{ fontSize: '0.85rem', color: 'var(--texto-suave)' }}>Consumo Estimado:</span>
            <p style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--texto)', margin: '4px 0' }}>
              {evaluacion.wattsBase} W
            </p>
            <small style={{ fontSize: '0.75rem', color: 'var(--texto-suave)', display: 'block' }}>
              Margen mínimo (+20%): <strong>{evaluacion.wattsMargen} W</strong>
            </small>
          </div>

          {/* Precio acumulado */}
          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--texto-suave)' }}>Precio Total:</span>
            <p style={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'var(--primario)', margin: '4px 0' }}>
              {formatearCLP(evaluacion.total)}
            </p>
          </div>

          {/* Mensaje de incompatibilidad si existe */}
          {evaluacion.completa && !evaluacion.compatible && (
            <div className="mensaje-error" style={{ marginBottom: '16px', fontSize: '0.85rem' }}>
               {evaluacion.motivo}
            </div>
          )}

          {/* Botones de acción */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              type="button"
              className="btn-resuelto"
              style={{ width: '100%' }}
              onClick={handleValidarClick}
            >
              Validar Compatibilidad
            </button>

            <button
              type="button"
              className="btn-plantilla"
              style={{
                width: '100%',
                opacity: evaluacion.completa && evaluacion.compatible ? 1 : 0.5,
                pointerEvents: evaluacion.completa && evaluacion.compatible ? 'auto' : 'none',
                cursor: evaluacion.completa && evaluacion.compatible ? 'pointer' : 'not-allowed'
              }}
              onClick={() => setPaginaActual('cotizacion')}
            >
              Solicitar Cotización &rarr;
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}
