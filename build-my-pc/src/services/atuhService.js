import { apiRequest } from './api';

export async function iniciarSesion(username, password) {
    const respuesta = await apiRequest('/api/v1/auth', {
        method: 'POST',
        body: JSON.stringify({ username, password })
    });

    localStorage.setItem('token', respuesta.token);

    return respuesta;
}