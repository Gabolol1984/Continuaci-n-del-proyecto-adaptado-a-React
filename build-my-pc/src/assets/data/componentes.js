/* ==========================================================================
   INVENTARIO DE COMPONENTES DE HARDWARE SIMULADOS
   ========================================================================== */

export const inventarioComponentes = [
  {
    id: "cpu-001",
    marca: "Intel",
    modelo: "Core i7-13700K",
    tipo: "CPU",
    precio: 360000,
    socket: "LGA1700",
    tdp: 125,
    descripcion: "Procesador de alto rendimiento con 16 núcleos y 24 hilos.",
    imagen: "/img/producto1.jpg",
    descontinuado: false,
    especificaciones: {
      "Núcleos / Hilos": "16 núcleos (8P + 8E) / 24 hilos",
      "Frecuencia Base": "3.40 GHz",
      "Frecuencia Turbo": "Hasta 5.40 GHz",
      "Socket": "LGA1700",
      "TDP / Consumo": "125W (Base) / 253W (Turbo)",
      "Gráficos Integrados": "Intel UHD Graphics 770"
    }
  },
  {
    id: "ram-001",
    marca: "Kingston",
    modelo: "Fury Beast 16GB DDR5",
    tipo: "RAM",
    precio: 64990,
    tipoMemoria: "DDR5",
    capacidadGB: 16,
    frecuenciaMHz: 5600,
    descripcion: "Memoria RAM optimizada para la plataforma de última generación.",
    imagen: "/img/producto2.jpg",
    descontinuado: false,
    especificaciones: {
      "Tipo de memoria": "DDR5",
      "Capacidad": "16 GB (1 x 16GB)",
      "Frecuencia": "5600 MHz",
      "Latencia": "CL40",
      "Voltaje": "1.25V",
      "Formato": "UDIMM"
    }
  },
  {
    id: "ssd-001",
    marca: "Kingston",
    modelo: "NV2 1TB NVMe M.2",
    tipo: "Almacenamiento",
    precio: 68990,
    capacidadGB: 1000,
    descripcion: "Almacenamiento NVMe PCIe 4.0 de alta velocidad para juegos.",
    imagen: "/img/producto3.jpg",
    descontinuado: false,
    especificaciones: {
      "Formato": "M.2 2280",
      "Interfaz": "PCIe 4.0 x4 NVMe",
      "Capacidad": "1 TB (1000 GB)",
      "Lectura Secuencial": "Hasta 3500 MB/s",
      "Escritura Secuencial": "Hasta 2100 MB/s"
    }
  },
  {
    id: "gpu-001",
    marca: "NVIDIA",
    modelo: "GeForce RTX 3080 10GB",
    tipo: "GPU",
    precio: 649990,
    vramGB: 10,
    tdp: 320,
    descripcion: "Tarjeta gráfica para gaming 4K y procesamiento pesado.",
    imagen: "/img/producto4.jpg",
    descontinuado: false,
    especificaciones: {
      "VRAM": "10 GB GDDR6X",
      "Bus de memoria": "320-bit",
      "Núcleos CUDA": "8704",
      "Consumo (TDP)": "320 Watts",
      "Conectores de poder": "2x 8-pin",
      "Salidas de video": "3x DisplayPort 1.4a, 1x HDMI 2.1"
    }
  },
  {
    id: "mb-001",
    marca: "ASUS",
    modelo: "TUF Gaming Z790-Plus",
    tipo: "Placa",
    precio: 249990,
    socket: "LGA1700",
    tiposMemoriaSoportados: ["DDR5"],
    maxRamGB: 128,
    descripcion: "Placa madre robusta con soporte para memorias DDR5 y PCIe 5.0.",
    imagen: "/img/producto5.jpg",
    descontinuado: false,
    especificaciones: {
      "Socket": "LGA1700 (Intel 12ª/13ª/14ª Gen)",
      "Formato": "ATX",
      "Chipset": "Intel Z790",
      "Memorias Soportadas": "DDR5 hasta 7200+(OC) MHz",
      "Capacidad Máx. RAM": "128 GB (4 ranuras)",
      "Ranuras PCIe": "1x PCIe 5.0 x16, 1x PCIe 4.0 x16"
    }
  },
  {
    id: "psu-001",
    marca: "Corsair",
    modelo: "RM850x 850W 80+ Gold",
    tipo: "Fuente",
    precio: 139990,
    potenciaWatts: 850,
    certificacion: "80 Plus Gold",
    descripcion: "Fuente de poder modular eficiente para configuraciones avanzadas.",
    imagen: "/img/producto6.jpg",
    descontinuado: false,
    especificaciones: {
      "Potencia": "850 Watts continuos",
      "Certificación": "80 PLUS Gold (Eficiencia >90%)",
      "Modularidad": "Completamente modular",
      "Tamaño del ventilador": "135 mm con rodamiento levitación magnética",
      "Protecciones": "OVP, UVP, SCP, OTP, OPP"
    }
  },
  {
    id: "gpu-002",
    marca: "AMD",
    modelo: "Radeon RX 580 8GB",
    tipo: "GPU",
    precio: 110000,
    vramGB: 8,
    tdp: 185,
    descripcion: "Componente descontinuado listado solo como referencia.",
    imagen: "/img/producto7.jpg",
    descontinuado: true,
    especificaciones: {
      "VRAM": "8 GB GDDR5",
      "Bus de memoria": "256-bit",
      "Consumo (TDP)": "185 Watts",
      "Estado": "Descontinuado"
    }
  },
  {
    id: "cpu-002",
    marca: "AMD",
    modelo: "Ryzen 7 7700X",
    tipo: "CPU",
    precio: 350000,
    socket: "AM5",
    tdp: 105,
    descripcion: "Procesador de alto rendimiento con 8 núcleos y 16 hilos.",
    imagen: "/img/producto8.jpg",
    descontinuado: false,
    especificaciones: {
      "Núcleos / Hilos": "8 núcleos / 16 hilos",
      "Frecuencia Base": "4.5 GHz",
      "Frecuencia Turbo": "Hasta 5.4 GHz",
      "Socket": "AM5",
      "TDP": "105 Watts",
      "Arquitectura": "Zen 4 (5nm)"
    }
  }
];

