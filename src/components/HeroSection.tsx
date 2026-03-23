import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Zap } from "lucide-react";
import heroImage from "@/assets/hero-barty.jpg";

const HeroSection = () => {
  return (
    <section
      className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden"
      aria-label="Barty — sistema cashless para eventos com venda antecipada e QR Code"
    >
      <div className="absolute inset-0 mesh-gradient-bg" aria-hidden="true" />
      <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-primary/5 blur-3xl bubble-float" aria-hidden="true" />
      <div className="absolute top-40 right-[15%] w-80 h-80 rounded-full bg-primary/8 blur-3xl bubble-float-delayed" aria-hidden="true" />
      <div className="absolute bottom-20 left-[30%] w-48 h-48 rounded-full bg-accent/30 blur-3xl bubble-float-slow" aria-hidden="true" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-foreground">Novo: Venda antecipada por item + Parceiros integrados</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-bold text-foreground leading-[1.05] mb-6 tracking-tight lg:text-6xl"
          >
            A Revolução Cashless que Transforma Eventos em{" "}
            <span className="text-gradient">Máquinas de Lucro Sem Filas.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed font-light"
          >
            Organizadores de festivais, feiras e eventos corporativos: ofereça menos fila, mais diversão e venda garantida. 
            Com o Barty, a venda é antecipada, integração com parceiros de comida e bebida 
            e retirada instantânea via QR Code.<br />
            <strong className="text-foreground font-medium">Clientes felizes, equipe focada e você com dados reais para escalar.</strong>
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-10"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>+30% receita média</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>80% menos filas</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>Sem custos fixos</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://wa.me/553484428888"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-primary-foreground text-base font-semibold"
              aria-label="Solicitar demo grátis do Barty via WhatsApp"
            >
              Solicitar demo grátis
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href="#como-funciona"
              className="glass-card inline-flex items-center justify-center px-8 py-4 rounded-2xl text-foreground text-base font-medium hover:bg-card/80 transition-colors"
            >
              Ver como funciona
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 text-sm text-muted-foreground"
          >
            Já usado por <strong className="font-semibold text-foreground">+200 eventos e estabelecimentos</strong> em todo o Brasil
          </motion.p>
        </div>

        <motion.figure
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-card-strong rounded-3xl p-2 md:p-3">
            <img
              src={heroImage}
              alt="Cliente escaneando QR Code do cardápio digital Barty em evento gastronômico"
              className="w-full h-auto rounded-2xl"
              loading="eager"
              width="1200"
              height="675"
            />
          </div>
        </motion.figure>
      </div>
    </section>
  );
};

export default HeroSection;