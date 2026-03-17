import { motion } from "framer-motion";

interface PhoneScreen {
  icon?: string;
  title: string;
  subtitle?: string;
  items?: { label: string; price?: string; badge?: string }[];
  accent?: "orange" | "navy";
}

interface PhoneMockupProps {
  screens: PhoneScreen[];
  className?: string;
}

const PhoneMockup = ({ screens, className = "" }: PhoneMockupProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: -8 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className={`relative ${className}`}
      style={{ perspective: "1200px" }}
    >
      {/* Phone frame */}
      <div className="relative w-[280px] md:w-[320px] mx-auto">
        <div className="rounded-[2.5rem] border-[6px] border-brand-navy bg-white shadow-2xl shadow-brand-navy/20 overflow-hidden">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-3 pb-2 bg-white">
            <span className="text-[10px] font-semibold text-brand-navy">9:41</span>
            <div className="flex gap-1">
              <div className="w-3.5 h-2 rounded-sm bg-brand-navy/30" />
              <div className="w-3.5 h-2 rounded-sm bg-brand-navy/30" />
              <div className="w-5 h-2.5 rounded-sm bg-brand-navy" />
            </div>
          </div>

          {/* Screen content */}
          <div className="px-4 pb-6 space-y-3 min-h-[380px] md:min-h-[420px]">
            {screens.map((screen, si) => (
              <motion.div
                key={screen.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + si * 0.2 }}
              >
                {si === 0 && (
                  <div className="text-center mb-4">
                    {screen.icon && <span className="text-3xl">{screen.icon}</span>}
                    <h4 className="font-display font-bold text-brand-navy text-sm mt-1">{screen.title}</h4>
                    {screen.subtitle && (
                      <p className="text-[10px] text-muted-foreground mt-0.5">{screen.subtitle}</p>
                    )}
                  </div>
                )}

                {screen.items && (
                  <div className="space-y-2">
                    {screen.items.map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + si * 0.2 + i * 0.12 }}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-muted/60 border border-border"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <div className="w-4 h-4 rounded bg-primary/30" />
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold text-brand-navy">{item.label}</p>
                            {item.price && (
                              <p className="text-[10px] text-primary font-bold">{item.price}</p>
                            )}
                          </div>
                        </div>
                        {item.badge && (
                          <span className="text-[9px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}

            {/* Animated QR Code indicator */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
              className="flex flex-col items-center pt-2"
            >
              <div className="w-16 h-16 rounded-xl border-2 border-dashed border-primary/40 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-10 h-10 rounded-lg bg-brand-navy grid grid-cols-3 grid-rows-3 gap-0.5 p-1"
                >
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className={`rounded-sm ${i % 3 === 0 ? 'bg-white' : 'bg-white/40'}`} />
                  ))}
                </motion.div>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="text-[9px] text-primary font-bold mt-1.5 tracking-wide uppercase"
              >
                QR Code pronto
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Floating notification */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 1.8, type: "spring" }}
          className="absolute -right-4 top-24 glass-card-strong rounded-xl px-3 py-2 shadow-lg max-w-[140px]"
        >
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-[9px] font-semibold text-brand-navy">Pagamento confirmado</span>
          </div>
        </motion.div>

        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, x: -30, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 2.1, type: "spring" }}
          className="absolute -left-3 bottom-32 glass-card-strong rounded-xl px-3 py-2 shadow-lg"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-sm">🚀</span>
            <span className="text-[9px] font-semibold text-brand-navy">Zero filas</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PhoneMockup;
