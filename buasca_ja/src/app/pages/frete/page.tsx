"use client";

import { useState } from "react";

export default function PerfilFreteiroPage() {
  const [servicos] = useState([
    { id: 1, titulo: "Mudanças residenciais", descricao: "Fretes locais e intermunicipais" },
    { id: 2, titulo: "Frete com ajudante", descricao: "Carregamos e descarregamos" },
    { id: 3, titulo: "Carga pesada", descricao: "Veículo reforçado para cargas grandes" },
    { id: 4, titulo: "Total Fretes", descricao: "Soluções completas de transporte" },
  ]);

  return (
    <main className="min-h-screen bg-white text-gray-900 px-4 py-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Busca Já</h1>
        <nav className="space-x-4 text-sm">
          <a href="#">Início</a>
          <a href="#">Serviços</a>
          <a href="#">Fale Conosco</a>
          <button className="bg-blue-700 text-white px-4 py-2 rounded-full">Entrar</button>
        </nav>
      </header>

      {/* Galeria */}
      <section className="grid grid-cols-4 gap-2 mb-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-xl" />
        ))}
      </section>

      {/* Dados do Freteiro */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold">Fretes Rocha</h2>
        <p className="text-sm text-gray-600">Serviço especializado de entregas rápidas e mudanças</p>
        <p className="text-sm text-gray-600 mt-1">📍 Zona Leste - SP</p>
        <div className="mt-2 w-60 h-32 bg-gray-100 rounded-xl flex items-center justify-center">
          <span className="text-xs text-gray-400">[Mapa Placeholder]</span>
        </div>
      </section>

      {/* Botão de contato */}
      <div className="flex justify-center mb-6">
        <button className="bg-blue-700 text-white px-6 py-2 rounded-full">Agende Seu Frete</button>
      </div>

      {/* Serviços */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Serviços</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {servicos.map(servico => (
            <div key={servico.id} className="bg-gray-50 p-4 rounded-2xl shadow-sm">
              <div className="h-20 bg-gray-200 rounded-xl mb-2" />
              <h4 className="text-sm font-medium">{servico.titulo}</h4>
              <p className="text-xs text-gray-500">{servico.descricao}</p>
              <button className="mt-2 text-xs text-blue-700 underline">Ver mais</button>
            </div>
          ))}
        </div>
      </section>

      {/* Avaliações */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Avaliações</h3>
        <div className="text-sm mb-2">9.6/10 - Excelente</div>
        <div className="space-y-1 text-sm">
          <p>✔️ Chegou no horário combinado</p>
          <p>✔️ Motorista muito educado</p>
          <p>✔️ Cuidou bem dos móveis</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t pt-4 text-xs text-gray-500 text-center">
        <p>© 2025 Busca Já. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}
