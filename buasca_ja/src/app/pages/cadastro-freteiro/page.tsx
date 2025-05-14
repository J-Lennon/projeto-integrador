"use client";

import { useState } from "react";

export default function CadastroFreteiroPage() {
  const [form, setForm] = useState({
    cpfCnpj: "",
    nome: "",
    telefone: "",
    notaFiscal: false,
    ajudante: false,
    placa: "",
    arquivos: null as FileList | null,
  });

  type FormKeys = keyof typeof form;

  const handleChange = <K extends FormKeys>(key: K, value: typeof form[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange("arquivos", e.target.files);
  };

  const handleSubmit = () => {
    // Apenas para debug: evitar erro com arquivos
    const arquivosArray = form.arquivos
      ? Array.from(form.arquivos).map(file => file.name)
      : [];

    console.log({
      ...form,
      arquivos: arquivosArray,
    });
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6 text-center">Cadastro de Freteiro</h1>
      <form className="max-w-3xl mx-auto bg-gray-50 p-6 rounded-3xl shadow-md space-y-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium">CPF ou CNPJ</label>
          <input
            className="rounded-full px-4 py-2 border border-gray-300 text-sm"
            placeholder="Digite seu CPF ou CNPJ"
            value={form.cpfCnpj}
            onChange={e => handleChange("cpfCnpj", e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Nome da empresa ou pessoa</label>
          <input
            className="rounded-full px-4 py-2 border border-gray-300 text-sm"
            placeholder="Digite o nome"
            value={form.nome}
            onChange={e => handleChange("nome", e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Telefone de contato</label>
          <input
            className="rounded-full px-4 py-2 border border-gray-300 text-sm"
            placeholder="(00) 00000-0000"
            value={form.telefone}
            onChange={e => handleChange("telefone", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.notaFiscal}
              onChange={e => handleChange("notaFiscal", e.target.checked)}
            />
            Emite Nota Fiscal?
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.ajudante}
              onChange={e => handleChange("ajudante", e.target.checked)}
            />
            Possui Ajudante?
          </label>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Placa do veículo</label>
          <input
            className="rounded-full px-4 py-2 border border-gray-300 text-sm"
            placeholder="ABC-1234"
            value={form.placa}
            onChange={e => handleChange("placa", e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium">Envio de arquivos e fotos</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="rounded-full px-4 py-2 border border-gray-300 text-sm bg-white"
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-blue-700 text-white rounded-full py-2 mt-4 text-sm"
        >
          Cadastrar Freteiro
        </button>
      </form>
    </main>
  );
}
