
import { apiRequest } from './api';

///rutas provisionales, por seguridad, no debemos permitir que
// cualquier usuario pueda eliminar o modificar cuentas sin autorización.

// Obtener todos los usuarios
export const obtenerUsuarios = () => {
    return apiRequest('/api/v1/usuarios');
};

// Obtener un usuario por ID
export const obtenerUsuario = (id) => {
    return apiRequest(`/api/v1/usuarios/${id}`);
};

// Crear un usuario
export const crearUsuario = (usuario) => {
    return apiRequest('/api/v1/usuarios', {
        method: 'POST',
        body: JSON.stringify(usuario)
    });
};

// Actualizar un usuario
export const actualizarUsuario = (id, usuario) => {
    return apiRequest(`/api/usuarios/${id}`, {
        method: 'PUT',
        body: JSON.stringify(usuario)
    });
};

// Eliminar un usuario
export const eliminarUsuario = (id) => {
    return apiRequest(`/api/usuarios/${id}`, {
        method: 'DELETE'
    });
};
