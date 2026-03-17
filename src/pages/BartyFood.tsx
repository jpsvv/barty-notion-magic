import { UtensilsCrossed, QrCode, TrendingUp, ShieldCheck, Smartphone, BarChart3, Printer, Clock } from "lucide-react";
import SolutionPageLayout from "@/components/SolutionPageLayout";
import { Helmet } from "react-helmet-async";

const BartyFood = () => (
  <>
    <Helmet>
      <title>Barty Food — Cardápio Digital com Venda Antecipada para Restaurantes e Bares</title>
      <meta
        name="description"
        content="Venda antecipada para restaurantes, bares, cafeterias e food trucks. Cardápio digital com QR Code. Sem delivery, sem iFood. Receita previsível e cozinha organizada."
      />
      <link rel="canonical" href="https://barty.fun/food" />
      <meta property="og:title" content="Barty Food — Venda Antecipada para Restaurantes e Bares" />
      <meta property="og:description" content="Cardápio digital + venda antecipada. Sem delivery. Seu cliente compra, paga e retira via QR Code. Cozinha organizada, receita previsível." />
      <meta property="og:url" content="https://barty.fun/food" />
      <meta property="og:type" content="website" />
    </Helmet>
    <SolutionPageLayout
      pageTitle="Barty Food"
      heroTag="Barty Food — Cardápio Digital com Venda Antecipada"
      heroTitle={
        <>
          Seu cliente compra antes, paga antes e retira <span className="text-gradient">sem fila.</span> Receita garantida, cozinha tranquila.
        </>
      }
      heroDescription="Restaurantes, bares, cafeterias, food trucks: parem de depender só do movimento do dia. Com Barty Food, qualquer pessoa compra pelo celular, paga adiantado e retira via QR Code. Sem iFood, sem delivery, sem comissões abusivas. A receita é sua."
      heroCtaText="Quero vender antecipado"
      metricsBanner={[
        { value: "R$99", label: "Mensalidade fixa" },
        { value: "0%", label: "Comissão sobre vendas" },
        { value: "100%", label: "Da receita é sua" },
        { value: "24h", label: "Para começar a vender" },
      ]}
      stepsSubtitle="Como funciona"
      stepsTitle="Monte o cardápio, compartilhe o link e venda"
      steps={[
        {
          number: "01",
          title: "Cadastre seus produtos no cardápio digital",
          description: "Adicione fotos, descrições, variações (tamanho, ponto da carne, complementos), preços e promoções. Mudanças aparecem em tempo real para o cliente.",
        },
        {
          number: "02",
          title: "Compartilhe o QR Code e o link",
          description: "Coloque o QR Code nas mesas, no balcão, na fachada e nas redes sociais. O cliente escaneia e acessa seu cardápio direto no navegador — sem app.",
        },
        {
          number: "03",
          title: "Cliente escolhe, paga e recebe o QR Code do pedido",
          description: "Pagamento antecipado via Pix ou cartão. Confirmação instantânea. O pedido aparece no seu painel. O cliente decide: consome no local ou leva.",
        },
        {
          number: "04",
          title: "Libere a produção quando fizer sentido",
          description: "O cliente comprou, mas a produção é liberada quando você quiser — ou quando o cliente autorizar. Menos desperdício, cozinha organizada, zero pressão.",
        },
        {
          number: "05",
          title: "Entregue via QR Code no balcão",
          description: "O staff valida o QR Code no celular e entrega o pedido. Sem comanda, sem confusão, sem fila. Opcional: imprima comanda para a cozinha se preferir.",
        },
      ]}
      benefitsSubtitle="Vantagens"
      benefitsTitle="Por que Barty Food muda a rotina do seu estabelecimento"
      benefits={[
        {
          icon: TrendingUp,
          title: "Receita que não depende do movimento",
          description: "Qualquer pessoa pode comprar a qualquer hora, de qualquer lugar. Não precisa estar no local. É como um iFood — mas sem delivery, sem comissão e sem intermediários.",
        },
        {
          icon: UtensilsCrossed,
          title: "Fim das comandas que ninguém gosta",
          description: "A venda é antecipada. O cliente paga antes de consumir. Sem comanda de papel, sem conta surpresa no final. Transparência total para os dois lados.",
        },
        {
          icon: Clock,
          title: "Cozinha organizada e sem pressão",
          description: "Produza sob demanda: o pedido só vai para produção quando fizer sentido. Menos desperdício de insumos, atendimento mais ágil, equipe menos estressada.",
        },
        {
          icon: Printer,
          title: "Impressão de comanda (opcional)",
          description: "Se a sua cozinha funciona melhor com comanda impressa, ativamos. Se não, tudo fica no painel digital. Você escolhe o que funciona pro seu fluxo.",
        },
        {
          icon: QrCode,
          title: "QR Code nas mesas e balcão",
          description: "Para quem está no local e quer comprar na hora: escaneia o QR, vê o cardápio, paga pelo celular e retira. Sem chamar garçom, sem esperar.",
        },
        {
          icon: Smartphone,
          title: "Sem maquininha, sem custo extra",
          description: "Tudo pelo celular do cliente e do staff. Sem investimento em hardware. A economia começa no primeiro dia de uso.",
        },
        {
          icon: ShieldCheck,
          title: "Pagamento seguro e na sua conta",
          description: "Pix instantâneo, criptografia e LGPD. Sem intermediário financeiro. O dinheiro cai direto na conta do estabelecimento.",
        },
        {
          icon: BarChart3,
          title: "Relatórios e dashboard completos",
          description: "Vendas por produto, forma de pagamento, horário de pico, ticket médio. Tudo em tempo real. Dados para tomar decisões melhores todo dia.",
        },
      ]}
      comparisonTitle="Jeito tradicional vs Barty Food"
      comparisonItems={[
        { old: "Receita depende 100% do público presente no dia", barty: "Venda antecipada: fature antes do cliente chegar" },
        { old: "Comanda de papel, conta surpresa, confusão no fechamento", barty: "Cliente paga antes. Sem comanda, sem surpresa" },
        { old: "iFood cobra até 27% de comissão + taxa de entrega", barty: "R$99/mês fixo. Zero comissão. 100% da receita é sua" },
        { old: "Garçom anotando, errando pedido, demora no atendimento", barty: "Cliente pede pelo celular. Pedido chega certo e organizado" },
        { old: "Cozinha sobrecarregada em horário de pico", barty: "Produção liberada sob demanda — sem acúmulo, sem estresse" },
        { old: "Maquininha, sistema de gestão de mesa, custos mensais altos", barty: "Só precisa de celular e QR Code. Setup em 24h" },
      ]}
      objectionsTitle="Dúvidas sobre Barty Food"
      objections={[
        {
          question: "Barty Food é um concorrente do iFood?",
          answer: "Não somos uma plataforma de delivery. Somos um sistema de venda antecipada com retirada no local. O cliente compra pelo celular e retira presencialmente. Sem entregador, sem comissão por pedido.",
        },
        {
          question: "O Barty controla estoque ou emite nota fiscal?",
          answer: "Não. O Barty não é ERP. Focamos em venda antecipada, cardápio digital e gestão de pedidos. Se você precisa de controle de estoque ou emissão fiscal, integramos com seu sistema existente.",
        },
        {
          question: "E se o cliente quiser fazer o pedido presencialmente?",
          answer: "Coloque o QR Code do cardápio nas mesas e no balcão. O cliente escaneia, faz o pedido e paga pelo celular. Mesmo estando no local, a experiência é cashless e sem fila.",
        },
        {
          question: "Funciona para food truck em eventos?",
          answer: "Sim. Na verdade, é um dos melhores cenários. O food truck cadastra seu cardápio, o organizador do evento vincula como parceiro, e o público compra antecipado. Receita garantida e fila zero.",
        },
        {
          question: "Qual é a mensalidade?",
          answer: "R$99/mês para estabelecimentos fixos. Sem limite de pedidos, sem comissão sobre vendas. Cancele quando quiser, sem multa e sem fidelidade.",
        },
        {
          question: "Consigo ver o desempenho do meu staff?",
          answer: "Sim. O dashboard mostra: quem vendeu, quantos pedidos estão pendentes, quantos foram entregues e o tempo médio de atendimento. Gestão real do time.",
        },
      ]}
    />
  </>
);

export default BartyFood;
