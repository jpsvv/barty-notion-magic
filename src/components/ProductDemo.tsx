import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  QrCode,
  ShoppingCart,
  ScanLine,
  TrendingUp,
  ChevronRight,
  Check,
  DollarSign,
  Users,
  BarChart3,
  Utensils,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const STEPS = [
  {
    id: 0,
    label: "Configure",
    icon: LayoutDashboard,
    text: "Configure seu evento em minutos",
    duration: 4000,
  },
  {
    id: 1,
    label: "Escaneie",
    icon: QrCode,
    text: "Cliente escaneia e acessa o cardápio",
    duration: 3500,
  },
  {
    id: 2,
    label: "Compre",
    icon: ShoppingCart,
    text: "Compra rápida, sem filas",
    duration: 3500,
  },
  {
    id: 3,
    label: "Valide",
    icon: ScanLine,
    text: "Vendedor valida em segundos",
    duration: 3500,
  },
  {
    id: 4,
    label: "Lucre",
    icon: TrendingUp,
    text: "Mais controle. Mais lucro.",
    duration: 4000,
  },
];

/* ─── Scene components ─── */

const DashboardScene = () => (
  <div className="w-full h-full flex flex-col gap-3 p-4">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
        <LayoutDashboard className="w-4 h-4 text-primary-foreground" />
      </div>
      <span className="font-display font-bold text-brand-navy text-sm">Painel Barty</span>
    </div>
    {[
      { icon: Utensils, label: "Cardápio Digital", desc: "12 itens ativos", color: "bg-primary/10 text-primary" },
      { icon: Tag, label: "Preços & Combos", desc: "3 combos criados", color: "bg-emerald-100 text-emerald-600" },
      { icon: QrCode, label: "QR Code do Evento", desc: "Pronto para imprimir", color: "bg-blue-100 text-blue-600" },
    ].map((card, i) => (
      <motion.div
        key={card.label}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 + i * 0.2, ease: "easeOut" }}
        className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border shadow-sm"
      >
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.color}`}>
          <card.icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-brand-navy">{card.label}</p>
          <p className="text-[10px] text-muted-foreground">{card.desc}</p>
        </div>
        <Check className="w-4 h-4 text-emerald-500" />
      </motion.div>
    ))}
  </div>
);

const QRScanScene = () => (
  <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative"
    >
      <div className="w-28 h-28 rounded-2xl bg-brand-navy flex items-center justify-center shadow-lg">
        <div className="grid grid-cols-3 grid-rows-3 gap-1 p-3 w-full h-full">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className={`rounded-sm ${i % 3 === 0 ? "bg-white" : "bg-white/40"}`}
            />
          ))}
        </div>
      </div>
      <motion.div
        animate={{ y: [0, 80, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 right-0 top-2 h-0.5 bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary))]"
      />
    </motion.div>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="text-xs font-semibold text-brand-navy text-center"
    >
      Aponte a câmera para o QR Code
    </motion.p>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ delay: 1.5, duration: 1.5 }}
      className="flex items-center gap-1.5 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-[10px] font-bold"
    >
      <Check className="w-3 h-3" /> Cardápio carregado!
    </motion.div>
  </div>
);

const MobileCartScene = () => {
  const items = [
    { name: "Hambúrguer Artesanal", price: "R$ 28,00", qty: 1 },
    { name: "Batata Frita", price: "R$ 15,00", qty: 2 },
    { name: "Refrigerante", price: "R$ 8,00", qty: 1 },
  ];
  return (
    <div className="w-full h-full flex flex-col p-4 gap-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-bold text-brand-navy">🛒 Meu Pedido</span>
        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">3 itens</span>
      </div>
      {items.map((item, i) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.2, ease: "easeOut" }}
          className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border"
        >
          <div>
            <p className="text-[11px] font-semibold text-brand-navy">{item.name}</p>
            <p className="text-[10px] text-muted-foreground">Qtd: {item.qty}</p>
          </div>
          <span className="text-[11px] font-bold text-primary">{item.price}</span>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-auto pt-2 border-t border-border"
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-brand-navy">Total</span>
          <span className="text-sm font-bold text-primary">R$ 66,00</span>
        </div>
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: [0.95, 1.02, 1] }}
          transition={{ delay: 1.3, duration: 0.4 }}
          className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold text-center shadow-md"
        >
          Pagar agora
        </motion.div>
      </motion.div>
    </div>
  );
};

const VendorValidationScene = () => (
  <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="text-center mb-2"
    >
      <ScanLine className="w-8 h-8 text-primary mx-auto mb-1" />
      <p className="text-xs font-bold text-brand-navy">Validação do Vendedor</p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="w-full p-3 rounded-xl bg-card border border-border shadow-sm"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
          <Users className="w-3.5 h-3.5 text-primary" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-brand-navy">Pedido #0247</p>
          <p className="text-[9px] text-muted-foreground">Mesa 12 • 3 itens</p>
        </div>
      </div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
        className="h-1 bg-primary rounded-full mb-2"
      />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full"
    >
      <Check className="w-4 h-4" />
      <span className="text-xs font-bold">Validado com sucesso!</span>
    </motion.div>
  </div>
);

const RevenueScene = () => {
  const bars = [35, 50, 42, 65, 78, 60, 90];
  return (
    <div className="w-full h-full flex flex-col p-4 gap-3">
      <div className="flex items-center gap-2 mb-1">
        <BarChart3 className="w-5 h-5 text-primary" />
        <span className="text-xs font-bold text-brand-navy">Faturamento Semanal</span>
      </div>
      <div className="flex items-end gap-1.5 h-28 px-2">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: "easeOut" }}
            className="flex-1 rounded-t-md bg-primary/80"
          />
        ))}
      </div>
      <div className="flex items-center justify-between text-[10px] text-muted-foreground px-2">
        {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20"
      >
        <DollarSign className="w-5 h-5 text-primary" />
        <div>
          <p className="text-[10px] text-muted-foreground">Total da semana</p>
          <p className="text-sm font-bold text-brand-navy">R$ 12.480,00</p>
        </div>
        <span className="ml-auto text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
          +23%
        </span>
      </motion.div>
    </div>
  );
};

const SCENES = [DashboardScene, QRScanScene, MobileCartScene, VendorValidationScene, RevenueScene];

const ProductDemo = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, STEPS[activeStep].duration);
    return () => clearTimeout(timer);
  }, [activeStep]);

  const ActiveScene = SCENES[activeStep];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-background via-accent/30 to-background">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/8 rounded-full blur-3xl translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3 bg-primary/10 px-4 py-1.5 rounded-full">
            Veja na prática
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mb-4">
            Uma experiência completa,{" "}
            <span className="text-primary">do início ao lucro</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Do painel de controle ao pagamento, veja como o Barty transforma a operação do seu evento.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
          {/* Left: Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative w-[280px] md:w-[300px]">
              {/* Phone frame */}
              <div className="rounded-[2.5rem] border-[6px] border-brand-navy bg-card shadow-2xl shadow-brand-navy/15 overflow-hidden">
                {/* Notch */}
                <div className="flex justify-center pt-2 pb-1 bg-card">
                  <div className="w-20 h-5 bg-brand-navy rounded-full" />
                </div>
                {/* Screen */}
                <div className="min-h-[380px] md:min-h-[400px] relative bg-card">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <ActiveScene />
                    </motion.div>
                  </AnimatePresence>
                </div>
                {/* Home bar */}
                <div className="flex justify-center py-2 bg-card">
                  <div className="w-24 h-1 bg-brand-navy/20 rounded-full" />
                </div>
              </div>

              {/* Floating text overlay */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${activeStep}`}
                  initial={{ opacity: 0, y: 10, x: 20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -right-4 md:-right-8 top-16 bg-card border border-border shadow-lg rounded-xl px-3 py-2 max-w-[160px]"
                >
                  <p className="text-[10px] font-bold text-brand-navy leading-tight">
                    {STEPS[activeStep].text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right: Steps timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-3"
          >
            {STEPS.map((step, i) => {
              const isActive = activeStep === i;
              const isPast = activeStep > i;
              return (
                <motion.button
                  key={step.id}
                  onClick={() => setActiveStep(i)}
                  className={`flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300 border ${
                    isActive
                      ? "bg-primary/10 border-primary/30 shadow-md shadow-primary/10"
                      : isPast
                      ? "bg-card border-border opacity-60"
                      : "bg-card border-border hover:border-primary/20"
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : isPast
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isPast ? <Check className="w-4 h-4" /> : <step.icon className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-bold transition-colors duration-300 ${
                        isActive ? "text-primary" : "text-brand-navy"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs text-muted-foreground leading-snug">{step.text}</p>
                  </div>
                  {isActive && (
                    <motion.div layoutId="step-arrow">
                      <ChevronRight className="w-4 h-4 text-primary shrink-0" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}

            {/* Progress bar */}
            <div className="h-1 bg-muted rounded-full overflow-hidden mt-2">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((activeStep + 1) / STEPS.length) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mt-4">
              <Button
                size="lg"
                className="rounded-full font-bold shadow-lg shadow-primary/20"
                onClick={() => navigate("/planos")}
              >
                Começar agora
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full font-bold"
                onClick={() => {
                  document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Ver como funciona
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductDemo;
