import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, CheckCircle, MapPin, Calendar, User, Mail, Phone, DollarSign } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ConfirmacaoAgendamento = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { freteiro, formData } = location.state || {};

  if (!freteiro || !formData) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-black dark:via-gray-900 dark:to-black">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-blue-100 dark:bg-black dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-purple-600 dark:to-pink-600 p-2 rounded-xl">
                <Truck className="h-10 w-10 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-purple-600 dark:to-pink-600 bg-clip-text text-transparent">Busca Já</span>
            </Link>
            <nav className="flex space-x-8">
              <Link to="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-purple-400 font-medium">Sobre</Link>
              <Link to="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-purple-400 font-medium">Serviços</Link>
              <Link to="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-purple-400 font-medium">Fale Conosco</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Freteiro Info */}
          <div>
            <Card className="shadow-xl border-0 rounded-3xl bg-white dark:bg-black">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Avatar className="w-48 h-48 mx-auto mb-4 border-4 border-blue-200 dark:border-purple-200">
                    <AvatarImage 
                      src={freteiro.avatar}
                      alt={freteiro.nome}
                      className="object-cover rounded-2xl"
                    />
                    <AvatarFallback className="text-3xl bg-blue-100 text-blue-600 dark:bg-purple-100 dark:text-purple-600">
                      {freteiro.nome.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{freteiro.nome}</h3>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-1 h-1 rounded-full ${i < Math.floor(freteiro.rating) ? 'bg-yellow-400' : 'bg-gray-400 dark:bg-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {freteiro.descricao || 'Somos uma pequena empresa de entrega especializada em mercadorias'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Data da mudança: {new Date(formData.data).toLocaleDateString('pt-BR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>

                <div className="space-y-4 text-sm">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                    O serviço foi agendado para {new Date(formData.data).toLocaleDateString('pt-BR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                      <span>Não será possível reagendar após chegada do motorista</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                      <span>Não será possível troca de horário após confirmação do pedido</span>
                    </div>
                  </div>

                  <div className="pt-6 space-y-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Origem</span>
                      <span className="font-medium dark:text-white">{formData.origem}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Destino</span>
                      <span className="font-medium dark:text-white">{formData.destino}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">E-mail</span>
                      <span className="font-medium dark:text-white">{freteiro.email || 'email@gmail.com'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Número de Telefone</span>
                      <span className="font-medium dark:text-white">{freteiro.telefone}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg dark:text-white">TOTAL</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-lg dark:text-white">{freteiro.preco}</span>
                        <span className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded text-xs font-bold">pago</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 mt-8">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded-2xl h-12 font-semibold">
                    Entrar em contato
                  </Button>
                  <Button variant="outline" className="flex-1 border-2 border-gray-300 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 rounded-2xl h-12 font-semibold">
                    Cancelar pedido
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Confirmation */}
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Seu agendamento foi confirmado!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Você receberá uma confirmação por email em breve.
              </p>
              <div className="space-y-4">
                <Link to="/meus-fretes">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded-2xl h-12 font-semibold">
                    Ver Meus Fretes
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-purple-600 dark:text-purple-400 dark:hover:bg-purple-900/20 rounded-2xl h-12 font-semibold">
                    Voltar ao Início
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 dark:bg-black dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-purple-600 dark:to-pink-600 p-1 rounded">
                  <Truck className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-gray-900 dark:text-white">Busca Já</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Fazendo entregas em serviços de alta qualidade desde 2020!</p>
            </div>
            <div className="text-right text-sm text-gray-600 dark:text-gray-400">
              <p>Ajuda</p>
              <p>Perguntas Frequentes</p>
              <p>SAC</p>
              <p>Entre em contato</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
            Figura © 2025
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConfirmacaoAgendamento;
