import { motion } from "framer-motion";
import { TrendingUp, Zap, Globe, LayoutDashboard, Palette, Smartphone } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Venda mais sem contratar ninguém",
    description: "Aumente o ticket médio com upsells inteligentes e atendimento automatizado.",
  },
  {
    icon: Zap,
    title: "Operação no piloto automático",
    description: "Pedidos caem direto na cozinha. Menos erro, mais velocidade, mais lucro.",
  },
  {
    icon: Globe,
    title: "Zero instalação, zero dor de cabeça",
    description: "Funciona no navegador. Seu cliente não baixa nada. Plug and play.",
  },
  {
    icon: LayoutDashboard,
    title: "Painel que você realmente entende",
    description: "Dashboard limpo e objetivo. Veja o que importa em tempo real.",
  },
  {
    icon: Palette,
    title: "A cara do seu negócio",
    description: "Personalize tudo: cores, fotos, categorias. Seu cardápio, sua identidade.",
  },
  {
    icon: Smartphone,
    title: "Funciona em qualquer celular",
    description: "Android, iPhone, tablet — se tem navegador, funciona.",
  },
];

const WhyBarty = () => {
  return (
    <section id="vantagens" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl bubble-float-delayed" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary tracking-widest uppercase mb-4"
          >
            Por que escolher o Barty
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
            Tecnologia invisível para o cliente, transformadora para o seu negócio.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-7 hover:scale-[1.02] transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBarty;
