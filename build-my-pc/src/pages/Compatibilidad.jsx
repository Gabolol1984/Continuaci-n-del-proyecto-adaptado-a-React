import React, { useMemo } from 'react';
import { evaluarCompatibilidadBuild } from '../data/componentes';

export default function Compatibilidad({ build, setPaginaActual }) {
  const evaluacion = useMemo(() => {
    return evaluarCompatibilidadBuild(build.cpu, build.placa, build.ram, build.gpu, build.fuente);
  }, [build]);

  const { cpu, placa, ram, gpu, fuente } = build;

  return (
    <main className="contenedor">
      {/* SECCIÓN HERO */}
      <section className="hero">
        <article>
          <h2>Compatibilidad de tu Build</h2>
          <p>
            Revisa si los componentes seleccionados son compatibles entre sí antes de solicitar una cotización.
          </p>
        </article>
      </section>

      {/* CONTENEDOR DE DIAGNÓSTICO */}
      <section className="compatibilidad-contenedor">
        {/* TARJETA 1: COMPONENTES SELECCIONADOS */}
        <article className="tarjeta">
          <h2>Componentes seleccionados</h2>

          <div className="componente-compatibilidad">
            <span>Procesador</span>
            <strong>{cpu ? `${cpu.marca} ${cpu.modelo}` : 'Sin seleccionar'}</strong>
          </div>

          <div className="componente-compatibilidad">
            <span>Placa Madre</span>
            <strong>{placa ? `${placa.marca} ${placa.modelo}` : 'Sin seleccionar'}</strong>
          </div>

          <div className="componente-compatibilidad">
            <span>Memoria RAM</span>
            <strong>{ram ? `${ram.marca} ${ram.modelo}` : 'Sin seleccionar'}</strong>
          </div>

          <div className="componente-compatibilidad">
            <span>Tarjeta Gráfica</span>
            <strong>{gpu ? `${gpu.marca} ${gpu.modelo}` : 'Sin seleccionar'}</strong>
          </div>

          <div className="componente-compatibilidad">
            <span>Fuente de Poder</span>
            <strong>{fuente ? `${fuente.marca} ${fuente.modelo}` : 'Sin seleccionar'}</strong>
          </div>
        </article>

        {/* TARJETA 2: COMPROBACIONES TÉCNICAS */}
        <article className="tarjeta">
          <h2>Comprobaciones</h2>

          {/* Socket */}
          <div className="regla-compatibilidad">
            <div>
              <h4>CPU y Placa Madre</h4>
              <p>
                {!cpu || !placa
                  ? 'Esperando selección de CPU y Placa...'
                  : cpu.socket === placa.socket
                  ? `Ambos utilizan socket ${cpu.socket}.`
                  : `Incompatible: CPU ${cpu.socket} vs Placa ${placa.socket}`}
              </p>
            </div>
            <strong
              style={{
                color: !cpu || !placa ? 'var(--texto-suave)' : cpu.socket === placa.socket ? 'var(--primario)' : 'var(--error)'
              }}>
              {!cpu || !placa ? 'Pendiente' : cpu.socket === placa.socket ? 'Compatible' : 'No compatible'}
            </strong>
          </div>

          {/* RAM */}
          <div className="regla-compatibilidad">
            <div>
              <h4>RAM y Placa Madre</h4>
              <p>
                {!ram || !placa
                  ? 'Esperando selección de RAM y Placa...'
                  : placa.tiposMemoriaSoportados?.includes(ram.tipoMemoria)
                  ? `La placa soporta memorias ${ram.tipoMemoria}.`
                  : `Incompatible: Placa no soporta ${ram.tipoMemoria}`}
              </p>
            </div>
            <strong
              style={{
                color: !ram || !placa ? 'var(--texto-suave)' : placa.tiposMemoriaSoportados?.includes(ram.tipoMemoria) ? 'var(--primario)' : 'var(--error)'
              }}
            >
              {!ram || !placa ? 'Pendiente' : placa.tiposMemoriaSoportados?.includes(ram.tipoMemoria) ? 'Compatible' : 'No compatible'}
            </strong>
          </div>
        </article>
      </section>
    </main>
  )

}