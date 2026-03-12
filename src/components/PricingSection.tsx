import { motion } from "framer-motion";
import { Calendar, Store, ArrowRight, Check } from "lucide-react";

const PricingSection = () => {
  return (
    <section
      id="planos"
      className="py-24 md:py-32 relative overflow-hidden"
      aria-label="Planos e preços do Barty"
    >
      <div className="absolute inset-0 mesh-gradient-bg opacity-40" aria-hidden="true" />
      <div className="absolute bottom-0 left-[20%] w-72 h-72 rounded-full bg-primary/5 blur-3xl bubble-float-slow" aria-hidden="true" />

      <div className="container relative z-10">
        <header className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary tracking-widest uppercase mb-4"
          >
            Planos e preços — cardápio digital
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
            Sem surpresas. Sem letras miúdas. Comece grátis e escale conforme cresce.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Events */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-3xl p-8 md:p-10 hover:scale-[1.01] transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-accent/20 flex items-center justify-center mb-6" aria-hidden="true">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-3">Cardápio Digital para Eventos</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Pague só quando vender. Taxa mínima por transação — sem mensalidade, sem risco. Ideal para festas, feiras e festivais.
            </p>
            <ul className="space-y-3 mb-8" aria-label="Benefícios do plano para eventos">
              {["Sem custo fixo — pague por uso", "Setup em minutos com QR Code", "Suporte dedicado no evento"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/553484428888"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 rounded-xl text-foreground text-sm font-semibold hover:bg-card/80 transition-colors"
              aria-label="Contratar plano para eventos via WhatsApp"
            >
              Quero pra meu evento
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </motion.article>

          {/* Establishments */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card-strong rounded-3xl p-8 md:p-10 relative border-2 border-primary/20 hover:scale-[1.01] transition-all duration-300"
          >
            <div className="absolute -top-3 right-6 btn-glow text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full">
              Mais popular
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6" aria-hidden="true">
              <Store className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-3">Cardápio Digital para Restaurantes</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Mensalidade fixa, pedidos ilimitados. Feito para restaurantes, bares e cafeterias que querem escalar.
            </p>
            <ul className="space-y-3 mb-8" aria-label="Benefícios do plano para estabelecimentos">
              {["Pedidos ilimitados por mês", "Painel de gestão completo", "Cardápio 100% customizável", "Suporte prioritário"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/553484428888"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 rounded-xl text-primary-foreground text-sm font-semibold"
              aria-label="Começar agora com o plano para restaurantes"
            >
              Começar agora
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
