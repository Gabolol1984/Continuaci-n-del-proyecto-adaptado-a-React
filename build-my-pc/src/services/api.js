
const API_URL = import.meta.env.VITE_API_URL;

export async function apiRequest(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
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
