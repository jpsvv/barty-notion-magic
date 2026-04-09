import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ChevronDown } from "lucide-react";
import RevenueSimulator from "@/components/RevenueSimulator";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plans = [
  {
    name: "Free",
    subtitle: "Para quem está começando",
    price: "R$ 0",
    period: "/mês",
    highlight: false,
    cta: "Começar grátis",
    details: [
      { label: "Taxa sobre faturamento", value: "1%" },
      { label: "Taxa de ingresso", value: "10%" },
      { label: "Taxa de pagamento repasse via Barty", value: "3,2%" },
      { label: "Fidelidade", value: "Sem fidelidade" },
    ],
  },
  {
    name: "Grow",
    subtitle: "Tudo que você precisa para crescer",
    price: "R$ 99,90",
    period: "/mês",
    highlight: true,
    cta: "Assinar agora",
    details: [
      { label: "Taxa sobre faturamento", value: "0,5%" },
      { label: "Taxa de ingresso", value: "8%" },
      { label: "Taxa de pagamento repasse via Barty", value: "3,2%" },
      { label: "Fidelidade", value: "1 ano" },
    ],
  },
];

type Feature = {
  name: string;
  description: string;
  free: boolean;
  complete: boolean;
};

type Category = {
  category: string;
  features: Feature[];
};

const featureCategories: Category[] = [
  {
    category: "Experiência do cliente",
    features: [
      { name: "Cardápio digital via QRCode", description: "Entrada no cardápio por QRCode", free: true, complete: true },
      { name: "Cardápio customizável e atualizável", description: "Editar itens, preços, fotos e textos", free: true, complete: true },
      { name: "Pagamento no app", description: "Pix, cartão e carteira Barty", free: true, complete: true },
      { name: "Promoções", description: "Regras promocionais e campanhas", free: true, complete: true },
      { name: "Vouchers / fichas-presente", description: "Presentear ou bonificar clientes", free: false, complete: true },
      { name: "Venda antecipada", description: "Vender antes da abertura da operação", free: true, complete: true },
    ],
  },
  {
    category: "Operação",
    features: [
      { name: "Validade da ficha", description: "Configuração de validade", free: true, complete: true },
      { name: "Quantidade disponível", description: "Controle de limite por item", free: true, complete: true },
      { name: "Abrir/fechar e pausar operação", description: "Controle de status da operação", free: true, complete: true },
      { name: "Múltiplos cardápios", description: "Ativar/desativar cardápios por contexto", free: false, complete: true },
      { name: "Acessos personalizados da equipe", description: "Permissões por perfil", free: false, complete: true },
      { name: "Validação por QRCode ou código", description: "Baixa de fichas sem atrito", free: true, complete: true },
      { name: "Acompanhamento da produção", description: "Bar/cozinha ao vivo", free: true, complete: true },
      { name: "Produção sob demanda", description: "Encaminha fichas apenas quando necessário", free: true, complete: true },
    ],
  },
  {
    category: "Caixa e infraestrutura",
    features: [
      { name: "Módulo caixa / dinheiro", description: "Operação com dinheiro e frente de caixa", free: false, complete: true },
      { name: "Impressão de pedidos", description: "Impressão por operação", free: false, complete: true },
    ],
  },
  {
    category: "Gestão e financeiro",
    features: [
      { name: "Dashboard completo", description: "Visão consolidada da operação", free: true, complete: true },
      { name: "Relatório básico", description: "Venda por produto e período", free: true, complete: true },
      { name: "Relatórios avançados", description: "Análises mais completas", free: false, complete: true },
      { name: "Grupos empresariais", description: "Gestão de grupos empresariais", free: false, complete: true },
      { name: "Controle de repasses", description: "Gestão financeira entre partes", free: true, complete: true },
    ],
  },
  {
    category: "Eventos",
    features: [
      { name: "Módulo eventos", description: "Cadastro e gestão do evento", free: true, complete: true },
      { name: "Gestão de empresas parceiras", description: "Convidar e administrar operações", free: true, complete: true },
      { name: "Convites de eventos", description: "Aceitar/recusar convite de eventos", free: true, complete: true },
      { name: "Página exclusiva do evento", description: "Página central do evento", free: true, complete: true },
      { name: "Módulo ingresso", description: "Venda e gestão de ingressos", free: true, complete: true },
      { name: "Lotes, validades e promocionais", description: "Camadas de ticketing", free: true, complete: true },
    ],
  },
  {
    category: "Marketing e premium",
    features: [
      { name: "Tracking (Meta/Google/GA)", description: "Pixels e mensuração de campanhas", free: false, complete: true },
      { name: "Suporte 24/7", description: "Atendimento prioritário", free: false, complete: true },
      { name: "Onboarding / implantação assistida", description: "Setup guiado e treinamento", free: false, complete: true },
    ],
  },
];

