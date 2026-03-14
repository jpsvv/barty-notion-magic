import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "O cliente precisa baixar algum aplicativo?",
    answer: "Não. O Barty funciona 100% pelo navegador do celular. O cliente aponta a câmera para o QR Code, o cardápio abre instantaneamente — sem cadastro, sem download, sem atrito.",
  },
  {
    question: "Como o pedido chega para a cozinha?",
    answer: "Após o pagamento confirmado, o pedido aparece automaticamente no painel da cozinha (funciona em qualquer tablet, computador ou celular). Você pode imprimir o pedido ou exibir na tela — como preferir.",
  },
  {
    question: "O Barty funciona para eventos com grande público?",
    answer: "Sim. Nossa infraestrutura foi desenhada para lidar com picos de acesso. Festivais, formaturas, eventos corporativos — já processamos centenas de pedidos simultâneos sem instabilidade.",
  },
  {
    question: "Qual a diferença entre o Barty e sistemas como Zig, Meep ou Imply?",
    answer: "Simplicidade e custo real. Soluções como Zig e Imply são voltadas para grandes produtoras com equipe de TI e orçamento alto. O Barty foi feito para quem precisa vender mais amanhã de manhã, sem depender de técnico, contrato de 12 meses ou hardware caro. Você imprime o QR Code e começa.",
  },
  {
    question: "Posso personalizar o cardápio com fotos e promoções?",
    answer: "Sim. Você adiciona fotos, descrições, variações (ex.: tamanho, ponto da carne), preços e promoções diretamente no painel. Mudanças aparecem em tempo real para o cliente.",
  },
  {
    question: "Como funciona o repasse dos pagamentos?",
    answer: "O dinheiro cai diretamente na sua conta. Não somos intermediários financeiros — integramos com seu gateway de pagamento preferido. Pix é confirmado em segundos.",
  },
  {
    question: "Tem fidelidade ou contrato mínimo?",
    answer: "Para o plano de eventos, é uso por demanda — sem contrato. Para estabelecimentos fixos, mensalidade sem fidelidade obrigatória. Cancele quando quiser, sem multa.",
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
      aria-label="Perguntas frequentes sobre o sistema cashless Barty"
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