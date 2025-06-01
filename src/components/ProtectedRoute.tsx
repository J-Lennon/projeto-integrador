
import React from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Shield } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireFreteiro?: boolean;
}

const ProtectedRoute = ({ children, requireFreteiro = false }: ProtectedRouteProps) => {
  const { isAuthenticated, isFreteiro } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 rounded-3xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <div className="bg-gradient-to-br from-red-500 to-pink-500 p-6 rounded-2xl shadow-lg inline-block mb-6">
              <Shield className="h-16 w-16 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Acesso Restrito</h2>
            <p className="text-slate-600 mb-6">Você precisa estar logado para acessar esta página.</p>
            <Button 
              onClick={() => navigate('/login')}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-2xl h-12 font-semibold"
            >
              Fazer Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (requireFreteiro && !isFreteiro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 rounded-3xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-2xl shadow-lg inline-block mb-6">
              <Truck className="h-16 w-16 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Área Exclusiva</h2>
            <p className="text-slate-600 mb-6">Esta área é exclusiva para freteiros cadastrados.</p>
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/cadastro-freteiro')}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-2xl h-12 font-semibold"
              >
                Cadastrar como Freteiro
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/')}
                className="w-full border-2 border-slate-300 hover:border-blue-500 rounded-2xl h-12 font-semibold"
              >
                Voltar ao Início
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
