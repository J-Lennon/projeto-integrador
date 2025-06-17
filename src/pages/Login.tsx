
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo de volta!",
        });
        
        // Verificar se é freteiro para redirecionar adequadamente
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        if (user?.userType === 'freteiro') {
          navigate('/dashboard-freteiro');
        } else {
          navigate('/');
        }
      } else {
        toast({
          title: "Erro no login",
          description: "Email ou senha incorretos.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-black dark:to-gray-800 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-gray-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,black,rgba(0,0,0,0.6))] -z-10" />
      
      <Card className="w-full max-w-md shadow-2xl border-0 rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-8 pt-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-purple-600 dark:to-pink-600 p-4 rounded-2xl shadow-lg">
              <Truck className="h-12 w-12 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-purple-600 dark:to-pink-600 bg-clip-text text-transparent">
            Bem-vindo de volta
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-gray-300 text-lg mt-2">
            Entre na sua conta para continuar
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-gray-200">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-gray-500" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="pl-12 h-14 rounded-2xl border-2 border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-purple-500 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-gray-200">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-gray-500" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  className="pl-12 pr-12 h-14 rounded-2xl border-2 border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-purple-500 transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-purple-600 dark:to-pink-600 hover:from-blue-700 hover:to-indigo-700 dark:hover:from-purple-700 dark:hover:to-pink-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-slate-200 dark:border-gray-600">
            <h4 className="font-bold text-slate-800 dark:text-gray-200 mb-4 text-center">👨‍💼 Contas de Teste</h4>
            <div className="space-y-3 text-sm">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-slate-200 dark:border-gray-600">
                <p className="font-semibold text-blue-600 dark:text-blue-400">Cliente</p>
                <p className="text-slate-600 dark:text-gray-300">joao@teste.com / 123456</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-slate-200 dark:border-gray-600">
                <p className="font-semibold text-indigo-600 dark:text-purple-400">Freteiro</p>
                <p className="text-slate-600 dark:text-gray-300">freteiro@teste.com / 123456</p>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">Área: São Paulo e Grande São Paulo</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-600 dark:text-gray-300">
              Não tem uma conta?{' '}
              <Link to="/cadastro" className="text-blue-600 dark:text-purple-400 hover:text-blue-700 dark:hover:text-purple-300 font-semibold transition-colors">
                Cadastre-se agora
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
