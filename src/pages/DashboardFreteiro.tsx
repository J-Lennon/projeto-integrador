import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Phone, MessageCircle, MapPin, Clock, Package, User, Star, Calendar, DollarSign, Bell, Settings, LogOut, TrendingUp, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import Chat from "@/components/Chat";

const DashboardFreteiro = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('novos');
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // Mock data - em produção virá da API
  const fretesNovos = [
    {
      id: 1,
      cliente: {
        nome: "Maria Silva",
        telefone: "(11) 99999-9999",
        foto: "https://images.unsplash.com/photo-1494790108755-2616b612b2e5?w=150&h=150&fit=crop&crop=face"
      },
      origem: "Rua das Flores, 123 - São Paulo, SP",
      destino: "Av. Paulista, 456 - São Paulo, SP",
      data: "2025-01-02",
      horario: "14:00",
      descricao: "Mudança completa - móveis de apartamento",
      peso: "200kg",
      valor: "R$ 350,00",
      status: "pendente",
      distancia: "15 km",
      tempo: "45 min"
    },
    {
      id: 2,
      cliente: {
        nome: "João Santos",
        telefone: "(11) 88888-8888",
        foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      origem: "Rua Augusta, 789 - São Paulo, SP",
      destino: "Rua Oscar Freire, 321 - São Paulo, SP",
      data: "2025-01-02",
      horario: "16:30",
      descricao: "Transporte de eletrodomésticos",
      peso: "80kg",
      valor: "R$ 180,00",
      status: "pendente",
      distancia: "8 km",
      tempo: "25 min"
    }
  ];

  const fretesEmAndamento = [
    {
      id: 3,
      cliente: {
        nome: "Ana Costa",
        telefone: "(11) 77777-7777",
        foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      origem: "Shopping Ibirapuera - São Paulo, SP",
      destino: "Rua Vergueiro, 555 - São Paulo, SP",
      data: "2025-01-01",
      horario: "09:00",
      descricao: "Entrega de móveis novos",
      peso: "150kg",
      valor: "R$ 280,00",
      status: "em_andamento",
      distancia: "12 km",
      tempo: "35 min"
    }
  ];

  const handleAceitarFrete = (freteId: number) => {
    toast({
      title: "🎉 Frete aceito!",
      description: "Você aceitou o frete. Entre em contato com o cliente.",
    });
  };

  const handleRecusarFrete = (freteId: number) => {
    toast({
      title: "Frete recusado",
      description: "O frete foi recusado e removido da sua lista.",
      variant: "destructive"
    });
  };

  const openChat = (cliente: any) => {
    setSelectedClient({
      id: cliente.id || '1',
      name: cliente.nome,
      avatar: cliente.foto,
      phone: cliente.telefone
    });
    setChatOpen(true);
  };

  const getFretes = () => {
    switch(activeTab) {
      case 'novos': return fretesNovos;
      case 'andamento': return fretesEmAndamento;
      case 'finalizados': return [];
      default: return fretesNovos;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Premium */}
      <header className="bg-white/80 backdrop-blur-lg shadow-2xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-2xl shadow-lg">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Busca Já
                </span>
                <span className="block text-sm text-indigo-600 font-semibold">Dashboard Freteiro</span>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-blue-50 relative">
                <Bell className="h-5 w-5 text-slate-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-blue-50">
                <Settings className="h-5 w-5 text-slate-600" />
              </Button>
              <Avatar className="h-12 w-12 cursor-pointer hover:ring-4 hover:ring-blue-300 transition-all duration-300 border-2 border-blue-200 shadow-lg">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 font-bold">
                  {user?.name?.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button 
                variant="ghost" 
                onClick={logout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section Premium */}
        <div className="mb-8 relative overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-2">
                Olá, {user?.name}! 👋
              </h1>
              <p className="text-xl text-blue-100">Gerencie seus fretes e mantenha contato com seus clientes</p>
            </div>
          </div>
        </div>

        {/* Stats Cards Premium */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-xl border-0 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-white/10"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Fretes Novos</p>
                  <p className="text-3xl font-bold">{fretesNovos.length}</p>
                  <p className="text-blue-200 text-xs mt-1">+2 hoje</p>
                </div>
                <div className="bg-white/20 p-3 rounded-2xl">
                  <Package className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-white/10"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Em Andamento</p>
                  <p className="text-3xl font-bold">{fretesEmAndamento.length}</p>
                  <p className="text-orange-200 text-xs mt-1">Ativo agora</p>
                </div>
                <div className="bg-white/20 p-3 rounded-2xl">
                  <Clock className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 rounded-3xl bg-gradient-to-br from-green-500 to-green-600 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-white/10"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Finalizados Hoje</p>
                  <p className="text-3xl font-bold">3</p>
                  <p className="text-green-200 text-xs mt-1">Meta: 5/dia</p>
                </div>
                <div className="bg-white/20 p-3 rounded-2xl">
                  <Award className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 rounded-3xl bg-gradient-to-br from-purple-500 to-purple-600 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-white/10"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Ganhos Hoje</p>
                  <p className="text-3xl font-bold">R$ 890</p>
                  <p className="text-purple-200 text-xs mt-1">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +15% vs ontem
                  </p>
                </div>
                <div className="bg-white/20 p-3 rounded-2xl">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Premium */}
        <div className="mb-8">
          <div className="flex space-x-2 bg-white/80 backdrop-blur-lg p-2 rounded-2xl shadow-xl border border-slate-200/50">
            {[
              { id: 'novos', label: 'Fretes Novos', count: fretesNovos.length },
              { id: 'andamento', label: 'Em Andamento', count: fretesEmAndamento.length },
              { id: 'finalizados', label: 'Finalizados', count: 0 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-blue-600'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Fretes List Premium */}
        <div className="space-y-6">
          {getFretes().map((frete) => (
            <Card key={frete.id} className="shadow-2xl border-0 rounded-3xl bg-white/80 backdrop-blur-lg overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02]">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Cliente Info Premium */}
                  <div className="lg:col-span-1">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="relative">
                        <Avatar className="h-16 w-16 border-4 border-blue-200 shadow-lg">
                          <AvatarImage src={frete.cliente.foto} alt={frete.cliente.nome} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 text-lg font-bold">
                            {frete.cliente.nome.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">{frete.cliente.nome}</h3>
                        <p className="text-slate-600">{frete.cliente.telefone}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Button 
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        onClick={() => window.open(`tel:${frete.cliente.telefone}`, '_self')}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Ligar
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                        onClick={() => openChat(frete.cliente)}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Chat
                      </Button>
                    </div>
                  </div>

                  {/* Frete Details */}
                  <div className="lg:col-span-2">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-3">Detalhes do Frete</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded-2xl">
                            <div className="flex items-center space-x-2 mb-2">
                              <Calendar className="h-5 w-5 text-blue-600" />
                              <span className="font-semibold text-gray-700">Data e Horário</span>
                            </div>
                            <p className="text-gray-900">{frete.data} às {frete.horario}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-2xl">
                            <div className="flex items-center space-x-2 mb-2">
                              <Package className="h-5 w-5 text-blue-600" />
                              <span className="font-semibold text-gray-700">Peso</span>
                            </div>
                            <p className="text-gray-900">{frete.peso}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          <MapPin className="h-5 w-5 text-green-600" />
                          <span className="font-semibold text-gray-700">Origem</span>
                        </div>
                        <p className="text-gray-900 mb-4">{frete.origem}</p>
                        
                        <div className="flex items-center space-x-2 mb-3">
                          <MapPin className="h-5 w-5 text-red-600" />
                          <span className="font-semibold text-gray-700">Destino</span>
                        </div>
                        <p className="text-gray-900">{frete.destino}</p>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-2xl">
                        <h5 className="font-semibold text-gray-700 mb-2">Descrição da Carga</h5>
                        <p className="text-gray-900">{frete.descricao}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions Premium */}
                  <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-2xl border border-slate-200/50">
                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                          {frete.valor}
                        </div>
                        <div className="text-sm text-slate-600 bg-white/50 px-3 py-1 rounded-full inline-block">
                          {frete.distancia} • {frete.tempo}
                        </div>
                      </div>

                      <Badge 
                        className={`w-full justify-center mb-6 py-2 text-sm font-semibold rounded-xl ${
                          frete.status === 'pendente' 
                            ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 border border-orange-200' 
                            : 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200'
                        }`}
                      >
                        {frete.status === 'pendente' ? '⏳ Aguardando Resposta' : '🚛 Em Andamento'}
                      </Badge>

                      {frete.status === 'pendente' && (
                        <div className="space-y-3">
                          <Button 
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            onClick={() => handleAceitarFrete(frete.id)}
                          >
                            ✅ Aceitar Frete
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full border-2 border-red-600 text-red-600 hover:bg-red-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                            onClick={() => handleRecusarFrete(frete.id)}
                          >
                            ❌ Recusar
                          </Button>
                        </div>
                      )}

                      {frete.status === 'em_andamento' && (
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                          🏁 Finalizar Frete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State Premium */}
        {getFretes().length === 0 && (
          <Card className="shadow-2xl border-0 rounded-3xl bg-white/80 backdrop-blur-lg">
            <CardContent className="p-12 text-center">
              <div className="bg-gradient-to-br from-slate-100 to-blue-100 p-8 rounded-full inline-block mb-6">
                <Package className="h-16 w-16 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                {activeTab === 'novos' && '🔍 Nenhum frete novo disponível'}
                {activeTab === 'andamento' && '⏳ Nenhum frete em andamento'}
                {activeTab === 'finalizados' && '📊 Nenhum frete finalizado hoje'}
              </h3>
              <p className="text-slate-600 max-w-md mx-auto">
                {activeTab === 'novos' && 'Aguarde novas solicitações de frete aparecerem aqui. Mantenha-se online para receber mais oportunidades!'}
                {activeTab === 'andamento' && 'Aceite um frete para começar a trabalhar e ganhar dinheiro.'}
                {activeTab === 'finalizados' && 'Complete alguns fretes para ver o histórico e suas estatísticas.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Chat Component */}
      {selectedClient && (
        <Chat
          isOpen={chatOpen}
          onClose={() => setChatOpen(false)}
          recipient={selectedClient}
        />
      )}
    </div>
  );
};

export default DashboardFreteiro;
