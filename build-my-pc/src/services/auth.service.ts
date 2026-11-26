export type AuthResponse = {
  token: string;
  tokenType: string;
  username: string;
  roles: string[];
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type RegisterRequest = {
  username: string;
  password: string;
};

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

async function parseBackendError(response: Response): Promise<string> {
  try {
    const data = await response.json();
    if (typeof data === 'string') return data;
    if (data?.message) return data.message;
    if (data?.detail) return data.detail;
    if (data?.error) return data.error;
  } catch {
    // Si no es JSON, intentar texto plano
    try {
      const text = await response.text();
      if (text) return text;
    } catch {
      // Ignorar
    }
  }

  if (response.status === 401) return 'Credenciales invalidas';
  if (response.status === 409) return 'El usuario ya existe';
  if (response.status === 400) return 'Datos o rol inválidos';
  return `Error en la autenticación (${response.status})`;
}

export async function register(payload: RegisterRequest): Promise<AuthResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorMessage = await parseBackendError(response);
    throw new Error(errorMessage);
  }

  return response.json();
}

export async function login(payload: LoginRequest): Promise<AuthResponse> {
  const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: payload.username,
      password: payload.password,
    }),
  });

  if (!response.ok) {
    const errorMessage = await parseBackendError(response);
    throw new Error(errorMessage);
  }

  return response.json();
}
