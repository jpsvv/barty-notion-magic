import { motion } from "framer-motion";
import { Calendar, Store, ArrowRight, Check } from "lucide-react";

const PricingSection = () => {
  return (
    <section id="planos" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient-bg opacity-40" />
      <div className="absolute bottom-0 left-[20%] w-72 h-72 rounded-full bg-primary/5 blur-3xl bubble-float-slow" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary tracking-widest uppercase mb-4"
          >
            Planos feitos pra você lucrar
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4"
          >
            Escolha. Conecte. <span className="text-gradient">Venda.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground font-light max-w-xl mx-auto"
          >
            Sem surpresas. Sem letras miúdas. Só o que funciona.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Events */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-3xl p-8 md:p-10 hover:scale-[1.01] transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-accent/20 flex items-center justify-center mb-6">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-3">Para Eventos</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Pague só quando vender. Taxa mínima por transação — sem mensalidade, sem risco.
            </p>
            <ul className="space-y-3 mb-8">
              {["Sem custo fixo", "Setup em minutos", "Suporte dedicado no evento"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/553484428888"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 rounded-xl text-foreground text-sm font-semibold hover:bg-card/80 transition-colors"
            >
              Quero pra meu evento
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Establishments */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card-strong rounded-3xl p-8 md:p-10 relative border-2 border-primary/20 hover:scale-[1.01] transition-all duration-300"
          >
            <div className="absolute -top-3 right-6 btn-glow text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full">
              Mais popular
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6">
              <Store className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-3">Para Estabelecimentos</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Mensalidade fixa, uso ilimitado. Feito para quem quer escalar sem limite.
            </p>
            <ul className="space-y-3 mb-8">
              {["Pedidos ilimitados", "Painel completo", "Customização total", "Suporte prioritário"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/553484428888"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 rounded-xl text-primary-foreground text-sm font-semibold"
            >
              Começar agora
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
