import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, type LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import CtaFooter from "@/components/CtaFooter";
import { useEffect } from "react";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
}

interface Objection {
  question: string;
  answer: string;
}

interface SolutionPageProps {
  pageTitle: string;
  heroTag: string;
  heroTitle: React.ReactNode;
  heroDescription: string;
  heroCtaText?: string;
  steps: Step[];
  stepsTitle: string;
  stepsSubtitle: string;
  benefits: Benefit[];
  benefitsTitle: string;
  benefitsSubtitle: string;
  comparisonTitle: string;
  comparisonItems: { old: string; barty: string }[];
  objections: Objection[];
  objectionsTitle: string;
  metricsBanner?: { value: string; label: string }[];
  extraSection?: React.ReactNode;
}

const SolutionPageLayout = ({
  heroTag,
  heroTitle,
  heroDescription,
  heroCtaText = "Solicitar demo grátis",
  steps,
  stepsTitle,
  stepsSubtitle,
  benefits,
  benefitsTitle,
  benefitsSubtitle,
  comparisonTitle,
  comparisonItems,
  objections,
  objectionsTitle,
  metricsBanner,
  extraSection,
}: SolutionPageProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 mesh-gradient-bg" aria-hidden="true" />
          <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-primary/5 blur-3xl bubble-float" aria-hidden="true" />
          <div className="absolute top-40 right-[15%] w-80 h-80 rounded-full bg-primary/8 blur-3xl bubble-float-delayed" aria-hidden="true" />

          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 mb-8"
              >
                <span className="text-sm font-medium text-primary">{heroTag}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] mb-6 tracking-tight"
              >
                {heroTitle}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed font-light"
              >
                {heroDescription}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <a
                  href="https://wa.me/553484428888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-primary-foreground text-base font-semibold"
                >
                  {heroCtaText}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="/"
                  className="glass-card inline-flex items-center justify-center px-8 py-4 rounded-2xl text-foreground text-base font-medium hover:bg-card/80 transition-colors"
                >
                  Ver todas as soluções
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Metrics Banner */}
        {metricsBanner && (
          <section className="py-12 border-y border-border bg-muted/30">
            <div className="container">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {metricsBanner.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center"
                  >
                    <p className="font-display text-3xl md:text-4xl font-bold text-gradient">{m.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{m.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* How it works */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="container relative z-10">
            <header className="text-center mb-16">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-semibold text-primary tracking-widest uppercase mb-4"
              >
                {stepsSubtitle}
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-3xl md:text-5xl font-bold text-foreground"
              >
                {stepsTitle}
              </motion.h2>
            </header>

            <ol className="max-w-4xl mx-auto space-y-6">
              {steps.map((step, i) => (
                <motion.li
                  key={step.number}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6 md:p-8 flex gap-6 items-start"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="font-display text-lg font-bold text-primary">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-24 md:py-32 bg-muted/20 relative overflow-hidden">
          <div className="absolute inset-0 mesh-gradient-bg opacity-30" aria-hidden="true" />
          <div className="container relative z-10">
            <header className="text-center mb-16">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-semibold text-primary tracking-widest uppercase mb-4"
              >
                {benefitsSubtitle}
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-3xl md:text-5xl font-bold text-foreground"
              >
                {benefitsTitle}
              </motion.h2>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {benefits.map((b, i) => (
                <motion.article
                  key={b.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card rounded-2xl p-6 md:p-8"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <b.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison: Old way vs Barty */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="container relative z-10">
            <header className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-3xl md:text-5xl font-bold text-foreground"
              >
                {comparisonTitle}
              </motion.h2>
            </header>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Jeito antigo</span>
                </div>
                <div className="text-center">
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">Com Barty</span>
                </div>
              </div>
              <div className="space-y-3">
                {comparisonItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="glass-card rounded-xl p-4 text-sm text-muted-foreground border-destructive/20 bg-destructive/5">
                      {item.old}
                    </div>
                    <div className="glass-card rounded-xl p-4 text-sm text-foreground border-primary/20 bg-primary/5 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item.barty}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Extra section slot */}
        {extraSection}

        {/* Objections / FAQ */}
        <section className="py-24 md:py-32 bg-muted/20 relative overflow-hidden">
          <div className="absolute inset-0 mesh-gradient-bg opacity-20" aria-hidden="true" />
          <div className="container relative z-10">
            <header className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-3xl md:text-5xl font-bold text-foreground"
              >
                {objectionsTitle}
              </motion.h2>
            </header>

            <div className="max-w-3xl mx-auto space-y-4">
              {objections.map((obj, i) => (
                <ObjectionItem key={obj.question} question={obj.question} answer={obj.answer} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-foreground" aria-hidden="true" />
          <div className="absolute top-10 left-[20%] w-72 h-72 rounded-full bg-primary/10 blur-3xl bubble-float" aria-hidden="true" />

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="font-display text-3xl md:text-5xl font-bold text-background mb-6 leading-tight">
                Pronto pra revolucionar suas <span className="text-primary">vendas?</span>
              </h2>
              <p className="text-background/60 text-lg mb-10 font-light">
                Sem contrato. Sem custos fixos. Setup grátis. Migração em 24h.
              </p>
              <a
                href="https://wa.me/553484428888"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl text-primary-foreground text-lg font-semibold"
              >
                {heroCtaText}
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <CtaFooter />
    </div>
  );
};

const ObjectionItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="glass-card rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left"
        aria-expanded={open}
      >
        <span className="font-display font-semibold text-foreground pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-6" : "max-h-0"}`}>
        <p className="px-6 text-sm text-muted-foreground leading-relaxed">{answer}</p>
      </div>
    </motion.div>
  );
};

import { useState } from "react";

export default SolutionPageLayout;
