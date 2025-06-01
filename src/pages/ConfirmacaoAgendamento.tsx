
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, CheckCircle, MapPin, Calendar, User, Mail, Phone, DollarSign } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3">
              <Truck className="h-10 w-10 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Busca Já</span>
            </Link>
            <nav className="flex space-x-8">
              <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Sobre</Link>
              <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Serviços</Link>
              <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Fale Conosco</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Freteiro Info */}
          <div>
            <Card className="shadow-xl border-0 rounded-3xl bg-white">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <img 
                    src="/lovable-uploads/fdcc75fa-537f-4092-bb23-a08a7e2f56e4.png"
                    alt="Fretes Rocha"
                    className="w-full h-48 object-cover rounded-2xl mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Fretes Rocha</h3>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-gray-400 rounded-full" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Somos uma pequena empresa de entrega<br />
                    especializada em mercadorias
                  </p>
                  <p className="text-sm text-gray-600">
                    Data da mudança: Quinta-feira, 10 de Abril de 2025
                  </p>
                </div>

                <div className="space-y-4 text-sm">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    O serviço foi agendado para Quinta-feira, 10 de Abril de 2025
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span>Não será possível reagendar após chegada do motorista</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span>Não será possível troca de horário após confirmação do pedido</span>
                    </div>
                  </div>

                  <div className="pt-6 space-y-3 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Endereço</span>
                      <span className="font-medium">Rua Felix da Cunha, 520</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">E-mail</span>
                      <span className="font-medium">email@gmail.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Número de Telefone</span>
                      <span className="font-medium">+53 99197-8944</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">TOTAL</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-lg">R$465</span>
                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-bold">pago</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 mt-8">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-12 font-semibold">
                    Entrar em contato
                  </Button>
                  <Button variant="outline" className="flex-1 border-2 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-2xl h-12 font-semibold">
                    Cancelar pedido
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Confirmation */}
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Seu agendamento foi confirmado!
              </h1>
              <p className="text-gray-600 mb-8">
                Você receberá uma confirmação por email em breve.
              </p>
              <div className="space-y-4">
                <Link to="/meus-fretes">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-12 font-semibold">
                    Ver Meus Fretes
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-2xl h-12 font-semibold">
                    Voltar ao Início
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Truck className="h-6 w-6 text-blue-600" />
                <span className="font-bold text-gray-900">Busca Já</span>
              </div>
              <p className="text-sm text-gray-600">Fazendo entregas em serviços de alta qualidade desde 2020!</p>
            </div>
            <div className="text-right text-sm text-gray-600">
              <p>Ajuda</p>
              <p>Perguntas Frequentes</p>
              <p>SAC</p>
              <p>Entre em contato</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            Figura © 2025
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConfirmacaoAgendamento;
