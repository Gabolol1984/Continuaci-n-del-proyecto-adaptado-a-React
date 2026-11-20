

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export async function apiRequest(path, options = {}) {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // Incorporar JWT automáticamente si existe.
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    });

    const data = response.status === 204
        ? null
        : await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(
            data?.message ||
            data?.error ||
            `Error HTTP: ${response.status}`
        );
    }

    return data;
}
