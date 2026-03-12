import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav" aria-label="Navegação principal">
      <div className="container flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-2.5" aria-label="Barty — Página inicial">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20" aria-hidden="true">
            <span className="text-primary-foreground font-bold text-sm">B</span>
          </div>
          <span className="font-display text-xl font-bold text-foreground">Barty</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#como-funciona" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Como funciona</a>
          <a href="#vantagens" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Vantagens</a>
          <a href="#planos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Planos</a>
          <a href="#depoimentos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Depoimentos</a>
          <a href="#perguntas-frequentes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
        </div>

        <div className="hidden md:block">
          <a
            href="https://wa.me/553484428888"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow inline-flex items-center px-5 py-2.5 rounded-xl text-primary-foreground text-sm font-semibold"
            aria-label="Testar o Barty gratuitamente"
          >
            Teste Grátis
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass-card border-t-0 rounded-none"
          >
            <div className="container py-4 flex flex-col gap-4">
              <a href="#como-funciona" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">Como funciona</a>
              <a href="#vantagens" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">Vantagens</a>
              <a href="#planos" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">Planos</a>
              <a href="#depoimentos" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">Depoimentos</a>
              <a href="#perguntas-frequentes" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">FAQ</a>
              <a
                href="https://wa.me/553484428888"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-primary-foreground text-sm font-semibold"
              >
                Teste Grátis
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
