import { motion } from "framer-motion";

const CtaFooter = () => {
  return (
    <>
      <section className="py-24 md:py-32 bg-foreground">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-background mb-6">
              Facilite sua operação e tire seu cliente da fila
            </h2>
            <p className="text-background/70 text-lg mb-10">
              Fale com a gente! 😊 Estamos sempre por aqui para tirar suas dúvidas, sem enrolação e sem compromisso.
            </p>
            <a
              href="https://wa.me/553484428888"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground text-base font-medium hover:opacity-90 transition-opacity"
            >
              Fale com a nossa equipe
            </a>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 bg-foreground border-t border-background/10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">B</span>
            </div>
            <span className="text-background/80 text-sm font-medium">Barty</span>
          </div>
          <p className="text-background/50 text-xs">
            © {new Date().getFullYear()} Barty. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </>
  );
};

export default CtaFooter;
