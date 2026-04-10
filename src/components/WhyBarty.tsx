import { motion } from "framer-motion";
import { Target, Timer, DollarSign, Scaling, TrendingUp, ShieldCheck } from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Previsibilidade máxima",
    badge: "Diferencial chave",
    description: "Ao contrário de carteiras digitais genéricas, Barty permite vendas antecipadas por item e estabelecimento específico. Saiba exatamente o que produzir, reduza custos em 20-40% e evite sobras.",
  },
  {
    icon: Timer,
    title: "Redução de filas em 80%+",
    description: "Clientes retiram pronto via QR, liberando sua equipe para focar em upsell e atendimento premium. Eventos grandes usam cashless básico; Barty eleva para 'zero espera'.",
  },
  {
    icon: DollarSign,
    title: "Somos seu parceiro nos eventos",
    description: "Planos com as melhores taxas do mercado brasileiro. Migração gratuita de dados da sua solução atual. Comece a lucrar imediatamente.",
  },
  {
    icon: Scaling,
    title: "Escalável para qualquer tamanho",
    description: "De blocos de rua a festivais gigantes. O Barty proporciona previsibilidade de receita, estima produção e o staff já está preparado para a demanda.",
  },
  {
    icon: TrendingUp,
    title: "Aumento de receita comprovado",
    description: "Clientes compram mais antecipado (impulso de 15-25%). Relatórios mostram ROI em semanas, não meses. Upsell automático integrado.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança e conformidade LGPD",
    description: "Pagamentos criptografados, compliance com LGPD e integração Pix instantânea. Melhor que soluções antigas que dependem de pulseiras caras, cartões físicos e hardware dedicado.",
  },
];

const WhyBarty = () => {
  return (
    <section
      id="vantagens"
      className="py-24 md:py-32 relative overflow-hidden"
      aria-label="Vantagens do Barty sobre soluções cashless tradicionais"
    >
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl bubble-float-delayed" aria-hidden="true" />

      <div className="container relative z-10">
        <header className="max-w-3xl mx-auto text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary tracking-widest uppercase mb-4"
          >
            Por que trocar sua solução atual
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4"
          >
            Por Que Trocar Pelo Barty{" "}
            <span className="text-gradient">Hoje?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground font-light"
          >
            Resultados que você sente no caixa. Tecnologia invisível para o cliente, transformadora para o faturamento do seu evento.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-7 hover:scale-[1.02] transition-all duration-300 group relative"
            >
              {item.badge && (
                <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBarty;