import { motion } from "framer-motion";
import { TrendingUp, Zap, Globe, LayoutDashboard, Palette, Smartphone } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Aumente o faturamento sem contratar",
    description: "Upsells inteligentes e atendimento automatizado elevam o ticket médio do seu restaurante ou bar.",
  },
  {
    icon: Zap,
    title: "Operação no piloto automático",
    description: "Pedidos caem direto na cozinha. Menos erro humano, mais velocidade, mais lucro no fim do mês.",
  },
  {
    icon: Globe,
    title: "Funciona no navegador, sem app",
    description: "Seu cliente não baixa nada. Acessa o cardápio digital pelo QR Code no navegador. Plug and play.",
  },
  {
    icon: LayoutDashboard,
    title: "Painel de gestão intuitivo",
    description: "Dashboard limpo para acompanhar pedidos, vendas e métricas do seu negócio em tempo real.",
  },
  {
    icon: Palette,
    title: "Cardápio personalizado com a sua marca",
    description: "Customize cores, fotos, categorias e descrições. Seu cardápio digital, sua identidade visual.",
  },
  {
    icon: Smartphone,
    title: "Compatível com qualquer celular",
    description: "Android, iPhone, tablet — se tem navegador, o Barty funciona perfeitamente.",
  },
];

const WhyBarty = () => {
  return (
    <section
      id="vantagens"
      className="py-24 md:py-32 relative overflow-hidden"
      aria-label="Vantagens do cardápio digital Barty para restaurantes e bares"
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
            Vantagens do cardápio digital Barty
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4"
          >
            Resultados que você{" "}
            <span className="text-gradient">sente no caixa</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground font-light"
          >
            Tecnologia invisível para o cliente, transformadora para o faturamento do seu negócio.
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
              className="glass-card rounded-2xl p-7 hover:scale-[1.02] transition-all duration-300 group"
            >
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
