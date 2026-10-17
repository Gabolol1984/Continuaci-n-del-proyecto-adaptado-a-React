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
      </section>
    </main>
  )

}