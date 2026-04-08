import { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const RevenueSimulator = () => {
  const [revenue, setRevenue] = useState(10000);

  const freeRate = 0.01;
  const completeRate = 0.005;
  const completeSub = 99.9;

  const freeCost = revenue * freeRate;
  const completeCost = revenue * completeRate + completeSub;
  const savings = freeCost - completeCost;

  return (
    <section className="mt-24 mb-0">
      <div className="bg-gradient-to-br from-[hsl(215,50%,15%)] via-[hsl(215,45%,20%)] to-[hsl(22,90%,25%)] py-16 md:py-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              Simulador
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-3">
              Simule o custo para o seu negócio
            </h2>
            <p className="text-white/60 max-w-md mx-auto text-sm">
              Arraste a barra e veja quanto você pagaria em cada plano.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/70 text-sm font-medium">Faturamento mensal estimado</span>
              <span className="font-display text-2xl md:text-3xl font-bold text-primary">
                {formatCurrency(revenue)}
              </span>
            </div>
            <Slider
              value={[revenue]}
              onValueChange={(v) => setRevenue(v[0])}
              min={5000}
              max={200000}
              step={5000}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-xs text-white/40">
              <span>R$ 5.000</span>
              <span>R$ 200.000</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Free plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8"
            >
              <h3 className="font-display text-lg font-bold text-white mb-1">Plano Grátis</h3>
              <p className="text-white/50 text-xs mb-6">Taxa de 1% sobre faturamento</p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Mensalidade</span>
                  <span className="text-white font-semibold">R$ 0,00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Taxa (1%)</span>
                  <span className="text-white font-semibold">{formatCurrency(revenue * freeRate)}</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between text-sm">
                  <span className="text-white/80 font-medium">Custo total</span>
                  <span className="text-white font-display text-xl font-bold">{formatCurrency(freeCost)}</span>
                </div>
              </div>
            </motion.div>

            {/* Complete plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border-2 border-primary/40 bg-primary/10 backdrop-blur-sm p-6 md:p-8 relative"
            >
              {savings > 0 && (
                <div className="absolute -top-3 right-6 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  Economia de {formatCurrency(savings)}
                </div>
              )}
              <h3 className="font-display text-lg font-bold text-white mb-1">Plano Completo</h3>
              <p className="text-white/50 text-xs mb-6">R$ 99,90/mês + 0,5% sobre faturamento</p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Mensalidade</span>
                  <span className="text-white font-semibold">{formatCurrency(completeSub)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Taxa (0,5%)</span>
                  <span className="text-white font-semibold">{formatCurrency(revenue * completeRate)}</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between text-sm">
                  <span className="text-white/80 font-medium">Custo total</span>
                  <span className="text-primary font-display text-xl font-bold">{formatCurrency(completeCost)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueSimulator;
