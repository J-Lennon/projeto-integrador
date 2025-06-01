
import React from 'react';
import { CreditCard, Smartphone, Banknote } from 'lucide-react';

interface PaymentIconProps {
  type: 'dinheiro' | 'pix' | 'cartao';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const PaymentIcon = ({ type, size = 'md', className = '' }: PaymentIconProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const baseClasses = `${sizeClasses[size]} ${className}`;

  switch (type) {
    case 'dinheiro':
      return (
        <div className={`${baseClasses} relative`}>
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-xl shadow-lg">
            <Banknote className="w-full h-full p-2 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
        </div>
      );
    
    case 'pix':
      return (
        <div className={`${baseClasses} relative`}>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl shadow-lg">
            <div className="w-full h-full p-2 flex items-center justify-center">
              <div className="text-white font-bold text-xs">PIX</div>
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-300 rounded-full animate-pulse"></div>
        </div>
      );
    
    case 'cartao':
      return (
        <div className={`${baseClasses} relative`}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg">
            <CreditCard className="w-full h-full p-2 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-300 rounded-full animate-pulse"></div>
        </div>
      );
    
    default:
      return null;
  }
};

interface PaymentSelectorProps {
  selectedPayment: string;
  onPaymentChange: (payment: string) => void;
  className?: string;
}

export const PaymentSelector = ({ selectedPayment, onPaymentChange, className = '' }: PaymentSelectorProps) => {
  const paymentOptions = [
    { value: 'dinheiro', label: 'Dinheiro', description: 'Pagamento em espécie' },
    { value: 'pix', label: 'PIX', description: 'Instantâneo e seguro' },
    { value: 'cartao', label: 'Cartão', description: 'Débito ou crédito' }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      {paymentOptions.map((option) => (
        <label key={option.value} className="cursor-pointer group">
          <input
            type="radio"
            name="formaPagamento"
            value={option.value}
            checked={selectedPayment === option.value}
            onChange={(e) => onPaymentChange(e.target.value)}
            className="sr-only"
          />
          <div className={`p-6 rounded-3xl border-2 text-center transition-all duration-300 transform group-hover:scale-105 ${
            selectedPayment === option.value 
              ? 'border-blue-600 bg-blue-50 shadow-xl' 
              : 'border-gray-200 hover:border-blue-300 hover:shadow-lg'
          }`}>
            <div className="flex justify-center mb-4">
              <PaymentIcon type={option.value as 'dinheiro' | 'pix' | 'cartao'} size="lg" />
            </div>
            <div className="font-bold text-lg text-gray-900 mb-2">{option.label}</div>
            <div className="text-sm text-gray-600">{option.description}</div>
          </div>
        </label>
      ))}
    </div>
  );
};

export default PaymentIcon;
