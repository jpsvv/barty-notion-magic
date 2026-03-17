import { Ticket, QrCode, TrendingUp, ShieldCheck, Share2, BarChart3 } from "lucide-react";
import SolutionPageLayout from "@/components/SolutionPageLayout";
import { Helmet } from "react-helmet-async";

const BartyIngressos = () => (
  <>
    <Helmet>
      <title>Barty Ingressos — Venda de Ingressos com QR Code | Apenas 5% de Taxa</title>
      <meta
        name="description"
        content="Venda ingressos online com QR Code, página própria e link rastreável para tráfego pago. Taxa de apenas 5% — metade do Sympla. Para eventos presenciais e online."
      />
      <link rel="canonical" href="https://barty.fun/ingressos" />
      <meta property="og:title" content="Barty Ingressos — Ingressos com QR Code | Taxa de 5%" />
      <meta property="og:description" content="Venda ingressos com metade da taxa do Sympla. Página própria, QR Code e tagueamento para tráfego pago." />
      <meta property="og:url" content="https://barty.fun/ingressos" />
      <meta property="og:type" content="website" />
    </Helmet>
    <SolutionPageLayout
      pageTitle="Barty Ingressos"
      heroTag="Barty Ingressos"
      heroTitle={
        <>
          Venda ingressos com <span className="text-gradient">metade da taxa de mercado.</span> Receita antes do evento.
        </>
      }
      heroDescription="Página própria, QR Code na entrada, link rastreável para tráfego pago. Taxa de 5% — metade do que o Sympla cobra. Para eventos presenciais e online."
      heroCtaText="Quero vender ingressos"
      heroPhoneScreens={[
        {
          icon: "🎟️",
          title: "Barty Ingressos",
          subtitle: "Escolha seu ingresso",
          items: [
            { label: "Pista", price: "R$ 60,00", badge: "Popular" },
            { label: "VIP Open Bar", price: "R$ 150,00" },
            { label: "Camarote", price: "R$ 250,00", badge: "Limitado" },
            { label: "Meia-entrada", price: "R$ 30,00" },
          ],
        },
      ]}
      metricsBanner={[
        { value: "5%", label: "Taxa sobre vendas" },
        { value: "50%", label: "Menor que Sympla" },
        { value: "0", label: "Custo fixo" },
        { value: "24h", label: "Página no ar" },
      ]}
      stepsSubtitle="Como funciona"
      stepsTitle="Do evento à venda em minutos"
      steps={[
        {
          number: "01",
          title: "Crie seu evento e configure ingressos",
          description: "Cadastre lotes, tipos (pista, VIP, meia-entrada), preços e quantidade. Sua página de vendas fica pronta automaticamente.",
        },
        {
          number: "02",
          title: "Divulgue com link rastreável",
          description: "Receba seu link exclusivo e QR Code para redes sociais, materiais impressos e tráfego pago com UTMs integradas.",
        },
        {
          number: "03",
          title: "Cliente compra e recebe o QR Code",
          description: "Sem app. Compra pelo navegador, paga via Pix ou cartão. QR Code do ingresso chega na hora por e-mail e na tela.",
        },
        {
          number: "04",
          title: "Na entrada: QR Code → Validação instantânea",
          description: "Staff escaneia o QR Code com o próprio celular. Acesso liberado em segundos, sem fila.",
        },
        {
          number: "05",
          title: "Acompanhe vendas em tempo real",
          description: "Dashboard com vendas por lote, canal de aquisição, receita acumulada e taxa de conversão.",
        },
      ]}
      benefitsSubtitle="Vantagens"
      benefitsTitle="Por que vender ingressos pelo Barty"
      benefits={[
        {
          icon: TrendingUp,
          title: "Receita antecipada garantida",
          description: "Venda antes do evento acontecer. Previsibilidade total de público e receita para planejar com segurança.",
        },
        {
          icon: Ticket,
          title: "Taxa de apenas 5%",
          description: "Metade do que o Sympla cobra (10%). Mais lucro no seu bolso a cada ingresso vendido.",
        },
        {
          icon: Share2,
          title: "Página própria + link rastreável",
          description: "Sua página de vendas com a cara do seu evento. UTMs integradas para medir tráfego pago, Instagram, WhatsApp e mais.",
        },
        {
          icon: QrCode,
          title: "QR Code para tudo",
          description: "QR Code de divulgação para cartazes e redes sociais. QR Code do ingresso para acesso rápido na entrada.",
        },
        {
          icon: ShieldCheck,
          title: "Eventos presenciais e online",
          description: "Funciona para shows, festas, workshops, congressos e lives. O mesmo link serve para qualquer formato.",
        },
        {
          icon: BarChart3,
          title: "Dashboard completo",
          description: "Vendas por lote, canal de aquisição, receita por dia. Dados em tempo real para decisões rápidas.",
        },
      ]}
      comparisonTitle="Sympla vs Barty Ingressos"
      comparisonItems={[
        { old: "Taxa de 10% sobre cada ingresso vendido", barty: "Taxa de apenas 5% — o dobro de lucro" },
        { old: "Página genérica dentro da plataforma", barty: "Página própria com link exclusivo do seu evento" },
        { old: "Sem tagueamento nativo para tráfego pago", barty: "UTMs integradas para medir cada canal" },
        { old: "QR Code básico sem personalização", barty: "QR Code para divulgação + ingresso digital" },
        { old: "Relatórios limitados e atrasados", barty: "Dashboard em tempo real com dados de conversão" },
        { old: "Usam aplicativo para acessar ingresso digital", barty: "QR Code no final da compra, direto no acesso do usuário" },
      ]}
      objectionsTitle="Dúvidas sobre ingressos"
      objections={[
        {
          question: "A taxa é realmente só 5%?",
          answer: "Sim. 5% sobre o valor do ingresso vendido. Sem mensalidade, sem custo fixo, sem surpresas. Metade do que o Sympla cobra.",
        },
        {
          question: "Funciona para eventos online?",
          answer: "Sim. O cliente compra o ingresso e recebe o link de acesso ou QR Code. Serve para lives, workshops, congressos e mais.",
        },
        {
          question: "Posso usar para tráfego pago?",
          answer: "Sim. Cada link tem UTMs integradas. Você sabe exatamente quanto cada canal trouxe de vendas — Instagram, Google, WhatsApp.",
        },
        {
          question: "O público precisa baixar app?",
          answer: "Não. 100% no navegador. Abriu o link, comprou, recebeu o QR Code do ingresso na hora.",
        },
        {
          question: "Posso criar lotes e meia-entrada?",
          answer: "Sim. Lotes com preços diferentes, meia-entrada, VIP, camarote. Tudo configurável no painel.",
        },
      ]}
    />
  </>
);

export default BartyIngressos;
