import { Ticket, QrCode, TrendingUp, ShieldCheck, Share2, BarChart3 } from "lucide-react";
import SolutionPageLayout from "@/components/SolutionPageLayout";
import { Helmet } from "react-helmet-async";

const BartyFichas = () => (
  <>
    <Helmet>
      <title>Barty Fichas — Venda Pré-Paga de Consumo com QR Code para Eventos</title>
      <meta
        name="description"
        content="Venda fichas de consumo antecipadas para eventos com QR Code. Previsibilidade de receita, zero filas e mais lucro. Sem maquininha, sem pulseira. Conheça o Barty Fichas."
      />
      <link rel="canonical" href="https://barty.fun/fichas" />
      <meta property="og:title" content="Barty Fichas — Fichas Pré-Pagas com QR Code para Eventos" />
      <meta property="og:description" content="Receita antecipada + zero filas. Venda fichas de consumo antes do evento acontecer." />
      <meta property="og:url" content="https://barty.fun/fichas" />
      <meta property="og:type" content="website" />
    </Helmet>
    <SolutionPageLayout
      pageTitle="Barty Fichas"
      heroTag="Barty Fichas"
      heroTitle={
        <>
          Venda consumo <span className="text-gradient">antes do evento.</span> Receita no bolso, zero filas.
        </>
      }
      heroDescription="Seu público compra fichas pelo celular — cerveja, lanche, combo. No dia manda produzir, mostra o 
QR Code e retira. Sem maquininha, sem pulseira, sem cartão."
      heroCtaText="Quero vender fichas antecipadas"
      heroPhoneScreens={[
        {
          icon: "🎫",
          title: "Barty Fichas",
          subtitle: "Escolha suas fichas",
          items: [
            { label: "Cerveja Artesanal", price: "R$ 18,00", badge: "Popular" },
            { label: "Combo Burger + Drink", price: "R$ 35,00" },
            { label: "Porção Especial", price: "R$ 22,00" },
            { label: "Água Mineral", price: "R$ 5,00" },
          ],
        },
      ]}
      metricsBanner={[
        { value: "+30%", label: "Receita antecipada" },
        { value: "80%", label: "Menos filas" },
        { value: "0", label: "Maquininhas" },
        { value: "24h", label: "Setup completo" },
      ]}
      stepsSubtitle="Como funciona"
      stepsTitle="Da criação à retirada, tudo pelo celular"
      steps={[
        {
          number: "01",
          title: "Crie o evento e configure os produtos",
          description: "Cadastre fichas por item: 'Cerveja Artesanal', 'Combo Lanche + Bebida'. Defina preços, variações e vincule parceiros em minutos.",
        },
        {
          number: "02",
          title: "Gere o QR Code e divulgue",
          description: "Compartilhe o link nas redes sociais ou no ingresso. Rastreabilidade integrada para medir tráfego.",
        },
        {
          number: "03",
          title: "Cliente compra e paga pelo celular",
          description: "Sem app. Abre no navegador, escolhe, paga via Pix, cartão ou carteira Barty. Recebe o QR Code da ficha na hora.",
        },
        {
          number: "04",
          title: "No evento: QR Code → Retira pronto",
          description: "O cliente mostra o QR, o staff valida e entrega. Sem fila de pedido e de pagamento. A cozinha já sabe o que produzir.",
        },
        {
          number: "05",
          title: "Acompanhe e escale",
          description: "Relatórios em tempo real de vendas por item, parceiro e forma de pagamento utilizadas.",
        },
      ]}
      benefitsSubtitle="Vantagens"
      benefitsTitle="Por que fichas antecipadas mudam o jogo"
      benefits={[
        {
          icon: TrendingUp,
          title: "Receita antes do evento",
          description: "Fature antes do evento acontecer. Mais previsibilidade, menos risco financeiro.",
        },
        {
          icon: Ticket,
          title: "Fichas por item específico",
          description: "O cliente compra exatamente o que vai consumir. Você sabe o que produzir, zero desperdício.",
        },
        {
          icon: QrCode,
          title: "QR Code: única ficha necessária",
          description: "O celular do cliente é a ficha. Custo de insumo? Zero.",
        },
        {
          icon: ShieldCheck,
          title: "Pagamento seguro e instantâneo",
          description: "Pix em segundos. Criptografia ponta a ponta. Compliance LGPD. Aceita todas as bandeiras de cartão.",
        },
        {
          icon: Share2,
          title: "Link compartilhável + tagueamento",
          description: "UTMs integradas para medir resultados de tráfego e campanhas.",
        },
        {
          icon: BarChart3,
          title: "Dashboard em tempo real",
          description: "Fichas vendidas, receita por parceiro, performance do staff. Tudo num painel limpo.",
        },
      ]}
      comparisonTitle="Fichas tradicionais vs Barty Fichas"
      comparisonItems={[
        { old: "Filas enormes no caixa para comprar fichas físicas", barty: "Cliente compra pelo celular, antes ou durante" },
        { old: "Fichas de papel que se perdem e geram confusão", barty: "QR Code no celular - impossível perder" },
        { old: "Sem previsibilidade: volume só no dia", barty: "Receita antecipada + planejamento exato" },
        { old: "Custo com maquininhas, pulseiras, cartões e totens", barty: "Zero hardware - tudo pelo celular" },
        { old: "Erros de troco, fichas falsas, desvios", barty: "Pagamento digital rastreável" },
        { old: "Desperdiço por produção sem dados", barty: "Produz só o que já foi vendido" },
      ]}
      objectionsTitle="Dúvidas sobre fichas pré-pagas"
      objections={[
        {
          question: "E se o cliente não usar a ficha no evento?",
          answer: "Você define a política: validade, reembolso ou transferência. Configurável no painel. A receita já entrou.",
        },
        {
          question: "Funciona para eventos que já usam outro sistema?",
          answer: "Sim. Migração gratuita. Em 24h você está vendendo fichas pré-pagas pelo Barty.",
        },
        {
          question: "Qual a taxa cobrada?",
          answer: "Apenas 3% sobre vendas processadas. Sem mensalidade, sem custo fixo.",
        },
        {
          question: "O público precisa baixar app?",
          answer: "Não. 100% no navegador do celular. Abriu o link, pagou, recebeu o QR Code.",
        },
        {
          question: "Posso vender fichas para eventos online?",
          answer: "Sim. O link de compra é o mesmo — o que muda é a entrega.",
        },
      ]}
    />
  </>
);

export default BartyFichas;
