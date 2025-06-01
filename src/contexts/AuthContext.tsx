
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  userType: 'cliente' | 'freteiro';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isFreteiro: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Base de dados mockada para demonstração
const mockUsers = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@teste.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    userType: 'cliente' as const,
    password: '123456'
  },
  {
    id: '2',
    name: 'Carlos Freteiro',
    email: 'freteiro@teste.com',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    userType: 'freteiro' as const,
    password: '123456'
  }
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('Tentando login:', { email, password });
    
    // Simular autenticação
    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password
    );
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      console.log('Login bem-sucedido:', userWithoutPassword);
      return true;
    }
    
    console.log('Login falhou - usuário não encontrado');
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isFreteiro = user?.userType === 'freteiro';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isFreteiro }}>
      {children}
    </AuthContext.Provider>
  );
};
