"use client";

import { useState } from "react";

export default function AgendarFretePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b">
        <div className="text-xl font-bold text-blue-800">Busca Já</div>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#">Sobre</a>
          <a href="#">Serviços</a>
          <a href="#">Fale Conosco</a>
        </nav>
        <div className="flex gap-2">
          <button className="border border-blue-700 text-blue-700 px-4 py-1.5 rounded-full text-sm">Cadastrar-se</button>
          <button className="bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm">Entrar</button>
        </div>
      </header>

      {/* Conteúdo principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Formulário */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold">Agendar frete</h2>
          <div className="bg-gray-50 p-4 rounded-2xl space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Parte 1</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <label className="flex items-center gap-2">
                  <input type="radio" name="origem" defaultChecked /> Residencial
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="origem" /> Comercial
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="ajudante" /> Precisa de ajudante
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label className="block mb-1">Endereço de saída</label>
                <input className="w-full border rounded px-3 py-2" placeholder="Rua A, nº 123" />
              </div>
              <div>
                <label className="block mb-1">Local de entrega</label>
                <input className="w-full border rounded px-3 py-2" placeholder="Rua B, nº 456" />
              </div>
            </div>

            <div className="text-sm">
              <label className="block mb-1">Data da mudança</label>
              <input type="date" className="border rounded px-3 py-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label className="block mb-1">Primeiro e último nome</label>
                <input className="w-full border rounded px-3 py-2" placeholder="João Lemos" />
              </div>
              <div>
                <label className="block mb-1">Endereço de e-mail</label>
                <input className="w-full border rounded px-3 py-2" placeholder="email@exemplo.com" />
              </div>
            </div>

            <div className="text-sm">
              <label className="block mb-1">Número de celular</label>
              <input className="w-full border rounded px-3 py-2" placeholder="(00) 90000-0000" />
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <label className="block mb-1">Nome do cartão</label>
                <input className="w-full border rounded px-3 py-2" placeholder="João Lemos" />
              </div>
              <div>
                <label className="block mb-1">Número do cartão</label>
                <input className="w-full border rounded px-3 py-2" placeholder="0000 0000 0000 0000" />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block mb-1">Validade</label>
                  <input className="w-full border rounded px-3 py-2" placeholder="MM/AA" />
                </div>
                <div className="flex-1">
                  <label className="block mb-1">CVC</label>
                  <input className="w-full border rounded px-3 py-2" placeholder="123" />
                </div>
              </div>
            </div>

            <div className="text-sm">
              <label className="block mb-1">Observações</label>
              <textarea className="w-full border rounded px-3 py-2" rows={3} placeholder="Ex: Não subir pelas escadas, precisa de nota fiscal..."></textarea>
            </div>
          </div>
        </div>

        {/* Card lateral */}
        <div className="space-y-4">
          <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
            <img src="/truck.png" alt="Frete" className="w-full h-48 object-cover" />
            <div className="p-4 text-sm">
              <h3 className="font-semibold text-base">Fretes Rocha</h3>
              <p className="text-gray-500">Especialistas em mudanças de entrega</p>
              <p className="mt-1 text-gray-500 text-xs">Saída: Zona Norte - SP<br />Chegada: Contagem - MG, dia 10 abril às 10h</p>
              <div className="mt-2 font-semibold">TOTAL: R$450</div>
            </div>
          </div>
          <button className="w-full bg-blue-700 text-white py-3 rounded-full text-sm font-semibold">Agendar agora</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 mt-10 text-xs text-gray-500 text-center py-4 border-t">
        <p>Busca Já</p>
        <p>Plataforma de fretes sob demanda</p>
        <p>contato@buscaja.com</p>
        <p>© 2025</p>
      </footer>
    </main>
  );
}
