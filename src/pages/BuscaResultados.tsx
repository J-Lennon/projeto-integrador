
import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Star, MapPin, Clock, DollarSign, Filter, ChevronLeft, ChevronRight, User, MessageCircle, Calendar, Package, Search } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useToast } from "@/hooks/use-toast";

const BuscaResultados = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Estados para busca rápida lateral
  const [buscaOrigem, setBuscaOrigem] = useState('');
  const [buscaDestino, setBuscaDestino] = useState('');
  const [buscaData, setBuscaData] = useState('');
  const [buscaValor, setBuscaValor] = useState('');

  const origem = searchParams.get('origem') || '';
  const destino = searchParams.get('destino') || '';
  const data = searchParams.get('data') || '';
  const valor = searchParams.get('valor') || '';
  const veiculoFiltro = searchParams.get('veiculo') || '';

  const itemsPerPage = 5;
  const totalPages = 3;

  const todosFreteiros = [
    {
      id: 1,
      nome: "João Silva",
      rating: 9.6,
      ratingText: "Excelente",
      avaliacoes: 67,
      preco: "R$ 150,00",
      precoNumerico: 150,
      tempo: "2-4 horas",
      veiculo: "300kg",
      telefone: "(11) 9999-1234",
      avatar: "/lovable-uploads/fdcc75fa-537f-4092-bb23-a08a7e2f56e4.png",
      verificado: true,
      descricao: "Fretes e pequenas mudanças para dentro da cidade",
      possuiNotaFiscal: true,
      carregaMoveis: false
    },
    {
      id: 2,
      nome: "Maria Santos",
      rating: 9.2,
      ratingText: "Muito bom",
      avaliacoes: 45,
      preco: "R$ 120,00",
      precoNumerico: 120,
      tempo: "3-5 horas",
      veiculo: "450kg",
      telefone: "(11) 9999-5678",
      avatar: "/lovable-uploads/fdcc75fa-537f-4092-bb23-a08a7e2f56e4.png",
      verificado: true,
      descricao: "Frete ágil, levamos seus produtos dos menores aos maiores",
      possuiNotaFiscal: true,
      carregaMoveis: false
    },
    {
      id: 3,
      nome: "Carlos Oliveira",
      rating: 8.0,
      ratingText: "Bom",
      avaliacoes: 34,
      preco: "R$ 465,00",
      precoNumerico: 465,
      tempo: "4-6 horas",
      veiculo: "2500kg",
      telefone: "(11) 9999-9012",
      avatar: "/lovable-uploads/fdcc75fa-537f-4092-bb23-a08a7e2f56e4.png",
      verificado: false,
      descricao: "Somos uma pequena empresa de entrega especializada de mercadorias",
      possuiNotaFiscal: true,
      carregaMoveis: false
    },
    {
      id: 4,
      nome: "Ana Costa",
      rating: 6.3,
      ratingText: "Mediano",
      avaliacoes: 62,
      preco: "R$ 890,00",
      precoNumerico: 890,
      tempo: "1-3 horas",
      veiculo: "4800kg",
      telefone: "(11) 9999-3456",
      avatar: "/lovable-uploads/fdcc75fa-537f-4092-bb23-a08a7e2f56e4.png",
      verificado: true,
      descricao: "Para qualquer lugar do Brasil - Especialista em longas distâncias",
      possuiNotaFiscal: true,
      carregaMoveis: false
    },
    {
      id: 5,
      nome: "Roberto Lima",
      rating: 9.0,
      ratingText: "Excelente",
      avaliacoes: 89,
      preco: "R$ 180,00",
      precoNumerico: 180,
      tempo: "2-3 horas",
      veiculo: "500kg",
      telefone: "(11) 9999-7890",
      avatar: "/lovable-uploads/fdcc75fa-537f-4092-bb23-a08a7e2f56e4.png",
      verificado: true,
      descricao: "Especialista em fretes médios e mudanças residenciais",
      possuiNotaFiscal: true,
      carregaMoveis: true
    }
  ];

  // Filtrar freteiros baseado nos parâmetros de busca
  const freteiros = useMemo(() => {
    let filtrados = [...todosFreteiros];

    // Filtrar por valor máximo
    if (valor) {
      const valorMaximo = parseFloat(valor.replace(/[^\d,]/g, '').replace(',', '.'));
      if (!isNaN(valorMaximo)) {
        filtrados = filtrados.filter(freteiro => freteiro.precoNumerico <= valorMaximo);
      }
    }

    // Filtrar por tipo de veículo
    if (veiculoFiltro) {
      filtrados = filtrados.filter(freteiro => freteiro.veiculo === veiculoFiltro);
    }

    return filtrados;
  }, [valor, veiculoFiltro]);

  const handleContratarFrete = (freteiro: any) => {
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
      state: { freteiro, origem, destino, data, valor }
    });
  };

  const handleVerPerfil = (freteiro: any) => {
    navigate(`/perfil-freteiro/${freteiro.id}`, { 
      state: { freteiro }
    });
  };

  const handleBuscaRapida = () => {
    if (!buscaOrigem.trim() || !buscaDestino.trim() || !buscaData || !buscaValor.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos antes de pesquisar.",
        variant: "destructive"
      });
      return;
    }

    const params = new URLSearchParams();
    params.append('origem', buscaOrigem);
    params.append('destino', buscaDestino);
    params.append('data', buscaData);
    params.append('valor', buscaValor);
    
    navigate(`/busca-resultados?${params.toString()}`);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Busca Já</span>
            </Link>
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
                  <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 rounded-full font-medium transition-all duration-300">
                    Cadastrar-se
                  </Button>
                </Link>
                <Link to="/login">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full font-medium">
                    Entrar
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar de Busca Rápida */}
          <div className="w-80 flex-shrink-0">
            <Card className="sticky top-8 shadow-xl border-0 bg-white/95 backdrop-blur-md rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-2xl">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Busca Rápida
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    🏙️ Cidade/Estado
                  </label>
                  <Input 
                    placeholder="Ex: Pelotas, RS"
                    value={buscaOrigem}
                    onChange={(e) => setBuscaOrigem(e.target.value)}
                    className="rounded-xl border-gray-200 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    📍 Endereço
                  </label>
                  <Input 
                    placeholder="Ex: Rua Felix da Cunha, 520"
                    value={buscaDestino}
                    onChange={(e) => setBuscaDestino(e.target.value)}
                    className="rounded-xl border-gray-200 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    📅 Data
                  </label>
                  <Input 
                    type="date"
                    value={buscaData}
                    onChange={(e) => setBuscaData(e.target.value)}
                    className="rounded-xl border-gray-200 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    💰 Valor Máximo
                  </label>
                  <Input 
                    placeholder="Ex: R$ 500,00"
                    value={buscaValor}
                    onChange={(e) => setBuscaValor(e.target.value)}
                    className="rounded-xl border-gray-200 focus:border-blue-500 transition-colors"
                  />
                </div>

                <Button 
                  onClick={handleBuscaRapida}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl py-3 font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Pesquisar
                </Button>

                {/* Filtros Populares */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filtros populares
                  </h3>
                  <div className="space-y-3">
                    {[
                      "Com montagem",
                      "Com desmontagem", 
                      "Com embalagem incluída",
                      "Ajudantes inclusos"
                    ].map((filtro) => (
                      <label key={filtro} className="flex items-center cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors">
                        <input type="checkbox" className="mr-3 accent-blue-600" />
                        <span className="text-sm text-gray-700">{filtro}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Por peso */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Por peso</h3>
                  <div className="space-y-3">
                    {["Até 300kg", "Até 450kg", "Até 1500kg", "Até 2500kg"].map((peso) => (
                      <label key={peso} className="flex items-center cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors">
                        <input type="checkbox" className="mr-3 accent-blue-600" />
                        <span className="text-sm text-gray-700">{peso}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Por Avaliação */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Por Avaliação</h3>
                  <div className="space-y-3">
                    {["Qualquer uma", "Excelente", "Muito bom", "Bom"].map((avaliacao) => (
                      <label key={avaliacao} className="flex items-center cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors">
                        <input type="checkbox" className="mr-3 accent-blue-600" />
                        <span className="text-sm text-gray-700">{avaliacao}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resultados Principais */}
          <div className="flex-1">
            {/* Cabeçalho dos resultados */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <Package className="h-4 w-4" />
                <span className="font-medium">{freteiros.length} resultados encontrados</span>
                {veiculoFiltro && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                    Filtro: {veiculoFiltro}
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {origem || 'Todos os locais'} → {destino || 'Todos os destinos'}
              </h1>
              <p className="text-gray-600">
                {data && `📅 ${data}`} 
                {valor && ` • 💰 Até R$ ${valor}`}
              </p>
            </div>

            {/* Lista de Freteiros */}
            <div className="space-y-6">
              {freteiros.length > 0 ? (
                freteiros.map((freteiro) => (
                  <Card key={freteiro.id} className="hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-0 shadow-lg rounded-2xl overflow-hidden bg-white/95 backdrop-blur-md">
                    <CardContent className="p-8">
                      <div className="flex gap-6">
                        {/* Avatar */}
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
                          <img 
                            src={freteiro.avatar}
                            alt={freteiro.nome}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Conteúdo principal */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-blue-600">{freteiro.nome}</h3>
                                {freteiro.verificado && (
                                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                    ✓ VERIFICADO
                                  </div>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 font-medium">Até {freteiro.veiculo}</p>
                              <p className="text-sm text-gray-700 mt-2">{freteiro.descricao}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{freteiro.preco}</div>
                              <div className="text-sm text-gray-500">por frete</div>
                            </div>
                          </div>

                          {/* Informações adicionais */}
                          <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                            <span className="flex items-center gap-1">
                              📄 Nota fiscal inclusa
                            </span>
                            <span className="flex items-center gap-1">
                              ⏱️ {freteiro.tempo}
                            </span>
                          </div>

                          {/* Rating e ações */}
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold">{freteiro.ratingText}</span>
                                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                  ⭐ {freteiro.rating}
                                </div>
                              </div>
                              <span className="text-sm text-gray-500">({freteiro.avaliacoes} avaliações)</span>
                            </div>
                            <div className="flex gap-3">
                              <Button 
                                onClick={() => handleVerPerfil(freteiro)}
                                variant="outline"
                                className="border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl px-6 font-semibold transition-all duration-300 hover:scale-105"
                              >
                                Ver Perfil
                              </Button>
                              <Button 
                                onClick={() => handleContratarFrete(freteiro)}
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl px-8 font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                              >
                                Contratar Frete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg mb-4">Nenhum freteiro encontrado com os filtros aplicados</div>
                  <p className="text-gray-400">Tente ajustar os critérios de busca</p>
                </div>
              )}
            </div>

            {/* Paginação */}
            {freteiros.length > 0 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled className="rounded-xl">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {[1, 2, 3, 4, '...', 25].map((page, index) => (
                    <Button
                      key={index}
                      variant={page === 1 ? "default" : "outline"}
                      size="sm"
                      className={`rounded-xl ${page === 1 ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" : ""}`}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuscaResultados;
