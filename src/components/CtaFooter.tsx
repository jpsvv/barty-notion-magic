import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";

const CtaFooter = () => {
  return (
    <>
      <section
        className="py-24 md:py-32 relative overflow-hidden"
        aria-label="Migre para o Barty e transforme seus eventos em máquinas de lucro"
      >
        <div className="absolute inset-0 bg-foreground" aria-hidden="true" />
        <div className="absolute top-10 left-[20%] w-72 h-72 rounded-full bg-primary/10 blur-3xl bubble-float" aria-hidden="true" />
        <div className="absolute bottom-10 right-[15%] w-56 h-56 rounded-full bg-primary/8 blur-3xl bubble-float-delayed" aria-hidden="true" />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight">
              Pronto pra trocar filas por{" "}
              <span className="text-primary">lucro previsível?</span>
            </h2>
            <p className="text-background/60 text-lg mb-10 font-light">
              Migre em 24h. Sem contrato. Sem custos fixos. Setup grátis para seu próximo evento.
            </p>
            <a
              href="https://wa.me/553484428888"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl text-primary-foreground text-lg font-semibold"
              aria-label="Solicitar demo grátis do Barty via WhatsApp"
            >
              Solicitar demo grátis agora
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CtaFooter;
