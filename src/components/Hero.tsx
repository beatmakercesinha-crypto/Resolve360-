import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, HelpCircle, Send, Sparkles, Zap, Shield, Clock, MapPin } from 'lucide-react';

interface HeroProps {
  onOpenRequest: (category?: string, description?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRequest }) => {
  const [problemInput, setProblemInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickProblemSuggestions = [
    { label: '⚡ Tomada queimou ou sem energia', cat: 'Elétrica', desc: 'Tomada parou de funcionar e precisa de reparo/troca urgente.' },
    { label: '🚿 Trocar ou consertar chuveiro', cat: 'Elétrica', desc: 'Instalação de chuveiro elétrico novo com fiação adequada.' },
    { label: '📶 Wi-Fi fraco ou sem sinal nos quartos', cat: 'Internet e Wi-Fi', desc: 'Sinal de internet fraco, preciso de ponto de rede ou repetidor/mesh.' },
    { label: '📹 Instalar câmeras de segurança', cat: 'Segurança', desc: 'Instalação e configuração de câmeras de monitoramento.' },
    { label: '💡 Instalar luminárias e pendentes', cat: 'Elétrica', desc: 'Instalação de luminárias LED e pendentes decorativos.' }
  ];

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemInput.trim()) {
      onOpenRequest('Não sei o que preciso', '');
      return;
    }

    // Auto-detect best category based on keywords
    const lower = problemInput.toLowerCase();
    let detectedCategory = 'Outro serviço';
    if (lower.includes('tomada') || lower.includes('chuveiro') || lower.includes('luz') || lower.includes('disjuntor') || lower.includes('eletric') || lower.includes('fiação')) {
      detectedCategory = 'Elétrica';
    } else if (lower.includes('wifi') || lower.includes('wi-fi') || lower.includes('internet') || lower.includes('rede') || lower.includes('roteador') || lower.includes('cabo')) {
      detectedCategory = 'Internet e Wi-Fi';
    } else if (lower.includes('camera') || lower.includes('câmera') || lower.includes('alarme') || lower.includes('fechadura') || lower.includes('seguran')) {
      detectedCategory = 'Segurança';
    } else if (lower.includes('solar') || lower.includes('painel') || lower.includes('placa')) {
      detectedCategory = 'Energia Solar';
    } else if (lower.includes('alexa') || lower.includes('smart') || lower.includes('automa')) {
      detectedCategory = 'Automação';
    } else if (lower.includes('tv') || lower.includes('suporte') || lower.includes('som')) {
      detectedCategory = 'Tecnologia';
    }

    onOpenRequest(detectedCategory, problemInput.trim());
  };

  return (
    <section id="inicio" className="relative overflow-hidden bg-slate-900 text-white pt-10 pb-16 lg:pt-14 lg:pb-24">
      {/* Sleek Atmospheric Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 blur-[130px] opacity-35 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-700 blur-[120px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Hero Headline & Messaging */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold uppercase tracking-widest">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-ping" />
              <span>Base Operacional Pelotas / RS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white leading-[1.06]">
              Você chama. <br />
              <span className="text-blue-400">
                A gente resolve.
              </span>
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl max-w-2xl font-normal leading-relaxed">
              Soluções completas para sua residência em Pelotas e região: elétrica, segurança, internet e automação inteligente.
            </p>

            {/* Quick Action CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onOpenRequest()}
                id="hero-solicitar-btn"
                className="px-6 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 flex items-center gap-2 text-base group"
              >
                <span>Solicitar Serviço</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onOpenRequest('Não sei o que preciso', 'Preciso de uma avaliação técnica pois não sei exatamente a causa do problema.')}
                id="hero-duvida-btn"
                className="px-5 py-3.5 rounded-xl font-semibold text-slate-200 bg-white/10 hover:bg-white/15 border border-white/10 transition-all flex items-center gap-2 text-base backdrop-blur-sm"
              >
                <HelpCircle className="w-4 h-4 text-blue-400" />
                <span>Não sei o que preciso</span>
              </button>
            </div>

            {/* Value Props / Guarantee badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Triagem Ágil</h4>
                  <p className="text-[11px] text-slate-400">Resposta rápida no WhatsApp</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 shrink-0 mt-0.5">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Técnicos Avaliados</h4>
                  <p className="text-[11px] text-slate-400">Parceiros credenciados</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 col-span-2 sm:col-span-1">
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Pelotas & Região</h4>
                  <p className="text-[11px] text-slate-400">Atendimento presencial</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sleek Problem Intake Card ("O que aconteceu?") */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 blur-[80px] opacity-30 pointer-events-none"></div>

              <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">O que aconteceu?</h3>
                    <p className="text-xs text-slate-400">Descreva o problema para atendimento</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Online
                </span>
              </div>

              <form onSubmit={handleHeroSubmit} className="mt-4 space-y-3 relative z-10">
                <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <label htmlFor="problemaHero" className="block text-xs uppercase font-bold text-blue-400 mb-2 tracking-widest">
                    Qual a necessidade da sua casa?
                  </label>
                  <textarea
                    id="problemaHero"
                    rows={3}
                    value={problemInput}
                    onChange={(e) => setProblemInput(e.target.value)}
                    placeholder="Ex: Preciso instalar um ventilador de teto, chuveiro queimou ou configurar meu Wi-Fi Mesh..."
                    className="w-full bg-transparent border-none text-sm text-white placeholder:text-slate-500 focus:ring-0 focus:outline-none resize-none leading-relaxed"
                  ></textarea>
                </div>

                {/* Fast Problem Chips */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                    Problemas frequentes em Pelotas:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickProblemSuggestions.map((item, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => {
                          setProblemInput(item.desc);
                          onOpenRequest(item.cat, item.desc);
                        }}
                        className="text-xs text-slate-300 bg-slate-900/80 hover:bg-blue-600 hover:text-white border border-slate-700/70 hover:border-blue-500 px-2.5 py-1 rounded-xl transition-colors text-left"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  id="hero-encontrar-solucao-btn"
                  className="w-full mt-2 py-3.5 bg-white text-slate-900 hover:bg-blue-400 hover:text-white active:bg-blue-500 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Encontrar Solução</span>
                </button>
              </form>

              {/* Local operational badge */}
              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>Atendimento em Pelotas e região sul</span>
                </div>
                <span className="text-slate-500 text-[11px] font-mono">Resolve360 Hub</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
