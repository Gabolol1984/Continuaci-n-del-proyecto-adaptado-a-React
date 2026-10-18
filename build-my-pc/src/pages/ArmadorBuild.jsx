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
    </main>
  );
}
