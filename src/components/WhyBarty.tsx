import { motion } from "framer-motion";
import { TrendingUp, Zap, Globe, LayoutDashboard, Palette, Smartphone } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Reduza filas e aumente vendas",
    description: "Aumente o giro de mesas e impulsione as vendas sem precisar ampliar sua estrutura.",
  },
  {
    icon: Zap,
    title: "Mais agilidade para sua equipe",
    description: "Processos automatizados — a equipe trabalha com mais foco e eficiência.",
  },
  {
    icon: Globe,
    title: "Sem instalar software",
    description: "Integração direta pelo navegador elimina complicações técnicas e custos com instalação.",
  },
  {
    icon: LayoutDashboard,
    title: "Painel administrativo simples",
    description: "Gerencie pedidos, cardápio e operação de forma intuitiva e rápida.",
  },
  {
    icon: Palette,
    title: "Customização do cardápio",
    description: "Personalize cores, fotos e categorias para combinar com a identidade do seu negócio.",
  },
  {
    icon: Smartphone,
    title: "Acesso por qualquer celular",
    description: "Funciona em qualquer smartphone, sem necessidade de download.",
  },
];

const WhyBarty = () => {
  return (
    <section id="vantagens" className="py-24 md:py-32">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-medium text-primary tracking-widest uppercase mb-4">
            Vantagens pro seu negócio
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Por que o Barty?
          </h2>
          <p className="text-lg text-muted-foreground">
            Se é simples para o cliente, é genial para o negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {benefits.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0 mt-1">
                <item.icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBarty;
