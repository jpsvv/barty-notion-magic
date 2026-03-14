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
    <section
      id="depoimentos"
      className="py-24 md:py-32 relative overflow-hidden"
      aria-label="Depoimentos de organizadores e donos de estabelecimentos que usam o Barty"
    >
      <div className="absolute top-10 right-[10%] w-64 h-64 rounded-full bg-primary/5 blur-3xl bubble-float" aria-hidden="true" />

      <div className="container relative z-10">
        <header className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary tracking-widest uppercase mb-4"
          >
            Resultados reais de quem migrou
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl font-bold text-foreground"
          >
            Quem usa o Barty <span className="text-gradient">não volta atrás</span>
          </motion.h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex gap-1 mb-5" aria-label="Avaliação 5 de 5 estrelas">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" aria-hidden="true" />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-6">"{t.quote}"</p>
              <footer className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center" aria-hidden="true">
                  <span className="text-sm font-bold text-primary">{t.name[0]}</span>
                </div>
                <div>
                  <cite className="font-semibold text-foreground text-sm not-italic">{t.name}</cite>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;