import { useState } from 'react';

export default function Inicio({ setPaginaActual }) {
  const [rolSeleccionado, setRolSeleccionado] = useState('visitante');
  const [rolConfirmado, setRolConfirmado] = useState('Visitante');

  const manejarCambioRol = (e) => {
    e.preventDefault();
    const nombresRoles = {
      visitante: 'Visitante',
      usuario: 'Usuario',
      tecnico: 'Técnico',
      administrador: 'Administrador'
    };
    setRolConfirmado(nombresRoles[rolSeleccionado] || 'Visitante');
  };

  return (
    <main className="contenedor">
      {/* SECCIÓN HERO */}
      <section className="hero">
        <article>
          <h2>Construye tu PC ideal</h2>
          <p>
            Selecciona tus componentes, crea configuraciones personalizadas
            y revisa la compatibilidad técnica y energética de tu computador.
          </p>
          <button 
            type="button" 
            className="boton-primario"
            onClick={() => setPaginaActual('catalogo')}
          >
            Ver catálogo de componentes
          </button>
        </article>
      </section>

      {/* SECCIÓN DE FUNCIONALIDADES */}
      <section className="funcionalidades">
        <h2>¿Qué puedes hacer en BuildMyPC?</h2>

        <article className="tarjeta">
          <h3>Crear una Build</h3>
          <p>
            Selecciona procesador, tarjeta gráfica, memoria RAM,
            placa madre y fuente de poder para armar tu configuración a la medida.
          </p>
          <button 
            type="button" 
            className="btn-resuelto"
            style={{ width: '100%', marginTop: 'auto' }}
            onClick={() => setPaginaActual('builds')}
          >
            Ir al Armador &rarr;
          </button>
        </article>

        <article className="tarjeta">
          <h3>Revisar Compatibilidad</h3>
          <p>
            Comprueba si los sockets, memorias y potencia energética son compatibles
            entre sí antes de realizar tu compra.
          </p>
          <button 
            type="button" 
            className="btn-resuelto"
            style={{ width: '100%', marginTop: 'auto' }}
            onClick={() => setPaginaActual('compatibilidad')}
          >
            Verificar Reglas &rarr;
          </button>
        </article>

        <article className="tarjeta">
          <h3>Consultar Rendimiento</h3>
          <p>
            Revisa una estimación del consumo en Watts y el rendimiento térmico
            según los componentes seleccionados.
          </p>
          <button 
            type="button" 
            className="btn-plantilla"
            style={{ width: '100%', marginTop: 'auto' }}
            onClick={() => setPaginaActual('mantencion')}
          >
            Módulo de Rendimiento
          </button>
        </article>

        <article className="tarjeta">
          <h3>Solicitar Cotización</h3>
          <p>
            Calcula el precio estimado de tu configuración en pesos chilenos
            y genera tu cotización formal al instante.
          </p>
          <button 
            type="button" 
            className="btn-resuelto"
            style={{ width: '100%', marginTop: 'auto' }}
            onClick={() => setPaginaActual('cotizacion')}
          >
            Cotizar Build &rarr;
          </button>
        </article>
      </section>

      {/* SECCIÓN DE ROLES SIMULADOS */}
      <section className="roles">
        <h2>Seleccionar perfil de prueba</h2>
        <p>
          Durante esta etapa del proyecto los roles son simulados.
          Selecciona un perfil para visualizar las funcionalidades disponibles.
        </p>

        <form onSubmit={manejarCambioRol}>
          <label htmlFor="rolUsuario" style={{ fontWeight: 'bold' }}>
            Selecciona tu rol:
          </label>

          <select
            id="rolUsuario"
            value={rolSeleccionado}
            onChange={(e) => setRolSeleccionado(e.target.value)}
          >
            <option value="visitante">Visitante</option>
            <option value="usuario">Usuario</option>
            <option value="tecnico">Técnico</option>
            <option value="administrador">Administrador</option>
          </select>

          <button type="submit" className="boton-primario">
            Seleccionar perfil
          </button>
        </form>

        <p style={{ marginTop: '16px', fontWeight: 'bold', color: 'var(--primario)' }}>
          Rol actual: {rolConfirmado}
        </p>
      </section>

      {/* INFORMACIÓN DEL SISTEMA Y MAPA */}
      <section className="panel" style={{ marginTop: '48px' }}>
        <h2 style={{ color: 'var(--primario)', marginBottom: '16px' }}>Sobre BuildMyPC</h2>
        <article>
          <h3 style={{ marginBottom: '10px' }}>Configura con confianza</h3>
          <p style={{ color: 'var(--texto-suave)', marginBottom: '12px' }}>
            BuildMyPC es una plataforma interactiva que permite crear configuraciones
            de computadores utilizando hardware de alto rendimiento.
          </p>
          <p style={{ color: 'var(--texto-suave)', marginBottom: '20px' }}>
            Los usuarios pueden revisar compatibilidad técnica, estimación de consumo energético
            y solicitar cotizaciones oficiales en moneda local.
          </p>

          <div className="mapa-contenedor">
            <h4>Nuestra Ubicación Principal</h4>
            <p style={{ color: 'var(--texto-suave)' }}>Visítanos en nuestro taller y centro de pruebas:</p>
            
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d836.1118529145133!2d-71.615551485041!3d-33.044685939063356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2scl!4v1788450507758!5m2!1ses!2scl"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de ubicación de BuildMyPC"
            ></iframe>
          </div>
        </article>
      </section>
    </main>
  );
}