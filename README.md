# BuildMyPC 
---

## Estructura del Proyecto

```text
react-buildmypc/
├── index.html                   # HTML base de la Single Page Application (SPA)
├── package.json                 # Dependencias (React 18, Vite) y scripts
├── vite.config.js               # Configuración del entorno de desarrollo Vite
├── public/
│   └── img/                     # Imágenes de hardware, logo, gifs y botón flotante
├── src/
│   ├── main.jsx                 # Punto de entrada de React (montaje en el DOM)
│   ├── App.jsx                  # Componente raíz y gestión de navegación global
│   ├── data/
│   │   └── componentes.js       # Inventario de hardware y motor de compatibilidad técnica
│   ├── components/
│   │   ├── Navbar.jsx           # Barra de navegación principal responsive
│   │   ├── Footer.jsx           # Pie de página y enlaces secundarios
│   │   ├── FloatingButton.jsx   # Botón flotante que dirige a la sección en construcción
│   │   └── ProductCard.jsx      # Tarjeta interactiva de producto para el catálogo
│   ├── pages/
│   │   ├── Inicio.jsx           # Landing page, roles simulados y mapa interactivo
│   │   ├── Catalogo.jsx         # Catálogo dinámico con búsqueda por texto y filtros de precio
│   │   ├── ArmadorBuild.jsx     # Armador de PC con cálculo de Watts y validación de reglas
│   │   ├── Compatibilidad.jsx   # Diagnóstico técnico detallado de la Build
│   │   ├── Cotizacion.jsx       # Formulario y generación de cotización con persistencia
│   │   ├── DetalleProducto.jsx  # Vista detallada de especificaciones técnicas por producto
│   │   └── Mantencion.jsx       # Sección en desarrollo ("Próximamente")
│   └── styles/
│       └── estilos.css          # Hoja de estilos centralizada compartida
└── README.md                    # Esta guía
```

---


### 1. Requisitos
- Tener instalado **Node.js** (versión 18 o superior).

### 2. Instalación de dependencias
Abre una terminal dentro de la carpeta `react-buildmypc` y ejecuta:
```bash
npm install
```

### 3. Modo de desarrollo (Servidor local)
Para abrir la aplicación en tu navegador:
```bash
npm run dev
```
La aplicación se abrirá en `http://localhost:3000` con recarga rápida en tiempo real (Hot Module Replacement).

### 4. Compilación para producción
Si deseas generar la versión final optimizada para subirla a producción o despliegue:
```bash
npm run build
```
Esto creará una carpeta `dist/` lista para ser desplegada en Vercel, Netlify o GitHub Pages.

---

## Funcionalidades Migradas y Mejoras en React

1. **Catálogo Reactivo:**
   - Búsqueda en tiempo real por texto (marca, modelo, descripción).
   - Filtrado simultáneo por categoría (CPU, GPU, RAM, Placa, Almacenamiento, Fuente).
   - Filtrado por rango de precios con validación interactiva si el mínimo supera al máximo.
   - Manejo de productos descontinuados (bloqueo de agregar al armador).

2. **Armador de PC Inteligente (MisBuilds):**
   - Selección de los 5 componentes obligatorios.
   - Cálculo automático en tiempo real del consumo en Watts: `50W base + TDP CPU + TDP GPU`.
   - Cálculo del margen recomendado del 20% para la fuente de poder.
   - Validación de las reglas técnicas:
     - Socket CPU vs Socket Placa Madre.
     - Tipo de memoria RAM vs compatibilidad de la Placa Madre.
     - Potencia de la fuente de poder vs consumo recomendado.
   - Guardado automático en `localStorage` bajo la clave `buildSeleccionada`.

3. **Diagnóstico de Compatibilidad:**
   - Desglose visual individual de cada comprobación técnica.
   - Bloqueo preventivo de cotizaciones para builds con errores o incompatibilidades.

4. **Sistema de Cotizaciones:**
   - Resumen detallado con cálculo de subtotal en formato moneda chilena (`CLP`).
   - Formulario de contacto con validación de campos obligatorios.
   - Generación de comprobante con ID único (`timestamp`), fecha y estado.
   - Almacenamiento histórico de cotizaciones en `localStorage`.

5. **Vista Específica de Producto:**
   - Página de detalle con especificaciones completas para los componentes y botón de adición directa a la build.

6. **Roles Simulados y Sección en Construcción:**
   - Selector interactivo de rol (Visitante, Usuario, Técnico, Administrador).
   - Botón flotante accesible desde cualquier pantalla para ir a la sección en construcción con su animación original.
