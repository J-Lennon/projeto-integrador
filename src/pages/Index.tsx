import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Truck, Search, Star, MapPin, Calendar, DollarSign, User, FileText, ArrowRight, X, Phone, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FormValidation } from "@/components/FormValidation";

const Index = () => {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [data, setData] = useState('');
  const [valor, setValor] = useState('');
  const [showValidation, setShowValidation] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    origem: false,
    destino: false,
    data: false,
    valor: false
  });
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAbout, setShowAbout] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const validateField = (value: string, type: string) => {
    if (!value.trim()) {
      return false;
    }

    switch (type) {
      case 'cidade':
        return value.length >= 3 && /^[a-zA-ZÀ-ÿ\s,.-]+$/.test(value);
      case 'endereco':
        return value.length >= 5;
      case 'data':
        const today = new Date();
        const selectedDate = new Date(value);
        return selectedDate >= today;
      case 'valor':
        const valorNumerico = parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.'));
        return !isNaN(valorNumerico) && valorNumerico >= 10;
      default:
        return false;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'origem':
        setOrigem(value);
        setFieldErrors(prev => ({ ...prev, origem: showValidation && !validateField(value, 'cidade') }));
        break;
      case 'destino':
        setDestino(value);
        setFieldErrors(prev => ({ ...prev, destino: showValidation && !validateField(value, 'endereco') }));
        break;
      case 'data':
        setData(value);
        setFieldErrors(prev => ({ ...prev, data: showValidation && !validateField(value, 'data') }));
        break;
      case 'valor':
        setValor(value);
        setFieldErrors(prev => ({ ...prev, valor: showValidation && !validateField(value, 'valor') }));
        break;
    }
  };

  const handleSearch = () => {
    setShowValidation(true);
    
    const isOrigemValid = validateField(origem, 'cidade');
    const isDestinoValid = validateField(destino, 'endereco');
    const isDataValid = validateField(data, 'data');
    const isValorValid = validateField(valor, 'valor');

    setFieldErrors({
      origem: !isOrigemValid,
      destino: !isDestinoValid,
      data: !isDataValid,
      valor: !isValorValid
    });

    if (!isOrigemValid || !isDestinoValid || !isDataValid || !isValorValid) {
      toast({
        title: "Campos inválidos",
        description: "Por favor, corrija os campos destacados antes de pesquisar.",
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

  const handleWhatsAppRedirect = (number: string) => {
    const cleanNumber = number.replace(/\D/g, '');
    window.open(`https://wa.me/55${cleanNumber}`, '_blank');
  };

  const freteirosDestaque = [
    {
      id: 1,
      nome: "João",
      rating: 4.8,
      avatar: "/lovable-uploads/82711a07-9c84-420e-8d55-a97d2c5e145d.png",
      badge: "EXPRESSO",
      badgeColor: "from-orange-500 to-red-500"
    },
    {
      id: 2,
      nome: "Alexandre",
      rating: 4.9,
      avatar: "/lovable-uploads/f592d9e7-8423-4237-90f9-5215648b9337.png",
      subtitle: "Transportes",
      badge: "ÁGIL",
      badgeColor: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      nome: "Antonio",
      rating: 4.7,
      avatar: "/lovable-uploads/04022fef-79b1-40f3-8ab0-29d4750bc62b.png",
      badge: "FRETE",
      badgeColor: "from-red-500 to-pink-500"
    },
    {
      id: 4,
      nome: "Pedro",
      rating: 4.6,
      avatar: "/lovable-uploads/ff6a94d1-8bbb-4ab4-8d7c-39441d960fe4.png",
      badge: "EXPRESSO",
      badgeColor: "from-green-500 to-emerald-500"
    },
    {
      id: 5,
      nome: "Marcos",
      rating: 4.8,
      avatar: "/lovable-uploads/d91b9790-e09f-408e-a667-cd8a0de9aa06.png",
      badge: "RÁPIDAS",
      badgeColor: "from-blue-500 to-purple-500"
    },
    {
      id: 6,
      nome: "Carlos",
      rating: 4.9,
      avatar: "/lovable-uploads/f98f46b9-dcfa-4ab4-b8c8-91713423b263.png",
      subtitle: "Especialista em mudanças",
      badge: "PREMIUM",
      badgeColor: "from-gray-800 to-black"
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
      imagem: "/lovable-uploads/9a96d18f-902b-4bf6-82bc-8301c894fb2c.png",
      cor: "from-blue-600 to-indigo-600"
    },
    {
      peso: "450kg",
      titulo: "Até 450Kg",
      altura: "2,0m",
      largura: "1,60m",
      profundidade: "1,80m",
      preco: "R$ 120",
      imagem: "/lovable-uploads/b527a141-17d9-41b3-abba-cf07c2550cf2.png",
      cor: "from-green-600 to-emerald-600"
    },
    {
      peso: "500kg",
      titulo: "Até 500Kg",
      altura: "2,3m",
      largura: "1,80m",
      profundidade: "2,20m",
      preco: "R$ 180",
      imagem: "/lovable-uploads/f144e6e6-15b2-4373-b0bc-fb73510e0fa7.png",
      cor: "from-orange-600 to-red-600"
    },
    {
      peso: "2500kg",
      titulo: "Até 2500Kg",
      altura: "4,5m",
      largura: "2,10m",
      alturaVeiculo: "2,30m",
      preco: "R$ 350",
      imagem: "/lovable-uploads/0a4c1113-12d1-4a6d-906d-fb72ea685bc1.png",
      cor: "from-purple-600 to-pink-600"
    },
    {
      peso: "4800kg",
      titulo: "Até 4800Kg",
      altura: "8,5m",
      largura: "2,40m",
      alturaVeiculo: "2,60m",
      preco: "R$ 650",
      imagem: "/lovable-uploads/199185e1-87f7-4c98-b712-c9a8e21d68a5.png",
      cor: "from-gray-700 to-gray-900"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-black dark:via-gray-900 dark:to-black transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-xl border-b-2 border-blue-100 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3 group">
              <Truck className="h-10 w-10 text-blue-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Busca Já
              </span>
            </Link>
            
            <nav className="hidden md:flex space-x-8 items-center">
              <Dialog open={showAbout} onOpenChange={setShowAbout}>
                <DialogTrigger asChild>
                  <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors duration-300 hover:scale-105 transform">
                    Sobre
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl dark:bg-gray-900 dark:text-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-blue-600 dark:text-purple-400">Sobre Nós</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-gray-700 dark:text-gray-300">
                    <p className="text-lg font-semibold">Conectando quem precisa de fretes com quem está pronto para ajudar.</p>
                    <p>Somos uma plataforma local de Pelotas (RS) criada para facilitar a vida de quem precisa transportar mercadorias ou fazer mudanças. Seja para levar um móvel, mudar de casa ou entregar produtos, aqui você encontra motoristas com caminhonetes e caminhões prontos para atender com agilidade, segurança e preço justo.</p>
                    <p>Nosso objetivo é unir quem precisa com quem pode transportar, valorizando o trabalho local e oferecendo oportunidades de renda extra.</p>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showServices} onOpenChange={setShowServices}>
                <DialogTrigger asChild>
                  <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors duration-300 hover:scale-105 transform">
                    Serviços
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl dark:bg-gray-900 dark:text-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-blue-600 dark:text-purple-400">Serviços</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-gray-700 dark:text-gray-300">
                    <p className="text-lg font-semibold">Confira o que podemos fazer por você:</p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-blue-600 dark:text-purple-400">Fretes rápidos:</h4>
                        <p>transporte de mercadorias e pequenos volumes com agilidade.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-600 dark:text-purple-400">Mudanças residenciais:</h4>
                        <p>ideal para quem vai se mudar e precisa de ajuda com transporte.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-600 dark:text-purple-400">Parcerias com motoristas:</h4>
                        <p>se você tem uma caminhonete ou caminhão, cadastre-se e comece a ganhar.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-600 dark:text-purple-400">Atendimento local:</h4>
                        <p>serviço voltado exclusivamente para Pelotas e região.</p>
                      </div>
                    </div>
                    <p className="italic">Não importa o tamanho da carga – temos sempre alguém disponível para levar até o destino com segurança.</p>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={showContact} onOpenChange={setShowContact}>
                <DialogTrigger asChild>
                  <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors duration-300 hover:scale-105 transform">
                    Fale Conosco
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl dark:bg-gray-900 dark:text-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-blue-600 dark:text-purple-400">Fale Conosco</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-gray-700 dark:text-gray-300">
                    <p className="text-lg font-semibold">Tem alguma dúvida, sugestão? Fale com a gente!</p>
                    <p>Estamos prontos para te ajudar no que for preciso. Entre em contato pelos números:</p>
                    <div className="space-y-2">
                      <Button 
                        onClick={() => handleWhatsAppRedirect('53991307002')} 
                        className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2"
                      >
                        <Phone className="h-4 w-4" />
                        (53) 99130-7002 (John)
                      </Button>
                      <Button 
                        onClick={() => handleWhatsAppRedirect('48998314791')} 
                        className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2"
                      >
                        <Phone className="h-4 w-4" />
                        (48) 99831-4791 (Luiz)
                      </Button>
                      <Button 
                        onClick={() => handleWhatsAppRedirect('53991679683')} 
                        className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2"
                      >
                        <Phone className="h-4 w-4" />
                        (53) 99167-9683 (Thiago)
                      </Button>
                      <Button 
                        onClick={() => handleWhatsAppRedirect('53981128290')} 
                        className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2"
                      >
                        <Phone className="h-4 w-4" />
                        (53) 98112-8290 (Andrio)
                      </Button>
                    </div>
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p>📍 Atendemos toda a cidade de Pelotas (RS) e região.</p>
                      <p>📞 Retorno rápido e atendimento humanizado.</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Link 
                to="/dashboard-freteiro"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors duration-300 hover:scale-105 transform"
              >
                Área do Freteiro
              </Link>
            </nav>

            {user ? (
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <Link to="/perfil">
                  <Avatar className="h-10 w-10 cursor-pointer hover:ring-4 hover:ring-blue-500/30 dark:hover:ring-purple-500/30 transition-all duration-300">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </Link>
              </div>
            ) : (
              <div className="flex space-x-3 items-center">
                <ThemeToggle />
                <Link to="/cadastro">
                  <Button variant="outline" className="text-blue-600 dark:text-purple-400 border-blue-600 dark:border-purple-400 hover:bg-blue-50 dark:hover:bg-purple-900/20 rounded-full px-6 font-medium transition-all duration-300 hover:scale-105">
                    Cadastrar-se
                  </Button>
                </Link>
                <Link to="/login">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-purple-600 dark:to-pink-600 hover:from-blue-700 hover:to-indigo-700 dark:hover:from-purple-700 dark:hover:to-pink-700 rounded-full px-6 font-medium transition-all duration-300 hover:scale-105 shadow-lg">
                    Entrar
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section with enhanced search */}
      <section className="relative">
        <div 
          className="h-96 bg-cover bg-center bg-no-repeat relative rounded-3xl mx-8 mt-8 shadow-2xl"
          style={{
            backgroundImage: "url('/lovable-uploads/cf9bf23c-c6da-4263-944e-d8f9de4bd90b.png')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 rounded-3xl"></div>
          <div className="relative h-full flex flex-col justify-center px-12">
            <div className="text-center text-white mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Foco em tranquilidade para o cliente
              </h1>
              <p className="text-xl text-gray-200 font-medium">
                "Deixe a carga com a gente. Você só se preocupa com o destino."
              </p>
            </div>
            
            {/* Enhanced Search Form with validation */}
            <div className="max-w-4xl mx-auto w-full">
              <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-5 h-28">
                    <div className="p-6 border-r border-gray-200 dark:border-gray-700">
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">
                        Cidade/Estado
                      </label>
                      <Input 
                        placeholder="Para onde será o frete?"
                        value={origem}
                        onChange={(e) => handleInputChange('origem', e.target.value)}
                        className={`border-0 bg-transparent p-0 text-base font-medium focus-visible:ring-0 placeholder-gray-400 h-auto text-gray-900 dark:text-white ${
                          fieldErrors.origem ? 'border-red-500' : ''
                        }`}
                        required
                      />
                      <FormValidation 
                        value={origem} 
                        type="cidade" 
                        showValidation={showValidation} 
                      />
                    </div>
                    <div className="p-6 border-r border-gray-200 dark:border-gray-700">
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">
                        Endereço
                      </label>
                      <Input 
                        placeholder="Nome da rua"
                        value={destino}
                        onChange={(e) => handleInputChange('destino', e.target.value)}
                        className={`border-0 bg-transparent p-0 text-base font-medium focus-visible:ring-0 placeholder-gray-400 h-auto text-gray-900 dark:text-white ${
                          fieldErrors.destino ? 'border-red-500' : ''
                        }`}
                        required
                      />
                      <FormValidation 
                        value={destino} 
                        type="endereco" 
                        showValidation={showValidation} 
                      />
                    </div>
                    <div className="p-6 border-r border-gray-200 dark:border-gray-700">
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">
                        Data
                      </label>
                      <Input 
                        type="date"
                        placeholder="Para quando será"
                        value={data}
                        onChange={(e) => handleInputChange('data', e.target.value)}
                        className={`border-0 bg-transparent p-0 text-base font-medium focus-visible:ring-0 h-auto text-gray-900 dark:text-white ${
                          fieldErrors.data ? 'border-red-500' : ''
                        }`}
                        required
                      />
                      <FormValidation 
                        value={data} 
                        type="data" 
                        showValidation={showValidation} 
                      />
                    </div>
                    <div className="p-6 border-r border-gray-200 dark:border-gray-700">
                      <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">
                        Valor Máximo
                      </label>
                      <Input 
                        placeholder="Adicionar Valor"
                        value={valor}
                        onChange={(e) => handleInputChange('valor', e.target.value)}
                        className={`border-0 bg-transparent p-0 text-base font-medium focus-visible:ring-0 placeholder-gray-400 h-auto text-gray-900 dark:text-white ${
                          fieldErrors.valor ? 'border-red-500' : ''
                        }`}
                        required
                      />
                      <FormValidation 
                        value={valor} 
                        type="valor" 
                        showValidation={showValidation} 
                      />
                    </div>
                    <div className="p-6 flex items-center justify-center">
                      <Button 
                        onClick={handleSearch}
                        className="h-12 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-purple-600 dark:to-pink-600 hover:from-blue-700 hover:to-indigo-700 dark:hover:from-purple-700 dark:hover:to-pink-700 rounded-full p-0 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                      >
                        <ArrowRight className="h-6 w-6" />
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
      <section className="py-12 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-black dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Em destaque</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {freteirosDestaque.map((freteiro) => (
              <div 
                key={freteiro.id}
                onClick={() => handleFreteiroClick(freteiro)}
                className="bg-white dark:bg-purple-900/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-l-4 border-blue-500 dark:border-purple-400"
              >
                <div className="relative">
                  <img 
                    src={freteiro.avatar}
                    alt={freteiro.nome}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                <div className="p-4">
                  {freteiro.badge && (
                    <div className={`bg-gradient-to-r ${freteiro.badgeColor} text-white px-3 py-1 rounded-full text-xs mb-2 font-semibold shadow-lg`}>
                      {freteiro.badge}
                    </div>
                  )}
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">{freteiro.nome}</h3>
                  {freteiro.subtitle && (
                    <p className="text-xs text-gray-600 dark:text-gray-300">{freteiro.subtitle}</p>
                  )}
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600 dark:text-gray-300 ml-1">{freteiro.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tipos de veículo Section */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Tipos de veículo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {tiposVeiculo.map((veiculo) => (
              <Card 
                key={veiculo.peso}
                onClick={() => handleVeiculoClick(veiculo.peso)}
                className="hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 shadow-lg rounded-2xl overflow-hidden cursor-pointer dark:bg-purple-900/40 dark:hover:bg-purple-800/40"
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
                  <h3 className="font-bold text-xl mb-3 text-gray-800 dark:text-white">{veiculo.titulo}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">📏 Altura: {veiculo.altura} | Largura: {veiculo.largura}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">📐 {veiculo.profundidade ? `Profundidade: ${veiculo.profundidade}` : `Altura: ${veiculo.alturaVeiculo}`}</p>
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
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-black dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-purple-600 dark:to-pink-600 rounded-3xl p-12 text-center text-white shadow-2xl">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-white/20 p-4 rounded-2xl mr-6">
                <User className="h-12 w-12 text-white" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold mb-2">Ei, você!</h2>
                <p className="text-blue-100 dark:text-purple-100 text-lg">
                  Gostaria de anunciar seus serviços em nosso site? Junte-se à nossa plataforma e anuncie o
                  quanto antes!
                </p>
              </div>
            </div>
            <Link to="/cadastro-freteiro">
              <Button className="bg-white text-blue-600 dark:text-purple-600 hover:bg-blue-50 dark:hover:bg-purple-50 px-10 py-4 text-lg rounded-full font-bold shadow-lg transition-all duration-300 hover:scale-105">
                Cadastro de Freteiro
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-black dark:from-black dark:to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-purple-600 dark:to-pink-600 p-2 rounded-xl">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-bold">Busca Já</span>
              </div>
              <p className="text-gray-400 dark:text-gray-300 text-lg">
                Viemos entregar um serviço de alta qualidade desde 2025
              </p>
            </div>
            <div></div>
            <div className="text-right">
              <div className="space-y-3 text-gray-400 dark:text-gray-300">
                <p className="hover:text-white transition-colors cursor-pointer">Ajuda</p>
                <p className="hover:text-white transition-colors cursor-pointer">Perguntas Frequentes</p>
                <p className="hover:text-white transition-colors cursor-pointer">SAC</p>
                <p className="hover:text-white transition-colors cursor-pointer">Entre em contato</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 dark:border-gray-700 mt-12 pt-8 text-center text-gray-400 dark:text-gray-300">
            <p>Busca Já © 2025 - Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
