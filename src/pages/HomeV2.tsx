import { useEffect, useRef, useState, useCallback, Suspense, lazy } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Sparkles, TrendingUp, ShieldCheck, Zap, Star,
  ChevronDown, Check, Users, QrCode, CreditCard, Bell, BarChart3,
  Target, Timer, DollarSign, Scaling, Calendar, Store, Play
} from "lucide-react";
import Navbar from "@/components/Navbar";
import bartyLogo from "@/assets/barty-logo.png";
import heroImage from "@/assets/hero-barty.jpg";

const ParticleField = lazy(() => import("@/components/ParticleField"));

/* ─── SMOOTH SCROLL ENGINE ─── */
const useSmoothScroll = () => {
  useEffect(() => {
    let current = 0;
    let target = 0;
    let rafId: number;
    const ease = 0.08;
    const container = document.getElementById("v2-smooth-container");
    if (!container) return;

    const body = document.body;
    const setHeight = () => {
      body.style.height = `${container.scrollHeight}px`;
    };

    const tick = () => {
      target = window.scrollY;
      current += (target - current) * ease;
      container.style.transform = `matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,${-current},0,1)`;
      rafId = requestAnimationFrame(tick);
    };

    setHeight();
    window.addEventListener("resize", setHeight);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", setHeight);
      body.style.height = "";
    };
  }, []);
};

/* ─── CUSTOM CURSOR ─── */
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current)
        cursorRef.current.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
      if (glowRef.current)
        glowRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-[9998] opacity-15"
        style={{ background: "radial-gradient(circle, hsl(22 90% 52% / 0.35), transparent 70%)", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }}
      />
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-white hidden md:block"
        style={{ transition: "transform 0.15s ease-out" }}
      />
    </>
  );
};

/* ─── TYPEWRITER ─── */
const TypewriterText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, [text, started]);

  return (
    <span className={className}>
      {displayed}
      {started && <span className="inline-block w-[3px] h-[0.85em] bg-primary ml-1 align-middle animate-pulse" />}
    </span>
  );
};

/* ─── MAGNETIC BUTTON ─── */
const MagneticButton = ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left - r.width / 2) * 0.2, y: (e.clientY - r.top - r.height / 2) * 0.2 });
  }, []);

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    >
      {children}
    </motion.a>
  );
};

/* ─── REVEAL WRAPPER ─── */
const Reveal = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── HORIZONTAL LINE DIVIDER ─── */
const LineDivider = () => (
  <div className="container">
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="h-px bg-gradient-to-r from-transparent via-border to-transparent origin-left"
    />
  </div>
);

/* ─── FAQ ITEM ─── */
const FaqItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={index * 0.04}>
      <div className="border-b border-border/50 last:border-0">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-6 text-left group"
          aria-expanded={open}
        >
          <span className="font-display font-semibold text-foreground pr-4 text-base md:text-lg group-hover:text-primary transition-colors">{question}</span>
          <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}>
            <span className="text-2xl text-primary font-light">+</span>
          </motion.div>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="pb-6 text-muted-foreground leading-relaxed max-w-2xl">{answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
};

/* ═══════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════ */

const steps = [
  { icon: Users, num: "01", title: "Crie e vincule parceiros", description: "Integre food trucks, bares e cozinhas em minutos. Defina cardápios e venda fichas pré-pagas por item." },
  { icon: QrCode, num: "02", title: "Gere QR Code e divulgue", description: "Compartilhe via redes ou ingressos. Clientes compram antecipado, garantindo estoque exato." },
  { icon: CreditCard, num: "03", title: "Cliente pede no celular", description: "Sem app, via web. Pix ou cartão, com taxa mínima só sobre vendas reais." },
  { icon: Bell, num: "04", title: "Produza na hora certa", description: "Notificações em tempo real. Retirada via QR sem fila: cliente mostra e pega pronto." },
  { icon: BarChart3, num: "05", title: "Analise e escale", description: "Relatórios por parceiro e item. Aumente receita em até 30% com upsell automático." },
];

