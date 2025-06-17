
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Star } from "lucide-react";

interface FreteCompletedNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  onAvaliar: () => void;
  freteiro: {
    nome: string;
    avatar?: string;
  };
}

const FreteCompletedNotification = ({ 
  isOpen, 
  onClose, 
  onAvaliar, 
  freteiro 
}: FreteCompletedNotificationProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 rounded-3xl overflow-hidden bg-white dark:bg-purple-900/90">
        <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 text-white p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white/20 p-4 rounded-full">
              <CheckCircle className="h-16 w-16 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Frete Concluído!</CardTitle>
            <CardDescription className="text-green-100 dark:text-green-200 text-lg">
              Seu frete foi finalizado com sucesso
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-purple-100 mb-2">
              Frete realizado por {freteiro.nome}
            </h3>
            <p className="text-gray-600 dark:text-purple-300">
              Que tal avaliar o serviço prestado? Sua opinião é muito importante!
            </p>
          </div>

          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 text-lg font-bold border-2 border-gray-300 dark:border-purple-600 hover:border-gray-400 dark:hover:border-purple-400 rounded-2xl"
            >
              Agora não
            </Button>
            <Button
              onClick={onAvaliar}
              className="flex-1 h-12 text-lg font-bold bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-yellow-600 dark:to-orange-600 hover:from-yellow-600 hover:to-orange-600 dark:hover:from-yellow-700 dark:hover:to-orange-700 rounded-2xl shadow-xl flex items-center justify-center gap-2"
            >
              <Star className="h-5 w-5" />
              Avaliar Frete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreteCompletedNotification;
