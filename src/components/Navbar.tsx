import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import bartyLogo from "@/assets/barty-logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const solutionLinks = [
    { label: "Fichas", href: "/fichas" },
    { label: "Eventos", href: "/eventos" },
    { label: "Food", href: "/food" },
  ];

  const homeLinks = [
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Vantagens", href: "#vantagens" },
    { label: "Planos", href: "#planos" },
    { label: "FAQ", href: "#perguntas-frequentes" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav" aria-label="Navegação principal">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2" aria-label="Barty — Página inicial">
          <img src={bartyLogo} alt="Barty" className="h-[4.5rem] w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {/* Solution pages */}
          {solutionLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Home anchor links (only on home) */}
          {isHome &&
            homeLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
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
              {solutionLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-medium ${
                    location.pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isHome &&
                homeLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
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
