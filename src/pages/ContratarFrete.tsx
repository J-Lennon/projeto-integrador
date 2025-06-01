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
import Chat from "@/components/Chat";

const ContratarFrete = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const freteiro = location.state?.freteiro;
  const [isChatOpen, setIsChatOpen] = useState(false);

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p>Freteiro não encontrado.</p>
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Redirect to confirmation page with data
    navigate('/confirmacao-agendamento', {
      state: { freteiro, formData }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigate(-1)}
                className="rounded-xl border-2 border-gray-300 hover:border-blue-600"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voltar
              </Button>
              <Link to="/" className="flex items-center space-x-3">
                <Truck className="h-10 w-10 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">Busca Já</span>
              </Link>
            </div>
            {user && (
              <Link to="/perfil">
                <Avatar className="h-12 w-12 cursor-pointer hover:ring-4 hover:ring-blue-300 transition-all duration-300 border-2 border-blue-200">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
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
            <Card className="shadow-2xl border-0 rounded-3xl bg-white">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-900">Contratar Frete</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Preencha os detalhes do seu frete
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Origem e Destino */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 border-b-2 border-blue-100 pb-2">
                      Local de Origem e Destino
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="origem" className="text-lg font-semibold text-gray-700 mb-3 block">
                          Origem *
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="origem"
                            name="origem"
                            type="text"
                            required
                            className="h-14 pl-12 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500"
                            placeholder="Endereço de origem"
                            value={formData.origem}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="destino" className="text-lg font-semibold text-gray-700 mb-3 block">
                          Destino *
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="destino"
                            name="destino"
                            type="text"
                            required
                            className="h-14 pl-12 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500"
                            placeholder="Endereço de destino"
                            value={formData.destino}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Data e Horário */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 border-b-2 border-blue-100 pb-2">
                      Data e Horário
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="data" className="text-lg font-semibold text-gray-700 mb-3 block">
                          Data *
                        </Label>
                        <Input
                          id="data"
                          name="data"
                          type="date"
                          required
                          className="h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500"
                          value={formData.data}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="horario" className="text-lg font-semibold text-gray-700 mb-3 block">
                          Horário Preferido
                        </Label>
                        <Input
                          id="horario"
                          name="horario"
                          type="time"
                          className="h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500"
                          value={formData.horario}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Detalhes da Carga */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 border-b-2 border-blue-100 pb-2">
                      Detalhes da Carga
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="descricaoCarga" className="text-lg font-semibold text-gray-700 mb-3 block">
                          Descrição da Carga *
                        </Label>
                        <Input
                          id="descricaoCarga"
                          name="descricaoCarga"
                          type="text"
                          required
                          className="h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500"
                          placeholder="Ex: Móveis, eletrodomésticos..."
                          value={formData.descricaoCarga}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="peso" className="text-lg font-semibold text-gray-700 mb-3 block">
                          Peso Estimado (kg)
                        </Label>
                        <Input
                          id="peso"
                          name="peso"
                          type="number"
                          className="h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500"
                          placeholder="Ex: 50"
                          value={formData.peso}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="observacoes" className="text-lg font-semibold text-gray-700 mb-3 block">
                        Observações Adicionais
                      </Label>
                      <textarea
                        id="observacoes"
                        name="observacoes"
                        rows={4}
                        className="w-full p-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none resize-none"
                        placeholder="Informações adicionais sobre a carga ou instruções especiais..."
                        value={formData.observacoes}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Forma de Pagamento */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 border-b-2 border-blue-100 pb-2">
                      Forma de Pagamento
                    </h3>
                    <PaymentSelector
                      selectedPayment={formData.formaPagamento}
                      onPaymentChange={(payment) => setFormData(prev => ({ ...prev, formaPagamento: payment }))}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-16 text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Confirmar Contratação
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Freteiro Info */}
          <div>
            <Card className="shadow-2xl border-0 rounded-3xl bg-white sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Freteiro Selecionado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-blue-200">
                    <AvatarImage src={freteiro.avatar} alt={freteiro.nome} />
                    <AvatarFallback className="text-xl bg-blue-100 text-blue-600">{freteiro.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{freteiro.nome}</h3>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-4 h-4 rounded-full ${i < Math.floor(freteiro.rating) ? 'bg-yellow-400' : 'bg-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{freteiro.rating}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-2xl">
                    <div className="text-sm text-gray-600">Preço do Frete</div>
                    <div className="text-2xl font-bold text-blue-600">{freteiro.preco}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <div className="text-sm text-gray-600">Veículo</div>
                    <div className="font-semibold">{freteiro.veiculo}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <div className="text-sm text-gray-600">Tempo Estimado</div>
                    <div className="font-semibold">{freteiro.tempo}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 rounded-2xl"
                    onClick={() => window.open(`tel:${freteiro.telefone}`, '_self')}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Ligar
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50 rounded-2xl"
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
