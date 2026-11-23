
import { apiRequest } from './api';

export const obtenerUsuario = (options = {}) => {
    return apiRequest('/api/v1/usuarios', options);
};
