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
      <meta property="og:description" content="Receita antecipada + zero filas. Venda fichas de consumo antes do evento acontecer. Seu público compra pelo celular e retira na hora." />
      <meta property="og:url" content="https://barty.fun/fichas" />
      <meta property="og:type" content="website" />
    </Helmet>
    <SolutionPageLayout
      pageTitle="Barty Fichas"
      heroTag="Barty Fichas — Venda Pré-Paga de Consumo"
      heroTitle={
        <>
          Venda fichas de consumo <span className="text-gradient">antes do evento começar.</span> Receita no bolso, público sem fila.
        </>
      }
      heroDescription="Seu público compra fichas de produtos específicos — cerveja, lanche, combo — antes do evento. No dia, é só mostrar o QR Code e retirar. Sem fila, sem maquininha, sem estresse. Você ganha previsibilidade e o cliente ganha agilidade."
      heroCtaText="Quero vender fichas antecipadas"
      metricsBanner={[
        { value: "+30%", label: "Receita com venda antecipada" },
        { value: "80%", label: "Menos filas no evento" },
        { value: "0", label: "Maquininhas necessárias" },
        { value: "24h", label: "Setup completo" },
      ]}
      stepsSubtitle="Como funciona"
      stepsTitle="Da criação à retirada, tudo pelo celular"
      steps={[
        {
          number: "01",
          title: "Crie o evento e configure os produtos",
          description: "Cadastre fichas por item: 'Cerveja Artesanal', 'Combo Lanche + Bebida', 'Porção Especial'. Defina preços, variações e vincule parceiros de comida e bebida em minutos.",
        },
        {
          number: "02",
          title: "Gere o QR Code e divulgue",
          description: "Compartilhe o link exclusivo nas redes sociais, no ingresso ou em material impresso. Cada evento tem sua página personalizada com tagueamento para tráfego pago e rastreamento de canais.",
        },
        {
          number: "03",
          title: "Cliente compra e paga pelo celular",
          description: "Sem app, sem cadastro complicado. Abre no navegador, escolhe os itens, paga via Pix ou cartão. Recebe o QR Code da ficha na hora. Experiência fluida de ponta a ponta.",
        },
        {
          number: "04",
          title: "No evento: QR Code → Retira pronto",
          description: "O cliente mostra o QR no celular, o staff valida e entrega. Sem fila de pagamento. A cozinha já sabe o que produzir porque você vendeu antecipado. Organização total.",
        },
        {
          number: "05",
          title: "Acompanhe e escale",
          description: "Relatórios em tempo real de vendas por item, parceiro e forma de pagamento. Saiba exatamente o que produzir, quanto faturou e como otimizar para o próximo evento.",
        },
      ]}
      benefitsSubtitle="Vantagens"
      benefitsTitle="Por que vender fichas antecipadas muda o jogo"
      benefits={[
        {
          icon: TrendingUp,
          title: "Receita antes do evento",
          description: "Pare de depender só do público presente. Com fichas pré-pagas, você fatura antes do evento acontecer. Mais previsibilidade, menos risco financeiro.",
        },
        {
          icon: Ticket,
          title: "Fichas por item específico",
          description: "Diferente de créditos genéricos, o cliente compra exatamente o que vai consumir: '2 cervejas + 1 hambúrguer'. Você sabe o que produzir — zero desperdício.",
        },
        {
          icon: QrCode,
          title: "QR Code: única ficha necessária",
          description: "Esqueça pulseiras, cartões físicos e totens. O celular do cliente é a ficha. Gera o QR, mostra no balcão, retira. Custo de insumo? Zero.",
        },
        {
          icon: ShieldCheck,
          title: "Pagamento seguro e instantâneo",
          description: "Pix confirmado em segundos. Criptografia ponta a ponta. Compliance LGPD. Dinheiro cai direto na sua conta — sem intermediários.",
        },
        {
          icon: Share2,
          title: "Link compartilhável + tagueamento",
          description: "Cada evento gera uma página exclusiva com link para redes sociais. UTMs integradas para medir resultados de tráfego pago e campanhas.",
        },
        {
          icon: BarChart3,
          title: "Dashboard de vendas em tempo real",
          description: "Acompanhe fichas vendidas, receita por parceiro, forma de pagamento e performance do staff. Tudo num painel limpo e acessível de qualquer dispositivo.",
        },
      ]}
      comparisonTitle="Fichas tradicionais vs Barty Fichas"
      comparisonItems={[
        { old: "Filas enormes no caixa para comprar fichas físicas", barty: "Cliente compra pelo celular, antes ou durante o evento" },
        { old: "Fichas de papel ou token que se perdem e geram confusão", barty: "QR Code no celular — impossível perder" },
        { old: "Sem previsibilidade: você só sabe o volume no dia", barty: "Receita antecipada + planejamento exato de produção" },
        { old: "Custo com maquininhas, pulseiras, cartões e totens", barty: "Zero custo de hardware — tudo funciona pelo celular" },
        { old: "Erros de troco, fichas falsas, desvios de caixa", barty: "Pagamento digital rastreável com relatório completo" },
        { old: "Desperdício por produção sem dados", barty: "Produz só o que já foi vendido — menos sobra, mais lucro" },
      ]}
      objectionsTitle="Dúvidas sobre fichas pré-pagas"
      objections={[
        {
          question: "E se o cliente não usar a ficha no evento?",
          answer: "Você define a política: a ficha pode ter validade, ser reembolsável ou transferível. É configurável direto no painel. De toda forma, a receita já entrou.",
        },
        {
          question: "Funciona para eventos que já usam outro sistema?",
          answer: "Sim. A migração é gratuita. Importamos cardápios e configurações. Em 24h você está vendendo fichas pré-pagas pelo Barty.",
        },
        {
          question: "Qual a taxa cobrada?",
          answer: "Apenas 3% sobre vendas processadas. Sem mensalidade, sem custo fixo, sem surpresas. Você paga só quando vende.",
        },
        {
          question: "O público precisa baixar app?",
          answer: "Não. Funciona 100% no navegador do celular. Abriu o link, escolheu, pagou, recebeu o QR Code. Sem fricção.",
        },
        {
          question: "Posso vender fichas para eventos online também?",
          answer: "Sim. O modelo de fichas pré-pagas funciona para eventos presenciais e online. O link de compra é o mesmo — o que muda é a entrega.",
        },
      ]}
    />
  </>
);

export default BartyFichas;
