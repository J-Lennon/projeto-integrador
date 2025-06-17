
import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormValidationProps {
  value: string;
  type: 'cidade' | 'endereco' | 'data' | 'valor';
  showValidation?: boolean;
}

export const FormValidation: React.FC<FormValidationProps> = ({ 
  value, 
  type, 
  showValidation = false 
}) => {
  const validateField = (value: string, type: string) => {
    if (!value.trim()) {
      return { isValid: false, message: 'Campo obrigatório' };
    }

    switch (type) {
      case 'cidade':
        // Validação muito mais rigorosa para cidade/estado
        if (value.length < 3) {
          return { isValid: false, message: 'Digite pelo menos 3 caracteres' };
        }
        
        // Deve conter apenas letras, espaços, vírgulas, pontos e hífens
        if (!/^[a-zA-ZÀ-ÿ\s,.-]+$/.test(value)) {
          return { isValid: false, message: 'Formato inválido para cidade' };
        }
        
        // Verificar se não é apenas caracteres repetidos
        if (/^(.)\1{2,}$/.test(value.replace(/\s/g, ''))) {
          return { isValid: false, message: 'Nome de cidade inválido' };
        }
        
        // Verificar se contém pelo menos uma vogal (cidades reais têm vogais)
        if (!/[aeiouAEIOUÀ-ÿ]/.test(value)) {
          return { isValid: false, message: 'Nome de cidade inválido' };
        }
        
        // Lista de nomes de cidades conhecidas do Brasil (algumas principais)
        const cidadesValidas = [
          'são paulo', 'rio de janeiro', 'belo horizonte', 'salvador', 'brasília', 
          'fortaleza', 'manaus', 'curitiba', 'recife', 'goiânia', 'belém', 
          'porto alegre', 'guarulhos', 'campinas', 'nova iguaçu', 'maceió',
          'são bernardo do campo', 'santo andré', 'osasco', 'joão pessoa',
          'jaboatão dos guararapes', 'contagem', 'são josé dos campos',
          'uberlândia', 'sorocaba', 'cuiabá', 'aracaju', 'feira de santana',
          'joinville', 'juiz de fora', 'londrina', 'aparecida de goiânia',
          'niterói', 'ananindeua', 'porto velho', 'serra', 'pelotas',
          'caxias do sul', 'santos', 'vitória', 'florianópolis'
        ];
        
        // Verificar se é uma cidade conhecida ou tem formato válido (cidade, estado)
        const valorLower = value.toLowerCase();
        const temEstado = /,\s*[a-z]{2}$/i.test(value);
        const cidadeConhecida = cidadesValidas.some(cidade => 
          valorLower.includes(cidade) || cidade.includes(valorLower)
        );
        
        if (!cidadeConhecida && !temEstado) {
          return { isValid: false, message: 'Digite uma cidade válida (ex: São Paulo, SP)' };
        }
        
        return { isValid: true, message: 'Válido' };

      case 'endereco':
        if (value.length < 5) {
          return { isValid: false, message: 'Endereço muito curto' };
        }
        
        // Validação muito mais rigorosa para endereços
        const hasLetter = /[a-zA-ZÀ-ÿ]/.test(value);
        const hasNumber = /\d/.test(value);
        
        if (!hasLetter) {
          return { isValid: false, message: 'Endereço deve conter letras' };
        }
        
        // Verificar se não é apenas caracteres repetidos
        if (/^(.)\1{4,}$/.test(value.replace(/\s/g, ''))) {
          return { isValid: false, message: 'Endereço inválido' };
        }
        
        // Verificar se não contém apenas caracteres sem sentido
        if (/^[a-z]+$/i.test(value.replace(/\s/g, '')) && value.length < 10) {
          return { isValid: false, message: 'Digite um endereço válido' };
        }
        
        // Palavras comuns em endereços brasileiros
        const palavrasEndereco = [
          'rua', 'avenida', 'av', 'r.', 'travessa', 'alameda', 'estrada', 
          'rodovia', 'praça', 'largo', 'quadra', 'bloco', 'numero', 'nº', 'n°',
          'centro', 'vila', 'jardim', 'bairro', 'conjunto', 'residencial'
        ];
        
        const temPalavraEndereco = palavrasEndereco.some(palavra => 
          value.toLowerCase().includes(palavra)
        );
        
        // Se não tem número nem palavra de endereço, é suspeito
        if (!hasNumber && !temPalavraEndereco && !/[,.]/.test(value)) {
          return { isValid: false, message: 'Digite um endereço completo' };
        }
        
        // Verificar sequências aleatórias de caracteres (como "dbsdsdbd")
        const sequenciasInvalidas = /([a-z])\1{2,}|[bcdfghjklmnpqrstvwxyz]{4,}/i;
        if (sequenciasInvalidas.test(value.replace(/\s/g, ''))) {
          return { isValid: false, message: 'Endereço inválido' };
        }
        
        return { isValid: true, message: 'Válido' };

      case 'data':
        const today = new Date();
        const selectedDate = new Date(value);
        if (selectedDate < today) {
          return { isValid: false, message: 'Data não pode ser no passado' };
        }
        return { isValid: true, message: 'Válido' };

      case 'valor':
        const valorNumerico = parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.'));
        if (isNaN(valorNumerico) || valorNumerico <= 0) {
          return { isValid: false, message: 'Valor inválido' };
        }
        if (valorNumerico < 10) {
          return { isValid: false, message: 'Valor mínimo R$ 10,00' };
        }
        return { isValid: true, message: 'Válido' };

      default:
        return { isValid: false, message: '' };
    }
  };

  if (!showValidation) return null;

  const validation = validateField(value, type);

  return (
    <div className={cn(
      "flex items-center gap-2 mt-1 text-xs transition-all duration-200",
      validation.isValid ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
    )}>
      {validation.isValid ? (
        <CheckCircle className="h-3 w-3" />
      ) : (
        <AlertCircle className="h-3 w-3" />
      )}
      <span className="font-medium">{validation.message}</span>
    </div>
  );
};