const FeatureAccordion = ({ categories }: { categories: Category[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3">
      {categories.map((cat, idx) => (
        <motion.div
          key={cat.category}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.05 }}
          className="border border-border rounded-2xl overflow-hidden bg-card"
        >
          <button
            onClick={() => toggle(idx)}
            className="w-full flex items-center justify-between p-5 text-left"
            aria-expanded={openIndex === idx}
          >
            <span className="font-display font-semibold text-foreground text-sm">{cat.category}</span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 ${
                openIndex === idx ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence initial={false}>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 space-y-3">
                  {cat.features.map((feature) => (
                    <div key={feature.name} className="flex items-start gap-3 py-2">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{feature.name}</p>
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

const Planos = () => {
  return (
    <>
      <Helmet>
        <title>Planos e Preços — Barty</title>
        <meta name="description" content="Conheça os planos do Barty. Comece grátis ou tenha acesso completo por R$99,90/mês. Sem surpresas." />
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-32">
        {/* Header */}
        <section className="container text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4"
          >
            Planos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-lg mx-auto"
          >
            Escolha o plano ideal para o seu negócio. Sem letras miúdas.
          </motion.p>
        </section>

        {/* Plan cards */}
        <section className="container max-w-4xl mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-8 md:p-10 relative transition-all duration-300 ${
                  plan.highlight
                    ? "border-2 border-primary/30 bg-card shadow-lg"
                    : "border border-border bg-card"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-6 btn-glow text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                    Recomendado
                  </div>
                )}

                <h2 className="font-display text-2xl font-bold text-foreground mb-1">
                  {plan.name}
                </h2>
                <p className="text-sm text-muted-foreground mb-6">{plan.subtitle}</p>

                <div className="mb-6">
                  <span className="font-display text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground text-sm ml-1">{plan.period}</span>
                </div>

                <a
                  href="https://wa.me/553484428888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center w-full gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    plan.highlight
                      ? "btn-glow text-primary-foreground"
                      : "bg-foreground text-background hover:opacity-90"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </a>

                <div className="mt-8 space-y-3">
                  {plan.details.map((d) => (
                    <div key={d.label} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{d.label}</span>
                      <span className="font-medium text-foreground">{d.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Feature accordion */}
        <section className="container max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-12"
          >
            Conheça todas as funcionalidades
          </motion.h2>

          <FeatureAccordion categories={featureCategories} />
        </section>

        {/* Revenue Simulator */}
        <RevenueSimulator />

        {/* FAQ */}
        <section className="container max-w-3xl mt-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-10"
          >
            Perguntas frequentes
          </motion.h2>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <FaqItem key={item.question} question={item.question} answer={item.answer} index={i} />
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16 mb-8"
          >
            <p className="text-muted-foreground mb-6">
              Ainda com dúvida? Fale com a gente.
            </p>
            <a
              href="https://wa.me/553484428888"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-primary-foreground text-sm font-semibold"
            >
              Falar com o time
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
};

const faqItems = [
  {
    question: "Preciso de algum equipamento especial?",
    answer: "Não. O Barty funciona 100% digital, direto no celular do cliente e no seu navegador. Sem maquininha, sem pulseira, sem totem.",
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer: "O plano Grátis não tem fidelidade. O plano Completo tem fidelidade de 1 ano, mas você pode cancelar ao final do período sem burocracia.",
  },
  {
    question: "Qual a diferença entre a taxa sobre faturamento e a taxa de ingresso?",
    answer: "A taxa sobre faturamento incide sobre vendas de fichas e pedidos. A taxa de ingresso é cobrada separadamente sobre a venda de ingressos pelo módulo de eventos.",
  },
  {
    question: "O plano Grátis tem alguma limitação de uso?",
    answer: "O plano Grátis oferece todas as funcionalidades essenciais sem limite de pedidos. Funcionalidades avançadas como múltiplos cardápios, relatórios avançados, módulo caixa e tracking estão disponíveis no plano Completo.",
  },
  {
    question: "Como funciona a migração para o Barty?",
    answer: "No plano Completo, oferecemos onboarding e implantação assistida. Nossa equipe cuida de todo o setup, migração de cardápios e treinamento em até 24h.",
  },
  {
    question: "Quais formas de pagamento o cliente pode usar?",
    answer: "Pix, cartão de crédito/débito e carteira Barty. Tudo integrado no app, sem necessidade de maquininha.",
  },
];

const FaqItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border border-border rounded-2xl overflow-hidden bg-card"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
        aria-expanded={open}
      >
        <span className="font-display font-semibold text-foreground pr-4 text-sm">{question}</span>
        <svg
          className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-5" : "max-h-0"}`}>
        <p className="px-5 text-sm text-muted-foreground leading-relaxed">{answer}</p>
      </div>
    </motion.div>
  );
};

export default Planos;
