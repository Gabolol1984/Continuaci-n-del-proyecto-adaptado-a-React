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

}