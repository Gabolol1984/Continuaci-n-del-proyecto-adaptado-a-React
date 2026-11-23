# BuildMyPC - Frontend

Aplicación web desarrollada como Single Page Application (SPA) en React y Vite para la configuración, diagnóstico de compatibilidad, cotización y gestión de componentes de hardware para computadores.

---

## 1. Arquitectura y Tecnologías

- **Framework**: React 19
- **Herramienta de compilación**: Vite 8
- **Lenguaje**: JavaScript (ESModules) y TypeScript
- **Estilos**: CSS nativo estructurado mediante variables personalizadas (`estilos.css`)
- **Gestión de estado global**: React Context API (`AuthContext`)
- **Persistencia en cliente**: Web Storage API (`localStorage`)
- **Control de calidad y pruebas**: Oxlint, Karma, Jasmine, Testing Library

---

## 2. Estructura del Proyecto

```text
build-my-pc/
├── index.html                   # Documento base de la Single Page Application
├── package.json                 # Dependencias del proyecto y scripts de ejecución
├── vite.config.js               # Configuración del entorno y plugins de Vite
├── public/
│   └── img/                     # Recursos gráficos, imágenes de hardware y esquemas
├── src/
│   ├── main.jsx                 # Punto de entrada de la aplicación, configuración de React DOM y AuthProvider
│   ├── App.jsx                  # Componente contenedor principal, controlador de navegación y estado de Build
│   ├── index.css                # Reglas base y variables de tema claro/oscuro
│   ├── data/
│   │   └── componentes.js       # Base de datos local de componentes de hardware y reglas de compatibilidad
│   ├── context/
│   │   └── AuthContext.tsx      # Contexto y proveedor global de autenticación y control del modal
│   ├── services/
│   │   ├── api.js               # Cliente HTTP base con inyección automática de cabeceras de autorización JWT
│   │   ├── auth.service.ts      # Peticiones al backend para inicio de sesión y registro de usuarios
│   │   ├── auth.storage.ts      # Capa de abstracción para lectura y escritura de sesión en localStorage
│   │   ├── usuarioService.js    # Gestión de usuarios en el backend
│   │   ├── cpuService.js        # Operaciones sobre catálogo de procesadores
│   │   ├── gpuService.js        # Operaciones sobre catálogo de tarjetas de video
│   │   ├── ramService.js        # Operaciones sobre catálogo de memorias RAM
│   │   ├── motherboardService.js# Operaciones sobre catálogo de placas madre
│   │   ├── powerSupplyService.js# Operaciones sobre catálogo de fuentes de poder
│   │   ├── buildService.js      # Persistencia y consulta de builds completas
│   │   └── cotizacionService.js # Envío y recuperación de cotizaciones
│   ├── components/
│   │   ├── Navbar.jsx           # Barra de navegación principal, estado de sesión y acceso a vistas
│   │   ├── AuthModal.tsx        # Modal con pestañas de Login y Registro, formularios compartidos
│   │   ├── ProductCard.jsx      # Tarjeta para visualización individual de producto en el catálogo
│   │   ├── FloatingButton.jsx   # Botón de acceso directo flotante
│   │   └── Footer.jsx           # Pie de página institucional y enlaces secundarios
│   ├── pages/
│   │   ├── Inicio.jsx           # Portada principal, presentación del sistema y selección de rol
│   │   ├── Catalogo.jsx         # Catálogo con filtrado por categoría, precio y búsqueda por texto
│   │   ├── ArmadorBuild.jsx     # Ensamblador de componentes, cálculo de TDP y validación de reglas
│   │   ├── Compatibilidad.jsx   # Diagnóstico exhaustivo de compatibilidad física y eléctrica
│   │   ├── Cotizacion.jsx       # Resumen comercial, cálculo en CLP y generación de comprobante
│   │   ├── DetalleProducto.jsx  # Ficha técnica detallada por componente individual
│   │   ├── Mantencion.jsx       # Vista de soporte y estado en desarrollo
│   │   ├── LoginPage.tsx        # Vista dedicada para inicio de sesión
│   │   └── RegisterPage.tsx     # Vista dedicada para creación de cuenta
│   └── styles/
│       └── estilos.css          # Definición de variables, paleta cromática, layouts y componentes
└── README.md                    # Documentación del sistema
```

---

## 3. Funcionamiento del Frontend

### 3.1. Enrutamiento y Navegación SPA
La aplicación opera como una Single Page Application controlada por el estado interno `paginaActual` dentro de `App.jsx`, coordinado con la History API del navegador (`window.history.pushState` y evento `popstate`):
- Soporta acceso directo y botones de navegación hacia las rutas `/login`, `/register`, `/catalogo`, `/builds`, `/compatibilidad`, `/cotizacion` e `/inicio`.
- Realiza scroll automático hacia la parte superior de la página en cada transición de vista.
- La barra de navegación (`Navbar.jsx`) permanece presente en todas las vistas de la aplicación, permitiendo cambiar de sección o autenticarse en cualquier momento.

### 3.2. Módulo de Autenticación y Sesión
El sistema implementa una arquitectura desacoplada en tres niveles:

1. **Capa de Servicios y Almacenamiento (`auth.service.ts` y `auth.storage.ts`)**:
   - `login(payload)` y `register(payload)`: envían peticiones `POST` en formato JSON a los endpoints del backend configurados mediante la variable de entorno `VITE_API_URL`.
   - `auth.storage.ts`: administra el almacenamiento de la sesión activa en `localStorage` bajo la clave `auth` (y sincroniza el token en la clave `token`), proveyendo funciones para guardar sesión, recuperar token, obtener usuario activo, verificar autenticación y cerrar sesión.
   - Parsea las respuestas del servidor para capturar y propagar los mensajes de error (códigos HTTP 400, 401, 409 o fallos de red).

