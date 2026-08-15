import React from 'react';
import { MessageSquareText, Search, UserCheck, ShieldCheck, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenRequest: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenRequest }) => {
  const steps = [
    {
      number: '1',
      title: 'Conte o problema',
      description: 'Explique o que sua residência precisa pelo formulário rápido ou direto no WhatsApp.',
      icon: <MessageSquareText className="w-6 h-6 text-blue-600" />
    },
    {
      number: '2',
      title: 'Triagem técnica',
      description: 'Nossa equipe analisa a solicitação, avalia materiais e define a estimativa de custos.',
      icon: <Search className="w-6 h-6 text-blue-600" />
    },
    {
      number: '3',
      title: 'Profissional ideal',
      description: 'Selecionamos o especialista parceiro mais capacitado e próximo do seu bairro em Pelotas.',
      icon: <UserCheck className="w-6 h-6 text-blue-600" />
    },
    {
      number: '4',
      title: 'Execução & Garantia',
      description: 'Serviço executado com pontualidade, limpeza e suporte pós-atendimento garantido.',
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            Processo Simples e Sem Burocracia
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Como funciona a Resolve360
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Você não precisa perder tempo procurando vários profissionais. Nós coordenamos a solução do início ao fim.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="bg-slate-50 border border-slate-200 rounded-3xl p-6 relative hover:bg-white hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                    {step.number}
                  </div>
                  <div className="p-2.5 bg-white rounded-2xl border border-slate-200 shadow-xs">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10">
                  <span className="w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center text-xs font-bold shadow-xs">→</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenRequest}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all"
          >
            <span>Quero resolver meu problema agora</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
