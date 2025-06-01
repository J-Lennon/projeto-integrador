
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface AvaliacaoFreteProps {
  isOpen: boolean;
  onClose: () => void;
  freteiro: {
    id: string;
    nome: string;
    avatar?: string;
  };
  onSubmit: (rating: number, comentario: string) => void;
}

const AvaliacaoFrete = ({ isOpen, onClose, freteiro, onSubmit }: AvaliacaoFreteProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comentario, setComentario] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Avaliação necessária",
        description: "Por favor, dê uma nota de 1 a 10 para o freteiro.",
        variant: "destructive"
      });
      return;
    }

    onSubmit(rating, comentario);
    onClose();
    
    toast({
      title: "Avaliação enviada!",
      description: "Obrigado pelo seu feedback.",
    });

    // Reset form
    setRating(0);
    setHoverRating(0);
    setComentario('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg shadow-2xl border-0 rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-white p-4 rounded-full">
              <Star className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Avaliar Frete</CardTitle>
            <CardDescription className="text-green-100 text-lg">
              Como foi seu serviço de frete?
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          {/* Freteiro Info */}
          <div className="flex items-center space-x-4 mb-8 p-4 bg-gray-50 rounded-2xl">
            <Avatar className="h-16 w-16 border-4 border-green-200">
              <AvatarImage src={freteiro.avatar} alt={freteiro.nome} />
              <AvatarFallback className="bg-green-100 text-green-600 text-lg font-bold">
                {freteiro.nome.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{freteiro.nome}</h3>
              <p className="text-gray-600">Freteiro</p>
            </div>
          </div>

          {/* Rating */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-gray-900 mb-4 text-center">
              Dê uma nota de 1 a 10
            </h4>
            <div className="flex justify-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-all duration-200 hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-gray-900">
                {rating > 0 ? rating : '-'}/10
              </span>
              <div className="text-sm text-gray-600 mt-2">
                {rating >= 9 && "Excelente! 🌟"}
                {rating >= 7 && rating < 9 && "Muito bom! 👍"}
                {rating >= 5 && rating < 7 && "Bom 👌"}
                {rating >= 3 && rating < 5 && "Regular 😐"}
                {rating >= 1 && rating < 3 && "Ruim 👎"}
              </div>
            </div>
          </div>

          {/* Comentário */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-gray-900 mb-4">
              Deixe um comentário (opcional)
            </h4>
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              rows={4}
              className="w-full p-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:outline-none resize-none"
              placeholder="Conte como foi sua experiência com este freteiro..."
              maxLength={500}
            />
            <div className="text-right text-sm text-gray-500 mt-2">
              {comentario.length}/500 caracteres
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-14 text-lg font-bold border-2 border-gray-300 hover:border-gray-400 rounded-2xl"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 h-14 text-lg font-bold bg-green-600 hover:bg-green-700 rounded-2xl shadow-xl"
            >
              Enviar Avaliação
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AvaliacaoFrete;
