
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Star, MapPin, Phone, Clock, DollarSign, User, MessageCircle, Shield, ArrowLeft, Calendar, Award, CheckCircle } from "lucide-react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import Chat from "@/components/Chat";

const PerfilFreteiro = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const freteiro = location.state?.freteiro;
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (!freteiro) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <Card className="dark:bg-gray-900">
          <CardContent className="p-6">
            <p className="dark:text-white">Freteiro não encontrado.</p>
            <Link to="/busca-resultados">
              <Button className="mt-4">Voltar à Busca</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const avaliacoes = [
    {
      id: 1,
      nome: "Carlos Silva",
      rating: 5,
      comentario: "Excelente serviço! Pontual e cuidadoso com a carga.",
      data: "15/01/2025"
    },
    {
      id: 2,
      nome: "Maria Santos",
      rating: 5,
      comentario: "Super recomendo! Muito profissional.",
      data: "12/01/2025"
    },
    {
      id: 3,
      nome: "João Oliveira",
      rating: 4,
      comentario: "Bom atendimento, chegou no horário combinado.",
      data: "08/01/2025"
    }
  ];

  const handleContratarFrete = () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para contratar um frete.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    navigate(`/contratar-frete/${freteiro.id}`, { 
      state: { freteiro }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-black dark:via-gray-900 dark:to-black">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-blue-100 dark:bg-black dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate(-1)}
                className="rounded-xl border-2 border-gray-300 hover:border-blue-600 dark:border-gray-600 dark:hover:border-purple-500 dark:bg-gray-800 dark:text-white"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voltar
              </Button>
              <Link to="/" className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-purple-600 dark:to-pink-600 p-2 rounded-xl">
                  <Truck className="h-10 w-10 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-purple-600 dark:to-pink-600 bg-clip-text text-transparent">Busca Já</span>
              </Link>
            </div>
            {user ? (
              <Link to="/perfil">
                <Avatar className="h-12 w-12 cursor-pointer hover:ring-4 hover:ring-blue-300 dark:hover:ring-purple-300 transition-all duration-300 border-2 border-blue-200 dark:border-purple-200">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-purple-100 dark:text-purple-600 font-bold">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <div className="flex space-x-4">
                <Link to="/cadastro">
                  <Button variant="outline" className="text-blue-600 border-2 border-blue-600 hover:bg-blue-50 dark:text-purple-600 dark:border-purple-600 dark:hover:bg-purple-900/20 rounded-xl px-6 py-3 font-semibold">
                    Cadastrar-se
                  </Button>
                </Link>
                <Link to="/login">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 rounded-xl px-6 py-3 font-semibold">
                    Entrar
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Profile Card */}
        <Card className="shadow-2xl border-0 rounded-3xl overflow-hidden bg-white dark:bg-black mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-purple-600 dark:to-pink-800 text-white p-8">
            <div className="flex items-center space-x-8">
              <Avatar className="h-32 w-32 border-4 border-white">
                <AvatarImage src={freteiro.avatar} alt={freteiro.nome} />
                <AvatarFallback className="text-3xl bg-blue-100 text-blue-600">{freteiro.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-3 flex items-center">
                  {freteiro.nome}
                  {freteiro.verificado && (
                    <Shield className="h-8 w-8 text-green-400 ml-4" />
                  )}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <Star className="h-8 w-8 text-yellow-400 fill-current" />
                  <span className="text-3xl font-bold">{freteiro.rating}</span>
                  <span className="text-xl text-blue-100">{freteiro.ratingText}</span>
                </div>
                <p className="text-xl text-blue-100">{freteiro.descricao}</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold text-green-400 mb-2">{freteiro.preco}</div>
                <div className="text-xl text-blue-100">por frete</div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Vehicle Info */}
            <Card className="shadow-xl border-0 rounded-3xl dark:bg-black">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Truck className="h-6 w-6 text-blue-600 dark:text-purple-400 mr-3" />
                  Informações do Veículo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-2xl">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Tipo de Veículo</h4>
                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{freteiro.veiculo}</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-2xl">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Tempo Estimado</h4>
                    <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{freteiro.tempo}</p>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Especificações</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Capacidade:</span>
                      <span className="font-semibold ml-2 dark:text-white">500kg</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Dimensões:</span>
                      <span className="font-semibold ml-2 dark:text-white">2,3m x 1,5m x 1,7m</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Ano:</span>
                      <span className="font-semibold ml-2 dark:text-white">2022</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Combustível:</span>
                      <span className="font-semibold ml-2 dark:text-white">Flex</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="shadow-xl border-0 rounded-3xl dark:bg-black">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Star className="h-6 w-6 text-yellow-500 mr-3" />
                  Avaliações ({avaliacoes.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {avaliacoes.map((avaliacao) => (
                  <div key={avaliacao.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-purple-100 dark:text-purple-600">
                          {avaliacao.nome.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-gray-900 dark:text-white">{avaliacao.nome}</h5>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{avaliacao.data}</span>
                        </div>
                        <div className="flex items-center space-x-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < avaliacao.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} 
                            />
                          ))}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{avaliacao.comentario}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Actions & Stats */}
          <div className="space-y-8">
            {/* Contact Actions */}
            <Card className="shadow-xl border-0 rounded-3xl dark:bg-black">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Contrato & Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 py-4 text-lg font-bold rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
                  onClick={handleContratarFrete}
                >
                  Contratar Frete
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-900/20 py-4 text-lg font-bold rounded-2xl"
                  onClick={() => window.open(`tel:${freteiro.telefone}`, '_self')}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  {freteiro.telefone}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-purple-500 dark:text-purple-400 dark:hover:bg-purple-900/20 py-4 text-lg font-bold rounded-2xl"
                  onClick={() => setIsChatOpen(true)}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Iniciar Chat
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="shadow-xl border-0 rounded-3xl dark:bg-black">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">847</div>
                  <div className="text-gray-600 dark:text-gray-400">Fretes Realizados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">98%</div>
                  <div className="text-gray-600 dark:text-gray-400">Taxa de Aprovação</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">3 anos</div>
                  <div className="text-gray-600 dark:text-gray-400">Na Plataforma</div>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card className="shadow-xl border-0 rounded-3xl dark:bg-black">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Certificações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  <span className="text-gray-700 dark:text-gray-300">Documentos Verificados</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300">Freteiro Premium</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  <span className="text-gray-700 dark:text-gray-300">Seguro Incluso</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  <span className="text-gray-700 dark:text-gray-300">Pontualidade 95%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Chat Component */}
      <Chat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        recipient={{
          id: freteiro?.id || '',
          name: freteiro?.nome || '',
          avatar: freteiro?.avatar,
          phone: freteiro?.telefone
        }}
      />
    </div>
  );
};

export default PerfilFreteiro;
