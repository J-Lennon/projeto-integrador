
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, ArrowLeft, Mail, User, MapPin, Phone, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    cpf: '',
    email: '',
    endereco: '',
    bairro: '',
    cidade: '',
    estado: '',
    telefone: '',
    senha: '',
    confirmarSenha: ''
  });

  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Cadastro realizado!",
      description: "Sua conta foi criada com sucesso."
    });
  };

  const handleGoogleLogin = () => {
    toast({
      title: "Google Login",
      description: "Redirecionando para o Google..."
    });
  };

  const handleFacebookLogin = () => {
    toast({
      title: "Facebook Login",
      description: "Redirecionando para o Facebook..."
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
              <Truck className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Busca Já</span>
            </Link>
            <div className="flex space-x-3">
              <Link to="/login">
                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  Já tenho conta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900">Cadastro de Usuário</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Crie sua conta para solicitar fretes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleGoogleLogin}
                variant="outline" 
                className="w-full h-12 text-lg border-gray-300 hover:bg-gray-50"
              >
                <Globe className="h-5 w-5 mr-3" />
                Continuar com Google
              </Button>
              <Button 
                onClick={handleFacebookLogin}
                variant="outline" 
                className="w-full h-12 text-lg border-gray-300 hover:bg-gray-50"
              >
                <Globe className="h-5 w-5 mr-3" />
                Continuar com Facebook
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">ou preencha os dados abaixo</span>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nomeCompleto" className="text-base font-medium">
                    Nome Completo *
                  </Label>
                  <Input
                    id="nomeCompleto"
                    name="nomeCompleto"
                    type="text"
                    required
                    className="mt-1 h-12"
                    placeholder="Digite seu nome completo"
                    value={formData.nomeCompleto}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="cpf" className="text-base font-medium">
                    CPF *
                  </Label>
                  <Input
                    id="cpf"
                    name="cpf"
                    type="text"
                    required
                    className="mt-1 h-12"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-base font-medium">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 h-12"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="endereco" className="text-base font-medium">
                  Endereço *
                </Label>
                <Input
                  id="endereco"
                  name="endereco"
                  type="text"
                  required
                  className="mt-1 h-12"
                  placeholder="Rua, número, complemento"
                  value={formData.endereco}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bairro" className="text-base font-medium">
                    Bairro *
                  </Label>
                  <Input
                    id="bairro"
                    name="bairro"
                    type="text"
                    required
                    className="mt-1 h-12"
                    placeholder="Seu bairro"
                    value={formData.bairro}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="cidade" className="text-base font-medium">
                    Cidade *
                  </Label>
                  <Input
                    id="cidade"
                    name="cidade"
                    type="text"
                    required
                    className="mt-1 h-12"
                    placeholder="Sua cidade"
                    value={formData.cidade}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="estado" className="text-base font-medium">
                    Estado *
                  </Label>
                  <Input
                    id="estado"
                    name="estado"
                    type="text"
                    required
                    className="mt-1 h-12"
                    placeholder="UF"
                    value={formData.estado}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="telefone" className="text-base font-medium">
                  Telefone *
                </Label>
                <Input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  required
                  className="mt-1 h-12"
                  placeholder="(00) 00000-0000"
                  value={formData.telefone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="senha" className="text-base font-medium">
                    Senha *
                  </Label>
                  <Input
                    id="senha"
                    name="senha"
                    type="password"
                    required
                    className="mt-1 h-12"
                    placeholder="Sua senha"
                    value={formData.senha}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="confirmarSenha" className="text-base font-medium">
                    Confirmar Senha *
                  </Label>
                  <Input
                    id="confirmarSenha"
                    name="confirmarSenha"
                    type="password"
                    required
                    className="mt-1 h-12"
                    placeholder="Confirme sua senha"
                    value={formData.confirmarSenha}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
              >
                Criar Conta
              </Button>
            </form>

            <div className="text-center">
              <p className="text-gray-600">
                Já tem uma conta?{' '}
                <Link to="/login" className="text-blue-600 hover:underline font-medium">
                  Faça login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cadastro;
