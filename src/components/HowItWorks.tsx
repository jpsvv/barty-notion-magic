import { motion } from "framer-motion";
import { QrCode, ShoppingBag, CreditCard, Clock, CheckCircle2, Sparkles } from "lucide-react";

const steps = [
  {
    icon: QrCode,
    title: "Escaneia o QR Code",
    description: "Sem download de app, sem cadastro. O cliente aponta a câmera do celular e acessa o cardápio digital instantaneamente.",
    accent: "from-primary/20 to-primary/5",
  },
  {
    icon: ShoppingBag,
    title: "Monta o pedido online",
    description: "Interface intuitiva e responsiva. Seu cardápio fica irresistível no celular, com fotos e descrições.",
    accent: "from-primary/15 to-accent/10",
  },
  {
    icon: CreditCard,
    title: "Paga com Pix ou cartão",
    description: "Pagamento integrado via Pix, crédito ou débito — instantâneo, sem precisar chamar atendente.",
    accent: "from-accent/20 to-primary/5",
  },
  {
    icon: Clock,
    title: "Acompanha em tempo real",
    description: "O cliente vê cada etapa do preparo do pedido. Zero ansiedade, zero reclamação no atendimento.",
    accent: "from-primary/10 to-accent/15",
  },
  {
    icon: CheckCircle2,
    title: "Retira no balcão",
    description: "Notificação automática quando o pedido ficar pronto. Sem senha, sem confusão.",
    accent: "from-accent/15 to-primary/10",
  },
  {
    icon: Sparkles,
    title: "Cliente satisfeito volta sempre",
    description: "Experiência premium que fideliza. Seu restaurante ou bar nunca mais será o mesmo.",
    accent: "from-primary/20 to-primary/10",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="como-funciona"
      className="py-24 md:py-32 relative overflow-hidden"
      aria-label="Como funciona o cardápio digital Barty"
    >
      <div className="absolute inset-0 mesh-gradient-bg opacity-50" aria-hidden="true" />

      <div className="container relative z-10">
        <header className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary tracking-widest uppercase mb-4"
          >
            Como funciona o cardápio digital
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl font-bold text-foreground"
          >
            Do QR Code ao pedido pronto em 6 passos
          </motion.h2>
        </header>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto list-none p-0">
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group glass-card rounded-2xl p-7 hover:scale-[1.02] transition-all duration-300 cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.accent} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`} aria-hidden="true">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                <span className="text-primary mr-1">{i + 1}.</span> {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;
