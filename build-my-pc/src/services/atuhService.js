import { apiRequest } from './api';

export async function iniciarSesion(username, password) {
    const respuesta = await apiRequest('/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
    });

    return respuesta;
}
