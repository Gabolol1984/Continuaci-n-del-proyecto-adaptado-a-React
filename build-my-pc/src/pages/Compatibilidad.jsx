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
    </main>
  )

}