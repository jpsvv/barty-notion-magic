import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Sparkles, TrendingUp, ShieldCheck, Zap, Star,
  Check, Users, QrCode, CreditCard, Bell, BarChart3,
  Target, Timer, DollarSign, Scaling, ChevronDown, Play
} from "lucide-react";
import Navbar from "@/components/Navbar";
import dopamineHero from "@/assets/dopamine-hero.jpg";
import bartyLogo from "@/assets/barty-logo.png";

/* ─── CONFETTI PARTICLES ─── */
const ConfettiDots = () => {
  const dots = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 12 + 4,
    color: ["#FF2D87", "#FFD600", "#00E5A0", "#6C5CE7", "#FF6B35", "#00D4FF"][i % 6],
    delay: Math.random() * 4,
    duration: 3 + Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            background: d.color,
          }}
          animate={{
            y: [0, -20, 0, 15, 0],
            x: [0, 10, -10, 5, 0],
            scale: [1, 1.3, 0.8, 1.1, 1],
            opacity: [0.7, 1, 0.5, 0.9, 0.7],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

/* ─── SQUIGGLY LINE ─── */
const SquigglyLine = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 20" className={`w-full h-5 ${className}`} preserveAspectRatio="none">
    <path
      d="M0 10 Q25 0 50 10 Q75 20 100 10 Q125 0 150 10 Q175 20 200 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

/* ─── WAVY DIVIDER ─── */
const WavyDivider = ({ color = "var(--dopamine-pink)" }: { color?: string }) => (
  <div className="w-full overflow-hidden leading-none -mt-1">
    <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-12 md:h-16">
      <path d="M0,40 C300,80 600,0 900,40 C1050,60 1150,20 1200,40 L1200,80 L0,80 Z" fill={color} />
    </svg>
  </div>
);

/* ─── BLOB SHAPE ─── */
const Blob = ({ color, className }: { color: string; className?: string }) => (
  <motion.div
    className={`absolute rounded-[40%_60%_70%_30%/40%_50%_60%_50%] pointer-events-none ${className}`}
    style={{ background: color }}
    animate={{
      borderRadius: [
        "40% 60% 70% 30% / 40% 50% 60% 50%",
        "60% 40% 30% 70% / 50% 60% 40% 50%",
        "30% 70% 50% 50% / 60% 40% 70% 30%",
        "40% 60% 70% 30% / 40% 50% 60% 50%",
      ],
    }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  />
);

/* ─── REVEAL ─── */
const Reveal = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── BOUNCY CARD ─── */
const BouncyCard = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay, type: "spring", stiffness: 200, damping: 15 }}
    whileHover={{ scale: 1.04, rotate: 1, y: -6 }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── FAQ ITEM ─── */
const FaqItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={index * 0.05}>
      <div className="border-b-2 border-dashed last:border-0" style={{ borderColor: ["#FF2D87", "#FFD600", "#00E5A0", "#6C5CE7", "#FF6B35", "#00D4FF", "#FF2D87"][index] }}>
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group">
          <span className="font-display font-bold text-lg md:text-xl" style={{ color: "hsl(var(--foreground))" }}>{question}</span>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3, type: "spring" }}>
            <ChevronDown className="w-6 h-6" style={{ color: ["#FF2D87", "#FFD600", "#00E5A0", "#6C5CE7", "#FF6B35", "#00D4FF", "#FF2D87"][index] }} />
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
              <p className="pb-5 text-muted-foreground leading-relaxed text-base">{answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
};

/* ═══ DATA ═══ */
const steps = [
  { icon: Users, title: "Crie e vincule parceiros", desc: "Integre food trucks, bares e cozinhas em minutos.", color: "#FF2D87" },
  { icon: QrCode, title: "Gere QR Code", desc: "Compartilhe via redes. Clientes compram antecipado.", color: "#FFD600" },
  { icon: CreditCard, title: "Pague pelo celular", desc: "Sem app. Pix ou cartão, taxa mínima sobre vendas.", color: "#00E5A0" },
  { icon: Bell, title: "Produza na hora certa", desc: "Notificações em tempo real. Retirada via QR.", color: "#6C5CE7" },
  { icon: BarChart3, title: "Analise e escale", desc: "Relatórios por parceiro. Upsell automático.", color: "#FF6B35" },
];

