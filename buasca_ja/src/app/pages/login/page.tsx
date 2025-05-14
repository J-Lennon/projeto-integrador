"use client";

import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", senha: "", lembrar: false });

  const handleChange = (key: string, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // Aqui vai a lógica para autenticar
    console.log(form);
  };

  return (
    <main className="min-h-screen flex flex-col justify-between bg-white text-gray-900">
      {/* Header */}
      <header className="py-6 text-center">
        <h1 className="text-2xl font-bold text-blue-700">
          <span role="img" aria-label="caminhão">🚚</span> Busca Já
        </h1>
      </header>

      {/* Formulário central */}
      <section className="flex flex-1 justify-center items-center">
        <form className="bg-gray-50 p-8 rounded-3xl shadow-md w-full max-w-sm text-center space-y-4">
          <h2 className="text-xl font-semibold mb-4">Bem-vindo de volta!</h2>

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => handleChange("email", e.target.value)}
            className="w-full rounded-full px-4 py-2 border border-gray-300 text-sm"
          />

          <input
            type="password"
            placeholder="Senha"
            value={form.senha}
            onChange={e => handleChange("senha", e.target.value)}
            className="w-full rounded-full px-4 py-2 border border-gray-300 text-sm"
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.lembrar}
                onChange={e => handleChange("lembrar", e.target.checked)}
              />
              Lembrar meu login
            </label>
            <a href="#" className="text-blue-600 hover:underline">Esqueceu a senha?</a>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-700 text-white rounded-full py-2 text-sm"
          >
            Login
          </button>
        </form>
      </section>

      {/* Rodapé */}
      <footer className="text-sm text-center py-6 text-gray-500">
        <p>© 2025 Busca Já. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2 text-blue-700 text-xl">
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
        </div>
      </footer>
    </main>
  );
}
