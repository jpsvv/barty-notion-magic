import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Zap, Star, ChevronDown, Check, Users, QrCode, CreditCard, Bell, BarChart3, Target, Timer, DollarSign, Scaling, Calendar, Store } from "lucide-react";
import Navbar from "@/components/Navbar";
import bartyLogo from "@/assets/barty-logo.png";
import heroImage from "@/assets/hero-barty.jpg";

/* ───────────────────── CUSTOM CURSOR ───────────────────── */
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-[9998] opacity-20 transition-transform duration-700 ease-out"
        style={{ background: "radial-gradient(circle, hsl(22 90% 52% / 0.3), transparent 70%)" }}
      />
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-white hidden md:block"
      />
    </>
  );
};

/* ───────────────────── TYPEWRITER ───────────────────── */
const TypewriterText = ({ text, className }: { text: string; className?: string }) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={className}>
      {displayed}
      <span className={`inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle ${done ? "animate-pulse" : ""}`} />
    </span>
  );
};

/* ───────────────────── PARALLAX SECTION WRAPPER ───────────────────── */
const ParallaxSection = ({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const smoothY = useSpring(y, { stiffness: 80, damping: 30 });

  return (
    <section ref={ref} id={id} className={`relative overflow-hidden ${className || ""}`}>
      <motion.div style={{ y: smoothY }}>
        {children}
      </motion.div>
    </section>
  );
};

/* ───────────────────── FLOATING PARTICLES ───────────────────── */
const FloatingParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full bg-primary/20"
        style={{
          left: `${15 + i * 15}%`,
          top: `${20 + (i % 3) * 25}%`,
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, (i % 2 === 0 ? 15 : -15), 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 4 + i,
          repeat: Infinity,
          delay: i * 0.5,
        }}
      />
    ))}
  </div>
);

/* ───────────────────── MAGNETIC BUTTON ───────────────────── */
const MagneticButton = ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    setPosition({ x, y });
  }, []);

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {children}
    </motion.a>
  );
};

/* ───────────────────── FAQ ITEM ───────────────────── */
const FaqItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="glass-card rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
        aria-expanded={open}
      >
        <span className="font-display font-semibold text-brand-navy pr-4 text-sm">{question}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════
   HOME V2 — CREATIVE EDITION
   ═══════════════════════════════════════════════════════ */

const steps = [
  { icon: Users, title: "Crie seu evento e vincule parceiros", description: "Integre food trucks, bares e cozinhas em minutos. Defina cardápios personalizados e venda fichas pré-pagas por item.", accent: "from-primary/20 to-primary/5" },
  { icon: QrCode, title: "Gere QR Code e divulgue", description: "Compartilhe via redes ou ingressos. Clientes compram antecipado, garantindo estoque exato e previsibilidade.", accent: "from-primary/15 to-accent/10" },
  { icon: CreditCard, title: "Cliente pede e paga no celular", description: "Sem app, via web. Pagamento via Pix ou cartão, com taxa mínima só sobre vendas reais.", accent: "from-accent/20 to-primary/5" },
  { icon: Bell, title: "Acompanhe e produza na hora", description: "Notificações em tempo real. Retirada sem fila: cliente mostra QR e pega pronto.", accent: "from-primary/10 to-accent/15" },
  { icon: BarChart3, title: "Analise e lucre mais", description: "Relatórios de vendas por parceiro e item. Aumente receita em até 30% com upsell automático.", accent: "from-accent/15 to-primary/10" },
];

const benefits = [
  { icon: Target, title: "Previsibilidade máxima", badge: "Diferencial chave", description: "Vendas antecipadas por item e estabelecimento específico. Reduza custos em 20-40%." },
  { icon: Timer, title: "Redução de filas em 80%+", description: "Clientes retiram pronto via QR. Sua equipe foca em upsell e atendimento premium." },
  { icon: DollarSign, title: "Sem custos fixos", description: "Taxa de 3% sobre vendas. Sem mensalidade. Migração gratuita." },
  { icon: Scaling, title: "Escalável", description: "De blocos de rua a festivais gigantes. Suporte 24/7 durante o evento." },
  { icon: TrendingUp, title: "Receita comprovada", description: "Clientes compram mais antecipado (impulso de 15-25%). ROI em semanas." },
  { icon: ShieldCheck, title: "Segurança LGPD", description: "Criptografia ponta a ponta, Pix instantâneo. Sem pulseiras caras." },
];

