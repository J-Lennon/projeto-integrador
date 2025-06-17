
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Cadastro from "./pages/Cadastro";
import CadastroFreteiro from "./pages/CadastroFreteiro";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import BuscaResultados from "./pages/BuscaResultados";
import PerfilFreteiro from "./pages/PerfilFreteiro";
import ContratarFrete from "./pages/ContratarFrete";
import MeusFretes from "./pages/MeusFretes";
import NotFound from "./pages/NotFound";
import ConfirmacaoAgendamento from "./pages/ConfirmacaoAgendamento";
import DashboardFreteiro from "./pages/DashboardFreteiro";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange={false}
    >
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/cadastro-freteiro" element={<CadastroFreteiro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/perfil" element={
                <ProtectedRoute>
                  <Perfil />
                </ProtectedRoute>
              } />
              <Route path="/busca-resultados" element={<BuscaResultados />} />
              <Route path="/perfil-freteiro/:id" element={<PerfilFreteiro />} />
              <Route path="/contratar-frete/:id" element={
                <ProtectedRoute>
                  <ContratarFrete />
                </ProtectedRoute>
              } />
              <Route path="/confirmacao-agendamento" element={
                <ProtectedRoute>
                  <ConfirmacaoAgendamento />
                </ProtectedRoute>
              } />
              <Route path="/meus-fretes" element={
                <ProtectedRoute>
                  <MeusFretes />
                </ProtectedRoute>
              } />
              <Route path="/dashboard-freteiro" element={
                <ProtectedRoute requireFreteiro={true}>
                  <DashboardFreteiro />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
