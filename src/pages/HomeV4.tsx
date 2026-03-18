import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Sparkles, TrendingUp, ShieldCheck, Star,
  Users, QrCode, CreditCard, Bell, BarChart3,
  Target, Timer, DollarSign, ChevronDown, Play,
  Smartphone, Clock, CheckCircle2, Globe, X
} from "lucide-react";
import Navbar from "@/components/Navbar";
import dopamineHero from "@/assets/dopamine-hero.jpg";
import bartyLogo from "@/assets/barty-logo.png";

/* ─── REVEAL ─── */
const Reveal = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── BENTO CARD ─── */
const BentoCard = ({
  children,
  className = "",
  delay = 0,
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
    className={`rounded-3xl border border-border bg-card p-6 md:p-8 transition-shadow duration-300 hover:shadow-xl ${className}`}
  >
    {children}
  </motion.div>
);


/* ─── FAQ ITEM ─── */
const FaqItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={index * 0.05}>
      <div className="border-b border-border last:border-0">
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group">
          <span className="font-display font-semibold text-base md:text-lg text-foreground pr-4">{question}</span>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="pb-5 text-muted-foreground leading-relaxed text-sm">{answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
};

/* ═══ DATA ═══ */
const faqs = [
  { question: "O cliente precisa baixar algum app?", answer: "Não. Funciona 100% pelo navegador do celular. Sem cadastro, sem download, sem atrito." },
  { question: "Como o pedido chega para a cozinha?", answer: "Após a compra, o cliente libera a produção e o pedido aparece instantaneamente na cozinha." },
  { question: "Funciona para eventos grandes?", answer: "Sim. Infraestrutura escalável para picos de acesso — festivais, formaturas, corporativos." },
  { question: "Qual a diferença do Barty?", answer: "Simplicidade e custo real. Sem contrato longo, sem hardware caro. Só paga quando vende." },
  { question: "Como funciona o repasse?", answer: "Dinheiro cai direto na sua conta. Pix confirmado em segundos." },
];

const testimonials = [
  { quote: "O Barty deu um upgrade absurdo na nossa operação. Cozinha mais organizada, clientes elogiam.", name: "Paula Aguiar", role: "Chefe Kantine", avatar: "PA" },
  { quote: "Nossos clientes amaram a autonomia. Pedem, pagam e acompanham tudo pelo celular.", name: "Marcos", role: "Proprietário Alpendre Bar", avatar: "MA" },
  { quote: "Desde que colocamos o Barty, a operação ficou outro nível.", name: "Betão", role: "Proprietário Bar do Betão", avatar: "BE" },
];

/* ═══ MAIN COMPONENT ═══ */
const HomeV4 = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left bg-primary"
        style={{ scaleX }}
      />

      <Navbar />

      {/* ═══ HERO BENTO ═══ */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
            {/* Main hero card — spans 8 cols */}
            <BentoCard className="lg:col-span-8 relative overflow-hidden min-h-[360px] md:min-h-[440px] flex flex-col justify-end" delay={0}>
              <img
                src={dopamineHero}
                alt="Evento com sistema Barty"
                className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-3xl" />
              <div className="relative z-10 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-4 py-1.5 mb-4"
                >
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-semibold tracking-wide">Plataforma #1 para eventos</span>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-3"
                >
                  Eventos sem filas.
                  <br />
                  <span className="text-primary">Lucro sem limites.</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/70 text-sm md:text-base max-w-lg mb-6"
                >
                  Venda antecipada por item, retirada via QR Code. Sem hardware, sem custos fixos.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-3"
                >
                  <a
                    href="https://wa.me/553484428888"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glow inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-primary-foreground text-sm font-semibold"
                  >
                    Solicitar demo grátis
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#como-funciona-v4"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Como funciona
                  </a>
                </motion.div>
              </div>
            </BentoCard>

            {/* Right side — 4 cols, stacked */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 md:gap-5">
              {/* Stat card 1 */}
              <BentoCard className="flex flex-col justify-center items-center text-center" delay={0.1}>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <p className="font-display text-3xl md:text-4xl font-bold text-foreground">+30%</p>
                <p className="text-xs text-muted-foreground mt-1">aumento na receita</p>
              </BentoCard>

              {/* Stat card 2 */}
              <BentoCard className="flex flex-col justify-center items-center text-center" delay={0.15}>
                <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6 text-accent-foreground" />
                </div>
                <p className="font-display text-3xl md:text-4xl font-bold text-foreground">80%</p>
                <p className="text-xs text-muted-foreground mt-1">menos tempo de fila</p>
              </BentoCard>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUSTED BY ═══ */}
      <section className="py-8 md:py-12">
        <div className="container">
          <Reveal>
            <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-6">
              Usado por +200 eventos em todo o Brasil
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex justify-center items-center gap-8 md:gap-14 opacity-40 flex-wrap">
              {["Kantine", "Alpendre Bar", "Bar do Betão", "Festival Uberlândia", "Expo Food"].map((name) => (
                <span key={name} className="font-display font-bold text-sm md:text-base text-foreground whitespace-nowrap">
                  {name}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FEATURES BENTO ═══ */}
      <section className="py-16 md:py-24">
        <div className="container">
          <Reveal className="text-center mb-12">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-3">Soluções</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              Tudo que você precisa,<br />
              <span className="text-gradient">num só lugar</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {/* Feature 1 — Large */}
            <BentoCard className="lg:col-span-2 lg:row-span-2 relative overflow-hidden" delay={0.05}>
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <QrCode className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-1">Ficha digital via QR Code</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Clientes compram fichas pelo celular. Sem app, sem fila de caixa. Pix ou cartão em segundos.
                    </p>
                  </div>
                </div>
                {/* Visual — mockup card grid */}
                <div className="flex-1 rounded-2xl bg-muted/50 border border-border p-6 grid grid-cols-3 gap-3">
                  {[
                    { emoji: "🍺", label: "Cerveja", price: "R$ 12" },
                    { emoji: "🍔", label: "Burger", price: "R$ 25" },
                    { emoji: "🧃", label: "Suco", price: "R$ 8" },
                    { emoji: "🍕", label: "Pizza", price: "R$ 18" },
                    { emoji: "🌮", label: "Taco", price: "R$ 15" },
                    { emoji: "🍫", label: "Brownie", price: "R$ 10" },
                  ].map((item) => (
                    <motion.div
                      key={item.label}
                      className="rounded-xl bg-card border border-border p-3 text-center"
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <span className="text-2xl block mb-1">{item.emoji}</span>
                      <p className="text-xs font-medium text-foreground">{item.label}</p>
                      <p className="text-[10px] text-muted-foreground">{item.price}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </BentoCard>

            {/* Feature 2 */}
            <BentoCard delay={0.1}>
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-4">
                <Smartphone className="w-5 h-5 text-accent-foreground" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">100% no navegador</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sem download de app. O cliente escaneia o QR e já está comprando. Atrito zero.
              </p>
            </BentoCard>

            {/* Feature 3 */}
            <BentoCard delay={0.15}>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">Pix e cartão</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Pagamento instantâneo. Confirmação em tempo real. Sem maquininha.
              </p>
            </BentoCard>

            {/* Feature 4 — wide */}
            <BentoCard className="md:col-span-2" delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-4">
                    <Bell className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">Cozinha inteligente</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Pedidos chegam em tempo real. A cozinha produz sob demanda. Menos desperdício, mais agilidade.
                  </p>
                </div>
                <div className="flex-1 rounded-2xl bg-muted/50 border border-border p-4 space-y-2">
                  {["Pedido #42 — 2x Burger", "Pedido #43 — 1x Cerveja", "Pedido #44 — 3x Pizza"].map((order, i) => (
                    <motion.div
                      key={order}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-2 rounded-xl bg-card border border-border px-3 py-2"
                    >
                      <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-primary animate-pulse" : "bg-muted-foreground/30"}`} />
                      <span className="text-xs text-foreground">{order}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </BentoCard>

            {/* Feature 5 */}
            <BentoCard delay={0.25}>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">Relatórios em tempo real</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Vendas, ticket médio, itens populares. Tudo no painel do organizador.
              </p>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="como-funciona-v4" className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <Reveal className="text-center mb-12">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-3">Passo a passo</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              Simples de <span className="text-gradient">começar</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {[
              { icon: Users, title: "Cadastre parceiros", desc: "Integre food trucks, bares e cozinhas.", num: "01" },
              { icon: QrCode, title: "Gere QR Code", desc: "Compartilhe nas redes ou impresso.", num: "02" },
              { icon: CreditCard, title: "Clientes compram", desc: "Pix ou cartão, sem app.", num: "03" },
              { icon: Bell, title: "Cozinha produz", desc: "Notificação em tempo real.", num: "04" },
              { icon: BarChart3, title: "Você analisa", desc: "Relatórios detalhados.", num: "05" },
            ].map((step, i) => (
              <BentoCard key={step.num} className="text-center" delay={i * 0.08}>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="font-display text-2xl font-bold text-primary/30 block mb-1">{step.num}</span>
                <h3 className="font-display text-sm font-bold text-foreground mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BENEFITS BENTO ═══ */}
      <section className="py-16 md:py-24">
        <div className="container">
          <Reveal className="text-center mb-12">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-3">Vantagens</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              Por que escolher o <span className="text-gradient">Barty?</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto">
            {[
              { icon: Target, title: "Previsibilidade", stat: "+20-40%", desc: "Redução de custos com venda antecipada" },
              { icon: Timer, title: "Zero filas", stat: "80%+", desc: "Menos tempo de espera para o cliente" },
              { icon: DollarSign, title: "Sem custos fixos", stat: "3%", desc: "Sobre vendas. Sem mensalidade." },
              { icon: Globe, title: "100% online", stat: "0", desc: "Hardware necessário. Funciona no celular." },
              { icon: TrendingUp, title: "Mais receita", stat: "+25%", desc: "Aumento médio no faturamento" },
              { icon: ShieldCheck, title: "LGPD seguro", stat: "100%", desc: "Compliance total com proteção de dados" },
            ].map((b, i) => (
              <BentoCard key={b.title} delay={i * 0.06}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <b.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-display text-2xl font-bold text-primary">{b.stat}</span>
                      <h3 className="font-display text-sm font-semibold text-foreground">{b.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">{b.desc}</p>
                  </div>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMPARISON BENTO ═══ */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <Reveal className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              Antes vs. <span className="text-gradient">Com Barty</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-4xl mx-auto">
            {/* Old way */}
            <BentoCard className="border-destructive/20 bg-destructive/[0.03]" delay={0.05} hover={false}>
              <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="text-xl">😤</span> Jeito antigo
              </h3>
              <ul className="space-y-3">
                {[
                  "Filas enormes no caixa",
                  "Fichas físicas perdidas",
                  "Sem dados de venda em tempo real",
                  "Hardware caro e frágil",
                  "Contratos longos e inflexíveis",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <X className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </BentoCard>

            {/* Barty way */}
            <BentoCard className="border-primary/20 bg-primary/[0.03]" delay={0.1} hover={false}>
              <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="text-xl">🚀</span> Com Barty
              </h3>
              <ul className="space-y-3">
                {[
                  "Compra pelo celular, sem fila",
                  "Fichas digitais no navegador",
                  "Dashboard em tempo real",
                  "Zero hardware necessário",
                  "Sem contrato, pague por uso",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-16 md:py-24">
        <div className="container">
          <Reveal className="text-center mb-12">
            <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-3">Depoimentos</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              Quem usa, <span className="text-gradient">recomenda</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <BentoCard key={t.name} delay={i * 0.08}>
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-4 h-4 text-primary" />
                  <Star className="w-4 h-4 text-primary" />
                  <Star className="w-4 h-4 text-primary" />
                  <Star className="w-4 h-4 text-primary" />
                  <Star className="w-4 h-4 text-primary" />
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <Reveal className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              Dúvidas <span className="text-gradient">frequentes</span>
            </h2>
          </Reveal>

          <div className="max-w-3xl mx-auto">
            <BentoCard hover={false}>
              {faqs.map((faq, i) => (
                <FaqItem key={faq.question} question={faq.question} answer={faq.answer} index={i} />
              ))}
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-16 md:py-24">
        <div className="container">
          <BentoCard
            className="relative overflow-hidden text-center py-16 md:py-20 bg-foreground border-0"
            hover={false}
          >
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }} />
            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-3xl md:text-5xl font-bold text-background mb-4"
              >
                Pronto pra revolucionar
                <br />
                suas <span className="text-primary">vendas?</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-background/50 text-sm md:text-base mb-8 max-w-md mx-auto"
              >
                Sem contrato. Sem custos fixos. Setup grátis. Migração em 24h.
              </motion.p>
              <motion.a
                href="https://wa.me/553484428888"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-primary-foreground text-base font-semibold"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Solicitar demo grátis
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </BentoCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={bartyLogo} alt="Barty" className="h-10 w-auto" />
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Barty. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomeV4;
