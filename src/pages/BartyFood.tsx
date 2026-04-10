import { UtensilsCrossed, QrCode, TrendingUp, ShieldCheck, Smartphone, BarChart3, Printer, Clock } from "lucide-react";
import SolutionPageLayout from "@/components/SolutionPageLayout";
import { Helmet } from "react-helmet-async";

const BartyFood = () => (
  <>
    <Helmet>
      <title>Barty Food — Cardápio Digital com Venda Antecipada para Restaurantes e Bares</title>
      <meta
        name="description"
        content="Venda antecipada para restaurantes, bares, cafeterias e food trucks. Cardápio digital com QR Code. Receita previsível e cozinha organizada."
      />
      <link rel="canonical" href="https://barty.fun/food" />
      <meta property="og:title" content="Barty Food — Venda Antecipada para Restaurantes e Bares" />
      <meta property="og:description" content="Cardápio digital + venda antecipada. Seu cliente compra, paga e retira via QR Code." />
      <meta property="og:url" content="https://barty.fun/food" />
      <meta property="og:type" content="website" />
    </Helmet>
    <SolutionPageLayout
      pageTitle="Barty Food"
      heroTag="Barty Food"
      heroTitle={
        <>
          Venda antes, <span className="text-gradient">produza com calma.</span> Receita garantida, cozinha tranquila.
        </>
      }
      heroDescription="Seu cliente compra pelo celular, paga adiantado e retira via QR Code. Sem iFood, sem delivery, sem comissões abusivas."
      heroCtaText="Quero vender antecipado"
      heroPhoneScreens={[
        {
          icon: "🍔",
          title: "Cardápio Digital",
          subtitle: "Peça e pague pelo celular",
          items: [
            { label: "Smash Burger Duplo", price: "R$ 32,00", badge: "Mais vendido" },
            { label: "Açaí 500ml", price: "R$ 18,00" },
            { label: "Café Especial", price: "R$ 12,00" },
            { label: "Combo Almoço", price: "R$ 25,00", badge: "Promo" },
          ],
        },
      ]}
      metricsBanner={[
        { value: "R$99", label: "Mensalidade fixa" },
        { value: "0%", label: "Comissão sobre vendas" },
        { value: "100%", label: "Receita é sua" },
        { value: "24h", label: "Para começar" },
      ]}
      stepsSubtitle="Como funciona"
      stepsTitle="Monte o cardápio, compartilhe e venda"
      steps={[
        {
          number: "01",
          title: "Cadastre seus produtos",
          description: "Fotos, descrições, variações, preços e promoções. Mudanças em tempo real.",
        },
        {
          number: "02",
          title: "Compartilhe o QR Code",
          description: "Nas mesas, balcão, fachada e redes sociais. Acesso direto no navegador.",
        },
        {
          number: "03",
          title: "Cliente escolhe e paga antecipado",
          description: "Pix ou cartão. Confirmação instantânea. Consome no local ou leva.",
        },
        {
          number: "04",
          title: "Libere a produção quando quiser",
          description: "Produção sob demanda. Menos desperdício, cozinha organizada, zero pressão.",
        },
        {
          number: "05",
          title: "Entregue via QR Code no balcão",
          description: "Staff valida o QR e entrega. Opcional: comanda impressa para cozinha.",
        },
      ]}
      benefitsSubtitle="Vantagens"
      benefitsTitle="Por que Barty Food muda seu negócio"
      benefits={[
        {
          icon: TrendingUp,
          title: "Receita não depende do movimento",
          description: "Qualquer pessoa compra de qualquer lugar. Como iFood, mas sem delivery e sem comissão.",
        },
        {
          icon: UtensilsCrossed,
          title: "Fim das comandas",
          description: "Venda antecipada. Cliente paga antes de consumir. Transparência total.",
        },
        {
          icon: Clock,
          title: "Cozinha organizada",
          description: "Produza sob demanda. Menos desperdício, atendimento ágil, equipe menos estressada.",
        },
        {
          icon: Printer,
          title: "Comanda impressa (opcional)",
          description: "Ativa ou desativa. Tudo no painel digital ou impresso, você escolhe.",
        },
        {
          icon: QrCode,
          title: "QR Code nas mesas",
          description: "Quem está no local escaneia, pede e paga. Sem chamar garçom.",
        },
        {
          icon: Smartphone,
          title: "Sem maquininha",
          description: "Tudo pelo celular. Economia desde o primeiro dia.",
        },
        {
          icon: ShieldCheck,
          title: "Pagamento seguro",
          description: "Pix instantâneo, LGPD. Dinheiro direto na sua conta.",
        },
        {
          icon: BarChart3,
          title: "Dashboard completo",
          description: "Vendas por produto, horário de pico, ticket médio. Dados em tempo real.",
        },
      ]}
      comparisonTitle="Jeito tradicional vs Barty Food"
      comparisonItems={[
        { old: "Receita depende do público presente", barty: "Venda antecipada: fature antes" },
        { old: "Comanda de papel, conta surpresa", barty: "Cliente paga antes. Sem surpresa" },
        { old: "iFood cobra até 27% de comissão", barty: "R$99/mês. Zero comissão" },
        { old: "Garçom anotando e errando", barty: "Cliente pede pelo celular, certo" },
        { old: "Cozinha sobrecarregada no pico", barty: "Produção sob demanda" },
        { old: "Maquininha + sistema caro", barty: "Só celular e QR Code" },
      ]}
      objectionsTitle="Dúvidas sobre Barty Food"
      objections={[
        {
          question: "Barty Food concorre com iFood?",
          answer: "Não. Somos venda antecipada com retirada no local. Sem entregador, sem comissão por pedido.",
        },
        {
          question: "Controla estoque ou emite nota?",
          answer: "Não. Focamos em venda antecipada e gestão de pedidos. Integramos com seu sistema existente.",
        },
        {
          question: "E se o cliente quiser pedir no local?",
          answer: "QR Code nas mesas. Escaneia, pede e paga pelo celular. Cashless mesmo presencialmente.",
        },
        {
          question: "Funciona para food truck em evento?",
          answer: "Sim. Cadastra cardápio, organizador vincula como parceiro, público compra antecipado.",
        },
        {
          question: "Qual a mensalidade?",
          answer: "R$99/mês. Sem limite de pedidos, sem comissão. Cancele quando quiser.",
        },
        {
          question: "Consigo ver desempenho do staff?",
          answer: "Sim. Dashboard mostra vendas, pedidos pendentes, entregas e tempo médio de atendimento.",
        },
      ]}
    />
  </>
);

export default BartyFood;
