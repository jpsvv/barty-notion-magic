import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "O Barty deu um upgrade absurdo na nossa operação. Cozinha mais organizada, clientes acompanham o pedido em tempo real. Voltaram a elogiar o atendimento.",
    name: "Paula Aguiar",
    role: "Chefe Kantine",
  },
  {
    quote:
      "Nossos clientes amaram a autonomia. Pedem, pagam e acompanham tudo pelo celular. Acabou a fila no caixa e a espera pra ser atendido.",
    name: "Marcos",
    role: "Proprietário Alpendre Bar",
  },
  {
    quote:
      "Desde que colocamos o Barty, a operação ficou outro nível. O cliente faz tudo sozinho e recebe notificação quando o pedido fica pronto. Genial.",
    name: "Betão",
    role: "Proprietário Bar do Betão",
  },
];

const Testimonials = () => {
  return (
    <section id="depoimentos" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-10 right-[10%] w-64 h-64 rounded-full bg-primary/5 blur-3xl bubble-float" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary tracking-widest uppercase mb-4"
          >
            Prova social
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl font-bold text-foreground"
          >
            Quem usa, <span className="text-gradient">não volta atrás</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{t.name[0]}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