const testimonials = [
  { quote: "O Barty deu um upgrade absurdo na nossa operação. Cozinha mais organizada, clientes elogiam o atendimento.", name: "Paula Aguiar", role: "Chefe Kantine" },
  { quote: "Nossos clientes amaram a autonomia. Pedem, pagam e acompanham tudo pelo celular. Acabou a fila no caixa.", name: "Marcos", role: "Proprietário Alpendre Bar" },
  { quote: "Desde que colocamos o Barty, a operação ficou outro nível. O cliente faz tudo sozinho.", name: "Betão", role: "Proprietário Bar do Betão" },
];

const faqs = [
  { question: "O cliente precisa baixar algum aplicativo?", answer: "Não. Funciona 100% pelo navegador do celular. Sem cadastro, sem download, sem atrito." },
  { question: "Como o pedido chega para a cozinha?", answer: "Após pagamento confirmado, aparece automaticamente no painel da cozinha. Funciona em qualquer dispositivo." },
  { question: "O Barty funciona para eventos com grande público?", answer: "Sim. Infraestrutura para picos de acesso. Festivais, formaturas, corporativos — sem instabilidade." },
  { question: "Qual a diferença entre o Barty e sistemas como Zig, Meep ou Imply?", answer: "Simplicidade e custo real. O Barty foi feito para quem precisa vender mais amanhã, sem depender de técnico, contrato de 12 meses ou hardware caro." },
  { question: "Posso personalizar o cardápio com fotos e promoções?", answer: "Sim. Fotos, descrições, variações, preços e promoções diretamente no painel. Mudanças em tempo real." },
  { question: "Como funciona o repasse dos pagamentos?", answer: "Dinheiro cai diretamente na sua conta. Pix confirmado em segundos." },
  { question: "Tem fidelidade ou contrato mínimo?", answer: "Eventos: uso por demanda. Estabelecimentos: mensalidade sem fidelidade. Cancele quando quiser." },
];

