import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  login as loginService,
  register as registerService,
} from '../services/auth.service';
import {
  getUser,
  saveSession,
  clearSession,
} from '../services/auth.storage';

export type ModalTab = 'login' | 'register';

export interface AuthContextType {
  user: AuthResponse | null;
  login: (payload: LoginRequest) => Promise<AuthResponse>;
  register: (payload: RegisterRequest) => Promise<AuthResponse>;
  logout: () => void;
  isModalOpen: boolean;
  modalTab: ModalTab;
  openModal: (tab?: ModalTab) => void;
  closeModal: () => void;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  login: async () => ({ token: '', tokenType: 'Bearer', username: '', roles: [] }),
  register: async () => ({ token: '', tokenType: 'Bearer', username: '', roles: [] }),
  logout: () => {},
  isModalOpen: false,
  modalTab: 'login',
  openModal: () => {},
  closeModal: () => {},
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Hidrata desde storage directamente en la inicialización
  const [user, setUser] = useState<AuthResponse | null>(() => getUser());
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalTab, setModalTab] = useState<ModalTab>('login');

  const login = async (payload: LoginRequest): Promise<AuthResponse> => {
    const response = await loginService(payload);
    saveSession(response);
    setUser(response);
    return response;
  };

  const register = async (payload: RegisterRequest): Promise<AuthResponse> => {
    const response = await registerService(payload);
    saveSession(response);
    setUser(response);
    return response;
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  const openModal = (tab: ModalTab = 'login') => {
    setModalTab(tab);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isModalOpen,
        modalTab,
        openModal,
        closeModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    return defaultAuthContext;
  }
  return context;
}
