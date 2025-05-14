"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ IMPORTANTE
import Image from "next/image";

const destaqueItems = [
  { src: "/destaque1.png", alt: "Entregamos do Norte" },
  { src: "/destaque2.png", alt: "Entrega Rápida" },
  { src: "/destaque3.png", alt: "Em Tempo" },
  { src: "/destaque4.png", alt: "Total Fretes" },
  { src: "/destaque5.png", alt: "Frete Antonio" },
  { src: "/destaque6.png", alt: "Alexandre Transportes" },
];

const veiculos = [
  { peso: 300, dimensao: "1.20m x 1.80m" },
  { peso: 450, dimensao: "1.20m x 1.80m" },
  { peso: 1500, dimensao: "1.40m x 2.20m" },
  { peso: 2500, dimensao: "1.40m x 2.20m" },
  { peso: 4500, dimensao: "1.40m x 2.40m" },
];

export default function PesquisaPage() {
  const [form, setForm] = useState({
    cidade: "",
    endereco: "",
    data: "",
    valor: "",
  });

  const router = useRouter(); // ✅ Inicializa o roteador

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    const query = new URLSearchParams(form).toString(); // serializa o form
    router.push(`/resultados?${query}`); // ✅ Redireciona para a nova rota com query
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow-sm">
        <div className="flex items-center gap-2 text-xl font-bold text-blue-900">
          <Image src="/icon.png" alt="Logo" width={24} height={24} />
          Busca Já
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#" className="hover:underline">
            Sobre
          </a>
          <a href="#" className="hover:underline">
            Serviços
          </a>
          <a href="#" className="hover:underline">
            Fale Conosco
          </a>
        </nav>
        <div className="flex gap-2">
          <button className="rounded-full border border-blue-700 px-4 py-1 text-blue-700 text-sm">
            Cadastrar-se
          </button>
          <button className="rounded-full bg-blue-700 px-4 py-1 text-white text-sm">
            Entrar
          </button>
        </div>
      </header>

      {/* Hero Section with Banner Image */}
      <section className="px-6 py-8 mx-4 mt-6 text-white rounded-3xl overflow-hidden relative">
        <Image
          src="/banner.png"
          alt="Banner Principal"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="relative z-10 bg-transparent p-8 rounded-3xl shadow-md">
          <h1 className="text-2xl font-semibold text-center">
            Foco em tranquilidade para o cliente
          </h1>
          <p className="text-center mt-2">
            &quot;Deixe a carga com a gente. Você só se preocupa com o
            destino.&quot;
          </p>

          {/* Search Inputs */}
          <div className="mt-6 bg-white p-4 rounded-full shadow-lg flex flex-wrap justify-between items-center gap-4 max-w-6xl mx-auto overflow-hidden">
            <div className="flex flex-col px-4 border-r last:border-none">
              <span className="text-sm font-semibold text-gray-700">
                Cidade/Estado
              </span>
              <input
                placeholder="Para onde será o frete?"
                className="outline-none text-sm text-gray-500 placeholder-gray-400 bg-transparent"
                value={form.cidade}
                onChange={(e) => handleChange("cidade", e.target.value)}
              />
            </div>
            <div className="flex flex-col px-4 border-r last:border-none">
              <span className="text-sm font-semibold text-gray-700">
                Endereço
              </span>
              <input
                placeholder="Nome da rua"
                className="outline-none text-sm text-gray-500 placeholder-gray-400 bg-transparent"
                value={form.endereco}
                onChange={(e) => handleChange("endereco", e.target.value)}
              />
            </div>
            <div className="flex flex-col px-4 border-r last:border-none">
              <span className="text-sm font-semibold text-gray-700">Data</span>
              <input
                placeholder="Para quando será"
                className="outline-none text-sm text-gray-500 placeholder-gray-400 bg-transparent"
                value={form.data}
                onChange={(e) => handleChange("data", e.target.value)}
              />
            </div>
            <div className="flex flex-col px-4">
              <span className="text-sm font-semibold text-gray-700">
                Valor Máximo
              </span>
              <input
                placeholder="Adicionar Valor"
                className="outline-none text-sm text-gray-500 placeholder-gray-400 bg-transparent"
                value={form.valor}
                onChange={(e) => handleChange("valor", e.target.value)}
              />
            </div>
            <button
              className="ml-4 shrink-0 w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center text-lg"
              onClick={handleSearch}
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* Em destaque */}
      <section className="px-6 mt-10">
        <h2 className="text-lg font-semibold mb-4">Em destaque</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {destaqueItems.map((item, idx) => (
            <div
              key={idx}
              className="rounded-lg overflow-hidden shadow-md  bg-[url(/img/mountains.jpg)]"
              style={{
                backgroundImage: `url(${item.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "200px",
                width: "100%",
              }}
            ></div>
          ))}
        </div>
      </section>

      {/* Tipos de veículo */}
      <section className="px-6 mt-10">
        <h2 className="text-lg font-semibold mb-4">Tipos de veículo</h2>
        <div className="flex overflow-x-auto gap-4 pb-4">
          {veiculos.map((v, idx) => (
            <div
              key={idx}
              className="min-w-[200px] rounded-lg border p-4 flex-shrink-0 bg-white shadow-sm"
            >
              <div className="h-24 bg-gray-100 rounded mb-2 flex items-center justify-center text-xs text-gray-400">
                Imagem
              </div>
              <div className="text-sm font-medium">Até {v.peso}Kg</div>
              <div className="text-xs text-gray-500">
                Dimensões: {v.dimensao}
              </div>
              <div className="text-sm font-semibold mt-2 text-blue-700">
                A partir de R$/frete
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 mt-10">
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="font-medium text-blue-900">Ei, você!</p>
            <p className="text-sm">
              Gostaria de anunciar seus serviços em nosso site? Junte-se à nossa
              plataforma e anuncie o quanto antes!
            </p>
          </div>

          <button
            onClick={() => router.push("/pages/cadastro-freteiro")}
            className="bg-blue-700 text-white px-4 py-2 rounded-full text-sm"
          >
            Cadastro de Freteiro
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-10 px-6 py-6 border-t text-sm text-gray-500 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <div className="font-semibold text-blue-900">Busca Já</div>
          <div>Visando entregar um serviço de alta qualidade desde 2025</div>
        </div>
        <div className="md:col-span-2 flex justify-around">
          <div>
            <p className="font-medium">Ajuda</p>
            <ul className="space-y-1">
              <li>Perguntas Frequentes</li>
              <li>SAC</li>
              <li>Entre em contato</li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
