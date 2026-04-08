import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import HomeV2 from "./pages/HomeV2";
import NotFound from "./pages/NotFound";
import BartyFichas from "./pages/BartyFichas";
import BartyEventos from "./pages/BartyEventos";
import BartyFood from "./pages/BartyFood";
import BartyIngressos from "./pages/BartyIngressos";
import HomeV3 from "./pages/HomeV3";
import HomeV4 from "./pages/HomeV4";
import Planos from "./pages/Planos";
import Blog from "./pages/Blog";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/v2" element={<HomeV2 />} />
            <Route path="/v3" element={<HomeV3 />} />
            <Route path="/v4" element={<HomeV4 />} />
            <Route path="/fichas" element={<BartyFichas />} />
            <Route path="/eventos" element={<BartyEventos />} />
            <Route path="/food" element={<BartyFood />} />
            <Route path="/ingressos" element={<BartyIngressos />} />
            <Route path="/planos" element={<Planos />} />
            <Route path="/blog" element={<Blog />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
