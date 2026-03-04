import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "O Barty deu um upgrade em como gerir nossa cozinha, ficou muito mais organizado e os clientes satisfeitos em acompanhar o tempo de produção e retirada no balcão.",
    name: "Paula Aguiar",
    role: "Chefe Kantine",
  },
  {
    quote:
      "Nossos clientes amaram a autonomia de pedir, pagar e acompanhar o pedido, evitando fila pra pagamento e demora em ser atendido na mesa.",
    name: "Marcos",
    role: "Proprietário Alpendre Bar",
  },
  {
    quote:
      "Depois que começamos a usar o Barty, nossa operação ficou muito mais ágil. Os clientes fazem o pedido direto pelo celular, pagam ali mesmo e recebem a notificação pra retirar.",
    name: "Betão",
    role: "Proprietário Bar do Betão",
  },
];

const Testimonials = () => {
  return (
    <section id="depoimentos" className="py-24 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary tracking-widest uppercase mb-4">
            O que as pessoas falam
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Quem usa, recomenda
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-secondary rounded-2xl p-8 relative"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <p className="text-sm text-foreground leading-relaxed mb-6">"{t.quote}"</p>
              <div>
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
