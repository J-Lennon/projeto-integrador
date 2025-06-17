
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, ArrowLeft, MapPin, Phone, MessageCircle } from "lucide-react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { PaymentSelector } from "@/components/PaymentIcons";
import { FormValidation } from "@/components/FormValidation";
import Chat from "@/components/Chat";

const ContratarFrete = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const freteiro = location.state?.freteiro;
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showValidation, setShowValidation] = useState({
    origem: false,
    destino: false,
    descricaoCarga: false
  });

  const [formData, setFormData] = useState({
    origem: location.state?.origem || '',
    destino: location.state?.destino || '',
    data: location.state?.data || '',
    horario: '',
    descricaoCarga: '',
    peso: '',
    observacoes: '',
    formaPagamento: 'dinheiro'
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Show validation for required fields
    if (['origem', 'destino', 'descricaoCarga'].includes(name)) {
      setShowValidation(prev => ({
        ...prev,
        [name]: true
      }));
    }
  };

  const validateForm = () => {
    const requiredFields = ['origem', 'destino', 'data', 'descricaoCarga'];
    
    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        toast({
          title: "Campo obrigatório",
          description: `Por favor, preencha o campo ${field === 'origem' ? 'origem' : field === 'destino' ? 'destino' : field === 'data' ? 'data' : 'descrição da carga'}.`,
          variant: "destructive"
        });
        return false;
      }
    }

    // Validate origem
    if (formData.origem.length < 5 || !/^[a-zA-ZÀ-ÿ\s,.-]+/.test(formData.origem) || !/\d/.test(formData.origem)) {
      toast({
        title: "Endereço de origem inválido",
        description: "Por favor, insira um endereço válido para origem.",
        variant: "destructive"
      });
      return false;
    }

    // Validate destino
    if (formData.destino.length < 5 || !/^[a-zA-ZÀ-ÿ\s,.-]+/.test(formData.destino) || !/\d/.test(formData.destino)) {
      toast({
        title: "Endereço de destino inválido",
        description: "Por favor, insira um endereço válido para destino.",
        variant: "destructive"
      });
      return false;
    }

    // Validate date
    const today = new Date();
    const selectedDate = new Date(formData.data);
    if (selectedDate < today) {
      toast({
        title: "Data inválida",
        description: "A data não pode ser no passado.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Redirect to confirmation page with data
    navigate('/confirmacao-agendamento', {
      state: { freteiro, formData }
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
            {user && (
              <Link to="/perfil">
                <Avatar className="h-12 w-12 cursor-pointer hover:ring-4 hover:ring-blue-300 dark:hover:ring-purple-300 transition-all duration-300 border-2 border-blue-200 dark:border-purple-200">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-purple-100 dark:text-purple-600 font-bold">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-0 rounded-3xl bg-white dark:bg-black">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">Contratar Frete</CardTitle>
                <CardDescription className="text-lg text-gray-600 dark:text-gray-400">
                  Preencha os detalhes do seu frete
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Origem e Destino */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-100 dark:border-purple-600 pb-2">
                      Local de Origem e Destino
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="origem" className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3 block">
                          Origem *
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                          <Input
                            id="origem"
                            name="origem"
                            type="text"
                            required
                            className="h-14 pl-12 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-purple-500"
                            placeholder="Endereço de origem"
                            value={formData.origem}
                            onChange={handleInputChange}
                          />
                        </div>
                        <FormValidation
                          value={formData.origem}
                          type="endereco"
                          showValidation={showValidation.origem}
                        />
                      </div>
                      <div>
                        <Label htmlFor="destino" className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3 block">
                          Destino *
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                          <Input
                            id="destino"
                            name="destino"
                            type="text"
                            required
                            className="h-14 pl-12 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-purple-500"
                            placeholder="Endereço de destino"
                            value={formData.destino}
                            onChange={handleInputChange}
                          />
                        </div>
                        <FormValidation
                          value={formData.destino}
                          type="endereco"
                          showValidation={showValidation.destino}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Data e Horário */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-100 dark:border-purple-600 pb-2">
                      Data e Horário
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="data" className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3 block">
                          Data *
                        </Label>
                        <Input
                          id="data"
                          name="data"
                          type="date"
                          required
                          className="h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-purple-500"
                          value={formData.data}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="horario" className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3 block">
                          Horário Preferido
                        </Label>
                        <Input
                          id="horario"
                          name="horario"
                          type="time"
                          className="h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-purple-500"
                          value={formData.horario}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Detalhes da Carga */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-100 dark:border-purple-600 pb-2">
                      Detalhes da Carga
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="descricaoCarga" className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3 block">
                          Descrição da Carga *
                        </Label>
                        <Input
                          id="descricaoCarga"
                          name="descricaoCarga"
                          type="text"
                          required
                          className="h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-purple-500"
                          placeholder="Ex: Móveis, eletrodomésticos..."
                          value={formData.descricaoCarga}
                          onChange={handleInputChange}
                        />
                        <FormValidation
                          value={formData.descricaoCarga}
                          type="cidade"
                          showValidation={showValidation.descricaoCarga}
                        />
                      </div>
                      <div>
                        <Label htmlFor="peso" className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3 block">
                          Peso Estimado (kg)
                        </Label>
                        <Input
                          id="peso"
                          name="peso"
                          type="number"
                          className="h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-purple-500"
                          placeholder="Ex: 50"
                          value={formData.peso}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="observacoes" className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3 block">
                        Observações Adicionais
                      </Label>
                      <textarea
                        id="observacoes"
                        name="observacoes"
                        rows={4}
                        className="w-full p-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none resize-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-purple-500"
                        placeholder="Informações adicionais sobre a carga ou instruções especiais..."
                        value={formData.observacoes}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Forma de Pagamento */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-100 dark:border-purple-600 pb-2">
                      Forma de Pagamento
                    </h3>
                    <PaymentSelector
                      selectedPayment={formData.formaPagamento}
                      onPaymentChange={(payment) => setFormData(prev => ({ ...prev, formaPagamento: payment }))}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-16 text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Confirmar Contratação
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Freteiro Info */}
          <div>
            <Card className="shadow-2xl border-0 rounded-3xl bg-white dark:bg-black sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Freteiro Selecionado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-blue-200 dark:border-purple-200">
                    <AvatarImage src={freteiro.avatar} alt={freteiro.nome} />
                    <AvatarFallback className="text-xl bg-blue-100 text-blue-600 dark:bg-purple-100 dark:text-purple-600">{freteiro.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{freteiro.nome}</h3>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-4 h-4 rounded-full ${i < Math.floor(freteiro.rating) ? 'bg-yellow-400' : 'bg-gray-300 dark:bg-gray-600'}`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold dark:text-white">{freteiro.rating}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-2xl">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Preço do Frete</div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{freteiro.preco}</div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Veículo</div>
                    <div className="font-semibold dark:text-white">{freteiro.veiculo}</div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Tempo Estimado</div>
                    <div className="font-semibold dark:text-white">{freteiro.tempo}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-900/20 rounded-2xl"
                    onClick={() => window.open(`tel:${freteiro.telefone}`, '_self')}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Ligar
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-purple-500 dark:text-purple-400 dark:hover:bg-purple-900/20 rounded-2xl"
                    onClick={() => setIsChatOpen(true)}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat
                  </Button>
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

export default ContratarFrete;