const benefits = [
  { icon: Target, title: "Previsibilidade", stat: "20-40%", label: "redução de custos", color: "#FF2D87" },
  { icon: Timer, title: "Zero filas", stat: "80%+", label: "menos espera", color: "#FFD600" },
  { icon: DollarSign, title: "Sem custos fixos", stat: "3%", label: "sobre vendas", color: "#00E5A0" },
  { icon: Scaling, title: "Escalável", stat: "∞", label: "capacidade", color: "#6C5CE7" },
  { icon: TrendingUp, title: "Mais receita", stat: "+25%", label: "impulso médio", color: "#FF6B35" },
  { icon: ShieldCheck, title: "LGPD seguro", stat: "100%", label: "compliance", color: "#00D4FF" },
];

const testimonials = [
  { quote: "O Barty deu um upgrade absurdo na nossa operação. Cozinha mais organizada, clientes elogiam.", name: "Paula Aguiar", role: "Chefe Kantine", color: "#FF2D87" },
  { quote: "Nossos clientes amaram a autonomia. Pedem, pagam e acompanham tudo pelo celular.", name: "Marcos", role: "Proprietário Alpendre Bar", color: "#FFD600" },
  { quote: "Desde que colocamos o Barty, a operação ficou outro nível. O cliente faz tudo sozinho.", name: "Betão", role: "Proprietário Bar do Betão", color: "#00E5A0" },
];

const faqs = [
  { question: "O cliente precisa baixar algum aplicativo?", answer: "Não. Funciona 100% pelo navegador do celular. Sem cadastro, sem download, sem atrito." },
  { question: "Como o pedido chega para a cozinha?", answer: "Após a compra da ficha, o usuário faz a liberação da produção do pedido, sendo direcionado para a cozinha." },
  { question: "O Barty funciona para eventos com grande público?", answer: "Sim. Infraestrutura para picos de acesso. Festivais, formaturas, corporativos — sem instabilidade." },
  { question: "Qual a diferença do Barty para concorrentes?", answer: "Simplicidade e custo real. Sem contrato de 12 meses ou hardware caro." },
  { question: "Como funciona o repasse dos pagamentos?", answer: "Dinheiro cai diretamente na sua conta. Pix confirmado em segundos." },
];