const benefits = [
  { icon: Target, title: "Previsibilidade", stat: "20-40%", statLabel: "redução de custos", description: "Vendas antecipadas por item e estabelecimento específico." },
  { icon: Timer, title: "Zero filas", stat: "80%+", statLabel: "menos espera", description: "Clientes retiram pronto via QR. Equipe foca em upsell." },
  { icon: DollarSign, title: "Sem custos fixos", stat: "3%", statLabel: "sobre vendas", description: "Sem mensalidade para eventos. Migração gratuita." },
  { icon: Scaling, title: "Escalável", stat: "∞", statLabel: "capacidade", description: "De blocos de rua a festivais gigantes. Suporte 24/7." },
  { icon: TrendingUp, title: "Mais receita", stat: "+25%", statLabel: "impulso médio", description: "Compra antecipada gera impulso. ROI em semanas." },
  { icon: ShieldCheck, title: "LGPD seguro", stat: "100%", statLabel: "compliance", description: "Criptografia ponta a ponta, Pix instantâneo." },
];

const testimonials = [
  { quote: "O Barty deu um upgrade absurdo na nossa operação. Cozinha mais organizada, clientes elogiam o atendimento.", name: "Paula Aguiar", role: "Chefe Kantine" },
  { quote: "Nossos clientes amaram a autonomia. Pedem, pagam e acompanham tudo pelo celular. Acabou a fila no caixa.", name: "Marcos", role: "Proprietário Alpendre Bar" },
  { quote: "Desde que colocamos o Barty, a operação ficou outro nível. O cliente faz tudo sozinho.", name: "Betão", role: "Proprietário Bar do Betão" },
];

const faqs = [
  { question: "O cliente precisa baixar algum aplicativo?", answer: "Não. Funciona 100% pelo navegador do celular. Sem cadastro, sem download, sem atrito." },
  { question: "Como o pedido chega para a cozinha?", answer: "Após a compra da ficha, o usuário faz a liberação da produção do pedido, sendo direcionado para a cozinha (funciona em qualquer tablet, computador ou celular). Você pode imprimir o pedido ou exibir na tela como preferir." },
  { question: "O Barty funciona para eventos com grande público?", answer: "Sim. Infraestrutura para picos de acesso. Festivais, formaturas, corporativos — sem instabilidade." },
  { question: "Qual a diferença entre o Barty e sistemas como Zig, Meep ou Imply?", answer: "Simplicidade e custo real. O Barty foi feito para quem precisa vender mais amanhã, sem depender de técnico, contrato de 12 meses ou hardware caro." },
  { question: "Posso personalizar o cardápio com fotos e promoções?", answer: "Sim. Fotos, descrições, variações, preços e promoções diretamente no painel. Mudanças em tempo real." },
  { question: "Como funciona o repasse dos pagamentos?", answer: "Dinheiro cai diretamente na sua conta. Pix confirmado em segundos." },
  { question: "Tem fidelidade ou contrato mínimo?", answer: "Eventos: uso por demanda. Estabelecimentos: mensalidade sem fidelidade. Cancele quando quiser." },
];

/* ═══════════════════════════════════════════════════════
   HOME V2 — ANTIGRAVITY EDITION
   ═══════════════════════════════════════════════════════ */

