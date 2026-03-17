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
        content="Venda ingressos e consumo antecipado num só sistema. Cardápio digital, QR Code, dashboard em tempo real. Sem custos fixos."
      />
      <link rel="canonical" href="https://barty.fun/eventos" />
      <meta property="og:title" content="Barty Eventos — Gestão Completa de Ingressos e Consumo Cashless" />
      <meta property="og:description" content="Ingressos + consumo antecipado + cardápio digital + dashboard em tempo real." />
      <meta property="og:url" content="https://barty.fun/eventos" />
      <meta property="og:type" content="website" />
    </Helmet>
    <SolutionPageLayout
      pageTitle="Barty Eventos"
      heroTag="Barty Eventos"
      heroTitle={
        <>
          Ingresso + consumo <span className="text-gradient">num só sistema.</span> Cashless de verdade.
        </>
      }
      heroDescription="Ingressos, fichas de consumo e cardápio digital dos parceiros — tudo pelo celular do público. Sem pulseiras, sem totens."
      heroCtaText="Quero gerenciar meu evento"
      heroPhoneScreens={[
        {
          icon: "🎪",
          title: "Festival Barty",
          subtitle: "Ingresso + Consumo",
          items: [
            { label: "Ingresso VIP", price: "R$ 120,00", badge: "1º Lote" },
            { label: "2x Cerveja Premium", price: "R$ 36,00" },
            { label: "Combo Food Truck", price: "R$ 28,00" },
            { label: "Cortesia Staff", price: "Grátis", badge: "Cupom" },
          ],
        },
      ]}
      metricsBanner={[
        { value: "+30%", label: "Receita por evento" },
        { value: "0", label: "Custos com hardware" },
        { value: "100%", label: "Digital e cashless" },
        { value: "Real-time", label: "Dashboard de vendas" },
      ]}
      stepsSubtitle="Passo a passo"
      stepsTitle="Do primeiro lote ao último pedido"
      steps={[
        {
          number: "01",
          title: "Crie o evento e configure tudo",
          description: "Ingressos por lote, cupons, cortesias, setores. Vincule estabelecimentos parceiros e monte o cardápio digital.",
        },
        {
          number: "02",
          title: "Divulgue com link exclusivo",
          description: "Página própria com URL e QR Code. UTMs integradas para tráfego pago.",
        },
        {
          number: "03",
          title: "Público compra ingresso + consumo",
          description: "Ingresso e fichas de consumo pelo celular, antes do evento. Sem surpresas, sem filas.",
        },
        {
          number: "04",
          title: "No evento: QR Code para tudo",
          description: "Entrada, retirada de comida e compras extras — tudo via QR Code pelo celular.",
        },
        {
          number: "05",
          title: "Acompanhe em tempo real",
          description: "Dashboard com faturamento, vendas por parceiro, controle de staff e relatórios completos.",
        },
      ]}
      benefitsSubtitle="Diferenciais"
      benefitsTitle="Tudo que seu evento precisa"
      benefits={[
        {
          icon: Calendar,
          title: "Ingresso + consumo integrado",
          description: "Pare de usar plataformas separadas. No Barty, o público compra tudo junto.",
        },
        {
          icon: Utensils,
          title: "Cardápio digital dos parceiros",
          description: "Cada bar e food truck com seu cardápio. Público compra antecipado e retira sem fila.",
        },
        {
          icon: Tag,
          title: "Cupons, cortesias e lotes",
          description: "Descontos, VIP e virada automática de lotes. Controle total por canal.",
        },
        {
          icon: TrendingUp,
          title: "Receita antecipada",
          description: "Saiba antes do evento quanto vai faturar e o que produzir.",
        },
        {
          icon: Smartphone,
          title: "Sem hardware extra",
          description: "Sem maquininha, cartão físico, pulseira, caixa móvel ou totem. Economia real desde o dia 1.",
        },
        {
          icon: BarChart3,
          title: "Dashboard completo",
          description: "Vendas, produtos, pagamentos e staff em tempo real.",
        },
      ]}
      comparisonTitle="Eventos tradicionais vs Barty"
      comparisonItems={[
        { old: "Ingresso numa plataforma, cashless em outra", barty: "Tudo integrado num só sistema" },
        { old: "Pulseiras, maquininhas e totens = custo alto", barty: "Só celulares — zero hardware" },
        { old: "Filas no caixa, bar e entrada", barty: "QR Code para tudo" },
        { old: "Produção no escuro", barty: "Venda antecipada = previsibilidade" },
        { old: "Erros, extravios e desvios", barty: "Digital e rastreável" },
        { old: "Relatórios manuais dias depois", barty: "Dashboard em tempo real" },
      ]}
      extraSection={
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="container relative z-10">
            <header className="text-center mb-14">
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-2xl md:text-4xl font-bold text-brand-navy"
              >
                Para quem é o <span className="text-gradient">Barty Eventos?</span>
              </motion.h2>
            </header>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {[
                { icon: Users, title: "Produtores de eventos", desc: "Festivais, formaturas, feiras, esportivos. De 100 a 100.000 pessoas." },
                { icon: Calendar, title: "Empresas e corporativos", desc: "Eventos internos, confraternizações, launches." },
                { icon: ShieldCheck, title: "Condomínios e associações", desc: "Festas comunitárias, churrascos, eventos sociais." },
                { icon: Utensils, title: "Estabelecimentos", desc: "Bares e restaurantes que promovem eventos próprios." },
                { icon: LineChart, title: "Feiras e exposições", desc: "Múltiplos expositores, cada um com seu painel." },
                { icon: Smartphone, title: "Blocos e festas populares", desc: "Sem estrutura de caixa? Só precisa de celulares." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="glass-card rounded-2xl p-5"
                >
                  <item.icon className="w-7 h-7 text-primary mb-3" aria-hidden="true" />
                  <h3 className="font-display font-semibold text-brand-navy mb-1 text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      }
      objectionsTitle="Dúvidas sobre Barty Eventos"
      objections={[
        {
          question: "Posso usar só para ingressos, sem consumo?",
          answer: "Sim. Ative só o que precisa. Quer adicionar fichas depois? É só ligar no painel.",
        },
        {
          question: "E se alguém quiser comprar no evento?",
          answer: "QR Code do cardápio no evento. O cliente escaneia, compra e retira na hora.",
        },
        {
          question: "Como funciona com múltiplos parceiros?",
          answer: "Cada parceiro tem cardápio e relatórios separados. Você tem visão consolidada.",
        },
        {
          question: "Consigo configurar % de receita sobre parceiros?",
          answer: "Sim. Porcentagem configurável no painel com relatório automático de comissões.",
        },
        {
          question: "Diferença para Zig ou Meep?",
          answer: "Simplicidade e custo. Sem hardware caro, sem contratos longos. 100% pelo celular, setup em 24h.",
        },
        {
          question: "E a segurança dos pagamentos?",
          answer: "Pix instantâneo, criptografia ponta a ponta e compliance LGPD.",
        },
      ]}
    />
  </>
);

export default BartyEventos;
