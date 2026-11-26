import { AuthResponse } from './auth.service';

const STORAGE_KEY = 'auth';

function tokenVencido(token: string): boolean {
  try {
    const payload = token.split('.')[1];
    if (!payload) return true;
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const claims = JSON.parse(atob(base64));
    return typeof claims.exp !== 'number' || claims.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

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
  return getUser()?.token || null;
}

export function getUser(): AuthResponse | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const auth = JSON.parse(raw) as AuthResponse;
    if (!auth?.token || tokenVencido(auth.token)) {
      clearSession();
      window.dispatchEvent(new Event('sesion-expirada'));
      return null;
    }
    return auth;
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

export function getRolesFromUser(user: any): string[] {
  if (!user) return [];
  if (Array.isArray(user.roles)) return user.roles;
  if (Array.isArray(user.usuario?.roles)) return user.usuario.roles;

  const token = user.token;
  if (typeof token === 'string' && token.includes('.')) {
    try {
      const payload = token.split('.')[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const claims = JSON.parse(atob(base64));
      if (Array.isArray(claims.roles)) return claims.roles;
    } catch {
      return [];
    }
  }
  return [];
}
