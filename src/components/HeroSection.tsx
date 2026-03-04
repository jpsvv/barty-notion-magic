import { motion } from "framer-motion";
import heroImage from "@/assets/hero-barty.jpg";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium text-primary tracking-widest uppercase mb-6"
          >
            Cardápio digital inteligente
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-6"
          >
            Dê adeus às filas.{" "}
            <span className="text-primary">Deixe seus clientes pedirem direto do celular.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Ideal para eventos, casas noturnas, foodtrucks, lanchonetes e praças de alimentação. 
            Tudo direto pelo celular, sem atendente, ficha ou fila.
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
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground text-base font-medium hover:opacity-90 transition-opacity"
            >
              Solicite uma demonstração
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-border text-foreground text-base font-medium hover:bg-secondary transition-colors"
            >
              Saiba mais
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-border shadow-2xl shadow-primary/5"
        >
          <img
            src={heroImage}
            alt="Cliente usando o Barty para fazer pedido pelo celular"
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
