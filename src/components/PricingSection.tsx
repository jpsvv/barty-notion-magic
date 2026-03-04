import { motion } from "framer-motion";
import { Calendar, Store } from "lucide-react";

const PricingSection = () => {
  return (
    <section id="planos" className="py-24 md:py-32 bg-secondary">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary tracking-widest uppercase mb-4">
            Planos adequados ao seu negócio
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            O Barty se adapta a você
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Eventos, estabelecimentos fixos ou operações móveis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl p-8 md:p-10 border border-border"
          >
            <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-6">
              <Calendar className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-3">Solução para Eventos</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Pague só quando usar. Ideal para eventos pontuais e operações sazonais. 
              Você só paga uma pequena taxa sobre as vendas realizadas — sem custos fixos e sem mensalidade.
            </p>
            <p className="text-xs text-muted-foreground mb-6">
              Perfeito para: food trucks, festivais, feiras, eventos corporativos e bares temporários.
            </p>
            <a
              href="https://wa.me/553484428888"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-6 py-3.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary transition-colors"
            >
              Fale com a equipe
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-2xl p-8 md:p-10 border-2 border-primary relative"
          >
            <div className="absolute -top-3 right-6 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
              Popular
            </div>
            <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-6">
              <Store className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-3">Solução para Estabelecimentos</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Mensalidade fixa e uso ilimitado. Pensado para negócios com fluxo constante de clientes. 
              Acesso completo à plataforma, sem limites de uso.
            </p>
            <p className="text-xs text-muted-foreground mb-6">
              Perfeito para: lanchonetes, restaurantes, casas noturnas, praças de alimentação.
            </p>
            <a
              href="https://wa.me/553484428888"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-6 py-3.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Fale com a equipe
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