2. **Capa de Contexto (`AuthContext.tsx`)**:
   - Inicializa el estado `user` leyendo directamente desde `localStorage` al montar la aplicación para evitar parpadeos de interfaz.
   - Expone los métodos `login`, `register` y `logout`.
   - Administra el estado global del modal de autenticación (`isModalOpen`, `modalTab`, `openModal`, `closeModal`) permitiendo abrir el modal en el tab deseado desde cualquier componente.

3. **Capa de Interfaz (`AuthModal.tsx`, `LoginPage.tsx`, `RegisterPage.tsx`, `Navbar.jsx`)**:
   - **FormLogin**: validación de obligatoriedad de campos `username` y `password`, gestión de estado de carga con deshabilitación de controles y despliegue de alertas de error.
   - **FormRegister**: validación de formato (longitud mínima de 4 caracteres para contraseña y coincidencia entre contraseña y confirmación), previniendo envíos con datos inválidos.
   - **AuthModal**: interfaz flotante modal con conmutador entre "Iniciar sesión" y "Crear cuenta", permitiendo autenticarse sin perder la vista actual.
   - **Navbar**: detecta la presencia del usuario autenticado; en caso de no existir sesión, muestra los botones "Iniciar sesión" y "Crear cuenta"; con sesión activa, muestra el saludo personalizado con el nombre de usuario y el botón "Cerrar sesión".

### 3.3. Gestión del Armador de Computadores (Build)
El estado de la máquina en construcción se administra a nivel raíz en `App.jsx` y se sincroniza automáticamente con `localStorage` bajo la clave `buildSeleccionada`.

- **Componentes admitidos**: CPU, Placa Madre, Memoria RAM, Tarjeta de Video (GPU) y Fuente de Poder.
- **Flujo de selección**: los componentes pueden ser incorporados directamente desde el catálogo interactivo o desde la vista de detalle de cada producto.
- **Cálculo de consumo energético (Watts)**:
  - Consumo base del sistema: 50W.
  - Consumo total: `50W + TDP CPU + TDP GPU`.
  - Margen de seguridad recomendado: se calcula agregando un 20% al consumo total estimado (`consumo * 1.20`).
- **Validación técnica de compatibilidad**:
  - Comparación del socket del procesador frente al socket soportado por la placa madre.
  - Comprobación del estándar de memoria (DDR4, DDR5) entre los módulos RAM y la placa madre.
  - Verificación de la potencia nominal de la fuente de poder contra el consumo total requerido y el margen de seguridad.

### 3.4. Diagnóstico de Compatibilidad
La vista `Compatibilidad.jsx` evalúa el estado de las piezas asignadas a la build actual:
- Analiza cada regla de compatibilidad de manera individual y emite diagnósticos visuales (compatible, incompatible, faltante).
- Si la configuración presenta incompatibilidades técnicas graves, bloquea la posibilidad de avanzar al proceso de cotización formal.

### 3.5. Catálogo de Productos y Búsqueda Reactiva
La vista `Catalogo.jsx` permite explorar el inventario de hardware mediante:
- Búsqueda en tiempo real por texto que evalúa coincidencias en marca, modelo y descripción.
- Filtrado por tipo de componente mediante selectores de categoría.
- Filtrado por rango de precios numéricos con validación cruzada (el precio mínimo no puede exceder al máximo).
- Identificación de productos descontinuados con bloqueo de acción de compra/armado.
- Enlace directo a la ficha técnica de producto individual (`DetalleProducto.jsx`).

### 3.6. Sistema de Cotización
La vista `Cotizacion.jsx` procesa los componentes seleccionados:
- Consolida los precios y genera el cálculo del subtotal en pesos chilenos (formato monetario CLP).
- Captura los datos del cliente mediante un formulario validado.
- Genera una orden de cotización con identificador único basado en marca de tiempo (`timestamp`), fecha de emisión y estado.
- Almacena el registro histórico en `localStorage`.

---

## 4. Comunicación con el Backend y Variables de Entorno

El cliente HTTP base (`src/services/api.js`) centraliza la configuración de red y las cabeceras comunes:
- Lee la URL base del backend desde la variable de entorno `VITE_API_URL` (con valor por defecto `http://localhost:8080`).
- Si existe un token JWT en el almacenamiento local, inyecta automáticamente la cabecera `Authorization: Bearer <token>` en todas las peticiones protegidas.

### Configuración de Variables de Entorno
Crear un archivo `.env` o `.env.local` en la raíz de `build-my-pc/`:

```env
# URL base del Gateway o microservicio de backend
VITE_API_URL=http://localhost:8080
```

Para entorno de producción alojado en Render u otro proveedor:

```env
VITE_API_URL=https://msvc-usuario-buildmypc.onrender.com
```

---

## 5. Instalación y Ejecución

### Requisitos previos
- Node.js versión 18 o superior.
- Gestor de paquetes npm versión 9 o superior.

### Instalación de dependencias
Ejecutar en el directorio `build-my-pc`:
```bash
npm install
```

### Ejecución en entorno de desarrollo
```bash
npm run dev
```
Inicia el servidor local de desarrollo con Hot Module Replacement (HMR).

### Compilación para producción
```bash
npm run build
```
Genera los archivos estáticos optimizados y minificados en el directorio `dist/`.

### Verificación de código (Linter)
```bash
npm run lint
```
Ejecuta el análisis estático de código utilizando Oxlint.
