
import { getToken, clearSession } from './auth.storage';

const API_URL = (
    import.meta.env.VITE_API_URL || 'http://localhost:8080'
).replace(/\/$/, '');

function mensajeError(data, status) {
    if (data?.message) return data.message;
    if (data?.detail) return data.detail;
    if (data?.error) return data.error;

    if (data && typeof data === 'object') {
        const validation = Object.values(data)
            .filter((value) => typeof value === 'string');

        if (validation.length) return validation.join('. ');
    }

    return `Error HTTP: ${status}`;
}

export async function apiRequest(path, options = {}) {
    const esRutaPublica =
        path.includes('/auth/register') ||
        path.includes('/auth/login');

    const token = esRutaPublica ? null : getToken();

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // Solo enviar JWT en peticiones que requieren autenticación.
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    } else {
        delete headers.Authorization;
    }

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    });

    const data = response.status === 204
        ? null
        : await response.json().catch(() => null);

    if (response.status === 401 && token) {
        clearSession();
        window.dispatchEvent(new Event('sesion-expirada'));
    }

    if (!response.ok) {
        throw new Error(mensajeError(data, response.status));
    }

    return data;
}