// Formateador de moneda en Pesos Chilenos (CLP)
export function formatearCLP(valor) {
  if (typeof valor !== "number" || isNaN(valor)) return "$0";
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP"
  }).format(valor);
}

// Función para obtener un componente por ID
export function obtenerComponentePorId(id) {
  return inventarioComponentes.find(c => c.id === id);
}

// Reglas técnicas de compatibilidad
export function evaluarCompatibilidadBuild(cpu, placa, ram, gpu, fuente) {
  // Verificación de componentes completos
  if (!cpu || !placa || !ram || !gpu || !fuente) {
    return {
      completa: false,
      compatible: null,
      estadoTexto: "Borrador (Incompleto)",
      motivo: "Debes seleccionar los 5 componentes esenciales para validar la Build.",
      wattsBase: 0,
      wattsMargen: 0,
      total: 0
    };
  }

  // Cálculo de consumo eléctrico (50W base + CPU + GPU)
  const wattsBase = 50 + (cpu.tdp || 0) + (gpu.tdp || 0);
  const wattsMargen = Math.round(wattsBase * 1.2);
  const total = cpu.precio + placa.precio + ram.precio + gpu.precio + fuente.precio;

  // 1. Regla Socket CPU vs Placa Madre
  if (cpu.socket !== placa.socket) {
    return {
      completa: true,
      compatible: false,
      estadoTexto: "Incompatible",
      motivo: `El socket del CPU (${cpu.socket}) no coincide con el socket de la placa (${placa.socket}).`,
      detalles: {
        socket: { compatible: false, texto: `CPU ${cpu.socket} no coincide con Placa ${placa.socket}` },
        ram: { compatible: placa.tiposMemoriaSoportados?.includes(ram.tipoMemoria), texto: `Placa soporta ${placa.tiposMemoriaSoportados?.join(", ")}` },
        fuente: { compatible: fuente.potenciaWatts >= wattsMargen, texto: `Fuente ${fuente.potenciaWatts}W vs Recomendado ${wattsMargen}W` }
      },
      wattsBase,
      wattsMargen,
      total
    };
  }

  // 2. Regla Tipo de Memoria RAM vs Placa Madre
  if (!placa.tiposMemoriaSoportados || !placa.tiposMemoriaSoportados.includes(ram.tipoMemoria)) {
    return {
      completa: true,
      compatible: false,
      estadoTexto: "Incompatible",
      motivo: `La memoria RAM ${ram.tipoMemoria} no es compatible con la placa madre (soporta: ${placa.tiposMemoriaSoportados?.join(", ") || "otro"}).`,
      detalles: {
        socket: { compatible: true, texto: `Ambos usan socket ${cpu.socket}` },
        ram: { compatible: false, texto: `La RAM es ${ram.tipoMemoria} y la placa no la soporta` },
        fuente: { compatible: fuente.potenciaWatts >= wattsMargen, texto: `Fuente ${fuente.potenciaWatts}W vs Recomendado ${wattsMargen}W` }
      },
      wattsBase,
      wattsMargen,
      total
    };
  }

  // 3. Regla Potencia de la Fuente vs Consumo Estimado (+20%)
  if (fuente.potenciaWatts < wattsMargen) {
    return {
      completa: true,
      compatible: false,
      estadoTexto: "Incompatible",
      motivo: `La fuente entrega ${fuente.potenciaWatts} W y el sistema requiere un mínimo de ${wattsMargen} W (consumo de ${wattsBase} W + 20% de margen).`,
      detalles: {
        socket: { compatible: true, texto: `Ambos usan socket ${cpu.socket}` },
        ram: { compatible: true, texto: `La placa soporta ${ram.tipoMemoria}` },
        fuente: { compatible: false, texto: `Se recomiendan ${wattsMargen}W y la fuente entrega ${fuente.potenciaWatts}W` }
      },
      wattsBase,
      wattsMargen,
      total
    };
  }

  // Todo compatible
  return {
    completa: true,
    compatible: true,
    estadoTexto: "Build Validada y Compatible",
    motivo: "Todos los componentes son técnicamente y energéticamente compatibles.",
    detalles: {
      socket: { compatible: true, texto: `Ambos componentes utilizan socket ${cpu.socket}.` },
      ram: { compatible: true, texto: `La placa madre soporta memorias ${ram.tipoMemoria}.` },
      fuente: { compatible: true, texto: `Fuente de ${fuente.potenciaWatts} W es suficiente para los ${wattsMargen} W recomendados.` }
    },
    wattsBase,
    wattsMargen,
    total
  };
}
