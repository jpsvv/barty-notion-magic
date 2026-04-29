import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import bartyLogo from "@/assets/barty-logo.png";

const solutionLinks = [
  { label: "Fichas", href: "/fichas" },
  { label: "Eventos", href: "/eventos" },
  { label: "Food", href: "/food" },
  { label: "Ingressos", href: "/ingressos" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
    setMobileSolutionsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav" aria-label="Navegação principal">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2" aria-label="Barty — Página inicial">
          <img src={bartyLogo} alt="Barty" className="h-[4.5rem] w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          {/* Soluções dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setSolutionsOpen(!solutionsOpen)}
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Soluções
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${solutionsOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {solutionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-44 glass-card rounded-xl border border-border/50 py-2 shadow-xl"
                >
                  {solutionLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setSolutionsOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        location.pathname === link.href
                          ? "text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="/#como-funciona" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Como Funciona
          </a>
          <a href="/#vantagens" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Vantagens
          </a>
          <Link
            to="/blog"
            className={`text-sm font-medium transition-colors ${
              location.pathname === "/blog" ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Conteúdo
          </Link>
          <Link
            to="/planos"
            className={`text-sm font-medium transition-colors ${
              location.pathname === "/planos" ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Planos
          </Link>
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/auth"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogIn className="w-4 h-4" />
            Login
          </Link>
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

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass-card border-t-0 rounded-none"
          >
            <div className="container py-4 flex flex-col gap-3">
              {/* Soluções accordion */}
              <button
                onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                className="flex items-center justify-between text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Soluções
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileSolutionsOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {mobileSolutionsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="pl-4 flex flex-col gap-2 overflow-hidden"
                  >
                    {solutionLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={() => setOpen(false)}
                        className={`text-sm ${
                          location.pathname === link.href ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <a href="/#como-funciona" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">
                Como Funciona
              </a>
              <a href="/#vantagens" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">
                Vantagens
              </a>
              <Link to="/blog" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">
                Conteúdo
              </Link>
              <Link to="/planos" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">
                Planos
              </Link>
              <Link to="/auth" onClick={() => setOpen(false)} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                <LogIn className="w-4 h-4" />
                Login
              </Link>
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
