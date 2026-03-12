import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CtaFooter = () => {
  return (
    <>
      {/* CTA Section */}
      <section
        className="py-24 md:py-32 relative overflow-hidden"
        aria-label="Comece a usar o Barty gratuitamente"
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
              Pronto pra transformar{" "}
              <span className="text-primary">cada celular</span> num ponto de venda?
            </h2>
            <p className="text-background/60 text-lg mb-10 font-light">
              Comece grátis. Sem cartão. Sem contrato. Cancela quando quiser.
            </p>
            <a
              href="https://wa.me/553484428888"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl text-primary-foreground text-lg font-semibold"
              aria-label="Testar o Barty gratuitamente via WhatsApp"
            >
              Quero testar o Barty agora
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-foreground border-t border-background/10" role="contentinfo">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20" aria-hidden="true">
              <span className="text-primary-foreground font-bold text-xs">B</span>
            </div>
            <span className="text-background/80 text-sm font-medium">Barty — Cardápio Digital com QR Code</span>
          </div>
          <nav aria-label="Links do rodapé">
            <a href="#como-funciona" className="text-background/50 text-xs hover:text-background/80 transition-colors mr-4">Como funciona</a>
            <a href="#vantagens" className="text-background/50 text-xs hover:text-background/80 transition-colors mr-4">Vantagens</a>
            <a href="#planos" className="text-background/50 text-xs hover:text-background/80 transition-colors mr-4">Planos</a>
            <a href="#perguntas-frequentes" className="text-background/50 text-xs hover:text-background/80 transition-colors">FAQ</a>
          </nav>
          <p className="text-background/40 text-xs">
            © {new Date().getFullYear()} Barty. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </>
  );
};

export default CtaFooter;
