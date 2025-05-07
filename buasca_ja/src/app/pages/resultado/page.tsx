"use client";

import { useState } from "react";
import Image from "next/image";

const resultados = [
  {
    nome: "Fretes Elvis",
    nota: 9.6,
    avaliacao: "Excelente",
    preco: 150,
    agendamentos: "Sem agendamentos",
    imagem: "/frete1.png"
  },
  {
    nome: "Interestadual",
    nota: 9.2,
    avaliacao: "Muito bom",
    preco: 280,
    agendamentos: "1 agendamento",
    imagem: "/frete2.png"
  },
  {
    nome: "Fretes Rocha",
    nota: 8.0,
    avaliacao: "Bom",
    preco: 465,
    agendamentos: "2 agendamentos",
    imagem: "/frete3.png"
  },
  {
    nome: "Fretes e Mudanças Binho",
    nota: 6.5,
    avaliacao: "Médio",
    preco: 980,
    agendamentos: "3 agendamentos",
    imagem: "/frete4.png"
  }
];

export default function ResultadoBusca() {
  const [filtros] = useState({
    cidade: "Pelotas/RS",
    data: "10/04",
    valor: 900
  });

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Cabeçalho */}
      <header className="flex items-center justify-between px-10 py-4 border-b shadow-sm">
        <div className="flex items-center gap-2 text-xl font-bold text-blue-900">
          <Image src="/icon.png" alt="Logo" width={28} height={28} />
          Busca Já
        </div>
        <nav className="hidden md:flex gap-8 text-sm text-gray-700">
          <a href="#" className="hover:text-blue-700">Sobre</a>
          <a href="#" className="hover:text-blue-700">Serviços</a>
          <a href="#" className="hover:text-blue-700">Fale Conosco</a>
        </nav>
        <div className="flex gap-2">
          <button className="rounded-full border border-blue-700 px-4 py-1 text-blue-700 text-sm">Cadastrar-se</button>
          <button className="rounded-full bg-blue-700 px-4 py-1 text-white text-sm">Entrar</button>
        </div>
      </header>

      {/* Conteúdo principal */}
      <div className="flex px-10 py-6 gap-10">
        {/* Coluna esquerda - filtros */}
        <aside className="w-1/4 space-y-6">
          <div>
            <h3 className="text-sm font-semibold mb-2">Sua pesquisa</h3>
            <ul className="space-y-1 text-sm">
              <li>Cidade/Estado: <strong>{filtros.cidade}</strong></li>
              <li>Endereço: <strong>Rua Félix da Cunha, 530</strong></li>
              <li>Data: <strong>Quinta-feira, 10 de Abril de 2025</strong></li>
              <li>Valor Máximo: <strong>R$ {filtros.valor},00</strong></li>
            </ul>
            <button className="mt-4 w-full bg-blue-700 text-white py-2 rounded-md text-sm">Pesquisa</button>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2">Filtros populares</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li><input type="checkbox" className="mr-2" />Com desmontagem</li>
              <li><input type="checkbox" className="mr-2" />Com nota fiscal</li>
              <li><input type="checkbox" className="mr-2" />Aceita móveis montados</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2">Por preço</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li><input type="checkbox" className="mr-2" />Até R$ 300</li>
              <li><input type="checkbox" className="mr-2" />Até R$ 500</li>
              <li><input type="checkbox" className="mr-2" />Até R$ 900</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2">Por Avaliação</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li><input type="checkbox" className="mr-2" />Excelente</li>
              <li><input type="checkbox" className="mr-2" />Muito bom</li>
              <li><input type="checkbox" className="mr-2" />Bom</li>
            </ul>
          </div>
        </aside>

        {/* Coluna direita - resultados */}
        <section className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-600">140 resultados para</p>
              <h2 className="text-lg font-semibold italic text-blue-900">
                {filtros.cidade}, Quinta-feira {filtros.data}, R${filtros.valor},00
              </h2>
            </div>
            <button className="text-sm text-gray-500 border border-gray-300 px-3 py-1 rounded-md">Filtrar por</button>
          </div>

          <div className="space-y-4">
            {resultados.map((item, idx) => (
              <div key={idx} className="flex items-start p-4 border rounded-lg shadow-sm gap-4 bg-white">
                <Image src={item.imagem} alt={item.nome} width={140} height={100} className="rounded-md object-cover" />
                <div className="flex-1 space-y-1">
                  <h3 className="text-lg font-semibold">{item.nome}</h3>
                  <p className="text-sm text-gray-600">Com nota fiscal</p>
                  <p className="text-sm text-gray-600">Não carrega móveis montados</p>
                  <p className="text-base font-semibold text-blue-800 mt-2">R${item.preco}</p>
                  <p className="text-xs text-gray-500">{item.agendamentos}</p>
                </div>
                <div className="text-right">
                  <span className="block text-green-600 font-semibold text-sm">{item.avaliacao}</span>
                  <span className="text-xs text-gray-500">{item.nota}</span>
                  <button className="mt-4 bg-blue-700 text-white px-4 py-1 text-xs rounded-full">Agende seu frete</button>
                </div>
              </div>
            ))}
          </div>

          {/* Paginação */}
          <div className="flex justify-center mt-8 gap-2">
            <button className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 font-bold">1</button>
            <button className="w-8 h-8 rounded-full text-blue-900">2</button>
            <button className="w-8 h-8 rounded-full text-blue-900">3</button>
            <span className="text-gray-400">...</span>
            <button className="w-8 h-8 rounded-full text-blue-900">25</button>
          </div>
        </section>
      </div>

      {/* Rodapé */}
      <footer className="px-10 py-6 border-t text-sm text-gray-500 grid grid-cols-1 md:grid-cols-3 gap-4">
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
