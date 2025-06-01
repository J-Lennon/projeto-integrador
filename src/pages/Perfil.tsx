import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, User, Mail, Phone, MapPin, LogOut, Edit, Save, Camera, Package, Star, Calendar, CreditCard, Home, UserCircle, Shield, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const Perfil = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [editando, setEditando] = useState(false);
  const [secaoAtiva, setSecaoAtiva] = useState('dados-pessoais');
  const [showPassword, setShowPassword] = useState(false);
  const [dadosUsuario, setDadosUsuario] = useState({
    nome: user?.name || '',
    email: user?.email || '',
    telefone: '(11) 99999-9999',
    cpf: '123.456.789-00',
    endereco: 'Rua das Flores, 123',
    bairro: 'Centro',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234-567'
  });

  const [dadosCartao, setDadosCartao] = useState({
    numero: '',
    nome: '',
    validade: '',
    cvv: '',
    cpf: ''
  });

  const [dadosSeguranca, setDadosSeguranca] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  });

  const [fretesUsuario] = useState([
    {
      id: 1,
      freteiro: "João Silva",
      origem: "São Paulo, SP",
      destino: "Rio de Janeiro, RJ",
      data: "2025-01-15",
      status: "Concluído",
      valor: "R$ 450,00",
      avaliacao: 5
    },
    {
      id: 2,
      freteiro: "Maria Santos",
      origem: "São Paulo, SP", 
      destino: "Campinas, SP",
      data: "2025-01-10",
      status: "Em andamento",
      valor: "R$ 280,00",
      avaliacao: null
    }
  ]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDadosUsuario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCartaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDadosCartao(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSegurancaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDadosSeguranca(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSalvar = () => {
    setEditando(false);
    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso."
    });
  };

  const handleTrocarFoto = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A troca de foto será implementada em breve."
    });
  };

  const handleAlterarSenha = () => {
    if (dadosSeguranca.novaSenha !== dadosSeguranca.confirmarSenha) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Senha alterada!",
      description: "Sua senha foi alterada com sucesso."
    });
    setDadosSeguranca({ senhaAtual: '', novaSenha: '', confirmarSenha: '' });
  };

  const menuItems = [
    { id: 'dados-pessoais', label: 'Dados Pessoais', icon: UserCircle },
    { id: 'enderecos', label: 'Endereços', icon: Home },
    { id: 'pagamento', label: 'Formas de Pagamento', icon: CreditCard },
    { id: 'meus-fretes', label: 'Meus Fretes', icon: Package },
    { id: 'seguranca', label: 'Segurança', icon: Shield }
  ];

  const renderContent = () => {
    switch (secaoAtiva) {
      case 'dados-pessoais':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Dados Pessoais</h2>
              <Button
                onClick={editando ? handleSalvar : () => setEditando(true)}
                className={`rounded-lg px-6 py-2 font-semibold ${
                  editando 
                    ? "bg-green-600 hover:bg-green-700 text-white" 
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {editando ? (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="nome" className="text-sm font-medium text-gray-700 mb-2 block">
                  Nome Completo
                </Label>
                <Input
                  id="nome"
                  name="nome"
                  value={dadosUsuario.nome}
                  onChange={handleInputChange}
                  disabled={!editando}
                  className="h-12 rounded-lg border-2 border-gray-200 focus:border-blue-500"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  value={dadosUsuario.email}
                  onChange={handleInputChange}
                  disabled={!editando}
                  className="h-12 rounded-lg border-2 border-gray-200 focus:border-blue-500"
                />
              </div>

              <div>
                <Label htmlFor="telefone" className="text-sm font-medium text-gray-700 mb-2 block">
                  Telefone
                </Label>
                <Input
                  id="telefone"
                  name="telefone"
                  value={dadosUsuario.telefone}
                  onChange={handleInputChange}
                  disabled={!editando}
                  className="h-12 rounded-lg border-2 border-gray-200 focus:border-blue-500"
                />
              </div>

              <div>
                <Label htmlFor="cpf" className="text-sm font-medium text-gray-700 mb-2 block">
                  CPF
                </Label>
                <Input
                  id="cpf"
                  name="cpf"
                  value={dadosUsuario.cpf}
                  onChange={handleInputChange}
                  disabled={!editando}
                  className="h-12 rounded-lg border-2 border-gray-200 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        );

      case 'enderecos':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Endereços</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="endereco" className="text-sm font-medium text-gray-700 mb-2 block">
                  Endereço
                </Label>
                <Input
                  id="endereco"
                  name="endereco"
                  value={dadosUsuario.endereco}
                  onChange={handleInputChange}
                  disabled={!editando}
                  className="h-12 rounded-lg border-2 border-gray-200 focus:border-blue-500"
                />
              </div>

              <div>
                <Label htmlFor="bairro" className="text-sm font-medium text-gray-700 mb-2 block">
                  Bairro
                </Label>
                <Input
                  id="bairro"
                  name="bairro"
                  value={dadosUsuario.bairro}
                  onChange={handleInputChange}
                  disabled={!editando}
                  className="h-12 rounded-lg border-2 border-gray-200 focus:border-blue-500"
                />
              </div>

              <div>
                <Label htmlFor="cidade" className="text-sm font-medium text-gray-700 mb-2 block">
                  Cidade
                </Label>
                <Input
                  id="cidade"
                  name="cidade"
                  value={dadosUsuario.cidade}
                  onChange={handleInputChange}
                  disabled={!editando}
                  className="h-12 rounded-lg border-2 border-gray-200 focus:border-blue-500"
                />
              </div>

              <div>
                <Label htmlFor="estado" className="text-sm font-medium text-gray-700 mb-2 block">
                  Estado
                </Label>
                <Input
                  id="estado"
                  name="estado"
                  value={dadosUsuario.estado}
                  onChange={handleInputChange}
                  disabled={!editando}
                  className="h-12 rounded-lg border-2 border-gray-200 focus:border-blue-500"
                />
              </div>

              <div>
                <Label htmlFor="cep" className="text-sm font-medium text-gray-700 mb-2 block">
                  CEP
                </Label>
                <Input
                  id="cep"
                  name="cep"
                  value={dadosUsuario.cep}
                  onChange={handleInputChange}
                  disabled={!editando}
                  className="h-12 rounded-lg border-2 border-gray-200 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        );

      case 'pagamento':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Formas de Pagamento</h2>
            
            <Card className="border-2 border-gray-200 rounded-lg">
              <CardHeader>
                <CardTitle className="text-lg">Adicionar Cartão de Crédito</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="numero" className="text-sm font-medium text-gray-700 mb-2 block">
                      Número do Cartão
                    </Label>
                    <Input
                      id="numero"
                      name="numero"
                      placeholder="0000 0000 0000 0000"
                      value={dadosCartao.numero}
                      onChange={handleCartaoChange}
                      className="h-12 rounded-lg border-2 border-gray-200 focus:border-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="nomeCartao" className="text-sm font-medium text-gray-700 mb-2 block">
                      Nome no Cartão
                    </Label>
                    <Input
                      id="nomeCartao"
                      name="nome"
                      placeholder="Nome como impresso no cartão"
                      value={dadosCartao.nome}
                      onChange={handleCartaoChange}
                      className="h-12 rounded-lg border-2 border-gray-200 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="validade" className="text-sm font-medium text-gray-700 mb-2 block">
                      Validade
                    </Label>
                    <Input
                      id="validade"
                      name="validade"
                      placeholder="MM/AA"
                      value={dadosCartao.validade}
                      onChange={handleCartaoChange}
                      className="h-12 rounded-lg border-2 border-gray-200 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cvv" className="text-sm font-medium text-gray-700 mb-2 block">
                      CVV
                    </Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      placeholder="000"
                      value={dadosCartao.cvv}
                      onChange={handleCartaoChange}
                      className="h-12 rounded-lg border-2 border-gray-200 focus:border-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="cpfCartao" className="text-sm font-medium text-gray-700 mb-2 block">
                      CPF do Portador
                    </Label>
                    <Input
                      id="cpfCartao"
                      name="cpf"
                      placeholder="000.000.000-00"
                      value={dadosCartao.cpf}
                      onChange={handleCartaoChange}
                      className="h-12 rounded-lg border-2 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-12">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Salvar Cartão
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case 'meus-fretes':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Meus Fretes</h2>
            
            <div className="space-y-4">
              {fretesUsuario.map((frete) => (
                <Card key={frete.id} className="border-2 border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{frete.freteiro}</h3>
                        <p className="text-gray-600">{frete.origem} → {frete.destino}</p>
                        <p className="text-sm text-gray-500">Data: {new Date(frete.data).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600">{frete.valor}</div>
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          frete.status === 'Concluído' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          {frete.status}
                        </div>
                      </div>
                    </div>
                    
                    {frete.status === 'Concluído' && frete.avaliacao && (
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-sm text-gray-600">Sua avaliação:</span>
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < frete.avaliacao ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-3">
                      <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg">
                        Ver Detalhes
                      </Button>
                      {frete.status === 'Concluído' && !frete.avaliacao && (
                        <Button className="bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg">
                          Avaliar Freteiro
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'seguranca':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Segurança</h2>
            
            <Card className="border-2 border-gray-200 rounded-lg">
              <CardHeader>
                <CardTitle className="text-lg">Alterar Senha</CardTitle>
                <CardDescription>Mantenha sua conta segura alterando sua senha regularmente</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="senhaAtual" className="text-sm font-medium text-gray-700 mb-2 block">
                    Senha Atual
                  </Label>
                  <div className="relative">
                    <Input
                      id="senhaAtual"
                      name="senhaAtual"
                      type={showPassword ? "text" : "password"}
                      value={dadosSeguranca.senhaAtual}
                      onChange={handleSegurancaChange}
                      className="h-12 rounded-lg border-2 border-gray-200 focus:border-blue-500"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="novaSenha" className="text-sm font-medium text-gray-700 mb-2 block">
                    Nova Senha
                  </Label>
                  <Input
                    id="novaSenha"
                    name="novaSenha"
                    type={showPassword ? "text" : "password"}
                    value={dadosSeguranca.novaSenha}
                    onChange={handleSegurancaChange}
                    className="h-12 rounded-lg border-2 border-gray-200 focus:border-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmarSenha" className="text-sm font-medium text-gray-700 mb-2 block">
                    Confirmar Nova Senha
                  </Label>
                  <Input
                    id="confirmarSenha"
                    name="confirmarSenha"
                    type={showPassword ? "text" : "password"}
                    value={dadosSeguranca.confirmarSenha}
                    onChange={handleSegurancaChange}
                    className="h-12 rounded-lg border-2 border-gray-200 focus:border-blue-500"
                  />
                </div>

                <Button 
                  onClick={handleAlterarSenha}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-12"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Alterar Senha
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 rounded-lg">
              <CardHeader>
                <CardTitle className="text-lg">Recuperação de Conta</CardTitle>
                <CardDescription>Configure opções de recuperação para sua conta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Email de recuperação</h4>
                    <p className="text-sm text-gray-600">{dadosUsuario.email}</p>
                  </div>
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    Alterar
                  </Button>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Telefone de recuperação</h4>
                    <p className="text-sm text-gray-600">{dadosUsuario.telefone}</p>
                  </div>
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    Alterar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Truck className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Busca Já</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/meus-fretes">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Package className="h-4 w-4 mr-2" />
                  Meus Fretes
                </Button>
              </Link>
              <Button variant="outline" onClick={logout} className="border-red-600 text-red-600 hover:bg-red-50 rounded-lg">
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar com menu */}
          <div className="w-80 flex-shrink-0">
            <Card className="sticky top-8">
              {/* Header do perfil */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-lg">
                <div className="text-center">
                  <div className="relative inline-block">
                    <Avatar className="h-24 w-24 border-4 border-white mx-auto">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button 
                      size="icon"
                      onClick={handleTrocarFoto}
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600 border-2 border-white"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-bold mt-3">{dadosUsuario.nome}</h2>
                  <p className="text-blue-100">Cliente Busca Já</p>
                </div>
              </div>

              {/* Menu de navegação */}
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSecaoAtiva(item.id)}
                      className={`w-full flex items-center px-6 py-4 text-left hover:bg-gray-50 border-b border-gray-100 transition-colors ${
                        secaoAtiva === item.id 
                          ? 'bg-blue-50 text-blue-600 border-r-4 border-r-blue-600' 
                          : 'text-gray-700'
                      }`}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo principal */}
          <div className="flex-1">
            <Card className="shadow-lg border-0 rounded-lg">
              <CardContent className="p-8">
                {renderContent()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
