
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, MapPin, Calendar, Clock, Package, Phone, MessageCircle, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MeusFretes = () => {
  const { user } = useAuth();
  const [filtroStatus, setFiltroStatus] = useState('todos');

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p>Você precisa estar logado para acessar esta página.</p>
            <Link to="/login">
              <Button className="mt-4">Fazer Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const fretes = [
    {
      id: 1,
      freteiro: "ENTREGAMOS Frete Carga",
      origem: "São Paulo, SP",
      destino: "Santos, SP",
      data: "2025-01-30",
      horario: "14:00",
      preco: "R$ 150,00",
      status: "agendado",
      descricao: "Mudança residencial",
      telefone: "(11) 9999-1234"
    },
    {
      id: 2,
      freteiro: "Alexandre Transportes",
      origem: "Guarulhos, SP",
      destino: "Campinas, SP",
      data: "2025-01-28",
      horario: "09:00",
      preco: "R$ 120,00",
      status: "em_andamento",
      descricao: "Eletrodomésticos",
      telefone: "(11) 9999-5678"
    },
    {
      id: 3,
      freteiro: "Total Fretes SP",
      origem: "São Paulo, SP",
      destino: "Rio de Janeiro, RJ",
      data: "2025-01-25",
      horario: "08:00",
      preco: "R$ 450,00",
      status: "concluido",
      descricao: "Documentos empresariais",
      telefone: "(11) 9999-3456"
    }
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'agendado':
        return { 
          label: 'Agendado', 
          color: 'bg-blue-100 text-blue-800', 
          icon: <Calendar className="h-4 w-4" /> 
        };
      case 'em_andamento':
        return { 
          label: 'Em Andamento', 
          color: 'bg-yellow-100 text-yellow-800', 
          icon: <AlertCircle className="h-4 w-4" /> 
        };
      case 'concluido':
        return { 
          label: 'Concluído', 
          color: 'bg-green-100 text-green-800', 
          icon: <CheckCircle className="h-4 w-4" /> 
        };
      case 'cancelado':
        return { 
          label: 'Cancelado', 
          color: 'bg-red-100 text-red-800', 
          icon: <XCircle className="h-4 w-4" /> 
        };
      default:
        return { 
          label: 'Desconhecido', 
          color: 'bg-gray-100 text-gray-800', 
          icon: <AlertCircle className="h-4 w-4" /> 
        };
    }
  };

  const fretesFiltrados = filtroStatus === 'todos' 
    ? fretes 
    : fretes.filter(frete => frete.status === filtroStatus);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3 group hover:scale-105 transition-transform duration-300">
              <Truck className="h-10 w-10 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Busca Já</span>
            </Link>
            <Link to="/perfil">
              <Avatar className="h-12 w-12 cursor-pointer hover:ring-4 hover:ring-blue-300 transition-all duration-300 border-2 border-blue-200">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Meus Fretes</h1>
          <p className="text-xl text-gray-600">Acompanhe o status dos seus fretes contratados</p>
        </div>

        {/* Filtros */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            {[
              { value: 'todos', label: 'Todos' },
              { value: 'agendado', label: 'Agendados' },
              { value: 'em_andamento', label: 'Em Andamento' },
              { value: 'concluido', label: 'Concluídos' },
              { value: 'cancelado', label: 'Cancelados' }
            ].map((filtro) => (
              <Button
                key={filtro.value}
                variant={filtroStatus === filtro.value ? "default" : "outline"}
                onClick={() => setFiltroStatus(filtro.value)}
                className={`rounded-2xl px-6 py-3 font-semibold transition-all duration-300 ${
                  filtroStatus === filtro.value 
                    ? "bg-blue-600 text-white" 
                    : "border-2 border-gray-300 hover:border-blue-600"
                }`}
              >
                {filtro.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Lista de Fretes */}
        {fretesFiltrados.length === 0 ? (
          <Card className="shadow-xl border-0 rounded-3xl">
            <CardContent className="p-12 text-center">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum frete encontrado</h3>
              <p className="text-gray-600 mb-6">
                {filtroStatus === 'todos' 
                  ? 'Você ainda não contratou nenhum frete.' 
                  : `Não há fretes com status "${filtroStatus}".`}
              </p>
              <Link to="/">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-2xl px-8 py-3">
                  Contratar Primeiro Frete
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {fretesFiltrados.map((frete) => {
              const statusInfo = getStatusInfo(frete.status);
              return (
                <Card key={frete.id} className="shadow-xl border-0 rounded-3xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="flex items-center space-x-3 mb-4">
                          <h3 className="text-2xl font-bold text-gray-900">{frete.freteiro}</h3>
                          <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold ${statusInfo.color}`}>
                            {statusInfo.icon}
                            <span>{statusInfo.label}</span>
                          </span>
                        </div>
                        <p className="text-gray-600 text-lg">{frete.descricao}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-green-600">{frete.preco}</div>
                        <div className="text-sm text-gray-500">#{frete.id.toString().padStart(6, '0')}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                      <div className="bg-blue-50 p-4 rounded-2xl">
                        <div className="flex items-center space-x-3 mb-2">
                          <MapPin className="h-5 w-5 text-blue-600" />
                          <span className="font-semibold text-gray-700">Origem</span>
                        </div>
                        <p className="text-gray-900">{frete.origem}</p>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-2xl">
                        <div className="flex items-center space-x-3 mb-2">
                          <MapPin className="h-5 w-5 text-purple-600" />
                          <span className="font-semibold text-gray-700">Destino</span>
                        </div>
                        <p className="text-gray-900">{frete.destino}</p>
                      </div>

                      <div className="bg-green-50 p-4 rounded-2xl">
                        <div className="flex items-center space-x-3 mb-2">
                          <Calendar className="h-5 w-5 text-green-600" />
                          <span className="font-semibold text-gray-700">Data</span>
                        </div>
                        <p className="text-gray-900">{new Date(frete.data).toLocaleDateString('pt-BR')}</p>
                      </div>

                      <div className="bg-orange-50 p-4 rounded-2xl">
                        <div className="flex items-center space-x-3 mb-2">
                          <Clock className="h-5 w-5 text-orange-600" />
                          <span className="font-semibold text-gray-700">Horário</span>
                        </div>
                        <p className="text-gray-900">{frete.horario}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <Button 
                        variant="outline" 
                        className="border-2 border-green-600 text-green-600 hover:bg-green-50 rounded-2xl px-6 py-3 font-semibold"
                        onClick={() => window.open(`tel:${frete.telefone}`, '_self')}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Ligar Freteiro
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 rounded-2xl px-6 py-3 font-semibold"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Chat
                      </Button>
                      {frete.status === 'agendado' && (
                        <Button 
                          variant="outline" 
                          className="border-2 border-red-600 text-red-600 hover:bg-red-50 rounded-2xl px-6 py-3 font-semibold"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Cancelar
                        </Button>
                      )}
                      {frete.status === 'concluido' && (
                        <Button 
                          variant="outline" 
                          className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-2xl px-6 py-3 font-semibold"
                        >
                          Avaliar Freteiro
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeusFretes;