/* ═══ MAIN COMPONENT ═══ */
const HomeV3 = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Progress bar rainbow */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #FF2D87, #FFD600, #00E5A0, #6C5CE7, #FF6B35, #00D4FF)",
        }}
      />

      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        <ConfettiDots />
        <Blob color="rgba(255, 45, 135, 0.12)" className="w-72 h-72 -top-10 -left-20 blur-2xl" />
        <Blob color="rgba(255, 214, 0, 0.12)" className="w-96 h-96 top-20 -right-20 blur-2xl" />
        <Blob color="rgba(0, 229, 160, 0.1)" className="w-60 h-60 bottom-10 left-1/3 blur-2xl" />

        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-8 font-bold text-sm"
              style={{ background: "#FFD600", color: "#1a1a2e" }}
            >
              <Sparkles className="w-4 h-4" />
              Novo: Venda antecipada por item 🎉
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.02] mb-4 tracking-tight"
              style={{ color: "hsl(var(--foreground))" }}
            >
              Eventos{" "}
              <span className="relative inline-block">
                <span style={{ background: "linear-gradient(135deg, #FF2D87, #FF6B35)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  sem filas.
                </span>
                <motion.div
                  className="absolute -bottom-2 left-0 w-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  style={{ color: "#FFD600", originX: 0 }}
                >
                  <SquigglyLine />
                </motion.div>
              </span>
              <br />
              Lucro{" "}
              <span style={{ background: "linear-gradient(135deg, #6C5CE7, #00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                sem limites.
              </span>{" "}
              <motion.span
                animate={{ rotate: [0, 14, -8, 14, 0] }}
                transition={{ duration: 1.5, delay: 1.2, repeat: Infinity, repeatDelay: 3 }}
                className="inline-block"
              >
                🚀
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Venda antecipada por item, integração com parceiros de comida e bebida, retirada instantânea via QR Code.{" "}
              <strong className="font-semibold" style={{ color: "#FF2D87" }}>Sem hardware. Sem filas. Sem custos fixos.</strong>
            </motion.p>

            {/* Stats pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4 mb-10"
            >
              {[
                { value: "+30%", label: "receita", color: "#FF2D87" },
                { value: "80%", label: "menos filas", color: "#FFD600" },
                { value: "0", label: "custos fixos", color: "#00E5A0" },
              ].map((m) => (
                <motion.div
                  key={m.label}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  className="rounded-2xl px-6 py-3 font-bold text-center"
                  style={{ background: `${m.color}20`, border: `2px solid ${m.color}40` }}
                >
                  <p className="text-2xl md:text-3xl font-display" style={{ color: m.color }}>{m.value}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{m.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <motion.a
                href="https://wa.me/553484428888"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white shadow-lg"
                style={{ background: "linear-gradient(135deg, #FF2D87, #FF6B35)", boxShadow: "0 8px 30px rgba(255, 45, 135, 0.4)" }}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Solicitar demo grátis
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#como-funciona-v3"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold border-2 text-foreground"
                style={{ borderColor: "#6C5CE7" }}
                whileHover={{ scale: 1.06, backgroundColor: "#6C5CE720" }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5" style={{ color: "#6C5CE7" }} />
                Como funciona
              </motion.a>
            </motion.div>

            {/* Hero image */}
            <motion.figure
              initial={{ opacity: 0, y: 60, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.8, duration: 0.8, type: "spring", stiffness: 100 }}
              className="max-w-5xl mx-auto"
            >
              <div
                className="rounded-3xl p-2 md:p-3 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #FF2D87, #FFD600, #00E5A0, #6C5CE7)",
                  boxShadow: "0 20px 60px rgba(255, 45, 135, 0.2), 0 10px 30px rgba(108, 92, 231, 0.15)",
                }}
              >
                <img
                  src={dopamineHero}
                  alt="Evento vibrante com QR Code e sistema cashless Barty"
                  className="w-full h-auto rounded-2xl"
                  loading="eager"
                  width="1200"
                  height="675"
                />
              </div>
            </motion.figure>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8 text-sm text-muted-foreground"
            >
              Já usado por <strong className="font-bold" style={{ color: "#FF2D87" }}>+200 eventos</strong> em todo o Brasil 🇧🇷
            </motion.p>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="como-funciona-v3" className="py-20 md:py-28 relative">
        <Blob color="rgba(108, 92, 231, 0.08)" className="w-80 h-80 -top-20 right-0 blur-3xl" />
        <div className="container relative z-10">
          <Reveal className="text-center mb-16">
            <span
              className="inline-block rounded-full px-4 py-1.5 text-sm font-bold mb-4"
              style={{ background: "#6C5CE720", color: "#6C5CE7" }}
            >
              Passo a passo
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Como funciona{" "}
              <span style={{ background: "linear-gradient(135deg, #FFD600, #FF6B35)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                na prática
              </span>{" "}
              ✨
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <BouncyCard key={step.title} delay={i * 0.1} className="cursor-default">
                <div
                  className="rounded-3xl p-6 h-full text-center border-2 border-dashed"
                  style={{ background: `${step.color}08`, borderColor: `${step.color}30` }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${step.color}20` }}
                  >
                    <step.icon className="w-7 h-7" style={{ color: step.color }} />
                  </div>
                  <span className="text-3xl font-display font-bold block mb-2" style={{ color: step.color }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </BouncyCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BENEFITS ═══ */}
      <section className="py-20 md:py-28 relative">
        <Blob color="rgba(0, 229, 160, 0.08)" className="w-72 h-72 bottom-0 left-0 blur-3xl" />
        <div className="container relative z-10">
          <Reveal className="text-center mb-16">
            <span
              className="inline-block rounded-full px-4 py-1.5 text-sm font-bold mb-4"
              style={{ background: "#00E5A020", color: "#00E5A0" }}
            >
              Por que Barty?
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Resultados que{" "}
              <span style={{ background: "linear-gradient(135deg, #FF2D87, #6C5CE7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                dão dopamina
              </span>{" "}
              🧠
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <BouncyCard key={b.title} delay={i * 0.08} className="cursor-default">
                <div
                  className="rounded-3xl p-6 h-full border-2"
                  style={{ background: `${b.color}06`, borderColor: `${b.color}25` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${b.color}20` }}
                    >
                      <b.icon className="w-6 h-6" style={{ color: b.color }} />
                    </div>
                    <span className="font-display text-3xl font-bold" style={{ color: b.color }}>{b.stat}</span>
                  </div>
                  <h3 className="font-display font-bold text-foreground text-lg mb-1">{b.title}</h3>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: b.color }}>{b.label}</p>
                </div>
              </BouncyCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-20 md:py-28 relative">
        <ConfettiDots />
        <div className="container relative z-10">
          <Reveal className="text-center mb-16">
            <span
              className="inline-block rounded-full px-4 py-1.5 text-sm font-bold mb-4"
              style={{ background: "#FFD60020", color: "#FFD600" }}
            >
              Depoimentos
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Quem usa,{" "}
              <span style={{ background: "linear-gradient(135deg, #FFD600, #FF6B35)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                ama
              </span>{" "}
              💛
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <BouncyCard key={t.name} delay={i * 0.1} className="cursor-default">
                <div
                  className="rounded-3xl p-6 h-full border-2"
                  style={{ borderColor: `${t.color}30`, background: `${t.color}06` }}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-current" style={{ color: "#FFD600" }} />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 leading-relaxed italic">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ background: t.color }}
                    >
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              </BouncyCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-20 md:py-28">
        <div className="container">
          <Reveal className="text-center mb-16">
            <span
              className="inline-block rounded-full px-4 py-1.5 text-sm font-bold mb-4"
              style={{ background: "#FF6B3520", color: "#FF6B35" }}
            >
              Dúvidas
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Perguntas{" "}
              <span style={{ background: "linear-gradient(135deg, #00E5A0, #00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                frequentes
              </span>{" "}
              💬
            </h2>
          </Reveal>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
              <FaqItem key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA FOOTER ═══ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <ConfettiDots />
        <Blob color="rgba(255, 45, 135, 0.15)" className="w-96 h-96 -top-20 -right-20 blur-3xl" />
        <Blob color="rgba(108, 92, 231, 0.12)" className="w-80 h-80 -bottom-20 -left-20 blur-3xl" />

        <div className="container relative z-10">
          <Reveal className="text-center">
            <div
              className="rounded-[2rem] p-10 md:p-16 max-w-4xl mx-auto"
              style={{
                background: "linear-gradient(135deg, #FF2D87, #6C5CE7, #00D4FF)",
                boxShadow: "0 20px 60px rgba(255, 45, 135, 0.3)",
              }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="text-5xl mb-6"
              >
                🎉
              </motion.div>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
                Pronto para acabar com as filas?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Junte-se a +200 eventos que já revolucionaram sua operação com o Barty.
              </p>
              <motion.a
                href="https://wa.me/553484428888"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full text-lg font-bold shadow-xl"
                style={{ background: "#FFD600", color: "#1a1a2e", boxShadow: "0 8px 30px rgba(255, 214, 0, 0.4)" }}
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Começar agora
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border/50">
        <div className="container text-center">
          <img src={bartyLogo} alt="Barty" className="h-8 mx-auto mb-4 opacity-60" />
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Barty. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomeV3;
