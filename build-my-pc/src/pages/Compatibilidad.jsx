import React, { useMemo } from 'react';
import { evaluarCompatibilidadBuild } from '../data/componentes';

export default function Compatibilidad({ build, setPaginaActual }) {
  const evaluacion = useMemo(() => {
    return evaluarCompatibilidadBuild(build.cpu, build.placa, build.ram, build.gpu, build.fuente);
  }, [build]);

  const { cpu, placa, ram, gpu, fuente } = build; 

}