const HomeV2 = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      <CustomCursor />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-primary z-[100] origin-left"
        style={{ scaleX }}
      />

      <Navbar />

      <main>
        {/* ═══ HERO ═══ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <FloatingParticles />
          <div className="absolute inset-0 mesh-gradient-bg" aria-hidden="true" />

          {/* Large blurred background shapes */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 3, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]"
            aria-hidden="true"
          />
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, -2, 0] }}
            transition={{ duration: 15, repeat: Infinity, delay: 3 }}
            className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-brand-navy/5 blur-[80px]"
            aria-hidden="true"
          />

          <div className="container relative z-10 pt-28 pb-20">
            <div className="max-w-5xl mx-auto text-center">
              {/* Pill badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 mb-10"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-brand-navy">Venda antecipada por item + Parceiros integrados</span>
              </motion.div>

              {/* Typewriter H1 */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-brand-navy leading-[1.05] mb-6 tracking-tight"
              >
                <TypewriterText text="A Revolução Cashless que Transforma Eventos em Máquinas de Lucro." />
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.5, duration: 0.6 }}
                className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed font-light"
              >
                Pare de perder vendas por filas intermináveis. Venda antecipada por item, integração com parceiros e retirada instantânea via QR Code.
              </motion.p>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4 }}
                className="flex flex-wrap items-center justify-center gap-6 mb-10"
              >
                {[
                  { icon: TrendingUp, label: "+30% receita média" },
                  { icon: Zap, label: "80% menos filas" },
                  { icon: ShieldCheck, label: "Sem custos fixos" },
                ].map((b) => (
                  <div key={b.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <b.icon className="w-4 h-4 text-primary" />
                    <span>{b.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <MagneticButton
                  href="https://wa.me/553484428888"
                  className="btn-glow inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-primary-foreground text-base font-semibold"
                >
                  Solicitar demo grátis
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
                <motion.a
                  href="#como-funciona-v2"
                  className="glass-card inline-flex items-center justify-center px-8 py-4 rounded-2xl text-brand-navy text-base font-medium hover:bg-card/80 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ver como funciona
                </motion.a>
              </motion.div>

              {/* Social proof */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.5 }}
                className="mt-8 text-sm text-muted-foreground"
              >
                Usado por <strong className="font-semibold text-brand-navy">+200 eventos e estabelecimentos</strong> no Brasil
              </motion.p>
            </div>

            {/* Hero image with reveal */}
            <motion.figure
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 4.6, duration: 1, ease: "easeOut" }}
              className="max-w-5xl mx-auto mt-16"
            >
              <motion.div
                className="glass-card-strong rounded-3xl p-2 md:p-3"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <img
                  src={heroImage}
                  alt="Evento lotado com clientes usando QR Code do Barty para pedir e pagar sem filas"
                  className="w-full h-auto rounded-2xl"
                  loading="eager"
                />
              </motion.div>
            </motion.figure>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 rounded-full border-2 border-brand-navy/20 flex items-start justify-center pt-2"
            >
              <div className="w-1 h-2 rounded-full bg-primary" />
            </motion.div>
          </motion.div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <ParallaxSection id="como-funciona-v2" className="py-24 md:py-32">
          <div className="container relative z-10">
            <header className="text-center mb-16">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs font-semibold text-primary tracking-widest uppercase mb-3"
              >
                Como funciona o Barty
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-3xl md:text-5xl font-bold text-brand-navy"
              >
                Do setup à venda em <span className="text-gradient">5 passos simples</span>
              </motion.h2>
            </header>

            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto list-none p-0">
              {steps.map((step, i) => (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 40, rotateX: 10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group glass-card rounded-2xl p-7 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.accent} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-brand-navy mb-2">
                    <span className="text-primary mr-1">{i + 1}.</span> {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </motion.li>
              ))}
            </ol>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <p className="text-muted-foreground mb-4">Migre de soluções genéricas para Barty em 24h.</p>
              <MagneticButton
                href="https://wa.me/553484428888"
                className="btn-glow inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-primary-foreground text-base font-semibold"
              >
                Solicitar demo grátis
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </motion.div>
          </div>
        </ParallaxSection>

        {/* ═══ WHY BARTY ═══ */}
        <ParallaxSection id="vantagens-v2" className="py-24 md:py-32">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl bubble-float-delayed" aria-hidden="true" />
          <div className="container relative z-10">
            <header className="max-w-3xl mx-auto text-center mb-16">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs font-semibold text-primary tracking-widest uppercase mb-3"
              >
                Por que trocar sua solução atual
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-3xl md:text-5xl font-bold text-brand-navy mb-4"
              >
                Por Que Trocar Pelo Barty <span className="text-gradient">Hoje?</span>
              </motion.h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {benefits.map((item, i) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -8, rotateY: 2 }}
                  className="glass-card rounded-2xl p-7 group relative cursor-default"
                  style={{ perspective: "800px" }}
                >
                  {item.badge && (
                    <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-brand-navy mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </ParallaxSection>

        {/* ═══ PRICING ═══ */}
        <ParallaxSection id="planos-v2" className="py-24 md:py-32">
          <div className="absolute inset-0 mesh-gradient-bg opacity-40" aria-hidden="true" />
          <div className="container relative z-10">
            <header className="text-center mb-16">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs font-semibold text-primary tracking-widest uppercase mb-3"
              >
                Planos que facilitam a troca
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-3xl md:text-5xl font-bold text-brand-navy"
              >
                Planos que Fazem Sentido
              </motion.h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Eventos */}
              <motion.article
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="glass-card-strong rounded-3xl p-8 md:p-10 relative border-2 border-primary/20"
              >
                <div className="absolute -top-3 right-6 btn-glow text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full">
                  Foco principal
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold text-brand-navy mb-2">Para Eventos</h3>
                <div className="mb-4">
                  <span className="font-display text-4xl font-bold text-brand-navy">3%</span>
                  <span className="text-muted-foreground text-sm ml-2">sobre vendas</span>
                </div>
                <p className="text-muted-foreground text-sm mb-6">Zero custo fixo. Pague só quando vender. Setup grátis e migração em 24h.</p>
                <ul className="space-y-3 mb-8">
                  {["Sem mensalidade", "Setup e migração grátis", "Venda antecipada por item", "Suporte 24/7 no evento", "Relatórios por parceiro"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-brand-navy">
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

              {/* Estabelecimentos */}
              <motion.article
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-3xl p-8 md:p-10"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-accent/20 flex items-center justify-center mb-6">
                  <Store className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold text-brand-navy mb-2">Para Estabelecimentos</h3>
                <div className="mb-4">
                  <span className="font-display text-4xl font-bold text-brand-navy">R$99</span>
                  <span className="text-muted-foreground text-sm ml-2">/mês</span>
                </div>
                <p className="text-muted-foreground text-sm mb-6">Pedidos ilimitados com analytics premium. ROI no primeiro mês.</p>
                <ul className="space-y-3 mb-8">
                  {["Pedidos ilimitados", "Painel com analytics", "Cardápio customizável", "Sem fidelidade"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-brand-navy">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <motion.a
                  href="https://wa.me/553484428888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 rounded-xl text-brand-navy text-sm font-semibold hover:bg-card/80 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Começar agora <ArrowRight className="w-4 h-4" />
                </motion.a>
              </motion.article>
            </div>
          </div>
        </ParallaxSection>

        {/* ═══ TESTIMONIALS ═══ */}
        <ParallaxSection className="py-24 md:py-32">
          <div className="container relative z-10">
            <header className="text-center mb-16">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs font-semibold text-primary tracking-widest uppercase mb-3"
              >
                Resultados reais
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-3xl md:text-5xl font-bold text-brand-navy"
              >
                Quem usa o Barty <span className="text-gradient">não volta atrás</span>
              </motion.h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((t, i) => (
                <motion.blockquote
                  key={t.name}
                  initial={{ opacity: 0, y: 30, rotateX: 5 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -8 }}
                  className="glass-card rounded-2xl p-8 cursor-default"
                >
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-brand-navy leading-relaxed mb-6">"{t.quote}"</p>
                  <footer className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{t.name[0]}</span>
                    </div>
                    <div>
                      <cite className="font-semibold text-brand-navy text-sm not-italic">{t.name}</cite>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </ParallaxSection>

        {/* ═══ FAQ ═══ */}
        <ParallaxSection id="faq-v2" className="py-24 md:py-32">
          <div className="absolute inset-0 mesh-gradient-bg opacity-30" aria-hidden="true" />
          <div className="container relative z-10">
            <header className="text-center mb-16">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs font-semibold text-primary tracking-widest uppercase mb-3"
              >
                Perguntas frequentes
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-3xl md:text-5xl font-bold text-brand-navy"
              >
                Tire suas dúvidas sobre o <span className="text-gradient">Barty</span>
              </motion.h2>
            </header>

            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, i) => (
                <FaqItem key={faq.question} question={faq.question} answer={faq.answer} index={i} />
              ))}
            </div>
          </div>
        </ParallaxSection>

        {/* ═══ FINAL CTA ═══ */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-navy" aria-hidden="true" />
          <div className="absolute top-10 left-[20%] w-72 h-72 rounded-full bg-primary/10 blur-3xl bubble-float" aria-hidden="true" />
          <div className="absolute bottom-10 right-[15%] w-56 h-56 rounded-full bg-primary/8 blur-3xl bubble-float-delayed" aria-hidden="true" />

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Pronto pra trocar filas por{" "}
                <span className="text-primary">lucro previsível?</span>
              </h2>
              <p className="text-white/60 text-lg mb-10 font-light">
                Migre em 24h. Sem contrato. Sem custos fixos. Setup grátis.
              </p>
              <MagneticButton
                href="https://wa.me/553484428888"
                className="btn-glow inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl text-primary-foreground text-lg font-semibold"
              >
                Solicitar demo grátis agora
                <ArrowRight className="w-5 h-5" />
              </MagneticButton>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-brand-navy border-t border-white/10" role="contentinfo">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img src={bartyLogo} alt="Barty" className="h-8 w-auto brightness-0 invert" />
          </div>
          <nav className="flex flex-wrap gap-4">
            {[
              { label: "Barty Fichas", href: "/fichas" },
              { label: "Barty Eventos", href: "/eventos" },
              { label: "Barty Food", href: "/food" },
            ].map((link) => (
              <a key={link.href} href={link.href} className="text-white/50 text-xs hover:text-white/80 transition-colors">{link.label}</a>
            ))}
          </nav>
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Barty. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomeV2;
