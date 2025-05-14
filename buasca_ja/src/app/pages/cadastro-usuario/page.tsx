"use client";

import React from "react";

export default function CadastroUsuarioPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-gray-50 w-full max-w-xl p-8 rounded-3xl shadow text-sm">
        <h1 className="text-center text-xl font-semibold text-gray-900 mb-6">Cadastro de Usuário</h1>

        <form className="space-y-4">
          <div>
            <label className="block mb-1">Nome ou Razão Social</label>
            <input
              type="text"
              placeholder="Digite o nome ou razão social"
              className="w-full border rounded-full px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-1">CPF ou CNPJ</label>
            <input
              type="text"
              placeholder="Digite seu CPF ou CNPJ"
              className="w-full border rounded-full px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-1">Telefone</label>
            <input
              type="text"
              placeholder="(00) 00000-0000"
              className="w-full border rounded-full px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              placeholder="email@exemplo.com"
              className="w-full border rounded-full px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-1">Foto de perfil</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border rounded-full px-4 py-2 bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-full font-semibold"
          >
            Cadastrar Usuário
          </button>
        </form>
      </div>
    </main>
  );
}
