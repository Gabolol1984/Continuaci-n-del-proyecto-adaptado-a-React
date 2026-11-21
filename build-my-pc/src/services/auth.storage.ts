import { AuthResponse } from './auth.service';

const STORAGE_KEY = 'auth';

export function saveSession(auth: AuthResponse): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
    if (auth?.token) {
      localStorage.setItem('token', auth.token);
    }
  } catch (error) {
    console.error('Error al guardar la sesión en localStorage:', error);
  }
}

export function getToken(): string | null {
  const user = getUser();
  return user?.token || localStorage.getItem('token') || null;
}

export function getUser(): AuthResponse | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthResponse;
  } catch (error) {
    console.error('Error al obtener la sesión de localStorage:', error);
    return null;
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Error al limpiar la sesión de localStorage:', error);
  }
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
