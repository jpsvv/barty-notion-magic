import { motion } from "framer-motion";
import { QrCode, ShoppingBag, CreditCard, Clock, CheckCircle2, Sparkles } from "lucide-react";

const steps = [
  {
    icon: QrCode,
    title: "QR Code",
    description: "Cliente acessa o cardápio pelo QR Code do local.",
  },
  {
    icon: ShoppingBag,
    title: "Pedido",
    description: "Faz o pedido direto no web app, sem baixar nada.",
  },
  {
    icon: CreditCard,
    title: "Pagamento",
    description: "Pix, cartão de crédito ou dinheiro — o cliente escolhe.",
  },
  {
    icon: Clock,
    title: "Status do Pedido",
    description: "Acompanha pelo web app o tempo de preparo.",
  },
  {
    icon: CheckCircle2,
    title: "Tudo Pronto",
    description: "Retira no balcão quando estiver pronto.",
  },
  {
    icon: Sparkles,
    title: "Experiência",
    description: "Simplicidade e organização para seu cliente.",
  },
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-24 md:py-32 bg-secondary">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary tracking-widest uppercase mb-4">
            Como o Barty funciona
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Mais facilidade para todos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card rounded-xl p-8 border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-5">
                <step.icon className="w-6 h-6 text-accent-foreground" />
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
