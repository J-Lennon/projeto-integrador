"use client";

export default function AgendamentoConcluidoPage() {
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

      {/* Conteúdo */}
      <section className="max-w-5xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Card freteiro */}
          <div className="bg-white rounded-2xl shadow-sm border p-4 w-full md:w-1/2">
            <img
              src="/freteiro.jpg"
              alt="Fretes Rocha"
              className="rounded-xl mb-4"
            />
            <h2 className="font-semibold">Fretes Rocha</h2>
            <p className="text-sm text-gray-500">Serviço de mudanças e entrega especializado em pontualidade</p>
            <p className="text-sm text-gray-500 mt-1">
              📍 Zona Leste, São Paulo, SP<br />
              mudanças 2025
            </p>
          </div>

          {/* Confirmação */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border p-6 flex flex-col items-center justify-center text-center">
            <div className="text-5xl text-green-500 mb-4">✅</div>
            <h2 className="font-semibold text-lg mb-2">Seu agendamento foi confirmado!</h2>
          </div>
        </div>

        {/* Informações do agendamento */}
        <div className="bg-white border rounded-2xl shadow-sm mt-6 p-6">
          <p className="text-sm mb-4">
            O serviço foi agendado para <strong>Quinta-feira, 10 de Abril de 2025</strong>
          </p>
          <ul className="text-sm text-gray-700 space-y-1 mb-4">
            <li>✔️ Não será possível realizar mudança após horário marcado</li>
            <li>✔️ Não será possível troca de endereço de pedido</li>
          </ul>

          <div className="text-sm text-gray-700 space-y-1 mb-6">
            <p><strong>Endereço</strong>: Rua Rita de Cássia, 300</p>
            <p><strong>Email</strong>: email@exemplo.com</p>
            <p><strong>Número de telefone</strong>: +55 11 3799-0841</p>
          </div>

          <div className="flex justify-between items-center border-t pt-4">
            <div>
              <p className="text-xs text-gray-400">TOTAL</p>
              <p className="text-base font-semibold">R$ 164,95 <span className="text-green-500 text-xs font-medium ml-2">Pago</span></p>
            </div>
            <div className="flex gap-4">
              <button className="bg-blue-700 text-white text-sm px-4 py-2 rounded-full">Entrar em contato</button>
              <button className="border border-gray-400 text-sm px-4 py-2 rounded-full text-gray-700">Cancelar pedido</button>
            </div>
          </div>
        </div>
      </section>

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
