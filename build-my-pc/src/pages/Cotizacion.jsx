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
      
      {!evaluacion.completa ? (
        <section className="panel" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <h3 style={{ color: 'var(--alerta)', marginBottom: '12px' }}>
            ⚠️ Primero debes crear y validar una Build
          </h3>
          <p style={{ color: 'var(--texto-suave)', marginBottom: '24px' }}>
            No has seleccionado todos los componentes necesarios para cotizar.
          </p>
          <button
            type="button"
            className="boton-primario"
            onClick={() => setPaginaActual('builds')}
          >
            Ir al Armador de PC
          </button>
        </section>
        ) : (
        <section className="cotizacion-contenedor">
          {/* RESUMEN DE COMPONENTES */}
          <article className="tarjeta cotizacion-resumen">
            <h2>Resumen de componentes</h2>

            <div className="componente-cotizacion">
              <span>Procesador:</span>
              <strong>{build.cpu.marca} {build.cpu.modelo}</strong>
              <span style={{ textAlign: 'right' }}>{formatearCLP(build.cpu.precio)}</span>
            </div>

            <div className="componente-cotizacion">
              <span>Placa Madre:</span>
              <strong>{build.placa.marca} {build.placa.modelo}</strong>
              <span style={{ textAlign: 'right' }}>{formatearCLP(build.placa.precio)}</span>
            </div>

            <div className="componente-cotizacion">
              <span>Memoria RAM:</span>
              <strong>{build.ram.marca} {build.ram.modelo}</strong>
              <span style={{ textAlign: 'right' }}>{formatearCLP(build.ram.precio)}</span>
            </div>

            <div className="componente-cotizacion">
              <span>Tarjeta Gráfica:</span>
              <strong>{build.gpu.marca} {build.gpu.modelo}</strong>
              <span style={{ textAlign: 'right' }}>{formatearCLP(build.gpu.precio)}</span>
            </div>

            <div className="componente-cotizacion">
              <span>Fuente de Poder:</span>
              <strong>{build.fuente.marca} {build.fuente.modelo}</strong>
              <span style={{ textAlign: 'right' }}>{formatearCLP(build.fuente.precio)}</span>
            </div>

            <div style={{ marginTop: '20px', padding: '12px', background: 'var(--superficie-2)', borderRadius: '8px' }}>
              <p style={{ margin: 0 }}>
                <strong>Compatibilidad: </strong>
                <span style={{ color: evaluacion.compatible ? 'var(--primario)' : 'var(--error)', fontWeight: 'bold' }}>
                  {evaluacion.compatible ? 'Compatible' : 'No compatible'}
                </span>
              </p>
              {!evaluacion.compatible && (
                <p style={{ color: 'var(--error)', fontSize: '0.85rem', marginTop: '6px' }}>
                  {evaluacion.motivo}
                </p>
              )}
            </div>
          </article>

          {/* DETALLE Y FORMULARIO */}
          <article className="tarjeta cotizacion-total">
            <h2>Detalle de cotización</h2>

            <p style={{ margin: '4px 0', color: 'var(--texto-suave)' }}>Estado de la Build:</p>
            <strong style={{ color: evaluacion.compatible ? 'var(--primario)' : 'var(--error)', fontSize: '1.1rem' }}>
              {evaluacion.compatible ? 'Build Validada' : 'Build No Compatible'}
            </strong>

            <p style={{ marginTop: '16px', color: 'var(--texto-suave)' }}>Subtotal componentes:</p>
            <h3 style={{ color: 'var(--primario)', fontSize: '1.8rem', margin: '6px 0' }}>
              {formatearCLP(evaluacion.total)}
            </h3>
            <p className="texto-secundario">
              El precio mostrado es una estimación referencial sujeta a disponibilidad de stock.
            </p>

            <hr />

            {evaluacion.compatible ? (
              <>
                <h3 style={{ marginBottom: '16px' }}>Datos para solicitar cotización</h3>

                <form id="form-cotizacion" onSubmit={handleSubmit}>
                  <label htmlFor="nombre-cotizacion">Nombre completo *</label>
                  <input
                    type="text"
                    id="nombre-cotizacion"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    required
                  />

                  <label htmlFor="correo-cotizacion">Correo electrónico *</label>
                  <input
                    type="email"
                    id="correo-cotizacion"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="correo@ejemplo.cl"
                    required
                  />

                  <label htmlFor="telefono-cotizacion">Teléfono de contacto</label>
                  <input
                    type="tel"
                    id="telefono-cotizacion"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="+56 9 1234 5678"
                  />

                  <label htmlFor="comentario-cotizacion">Comentarios / Observaciones</label>
                  <textarea
                    id="comentario-cotizacion"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    rows="3"
                    placeholder="Puedes agregar detalles sobre el armado o despacho"
                  ></textarea>

                  {mensajeError && (
                    <div className="mensaje-error" style={{ margin: '8px 0' }}>
                      ⚠️ {mensajeError}
                    </div>
                  )}

                  <button type="submit" className="boton-primario">
                    Solicitar cotización
                  </button>
                </form>
              </>
            ) : (
              <div style={{ marginTop: '20px' }}>
                <p style={{ color: 'var(--error)' }}>
                  ⚠️ No se puede generar una cotización para una configuración incompatible. Corrige los componentes en el armador.
                </p>
                <button
                  type="button"
                  className="btn-plantilla"
                  style={{ width: '100%', marginTop: '12px' }}
                  onClick={() => setPaginaActual('builds')}
                >
                  Modificar Configuración
                </button>
              </div>
            )}

            {/* RECIBO / RESUMEN DE COTIZACIÓN GENERADA */}
            {cotizacionGenerada && (
              <section className="resumen-cotizacion">
                <h2>Resumen de Cotización</h2>
                <p><strong>Número de Cotización:</strong> #{cotizacionGenerada.id}</p>
                <p><strong>Cliente:</strong> {cotizacionGenerada.cliente.nombre}</p>
                <p><strong>Correo:</strong> {cotizacionGenerada.cliente.correo}</p>
                <p><strong>Teléfono:</strong> {cotizacionGenerada.cliente.telefono || 'No ingresado'}</p>
                <p><strong>Fecha:</strong> {cotizacionGenerada.fecha}</p>
                <hr />
                <p><strong>CPU:</strong> {cotizacionGenerada.build.cpu.marca} {cotizacionGenerada.build.cpu.modelo}</p>
                <p><strong>Placa Madre:</strong> {cotizacionGenerada.build.placa.marca} {cotizacionGenerada.build.placa.modelo}</p>
                <p><strong>RAM:</strong> {cotizacionGenerada.build.ram.marca} {cotizacionGenerada.build.ram.modelo}</p>
                <p><strong>GPU:</strong> {cotizacionGenerada.build.gpu.marca} {cotizacionGenerada.build.gpu.modelo}</p>
                <p><strong>Fuente:</strong> {cotizacionGenerada.build.fuente.marca} {cotizacionGenerada.build.fuente.modelo}</p>
                <hr />
                <p><strong>Total Estimado:</strong> {formatearCLP(cotizacionGenerada.build.total)}</p>
                <p><strong>Estado:</strong> <span style={{ color: 'var(--primario)' }}>{cotizacionGenerada.estado}</span></p>
                <p><strong>Comentario:</strong> {cotizacionGenerada.comentario || 'Sin comentarios adicionales.'}</p>
              </section>
            )}
          </article>
        </section>
      )}
    </main>
  );
}