const HomeV2 = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  useSmoothScroll();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <CustomCursor />

      {/* Progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[100] origin-left" style={{ scaleX }} />

      <div id="v2-smooth-container" className="fixed top-0 left-0 w-full will-change-transform">
        <div className="min-h-screen bg-background relative">
          <Navbar />

          <main>
            {/* ═══ HERO — SPLIT LAYOUT ═══ */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
              {/* 3D Particle background */}
              <Suspense fallback={null}>
                <ParticleField />
              </Suspense>

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-[1]" />
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-[1]" />

              <div className="container relative z-10 pt-24 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">
                  {/* Left — Copy */}
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 backdrop-blur-sm px-4 py-1.5 mb-8"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">Sistema Cashless</span>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="font-display text-[2.75rem] md:text-6xl lg:text-[4.25rem] font-bold text-foreground leading-[1.05] mb-8 tracking-tight"
                    >
                      <TypewriterText
                        text="Eventos sem filas. Lucro sem limites."
                        delay={600}
                      />
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 3.2, duration: 0.6 }}
                      className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed"
                    >
                      Venda antecipada por item, integração com parceiros de comida e bebida, retirada instantânea via QR Code.{" "}
                      <strong className="text-foreground font-medium">Sem hardware. Sem filas. Sem custos fixos.</strong>
                    </motion.p>

                    {/* Metrics row */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3.6 }}
                      className="flex gap-8 mb-10"
                    >
                      {[
                        { value: "+30%", label: "receita" },
                        { value: "80%", label: "menos filas" },
                        { value: "24h", label: "para migrar" },
                      ].map((m) => (
                        <div key={m.label}>
                          <p className="font-display text-2xl md:text-3xl font-bold text-primary">{m.value}</p>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{m.label}</p>
                        </div>
                      ))}
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 3.8 }}
                      className="flex flex-wrap gap-4"
                    >
                      <MagneticButton
                        href="https://wa.me/553484428888"
                        className="btn-glow inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-primary-foreground text-base font-semibold"
                      >
                        Solicitar demo grátis
                        <ArrowRight className="w-4 h-4" />
                      </MagneticButton>
                      <motion.a
                        href="#como-funciona-v2"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-border/60 text-foreground text-base font-medium hover:bg-card/60 backdrop-blur-sm transition-all"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Play className="w-4 h-4 text-primary" />
                        Como funciona
                      </motion.a>
                    </motion.div>
                  </div>

                  {/* Right — Hero Image */}
                  <motion.figure
                    initial={{ opacity: 0, scale: 0.85, rotateY: -10 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ delay: 1, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative"
                    style={{ perspective: "1200px" }}
                  >
                    <div className="relative rounded-3xl overflow-hidden border border-border/30 shadow-2xl shadow-primary/10">
                      <img
                        src={heroImage}
                        alt="Evento lotado com clientes usando QR Code do Barty"
                        className="w-full h-auto"
                        loading="eager"
                        width="1200"
                        height="675"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                    </div>
                    {/* Floating stat card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 2, duration: 0.6 }}
                      className="absolute -bottom-6 -left-6 glass-card-strong rounded-2xl p-4 shadow-xl hidden lg:block"
                    >
                      <p className="text-xs text-muted-foreground mb-1">Eventos ativos</p>
                      <p className="font-display text-2xl font-bold text-foreground">+200</p>
                      <p className="text-xs text-primary font-medium">em todo o Brasil</p>
                    </motion.div>
                  </motion.figure>
                </div>
              </div>

              {/* Scroll cue */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                  className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center pt-2"
                >
                  <div className="w-1 h-2.5 rounded-full bg-primary" />
                </motion.div>
              </motion.div>
            </section>

            <LineDivider />

            {/* ═══ HOW IT WORKS ═══ */}
            <section id="como-funciona-v2" className="py-28 md:py-40">
              <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  {/* Left sticky header */}
                  <div className="lg:col-span-4">
                    <Reveal>
                      <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-4">Processo</p>
                      <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                        Do setup à venda em{" "}
                        <span className="text-gradient">5 passos.</span>
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-8">
                        Migre de soluções genéricas para Barty em 24h. Sem contrato, sem técnico.
                      </p>
                      <MagneticButton
                        href="https://wa.me/553484428888"
                        className="btn-glow inline-flex items-center gap-2 px-6 py-3 rounded-xl text-primary-foreground text-sm font-semibold"
                      >
                        Começar agora <ArrowRight className="w-4 h-4" />
                      </MagneticButton>
                    </Reveal>
                  </div>

                  {/* Right steps */}
                  <div className="lg:col-span-8">
                    <div className="space-y-6">
                      {steps.map((step, i) => (
                        <Reveal key={step.num} delay={i * 0.08}>
                          <motion.div
                            whileHover={{ x: 8 }}
                            className="group flex gap-6 p-6 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm hover:bg-card/60 hover:border-primary/20 transition-all duration-500 cursor-default"
                          >
                            <div className="shrink-0">
                              <span className="font-display text-3xl font-bold text-primary/20 group-hover:text-primary/50 transition-colors">{step.num}</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <step.icon className="w-5 h-5 text-primary" />
                                <h3 className="font-display text-lg font-bold text-foreground">{step.title}</h3>
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                            </div>
                          </motion.div>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <LineDivider />

            {/* ═══ BENEFITS — BENTO GRID ═══ */}
            <section id="vantagens-v2" className="py-28 md:py-40">
              <div className="container">
                <Reveal>
                  <header className="max-w-2xl mb-16">
                    <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-4">Vantagens</p>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
                      Por que trocar pelo Barty{" "}
                      <span className="text-gradient">hoje?</span>
                    </h2>
                  </header>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/40 rounded-3xl overflow-hidden border border-border/40">
                  {benefits.map((item, i) => (
                    <Reveal key={item.title} delay={i * 0.06}>
                      <motion.article
                        whileHover={{ backgroundColor: "hsl(var(--card) / 0.8)" }}
                        className="p-8 md:p-10 bg-card/40 backdrop-blur-sm h-full cursor-default group transition-colors duration-500"
                      >
                        <item.icon className="w-6 h-6 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
                        <div className="mb-4">
                          <span className="font-display text-3xl md:text-4xl font-bold text-foreground">{item.stat}</span>
                          <span className="text-xs text-muted-foreground ml-2 uppercase tracking-wider">{item.statLabel}</span>
                        </div>
                        <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </motion.article>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>

            <LineDivider />

            {/* ═══ PRICING ═══ */}
            <section id="planos-v2" className="py-28 md:py-40">
              <div className="container">
                <Reveal>
                  <header className="text-center max-w-2xl mx-auto mb-16">
                    <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-4">Planos</p>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
                      Planos que Fazem Sentido
                    </h2>
                  </header>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {/* Eventos */}
                  <Reveal delay={0.1}>
                    <motion.article
                      whileHover={{ y: -8 }}
                      className="relative rounded-3xl border-2 border-primary/30 bg-card/50 backdrop-blur-sm p-8 md:p-10 overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-transparent" />
                      <div className="absolute -top-3 right-6 btn-glow text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full">
                        Foco principal
                      </div>
                      <Calendar className="w-8 h-8 text-primary mb-6" />
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2">Para Eventos</h3>
                      <div className="mb-4">
                        <span className="font-display text-5xl font-bold text-foreground">3%</span>
                        <span className="text-muted-foreground text-sm ml-2">sobre vendas</span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-8">Zero custo fixo. Pague só quando vender.</p>
                      <ul className="space-y-3 mb-8">
                        {["Sem mensalidade", "Setup e migração grátis", "Venda antecipada por item", "Suporte 24/7 no evento", "Relatórios por parceiro"].map((item) => (
                          <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                            <Check className="w-4 h-4 text-primary shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <MagneticButton
                        href="https://wa.me/553484428888"
                        className="btn-glow inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 rounded-xl text-primary-foreground text-sm font-semibold"
                      >
                        Quero pra meu evento <ArrowRight className="w-4 h-4" />
                      </MagneticButton>
                    </motion.article>
                  </Reveal>

                  {/* Estabelecimentos */}
                  <Reveal delay={0.2}>
                    <motion.article
                      whileHover={{ y: -8 }}
                      className="rounded-3xl border border-border/50 bg-card/30 backdrop-blur-sm p-8 md:p-10"
                    >
                      <Store className="w-8 h-8 text-primary mb-6" />
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2">Para Estabelecimentos</h3>
                      <div className="mb-4">
                        <span className="font-display text-5xl font-bold text-foreground">R$99</span>
                        <span className="text-muted-foreground text-sm ml-2">/mês</span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-8">Pedidos ilimitados com analytics premium.</p>
                      <ul className="space-y-3 mb-8">
                        {["Pedidos ilimitados", "Painel com analytics", "Cardápio customizável", "Sem fidelidade"].map((item) => (
                          <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                            <Check className="w-4 h-4 text-primary shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <motion.a
                        href="https://wa.me/553484428888"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 rounded-xl border border-border text-foreground text-sm font-semibold hover:bg-card/80 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Começar agora <ArrowRight className="w-4 h-4" />
                      </motion.a>
                    </motion.article>
                  </Reveal>
                </div>
              </div>
            </section>

            <LineDivider />

            {/* ═══ TESTIMONIALS ═══ */}
            <section className="py-28 md:py-40">
              <div className="container">
                <Reveal>
                  <header className="text-center max-w-2xl mx-auto mb-16">
                    <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-4">Depoimentos</p>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
                      Quem usa o Barty{" "}
                      <span className="text-gradient">não volta atrás</span>
                    </h2>
                  </header>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {testimonials.map((t, i) => (
                    <Reveal key={t.name} delay={i * 0.12}>
                      <motion.blockquote
                        whileHover={{ y: -8 }}
                        className="rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm p-8 cursor-default h-full flex flex-col"
                      >
                        <div className="flex gap-1 mb-5">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                          ))}
                        </div>
                        <p className="text-foreground leading-relaxed mb-6 flex-1">"{t.quote}"</p>
                        <footer className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-bold text-primary">{t.name[0]}</span>
                          </div>
                          <div>
                            <cite className="font-semibold text-foreground text-sm not-italic block">{t.name}</cite>
                            <p className="text-xs text-muted-foreground">{t.role}</p>
                          </div>
                        </footer>
                      </motion.blockquote>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>

            <LineDivider />

            {/* ═══ FAQ ═══ */}
            <section id="faq-v2" className="py-28 md:py-40">
              <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  <div className="lg:col-span-4">
                    <Reveal>
                      <p className="text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-4">FAQ</p>
                      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
                        Tire suas dúvidas sobre o{" "}
                        <span className="text-gradient">Barty</span>
                      </h2>
                    </Reveal>
                  </div>
                  <div className="lg:col-span-8">
                    {faqs.map((faq, i) => (
                      <FaqItem key={faq.question} question={faq.question} answer={faq.answer} index={i} />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ═══ FINAL CTA ═══ */}
            <section className="py-28 md:py-40 relative overflow-hidden">
              <div className="absolute inset-0 bg-foreground" />
              <div className="absolute inset-0 opacity-30">
                <Suspense fallback={null}>
                  <ParticleField />
                </Suspense>
              </div>

              <div className="container relative z-10">
                <Reveal>
                  <div className="max-w-3xl mx-auto text-center">
                    <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight">
                      Pronto pra trocar filas por{" "}
                      <span className="text-primary">lucro previsível?</span>
                    </h2>
                    <p className="text-background/50 text-lg mb-10">
                      Migre em 24h. Sem contrato. Sem custos fixos. Setup grátis.
                    </p>
                    <MagneticButton
                      href="https://wa.me/553484428888"
                      className="btn-glow inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-primary-foreground text-lg font-semibold"
                    >
                      Solicitar demo grátis agora
                      <ArrowRight className="w-5 h-5" />
                    </MagneticButton>
                  </div>
                </Reveal>
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="py-10 bg-foreground border-t border-background/10" role="contentinfo">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
              <img src={bartyLogo} alt="Barty" className="h-8 w-auto brightness-0 invert" />
              <nav className="flex flex-wrap gap-6">
                {[
                  { label: "Fichas", href: "/fichas" },
                  { label: "Eventos", href: "/eventos" },
                  { label: "Food", href: "/food" },
                  { label: "Ingressos", href: "/ingressos" },
                ].map((link) => (
                  <a key={link.href} href={link.href} className="text-background/40 text-xs hover:text-background/70 transition-colors">{link.label}</a>
                ))}
              </nav>
              <p className="text-background/30 text-xs">
                © {new Date().getFullYear()} Barty. Todos os direitos reservados.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default HomeV2;
