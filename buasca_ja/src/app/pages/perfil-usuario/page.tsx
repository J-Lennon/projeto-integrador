"use client";

import { useState } from "react";
import { FaUser } from "react-icons/fa";

export default function PerfilUsuarioPage() {
  const [usuario] = useState({
    nome: "Maria Fernandes",
    endereco: "Pelotas, RS",
    email: "maria@gmail.com",
    nascimento: "06/11/1988",
  });

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
        <div className="w-8 h-8 rounded-full bg-gray-300" />
      </header>

      <div className="max-w-6xl mx-auto flex p-6 gap-8">
        {/* Menu lateral */}
        <aside className="w-64 border-r pr-6 text-sm">
          <h2 className="font-semibold mb-4">Informações de usuário</h2>
          <ul className="space-y-3">
            <li className="text-blue-700 font-medium">Detalhes pessoais</li>
            <li className="text-gray-600">Informações de pagamento</li>
            <li className="text-gray-600">Segurança</li>
            <li className="text-gray-600">Preferências</li>
            <li className="text-gray-600">Notificações</li>
          </ul>
          <button className="mt-8 text-red-500 text-sm">⟵ Sair</button>
        </aside>

        {/* Conteúdo principal */}
        <section className="flex-1">
          <h1 className="text-lg font-semibold mb-1">Detalhes pessoais</h1>
          <p className="text-sm text-gray-500 mb-6">Edite suas informações abaixo</p>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between border-b py-2">
              <span className="text-gray-600">Nome Completo</span>
              <div className="text-right">
                <p>{usuario.nome}</p>
                <button className="text-blue-700 text-xs">Editar</button>
              </div>
            </div>
            <div className="flex justify-between border-b py-2">
              <span className="text-gray-600">Endereço</span>
              <div className="text-right">
                <p>{usuario.endereco}</p>
                <button className="text-blue-700 text-xs">Editar</button>
              </div>
            </div>
            <div className="flex justify-between border-b py-2">
              <span className="text-gray-600">Email</span>
              <div className="text-right">
                <p>{usuario.email}</p>
                <button className="text-blue-700 text-xs">Editar</button>
              </div>
            </div>
            <div className="flex justify-between border-b py-2">
              <span className="text-gray-600">Data de Nascimento</span>
              <div className="text-right">
                <p>{usuario.nascimento}</p>
                <button className="text-blue-700 text-xs">Editar</button>
              </div>
            </div>
          </div>
        </section>

        {/* Card lateral */}
        <aside className="w-64">
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm border text-sm text-gray-700">
            <p className="mb-2 font-semibold">Ei, você!</p>
            <p className="mb-4 text-gray-600">
              Conclua de maneira segura sua próxima mudança. Contrate um freteiro de confiança.
            </p>
            <button className="text-blue-700 border border-blue-700 px-4 py-2 rounded-full w-full text-sm">
              Cadastro de freteiro
            </button>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 mt-10 text-xs text-gray-500 text-center py-4 border-t">
        <p>Busca Já</p>
        <p>Encontre um serviço de alto padrão desde 2025</p>
        <p>contato@buscaja.com</p>
        <p>© 2025</p>
      </footer>
    </main>
  );
}
