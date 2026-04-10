import { motion } from "framer-motion";
import { Users, QrCode, CreditCard, Bell, BarChart3, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Users,
    title: "Crie seu evento e vincule parceiros",
    description: "Integre food trucks, bares e cozinhas em minutos. Defina cardápios personalizados e venda fichas pré-pagas por item (ex: '2 cervejas do Bar X + 1 lanche do Truck Y').",
    accent: "from-primary/20 to-primary/5",
  },
  {
    icon: QrCode,
    title: "Gere QR Code e divulgue",
    description: "Compartilhe via redes ou ingressos. Clientes compram antecipado, garantindo estoque exato e previsibilidade de produção. Evite desperdícios e subprodução.",
    accent: "from-primary/15 to-accent/10",
  },
  {
    icon: CreditCard,
    title: "Cliente pede e paga no celular",
    description: "Sem app, via web. Pagamento via Pix cartão ou carteira Barty, com taxa mínima só sobre vendas reais. Sem pulseiras caras, cartões físicos, promotores e sem hardware extra.",
    accent: "from-accent/20 to-primary/5",
  },
  {
    icon: Bell,
    title: "Acompanhe e produza na hora",
    description: "Notificações em tempo real para sua equipe. Retirada sem fila: cliente mostra QR e pega pronto. Zero espera, zero confusão.",
    accent: "from-primary/10 to-accent/15",
  },
  {
    icon: BarChart3,
    title: "Analise e lucre mais",
    description: "Relatórios de vendas por parceiro e item. Aumente receita em até 30% com upsell automático e zero estresse operacional.",
    accent: "from-accent/15 to-primary/10",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="como-funciona"
      className="py-24 md:py-32 relative overflow-hidden"
      aria-label="Como funciona o sistema cashless Barty para eventos"
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
            Como funciona o Barty
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl font-bold text-foreground"
          >
            Do setup à venda em <span className="text-gradient">5 passos simples</span>
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

        {/* CTA inline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">Migre de soluções genéricas para Barty em 24h.</p>
          <a
            href="https://wa.me/553484428888"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-primary-foreground text-base font-semibold"
            aria-label="Solicitar demo grátis do Barty via WhatsApp"
          >
            Solicitar demo grátis e ver o impacto
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;