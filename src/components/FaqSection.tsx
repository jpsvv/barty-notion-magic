import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "O que é o Barty?",
    answer: "Barty é um cardápio digital com QR Code que permite aos clientes fazerem pedidos e pagamentos diretamente pelo celular, sem precisar baixar nenhum aplicativo. Funciona para restaurantes, bares, cafeterias e eventos.",
  },
  {
    question: "Como funciona o cardápio digital do Barty?",
    answer: "O cliente escaneia um QR Code na mesa, acessa o cardápio digital no navegador do celular, monta o pedido, paga com Pix ou cartão e acompanha o preparo em tempo real. Tudo sem instalar app e sem precisar de atendente.",
  },
  {
    question: "Quanto custa o Barty?",
    answer: "O Barty oferece dois modelos: para Eventos, sem custo fixo (paga apenas uma taxa por transação); e para Estabelecimentos, com mensalidade fixa e pedidos ilimitados. O teste é grátis, sem cartão de crédito.",
  },
  {
    question: "O cliente precisa baixar algum aplicativo?",
    answer: "Não. O Barty funciona 100% no navegador do celular. Basta escanear o QR Code e o cardápio abre automaticamente, sem download, sem cadastro.",
  },
  {
    question: "Quais formas de pagamento o Barty aceita?",
    answer: "O Barty aceita pagamento via Pix, cartão de crédito e cartão de débito, tudo integrado diretamente no pedido digital.",
  },
  {
    question: "O Barty funciona para eventos?",
    answer: "Sim. O Barty tem um plano específico para eventos com setup em minutos, sem custo fixo e suporte dedicado durante o evento. Ideal para festas, feiras, festivais e confraternizações.",
  },
];

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left"
        aria-expanded={open}
      >
        <span className="font-display font-semibold text-foreground pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-6" : "max-h-0"}`}
      >
        <p className="px-6 text-sm text-muted-foreground leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const FaqSection = () => {
  return (
    <section
      id="perguntas-frequentes"
      className="py-24 md:py-32 relative overflow-hidden"
      aria-label="Perguntas frequentes sobre o Barty"
    >
      <div className="absolute inset-0 mesh-gradient-bg opacity-30" aria-hidden="true" />

      <div className="container relative z-10">
        <header className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary tracking-widest uppercase mb-4"
          >
            Perguntas frequentes
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl font-bold text-foreground"
          >
            Tire suas dúvidas sobre o <span className="text-gradient">Barty</span>
          </motion.h2>
        </header>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <FaqItem question={faq.question} answer={faq.answer} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
