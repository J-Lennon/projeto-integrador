
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, ArrowLeft, Upload, Camera, FileText, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const CadastroFreteiro = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    documento: '',
    tipoDocumento: 'cpf',
    email: '',
    telefone: '',
    modeloVeiculo: '',
    marcaVeiculo: '',
    placaVeiculo: '',
    senha: '',
    confirmarSenha: ''
  });

  const [fotoIdentidade, setFotoIdentidade] = useState<File | null>(null);
  const [documentos, setDocumentos] = useState<FileList | null>(null);

  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFotoIdentidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFotoIdentidade(e.target.files[0]);
    }
  };

  const handleDocumentosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocumentos(e.target.files);
    }
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

    if (!fotoIdentidade) {
      toast({
        title: "Erro",
        description: "A foto segurando a identidade é obrigatória.",
        variant: "destructive"
      });
      return;
    }

    // Fazer login automático após cadastro
    login(formData.email, formData.senha);
    
    toast({
      title: "Cadastro realizado com sucesso!",
      description: "Bem-vindo à plataforma Busca Já!"
    });
    
    // Redirecionar para home logado
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md border-b-2 border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3 group">
              <ArrowLeft className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
              <Truck className="h-10 w-10 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Busca Já</span>
            </Link>
            <div className="flex items-center space-x-2">
              <User className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-lg font-bold text-blue-600">Ei, você!</p>
                <p className="text-sm text-gray-600">Gostaria de anunciar seus serviços em nosso site?</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cadastro de Freteiro</h1>
          <p className="text-xl text-gray-600">Junte-se à nossa plataforma e anuncie o quanto antes!</p>
        </div>

        <Card className="shadow-2xl border-0 rounded-3xl overflow-hidden bg-white">
          <CardContent className="p-12">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Dados Pessoais/Empresa */}
              <div className="space-y-8">
                <div className="border-b-2 border-blue-100 pb-4">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <User className="h-6 w-6 text-blue-600 mr-3" />
                    Dados Pessoais / Empresa
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="lg:col-span-2">
                    <Label htmlFor="nomeCompleto" className="text-lg font-semibold text-gray-700 mb-3 block">
                      Nome Completo ou Razão Social *
                    </Label>
                    <Input
                      id="nomeCompleto"
                      name="nomeCompleto"
                      type="text"
                      required
                      className="h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 transition-all duration-300"
                      placeholder="Digite o nome completo ou razão social"
                      value={formData.nomeCompleto}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="tipoDocumento" className="text-lg font-semibold text-gray-700 mb-3 block">
                      Tipo de Documento *
                    </Label>
                    <select
                      id="tipoDocumento"
                      name="tipoDocumento"
                      required
                      className="h-14 w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-all duration-300"
                      value={formData.tipoDocumento}
                      onChange={handleInputChange}
                    >
                      <option value="cpf">CPF</option>
                      <option value="cnpj">CNPJ</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="documento" className="text-lg font-semibold text-gray-700 mb-3 block">
                      {formData.tipoDocumento === 'cpf' ? 'CPF' : 'CNPJ'} *
                    </Label>
                    <Input
                      id="documento"
                      name="documento"
                      type="text"
                      required
                      className="h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 transition-all duration-300"
                      placeholder={formData.tipoDocumento === 'cpf' ? '000.000.000-00' : '00.000.000/0000-00'}
                      value={formData.documento}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-lg font-semibold text-gray-700 mb-3 block">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 transition-all duration-300"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone" className="text-lg font-semibold text-gray-700 mb-3 block">
                      Telefone *
                    </Label>
                    <Input
                      id="telefone"
                      name="telefone"
                      type="tel"
                      required
                      className="h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 transition-all duration-300"
                      placeholder="(00) 00000-0000"
                      value={formData.telefone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Dados do Veículo */}
              <div className="space-y-8">
                <div className="border-b-2 border-blue-100 pb-4">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Truck className="h-6 w-6 text-blue-600 mr-3" />
                    Dados do Veículo
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <Label htmlFor="marcaVeiculo" className="text-lg font-semibold text-gray-700 mb-3 block">
                      Marca do Veículo *
                    </Label>
                    <Input
                      id="marcaVeiculo"
                      name="marcaVeiculo"
                      type="text"
                      required
                      className="h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 transition-all duration-300"
                      placeholder="Ex: Ford, Volkswagen, Mercedes"
                      value={formData.marcaVeiculo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="modeloVeiculo" className="text-lg font-semibold text-gray-700 mb-3 block">
                      Modelo do Veículo *
                    </Label>
                    <Input
                      id="modeloVeiculo"
                      name="modeloVeiculo"
                      type="text"
                      required
                      className="h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 transition-all duration-300"
                      placeholder="Ex: Transit, Sprinter, HR"
                      value={formData.modeloVeiculo}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="lg:col-span-2">
                    <Label htmlFor="placaVeiculo" className="text-lg font-semibold text-gray-700 mb-3 block">
                      Placa do Veículo *
                    </Label>
                    <Input
                      id="placaVeiculo"
                      name="placaVeiculo"
                      type="text"
                      required
                      className="h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 transition-all duration-300"
                      placeholder="ABC-1234 ou ABC1D23"
                      value={formData.placaVeiculo}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* Upload de Documentos */}
              <div className="space-y-8">
                <div className="border-b-2 border-blue-100 pb-4">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <FileText className="h-6 w-6 text-blue-600 mr-3" />
                    Documentos e Fotos
                  </h2>
                </div>
                
                {/* Foto com Identidade - OBRIGATÓRIO */}
                <div className="border-3 border-dashed border-red-400 rounded-3xl p-8 bg-gradient-to-br from-red-50 to-pink-50">
                  <div className="text-center">
                    <Camera className="mx-auto h-16 w-16 text-red-600 mb-4" />
                    <div>
                      <Label htmlFor="fotoIdentidade" className="text-xl font-bold text-red-700 block mb-2">
                        Foto Segurando a Identidade * (OBRIGATÓRIO)
                      </Label>
                      <p className="text-red-600 text-lg mb-6">
                        Envie uma foto sua segurando seu documento de identidade (RG ou CNH)
                      </p>
                      <div>
                        <input
                          id="fotoIdentidade"
                          name="fotoIdentidade"
                          type="file"
                          accept="image/*"
                          required
                          onChange={handleFotoIdentidadeChange}
                          className="block w-full text-base text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:text-base file:font-semibold file:bg-red-100 file:text-red-700 hover:file:bg-red-200 transition-all duration-300"
                        />
                      </div>
                      {fotoIdentidade && (
                        <p className="mt-4 text-lg text-green-600 font-semibold">
                          ✓ Foto selecionada: {fotoIdentidade.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Outros Documentos */}
                <div className="border-3 border-dashed border-blue-400 rounded-3xl p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <div className="text-center">
                    <FileText className="mx-auto h-16 w-16 text-blue-600 mb-4" />
                    <div>
                      <Label htmlFor="documentos" className="text-xl font-bold text-blue-700 block mb-2">
                        Documentos Adicionais
                      </Label>
                      <p className="text-blue-600 text-lg mb-6">
                        CNH, CRLV, Comprovante de Endereço, etc. (Opcional)
                      </p>
                      <div>
                        <input
                          id="documentos"
                          name="documentos"
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleDocumentosChange}
                          className="block w-full text-base text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:text-base file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition-all duration-300"
                        />
                      </div>
                      {documentos && documentos.length > 0 && (
                        <p className="mt-4 text-lg text-green-600 font-semibold">
                          ✓ {documentos.length} arquivo(s) selecionado(s)
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Senha */}
              <div className="space-y-8">
                <div className="border-b-2 border-blue-100 pb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Defina sua Senha</h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <Label htmlFor="senha" className="text-lg font-semibold text-gray-700 mb-3 block">
                      Senha *
                    </Label>
                    <Input
                      id="senha"
                      name="senha"
                      type="password"
                      required
                      className="h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 transition-all duration-300"
                      placeholder="Sua senha"
                      value={formData.senha}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmarSenha" className="text-lg font-semibold text-gray-700 mb-3 block">
                      Confirmar Senha *
                    </Label>
                    <Input
                      id="confirmarSenha"
                      name="confirmarSenha"
                      type="password"
                      required
                      className="h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 transition-all duration-300"
                      placeholder="Confirme sua senha"
                      value={formData.confirmarSenha}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Button 
                  type="submit" 
                  className="w-full h-16 text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Cadastrar como Freteiro
                </Button>
              </div>
            </form>

            <div className="text-center mt-8">
              <p className="text-gray-600 text-lg">
                Já tem uma conta?{' '}
                <Link to="/login" className="text-blue-600 hover:underline font-semibold text-xl">
                  Faça login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Truck className="h-10 w-10 text-blue-400" />
              <span className="text-2xl font-bold">Busca Já</span>
            </div>
            <div className="text-center">
              <p className="text-gray-300 text-lg">Visando entregar um serviço de alta qualidade desde 2025</p>
            </div>
            <div className="text-right text-gray-300">
              <p>Ajuda</p>
              <p>Perguntas Frequentes</p>
              <p>SAC</p>
              <p>Entre em contato</p>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-400">
            <p>Figura © 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CadastroFreteiro;
