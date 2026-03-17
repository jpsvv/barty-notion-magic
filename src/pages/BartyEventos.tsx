import { Calendar, QrCode, TrendingUp, ShieldCheck, Users, BarChart3, Utensils, Tag, Smartphone, LineChart } from "lucide-react";
import SolutionPageLayout from "@/components/SolutionPageLayout";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const BartyEventos = () => (
  <>
    <Helmet>
      <title>Barty Eventos — Ingresso + Consumo Cashless Integrado para Eventos</title>
      <meta
        name="description"
        content="Venda ingressos e consumo antecipado num só sistema. Cardápio digital, QR Code, dashboard em tempo real. Ideal para festivais, feiras, eventos corporativos. Sem custos fixos."
      />
      <link rel="canonical" href="https://barty.fun/eventos" />
      <meta property="og:title" content="Barty Eventos — Gestão Completa de Ingressos e Consumo Cashless" />
      <meta property="og:description" content="Ingressos + consumo antecipado + cardápio digital + dashboard em tempo real. Tudo num sistema sem custos fixos." />
      <meta property="og:url" content="https://barty.fun/eventos" />
      <meta property="og:type" content="website" />
    </Helmet>
    <SolutionPageLayout
      pageTitle="Barty Eventos"
      heroTag="Barty Eventos — Ingresso + Consumo Integrado"
      heroTitle={
        <>
          O evento perfeito começa com <span className="text-gradient">vendas antes do primeiro convidado chegar.</span>
        </>
      }
      heroDescription="Ingressos, fichas de consumo, cardápio digital dos parceiros e dashboard em tempo real — tudo num sistema que cabe no celular do seu público. Sem pulseiras, sem totens, sem maquininhas. Lucro previsível desde o primeiro lote."
      heroCtaText="Quero gerenciar meu evento com Barty"
      metricsBanner={[
        { value: "+30%", label: "Receita média por evento" },
        { value: "0", label: "Custos com hardware" },
        { value: "100%", label: "Digital e cashless" },
        { value: "Real-time", label: "Dashboard de vendas" },
      ]}
      stepsSubtitle="Passo a passo"
      stepsTitle="Do primeiro lote ao último pedido — tudo no Barty"
      steps={[
        {
          number: "01",
          title: "Crie o evento e configure tudo",
          description: "Ingressos por lote, cupons de desconto, cortesias, setores. Se o evento tiver comes e bebes, vincule os estabelecimentos parceiros e monte o cardápio digital de cada um. Tudo no mesmo painel.",
        },
        {
          number: "02",
          title: "Divulgue com link exclusivo e tagueamento",
          description: "Cada evento gera uma página própria com URL compartilhável. UTMs integradas para campanhas de tráfego pago. QR Code para materiais impressos. Comece a vender imediatamente.",
        },
        {
          number: "03",
          title: "Público compra ingresso + consumo antecipado",
          description: "Seu público compra o ingresso E as fichas de consumo pelo celular, antes do evento. Sabe quanto vai gastar, escolhe o que vai comer e beber. Sem surpresas, sem filas.",
        },
        {
          number: "04",
          title: "No evento: QR Code para tudo",
          description: "Entrada com QR do ingresso. Retirada de comida e bebida com QR das fichas. O staff valida tudo pelo celular. Se o público quiser comprar mais no local, é só escanear o QR Code do cardápio.",
        },
        {
          number: "05",
          title: "Acompanhe em tempo real e otimize",
          description: "Dashboard com faturamento, vendas por parceiro, formas de pagamento, controle de staff (vendas, pedidos pendentes, retiradas). Relatórios completos para escalar no próximo evento.",
        },
      ]}
      benefitsSubtitle="Diferenciais"
      benefitsTitle="Tudo que seu evento precisa — e nada que não precisa"
      benefits={[
        {
          icon: Calendar,
          title: "Ingresso + consumo num só sistema",
          description: "Pare de usar uma plataforma para ingressos e outra para cashless. No Barty, o público compra tudo junto. Menos fornecedores, menos custo, mais controle.",
        },
        {
          icon: Utensils,
          title: "Cardápio digital de todos os parceiros",
          description: "Cada bar, food truck ou cozinha tem seu cardápio dentro do Barty. O público vê tudo, compra antecipado e retira sem fila. Previsibilidade de produção garantida.",
        },
        {
          icon: Tag,
          title: "Cupons, cortesias e lotes automáticos",
          description: "Configure descontos, cortesias para convidados VIP e lotes com virada automática. Controle total de vendas por canal, promotor e campanha.",
        },
        {
          icon: TrendingUp,
          title: "Receita antecipada e previsível",
          description: "Com venda pré-paga de ingressos e fichas, você sabe antes do evento quanto vai faturar e o que vai produzir. Planejamento com dados, não com achismo.",
        },
        {
          icon: Smartphone,
          title: "Sem hardware extra",
          description: "Sem maquininha, pulseira, cartão físico ou totem. O celular do público é o ingresso e a ficha. O celular do staff é o validador. Economia real desde o dia 1.",
        },
        {
          icon: BarChart3,
          title: "Dashboard e relatórios completos",
          description: "Acompanhe vendas de fichas, produtos, quantidades, formas de pagamento. Controle de staff: quem vendeu, quem entregou, o que está pendente. Tudo em tempo real.",
        },
      ]}
      comparisonTitle="Eventos tradicionais vs Eventos com Barty"
      comparisonItems={[
        { old: "Ingresso numa plataforma, cashless em outra, caixa em outra", barty: "Tudo integrado: ingresso, consumo, cardápio e relatórios" },
        { old: "Pulseiras, maquininhas e totens = custo alto", barty: "Só celulares — zero custo de hardware" },
        { old: "Filas no caixa, filas no bar, filas na entrada", barty: "QR Code para tudo: entrada, pedido e retirada" },
        { old: "Produção no escuro: sem saber o que vai vender", barty: "Venda antecipada: sabe exatamente o que produzir" },
        { old: "Erros de pedido, extravio de fichas, desvios", barty: "Digital, rastreável e com relatório por transação" },
        { old: "Relatórios manuais dias depois do evento", barty: "Dashboard em tempo real durante e após o evento" },
      ]}
      extraSection={
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="container relative z-10">
            <header className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-3xl md:text-5xl font-bold text-foreground"
              >
                Para quem é o <span className="text-gradient">Barty Eventos?</span>
              </motion.h2>
            </header>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Users, title: "Produtores de eventos", desc: "Festivais de música, formaturas, feiras, eventos esportivos. De 100 a 100.000 pessoas." },
                { icon: Calendar, title: "Empresas e corporativos", desc: "Eventos internos, confraternizações, launches. Controle total com relatório por centro de custo." },
                { icon: ShieldCheck, title: "Condomínios e associações", desc: "Festas de fim de ano, churrascos, eventos de comunidade. Simples de configurar, fácil de usar." },
                { icon: Utensils, title: "Donos de estabelecimentos", desc: "Bares e restaurantes que promovem eventos próprios. Cardápio digital e venda antecipada." },
                { icon: LineChart, title: "Feiras e exposições", desc: "Múltiplos expositores com cardápios e produtos próprios. Cada um com seu painel." },
                { icon: Smartphone, title: "Blocos de rua e festas populares", desc: "Sem estrutura de caixa? Sem problema. Só precisa de celulares e QR Codes." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <item.icon className="w-8 h-8 text-primary mb-4" aria-hidden="true" />
                  <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      }
      objectionsTitle="Dúvidas sobre Barty Eventos"
      objections={[
        {
          question: "Posso usar Barty só para ingressos, sem a parte de consumo?",
          answer: "Sim. Você ativa os módulos que precisa. Só ingressos? Funciona perfeitamente. Quer adicionar fichas de consumo e cardápio depois? É só ligar no painel.",
        },
        {
          question: "E se alguém quiser comprar no evento, sem ter comprado antecipado?",
          answer: "Sem problema. Disponibilize o QR Code do cardápio no evento. O cliente escaneia, compra na hora pelo celular e retira no balcão. Mesma experiência fluida.",
        },
        {
          question: "Como funciona para eventos com múltiplos estabelecimentos parceiros?",
          answer: "Cada parceiro tem seu cardápio, seus produtos e seus relatórios separados. Você, como organizador, tem a visão consolidada de tudo. Total transparência.",
        },
        {
          question: "Consigo configurar % de receita sobre os parceiros?",
          answer: "Sim. Você define sua porcentagem sobre as vendas de cada estabelecimento parceiro. Tudo configurável no painel, com relatório automático de comissões.",
        },
        {
          question: "Qual a diferença para sistemas como Zig ou Meep?",
          answer: "Simplicidade e custo. Zig e Meep exigem hardware caro (pulseiras, maquininhas, totens), equipes de TI e contratos longos. Barty funciona 100% pelo celular, sem custos fixos, com setup em 24h.",
        },
        {
          question: "E a segurança dos pagamentos?",
          answer: "Pix instantâneo, criptografia ponta a ponta e compliance LGPD. O dinheiro cai direto na sua conta sem intermediários financeiros.",
        },
      ]}
    />
  </>
);

export default BartyEventos;
