import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-barty.jpg";

const HeroSection = () => {
  return (
    <section
      className="relative pt-28 pb-20 md:pt-36 md:pb-32 overflow-hidden"
      aria-label="Apresentação do Barty — cardápio digital com QR Code"
    >
      {/* Mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient-bg" aria-hidden="true" />

      {/* Floating glass bubbles */}
      <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-primary/5 blur-3xl bubble-float" aria-hidden="true" />
      <div className="absolute top-40 right-[15%] w-80 h-80 rounded-full bg-primary/8 blur-3xl bubble-float-delayed" aria-hidden="true" />
      <div className="absolute bottom-20 left-[30%] w-48 h-48 rounded-full bg-accent/30 blur-3xl bubble-float-slow" aria-hidden="true" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-foreground">Novo: Pedidos + Pagamento integrado</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.05] mb-6 tracking-tight"
          >
            Cardápio digital com QR Code.{" "}
            <span className="text-gradient">Seu cliente pede, você vende mais.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            O Barty transforma qualquer celular em ponto de venda para restaurantes, bares e eventos. 
            Pedidos online, pagamento Pix e cartão, acompanhamento em tempo real — sem app, sem fila, sem fricção.
          </motion.p>

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
              aria-label="Começar agora gratuitamente via WhatsApp"
            >
              Começar agora — é grátis
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href="#como-funciona"
              className="glass-card inline-flex items-center justify-center px-8 py-4 rounded-2xl text-foreground text-base font-medium hover:bg-card/80 transition-colors"
            >
              Ver como funciona
            </a>
          </motion.div>

          {/* Social proof micro */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 text-sm text-muted-foreground"
          >
            Já usado por <strong className="font-semibold text-foreground">+200 estabelecimentos</strong> em todo o Brasil
          </motion.p>
        </div>

        {/* Hero image with glass frame */}
        <motion.figure
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-card-strong rounded-3xl p-2 md:p-3">
            <img
              src={heroImage}
              alt="Cliente escaneando QR Code do Barty com o celular para fazer pedido em restaurante"
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
