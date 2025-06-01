import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Truck, Search, Star, MapPin, Calendar, DollarSign, User, FileText, ArrowRight, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [data, setData] = useState('');
  const [valor, setValor] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAbout, setShowAbout] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const handleSearch = () => {
    // Validação: só permite busca se todos os campos estiverem preenchidos
    if (!origem.trim() || !destino.trim() || !data || !valor.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos antes de pesquisar.",
        variant: "destructive"
      });
      return;
    }

    const params = new URLSearchParams();
    params.append('origem', origem);
    params.append('destino', destino);
    params.append('data', data);
    params.append('valor', valor);
    
    navigate(`/busca-resultados?${params.toString()}`);
  };

  const handleFreteiroClick = (freteiro: any) => {
    navigate(`/perfil-freteiro/${freteiro.id}`, { 
      state: { freteiro }
    });
  };

  const handleVeiculoClick = (peso: string) => {
    const params = new URLSearchParams();
    params.append('origem', '');
    params.append('destino', '');
    params.append('data', '');
    params.append('valor', '');
    params.append('veiculo', peso);
    
    navigate(`/busca-resultados?${params.toString()}`);
  };

  const freteirosDestaque = [
    {
      id: 1,
      nome: "João - Frete Carga",
      rating: 4.8,
      avatar: "/fotos/fdcc75fa-537f-4092-bb23-a08a7e2f56e4.png",
      badge: "ENTREGAMOS",
      badgeColor: "from-orange-500 to-red-500"
    },
    {
      id: 2,
      nome: "Maria - Transportes",
      rating: 4.9,
      avatar: "/fotos/fdcc75fa-537f-4092-bb23-a08a7e2f56e4.png",
      subtitle: "Fretes Mudanças"
    },
    {
      id: 3,
      nome: "Carlos - ENTREGAS RÁPIDAS",
      rating: 4.7,
      avatar: "/fotos/fdcc75fa-537f-4092-bb23-a08a7e2f56e4.png",
      badge: "EM TEMPO",
      badgeColor: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      nome: "Pedro - SP",
      rating: 4.6,
      avatar: "/fotos/fdcc75fa-537f-4092-bb23-a08a7e2f56e4.png",
      badge: "Total Fretes",
      badgeColor: "from-gray-800 to-black"
    },
    {
      id: 5,
      nome: "Ana - 47 99635-1679",
      rating: 4.8,
      avatar: "/fotos/fdcc75fa-537f-4092-bb23-a08a7e2f56e4.png",
      badge: "FRETE",
      badgeColor: "from-red-500 to-pink-500"
    },
    {
      id: 6,
      nome: "Roberto - Frete Anápolis",
      rating: 4.9,
      avatar: "/fotos/fdcc75fa-537f-4092-bb23-a08a7e2f56e4.png",
      subtitle: "Especialista em mudanças"
    }
  ];

  const tiposVeiculo = [
    {
      peso: "300kg",
      titulo: "Até 300Kg",
      altura: "1,5m",
      largura: "1,20m",
      profundidade: "1,80m",
      preco: "R$ 80",
      imagem: "/fotos/9a96d18f-902b-4bf6-82bc-8301c894fb2c.png",
      cor: "from-blue-600 to-indigo-600"
    },
    {
      peso: "450kg",
      titulo: "Até 450Kg",
      altura: "2,0m",
      largura: "1,60m",
      profundidade: "1,80m",
      preco: "R$ 120",
      imagem: "/fotos/b527a141-17d9-41b3-abba-cf07c2550cf2.png",
      cor: "from-green-600 to-emerald-600"
    },
    {
      peso: "500kg",
      titulo: "Até 500Kg",
      altura: "2,3m",
      largura: "1,80m",
      profundidade: "2,20m",
      preco: "R$ 180",
      imagem: "/fotos/f144e6e6-15b2-4373-b0bc-fb73510e0fa7.png",
      cor: "from-orange-600 to-red-600"
    },
    {
      peso: "2500kg",
      titulo: "Até 2500Kg",
      altura: "4,5m",
      largura: "2,10m",
      alturaVeiculo: "2,30m",
      preco: "R$ 350",
      imagem: "/fotos/0a4c1113-12d1-4a6d-906d-fb72ea685bc1.png",
      cor: "from-purple-600 to-pink-600"
    },
    {
      peso: "4800kg",
      titulo: "Até 4800Kg",
      altura: "8,5m",
      largura: "2,40m",
      alturaVeiculo: "2,60m",
      preco: "R$ 650",
      imagem: "/fotos/199185e1-87f7-4c98-b712-c9a8e21d68a5.png",
      cor: "from-gray-700 to-gray-900"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-xl border-b-2 border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3 group">
              <Truck className="h-10 w-10 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Busca Já
              </span>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => setShowAbout(true)}
                className="text-gray-600 hover:text-blue-600 font-semibold transition-colors duration-300 hover:scale-105 transform"
              >
                Sobre
              </button>
              <button 
                onClick={() => setShowServices(true)}
                className="text-gray-600 hover:text-blue-600 font-semibold transition-colors duration-300 hover:scale-105 transform"
              >
                Serviços
              </button>
              <button 
                onClick={() => setShowContact(true)}
                className="text-gray-600 hover:text-blue-600 font-semibold transition-colors duration-300 hover:scale-105 transform"
              >
                Fale Conosco
              </button>
              <Link 
                to="/dashboard-freteiro"
                className="text-gray-600 hover:text-blue-600 font-semibold transition-colors duration-300 hover:scale-105 transform"
              >
                Área do Freteiro
              </Link>
            </nav>

            {user ? (
              <Link to="/perfil">
                <Avatar className="h-10 w-10 cursor-pointer hover:ring-4 hover:ring-blue-500/30 transition-all duration-300">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <div className="flex space-x-3">
                <Link to="/cadastro">
                  <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 rounded-full px-6 font-medium transition-all duration-300 hover:scale-105">
                    Cadastrar-se
                  </Button>
                </Link>
                <Link to="/login">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full px-6 font-medium transition-all duration-300 hover:scale-105 shadow-lg">
                    Entrar
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div 
          className="h-96 bg-cover bg-center bg-no-repeat relative rounded-3xl mx-8 mt-8 shadow-2xl"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=600&fit=crop')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 rounded-3xl"></div>
          <div className="relative h-full flex flex-col justify-center px-12">
            <div className="text-center text-white mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Foco em tranquilidade para o cliente
              </h1>
              <p className="text-xl text-gray-200 font-medium">
                "Deixe a carga com a gente. Você só se preocupa com o destino."
              </p>
            </div>
            
            {/* Search Form */}
            <div className="max-w-4xl mx-auto w-full">
              <Card className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-5 h-20">
                    <div className="p-4 border-r border-gray-200">
                      <label className="block text-xs font-semibold text-gray-600 mb-2">
                        Cidade/Estado
                      </label>
                      <Input 
                        placeholder="Para onde será o frete?"
                        value={origem}
                        onChange={(e) => setOrigem(e.target.value)}
                        className="border-0 bg-transparent p-0 text-sm font-medium focus-visible:ring-0 placeholder-gray-400 h-auto"
                        required
                      />
                    </div>
                    <div className="p-4 border-r border-gray-200">
                      <label className="block text-xs font-semibold text-gray-600 mb-2">
                        Endereço
                      </label>
                      <Input 
                        placeholder="Nome da rua"
                        value={destino}
                        onChange={(e) => setDestino(e.target.value)}
                        className="border-0 bg-transparent p-0 text-sm font-medium focus-visible:ring-0 placeholder-gray-400 h-auto"
                        required
                      />
                    </div>
                    <div className="p-4 border-r border-gray-200">
                      <label className="block text-xs font-semibold text-gray-600 mb-2">
                        Data
                      </label>
                      <Input 
                        type="date"
                        placeholder="Para quando será"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className="border-0 bg-transparent p-0 text-sm font-medium focus-visible:ring-0 h-auto"
                        required
                      />
                    </div>
                    <div className="p-4 border-r border-gray-200">
                      <label className="block text-xs font-semibold text-gray-600 mb-2">
                        Valor Máximo
                      </label>
                      <Input 
                        placeholder="Adicionar Valor"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        className="border-0 bg-transparent p-0 text-sm font-medium focus-visible:ring-0 placeholder-gray-400 h-auto"
                        required
                      />
                    </div>
                    <div className="p-4 flex items-center justify-center">
                      <Button 
                        onClick={handleSearch}
                        className="h-12 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full p-0 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Em destaque Section */}
      <section className="py-12 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Em destaque</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {freteirosDestaque.map((freteiro) => (
              <div 
                key={freteiro.id}
                onClick={() => handleFreteiroClick(freteiro)}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <img 
                  src={freteiro.avatar}
                  alt={freteiro.nome}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  {freteiro.badge && (
                    <div className={`bg-gradient-to-r ${freteiro.badgeColor} text-white px-3 py-1 rounded-full text-xs mb-2 font-semibold`}>
                      {freteiro.badge}
                    </div>
                  )}
                  <h3 className="font-bold text-sm">{freteiro.nome}</h3>
                  {freteiro.subtitle && (
                    <p className="text-xs text-gray-600">{freteiro.subtitle}</p>
                  )}
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600 ml-1">{freteiro.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tipos de veículo Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Tipos de veículo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {tiposVeiculo.map((veiculo) => (
              <Card 
                key={veiculo.peso}
                onClick={() => handleVeiculoClick(veiculo.peso)}
                className="hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 shadow-lg rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="relative">
                  <img 
                    src={veiculo.imagem}
                    alt={veiculo.titulo}
                    className="w-full h-40 object-cover"
                  />
                  <div className={`absolute top-4 left-4 bg-gradient-to-r ${veiculo.cor} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                    {veiculo.peso}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-3 text-gray-800">{veiculo.titulo}</h3>
                  <p className="text-sm text-gray-600 mb-2">📏 Altura: {veiculo.altura} | Largura: {veiculo.largura}</p>
                  <p className="text-sm text-gray-600 mb-4">📐 {veiculo.profundidade ? `Profundidade: ${veiculo.profundidade}` : `Altura: ${veiculo.alturaVeiculo}`}</p>
                  <div className="flex items-center justify-between">
                    <span className={`font-bold text-lg bg-gradient-to-r ${veiculo.cor} bg-clip-text text-transparent`}>A partir de {veiculo.preco}</span>
                    <Button size="sm" className={`bg-gradient-to-r ${veiculo.cor} hover:opacity-90 rounded-full`}>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white shadow-2xl">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-white/20 p-4 rounded-2xl mr-6">
                <User className="h-12 w-12 text-white" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold mb-2">Ei, você!</h2>
                <p className="text-blue-100 text-lg">
                  Gostaria de anunciar seus serviços em nosso site? Junte-se à nossa plataforma e anuncie o
                  quanto antes!
                </p>
              </div>
            </div>
            <Link to="/cadastro-freteiro">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-4 text-lg rounded-full font-bold shadow-lg transition-all duration-300 hover:scale-105">
                Cadastro de Freteiro
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-bold">Busca Já</span>
              </div>
              <p className="text-gray-400 text-lg">
                Viemos entregar um serviço de alta qualidade desde 2025
              </p>
            </div>
            <div></div>
            <div className="text-right">
              <div className="space-y-3 text-gray-400">
                <p className="hover:text-white transition-colors cursor-pointer">Ajuda</p>
                <p className="hover:text-white transition-colors cursor-pointer">Perguntas Frequentes</p>
                <p className="hover:text-white transition-colors cursor-pointer">SAC</p>
                <p className="hover:text-white transition-colors cursor-pointer">Entre em contato</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>Busca Já © 2025 - Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
