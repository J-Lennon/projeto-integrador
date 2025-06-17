
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  userType: 'cliente' | 'freteiro';
  // Campos específicos para freteiros
  telefone?: string;
  whatsapp?: string;
  capacidadeMaxima?: number;
  tipoVeiculo?: string;
  areaAtuacao?: string;
  precoKm?: number;
  avaliacaoMedia?: number;
  totalAvaliacoes?: number;
  verificado?: boolean;
  disponivel?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isFreteiro: boolean;
  // Funções preparadas para Supabase
  register: (userData: RegisterData) => Promise<boolean>;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
  refreshUser: () => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  userType: 'cliente' | 'freteiro';
  telefone?: string;
  whatsapp?: string;
  capacidadeMaxima?: number;
  tipoVeiculo?: string;
  areaAtuacao?: string;
  precoKm?: number;
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

// Base de dados mockada - será substituída pela integração Supabase
const mockUsers = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@teste.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    userType: 'cliente' as const,
    password: '123456',
    telefone: '(11) 99999-1234',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Carlos Freteiro',
    email: 'freteiro@teste.com',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    userType: 'freteiro' as const,
    password: '123456',
    telefone: '(11) 98888-5678',
    whatsapp: '(11) 98888-5678',
    capacidadeMaxima: 1500,
    tipoVeiculo: 'Caminhão 3/4',
    areaAtuacao: 'São Paulo e Grande São Paulo',
    precoKm: 2.50,
    avaliacaoMedia: 4.8,
    totalAvaliacoes: 127,
    verificado: true,
    disponivel: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Verificar se há usuário logado no localStorage ao inicializar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Erro ao recuperar usuário do localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('Tentando login:', { email, password });
    
    // TODO: Substituir por autenticação Supabase
    // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password
    );
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      console.log('Login bem-sucedido:', userWithoutPassword);
      return true;
    }
    
    console.log('Login falhou - usuário não encontrado');
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    console.log('Tentando cadastro:', userData);
    
    // TODO: Implementar cadastro com Supabase
    // const { data, error } = await supabase.auth.signUp({
    //   email: userData.email,
    //   password: userData.password,
    //   options: {
    //     data: {
    //       name: userData.name,
    //       userType: userData.userType,
    //       ...userData
    //     }
    //   }
    // });
    
    // Simulação de cadastro (remover quando integrar Supabase)
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      userType: userData.userType,
      telefone: userData.telefone,
      whatsapp: userData.whatsapp,
      capacidadeMaxima: userData.capacidadeMaxima,
      tipoVeiculo: userData.tipoVeiculo,
      areaAtuacao: userData.areaAtuacao,
      precoKm: userData.precoKm,
      avaliacaoMedia: userData.userType === 'freteiro' ? 5.0 : undefined,
      totalAvaliacoes: userData.userType === 'freteiro' ? 0 : undefined,
      verificado: false,
      disponivel: userData.userType === 'freteiro' ? true : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    // TODO: Implementar atualização com Supabase
    // const { data, error } = await supabase
    //   .from('users')
    //   .update(userData)
    //   .eq('id', user.id);
    
    const updatedUser = { 
      ...user, 
      ...userData, 
      updatedAt: new Date().toISOString() 
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return true;
  };

  const refreshUser = async (): Promise<void> => {
    if (!user) return;
    
    // TODO: Buscar dados atualizados do Supabase
    // const { data, error } = await supabase
    //   .from('users')
    //   .select('*')
    //   .eq('id', user.id)
    //   .single();
    
    console.log('Atualizando dados do usuário...');
  };

  const logout = () => {
    // TODO: Implementar logout com Supabase
    // await supabase.auth.signOut();
    
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!user;
  const isFreteiro = user?.userType === 'freteiro';

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated, 
      isFreteiro,
      register,
      updateProfile,
      refreshUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};
