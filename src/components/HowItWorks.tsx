import { motion } from "framer-motion";
import { QrCode, ShoppingBag, CreditCard, Clock, CheckCircle2, Sparkles } from "lucide-react";

const steps = [
  {
    icon: QrCode,
    title: "Escaneia o QR",
    description: "Sem download, sem cadastro. O cliente aponta a câmera e já está dentro.",
    accent: "from-primary/20 to-primary/5",
  },
  {
    icon: ShoppingBag,
    title: "Monta o pedido",
    description: "Interface fluida e intuitiva. Seu cardápio fica irresistível no celular.",
    accent: "from-primary/15 to-accent/10",
  },
  {
    icon: CreditCard,
    title: "Paga na hora",
    description: "Pix, crédito ou débito — pagamento instantâneo sem precisar de atendente.",
    accent: "from-accent/20 to-primary/5",
  },
  {
    icon: Clock,
    title: "Acompanha em tempo real",
    description: "O cliente vê cada etapa do preparo. Zero ansiedade, zero reclamação.",
    accent: "from-primary/10 to-accent/15",
  },
  {
    icon: CheckCircle2,
    title: "Retira no balcão",
    description: "Notificação automática quando ficar pronto. Simples assim.",
    accent: "from-accent/15 to-primary/10",
  },
  {
    icon: Sparkles,
    title: "Cliente feliz, volta sempre",
    description: "Experiência premium que fideliza. Seu estabelecimento nunca mais será o mesmo.",
    accent: "from-primary/20 to-primary/10",
  },
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-24 md:py-32 relative overflow-hidden">
      {/* Subtle mesh */}
      <div className="absolute inset-0 mesh-gradient-bg opacity-50" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary tracking-widest uppercase mb-4"
          >
            Simples como tem que ser
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl font-bold text-foreground"
          >
            6 passos. Zero complicação.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group glass-card rounded-2xl p-7 hover:scale-[1.02] transition-all duration-300 cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.accent} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
