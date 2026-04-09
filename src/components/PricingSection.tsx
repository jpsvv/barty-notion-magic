import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

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
      { label: "Taxa de pagamento repasse via Barty", value: "3,2%" },
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
      { label: "Taxa de pagamento repasse via Barty", value: "3,2%" },
      { label: "Fidelidade", value: "1 ano" },
    ],
  },
];

const PricingSection = () => {
  return (
    <section
      id="planos"
      className="py-24 md:py-32 relative overflow-hidden"
      aria-label="Planos e preços do sistema cashless Barty"
    >
      <div className="absolute inset-0 mesh-gradient-bg opacity-40" aria-hidden="true" />
      <div className="absolute bottom-0 left-[20%] w-72 h-72 rounded-full bg-primary/5 blur-3xl bubble-float-slow" aria-hidden="true" />

      <div className="container relative z-10">
        <header className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary tracking-widest uppercase mb-4"
          >
            Planos que facilitam a troca
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4"
          >
            Planos que Fazem Sentido para Seu Negócio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground font-light max-w-xl mx-auto"
          >
            Sem surpresas, sem letras miúdas. Escolha o plano ideal para o seu negócio.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-3xl p-8 md:p-10 relative transition-all duration-300 hover:scale-[1.01] ${
                plan.highlight
                  ? "glass-card-strong border-2 border-primary/20"
                  : "glass-card"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 right-6 btn-glow text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full">
                  Recomendado
                </div>
              )}

              <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                {plan.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-6">{plan.subtitle}</p>

              <div className="mb-6">
                <span className="font-display text-4xl font-bold text-foreground">
                  {plan.price}
                </span>
                <span className="text-muted-foreground text-sm ml-1">{plan.period}</span>
              </div>

              <div className="space-y-3 mb-8">
                {plan.details.map((d) => (
                  <div key={d.label} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                    <span className="text-foreground">
                      {d.label}: <span className="font-semibold">{d.value}</span>
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/553484428888"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-colors ${
                  plan.highlight
                    ? "btn-glow text-primary-foreground"
                    : "glass-card text-foreground hover:bg-card/80"
                }`}
                aria-label={plan.cta}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
