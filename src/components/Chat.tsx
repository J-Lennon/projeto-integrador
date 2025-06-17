import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, X, Phone, Video, Smile, Paperclip } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: {
    id: string;
    name: string;
    avatar?: string;
    phone?: string;
  };
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'recipient';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file';
}

const Chat = ({ isOpen, onClose, recipient }: ChatProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Vi que você tem interesse no frete. Podemos conversar sobre os detalhes?',
      sender: 'recipient',
      timestamp: new Date(Date.now() - 300000),
      status: 'read',
      type: 'text'
    },
    {
      id: '2',
      text: 'Oi! Sim, claro. Preciso transportar alguns móveis amanhã pela manhã.',
      sender: 'user',
      timestamp: new Date(Date.now() - 240000),
      status: 'read',
      type: 'text'
    },
    {
      id: '3',
      text: 'Perfeito! Qual o endereço de origem e destino? Posso dar uma cotação mais precisa.',
      sender: 'recipient',
      timestamp: new Date(Date.now() - 180000),
      status: 'read',
      type: 'text'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: 'user',
        timestamp: new Date(),
        status: 'sent',
        type: 'text'
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');

      // Simular indicador de digitação
      setTimeout(() => {
        setIsTyping(true);
      }, 500);

      // Simular resposta automática
      setTimeout(() => {
        setIsTyping(false);
        const responses = [
          'Entendi! Vou verificar minha agenda e te retorno em instantes.',
          'Perfeito! Posso fazer esse transporte. Vamos acertar os detalhes?',
          'Ótimo! Tenho disponibilidade para esse horário. Qual o valor do frete que você está pensando?',
          'Recebi sua mensagem! Posso ajudar sim. Vou preparar uma proposta para você.',
          'Tudo certo! Vou passar no local antes para avaliar melhor o volume da carga.'
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const autoReply: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: 'recipient',
          timestamp: new Date(),
          status: 'delivered',
          type: 'text'
        };
        setMessages(prev => [...prev, autoReply]);
        
        // Marcar como lida após 2 segundos
        setTimeout(() => {
          setMessages(prev => prev.map(msg => 
            msg.id === autoReply.id ? { ...msg, status: 'read' } : msg
          ));
        }, 2000);
      }, 2000 + Math.random() * 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return '✓';
      case 'delivered': return '✓✓';
      case 'read': return <span className="text-blue-400">✓✓</span>;
      default: return '';
    }
  };

  const handlePhoneCall = () => {
    if (recipient.phone) {
      window.open(`tel:${recipient.phone}`, '_self');
    }
  };

  const handleVideoCall = () => {
    // Simular chamada de vídeo
    toast({
      title: "Chamada de vídeo",
      description: "Iniciando chamada de vídeo...",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg h-[700px] flex flex-col shadow-2xl border-0 rounded-3xl overflow-hidden bg-white dark:bg-purple-900/90">
        {/* Header - Design Premium */}
        <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-purple-600 dark:via-pink-600 dark:to-indigo-600 text-white p-6 flex-shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="h-14 w-14 border-3 border-white/30 shadow-xl">
                  <AvatarImage src={recipient.avatar} alt={recipient.name} />
                  <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
                    {recipient.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <CardTitle className="text-xl font-bold">{recipient.name}</CardTitle>
                <p className="text-blue-100 dark:text-purple-100 text-sm font-medium">
                  {isTyping ? 'Digitando...' : 'Online agora'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {recipient.phone && (
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="text-white hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-105"
                  onClick={handlePhoneCall}
                >
                  <Phone className="h-5 w-5" />
                </Button>
              )}
              <Button 
                size="icon" 
                variant="ghost" 
                className="text-white hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-105"
                onClick={handleVideoCall}
              >
                <Video className="h-5 w-5" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="text-white hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-105"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Messages - Design com cores mais vibrantes no dark mode */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-purple-900/30 dark:to-indigo-900/30">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end space-x-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {msg.sender === 'recipient' && (
                  <Avatar className="h-8 w-8 flex-shrink-0 shadow-md">
                    <AvatarImage src={recipient.avatar} alt={recipient.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-xs font-semibold">
                      {recipient.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`px-4 py-3 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-md transform hover:scale-[1.02]'
                      : 'bg-white text-slate-800 shadow-md rounded-bl-md border border-slate-200/50 transform hover:scale-[1.02]'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <div className={`flex items-center justify-between mt-2 text-xs ${
                    msg.sender === 'user' ? 'text-blue-100' : 'text-slate-500'
                  }`}>
                    <span className="font-medium">{formatTime(msg.timestamp)}</span>
                    {msg.sender === 'user' && (
                      <span className="ml-2 flex items-center">
                        {getStatusIcon(msg.status)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Indicador de digitação */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8 shadow-md">
                  <AvatarImage src={recipient.avatar} alt={recipient.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xs font-semibold">
                    {recipient.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-lg border border-slate-200/50">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Input - Design Premium com cores vibrantes */}
        <div className="p-6 bg-white dark:bg-purple-900/50 border-t border-slate-200/50 dark:border-purple-700/50 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <Button 
              size="icon"
              variant="ghost"
              className="text-slate-500 dark:text-purple-300 hover:text-blue-600 dark:hover:text-purple-400 hover:bg-blue-50 dark:hover:bg-purple-800/50 rounded-xl transition-all duration-300"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="pl-4 pr-12 h-12 rounded-2xl border-2 border-slate-200 dark:border-purple-700 focus:border-blue-500 dark:focus:border-purple-400 transition-all duration-300 bg-slate-50 dark:bg-purple-800/30 focus:bg-white dark:focus:bg-purple-800/50"
              />
              <Button 
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-purple-300 hover:text-blue-600 dark:hover:text-purple-400 rounded-xl"
              >
                <Smile className="h-5 w-5" />
              </Button>
            </div>
            <Button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-purple-600 dark:to-pink-600 hover:from-blue-700 hover:to-indigo-700 dark:hover:from-purple-700 dark:hover:to-pink-700 rounded-2xl px-6 h-12 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chat;
