import { getToken, clearSession } from './auth.storage';

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8082').replace(/\/$/, '');

export async function obtenerUsuarios() {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}/api/v1/usuarios`, {
    method: 'GET',
    headers,
  });

  const data = response.status === 204 ? [] : await response.json().catch(() => null);

  if (response.status === 401 && token) {
    clearSession();
    window.dispatchEvent(new Event('sesion-expirada'));
  }

  if (!response.ok) {
    const msg =
      data?.message ||
      data?.detail ||
      data?.error ||
      (response.status === 403
        ? 'No tienes permisos de administrador para ver los usuarios.'
        : `Error al cargar usuarios (${response.status})`);
    throw new Error(msg);
  }

  return Array.isArray(data) ? data : [];
}

export const obtenerUsuario = obtenerUsuarios;
