import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";

const plans = [
  {
    name: "Grátis",
    subtitle: "Para quem está começando",
    price: "R$ 0",
    period: "/mês",
    highlight: false,
    cta: "Começar grátis",
    details: [
      { label: "Taxa sobre faturamento", value: "1%" },
      { label: "Taxa de ingresso", value: "10%" },
      { label: "Fidelidade", value: "Sem fidelidade" },
    ],
  },
  {
    name: "Completo",
    subtitle: "Tudo que você precisa para crescer",
    price: "R$ 99,90",
    period: "/mês",
    highlight: true,
    cta: "Assinar agora",
    details: [
      { label: "Taxa sobre faturamento", value: "0,5%" },
      { label: "Taxa de ingresso", value: "8%" },
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

const FeatureIcon = ({ included }: { included: boolean }) =>
  included ? (
    <Check className="w-4 h-4 text-primary shrink-0" />
  ) : (
    <X className="w-4 h-4 text-muted-foreground/40 shrink-0" />
  );

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

        {/* Feature comparison */}
        <section className="container max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-12"
          >
            Compare os planos em detalhe
          </motion.h2>

          {/* Desktop table header */}
          <div className="hidden md:grid grid-cols-[1fr_100px_100px] gap-4 items-center px-4 pb-4 border-b border-border mb-2">
            <span className="text-sm font-semibold text-muted-foreground">Funcionalidade</span>
            <span className="text-sm font-semibold text-muted-foreground text-center">Grátis</span>
            <span className="text-sm font-semibold text-primary text-center">Completo</span>
          </div>

          <div className="space-y-8 md:space-y-0">
            {featureCategories.map((cat, catIdx) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.05 }}
              >
                {/* Category header */}
                <div className="px-4 py-3 mt-6 first:mt-0">
                  <h3 className="font-display text-sm font-bold text-primary tracking-wide uppercase">
                    {cat.category}
                  </h3>
                </div>

                {/* Features */}
                {cat.features.map((feature) => (
                  <div
                    key={feature.name}
                    className="grid grid-cols-1 md:grid-cols-[1fr_100px_100px] gap-2 md:gap-4 items-center px-4 py-3 border-b border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{feature.name}</p>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>

                    {/* Mobile: inline badges */}
                    <div className="flex md:hidden gap-4 mt-1">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <FeatureIcon included={feature.free} />
                        Grátis
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <FeatureIcon included={feature.complete} />
                        Completo
                      </span>
                    </div>

                    {/* Desktop: centered icons */}
                    <div className="hidden md:flex justify-center">
                      <FeatureIcon included={feature.free} />
                    </div>
                    <div className="hidden md:flex justify-center">
                      <FeatureIcon included={feature.complete} />
                    </div>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
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
    </>
  );
};

export default Planos;
