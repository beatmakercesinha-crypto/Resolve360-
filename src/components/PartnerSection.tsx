import React from 'react';
import { UserCheck, ShieldCheck, DollarSign, CalendarCheck, ArrowRight, MessageSquare } from 'lucide-react';
import { openWhatsAppChat } from '../data/servicesData';

export const PartnerSection: React.FC = () => {
  const handlePartnerApply = () => {
    openWhatsAppChat(
      'Olá, Resolve360!\n\nSou profissional de serviços residenciais em Pelotas/RS e gostaria de me cadastrar como parceiro prestador de serviços.'
    );
  };

  return (
    <section id="parceiros" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-slate-800">
          {/* Sleek Background blur decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 blur-[130px] opacity-35 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-700 blur-[100px] opacity-20 pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-widest mb-4">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Rede Credenciada Pelotas & Região</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tighter leading-tight">
              Você é eletricista, técnico de rede ou prestador de serviços?
            </h2>

            <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">
              Receba chamados qualificados em Pelotas sem perder tempo negociando ou cobrando clientes. Faça parte da rede oficial <strong>Resolve360</strong>.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5 backdrop-blur-sm">
                <DollarSign className="w-5 h-5 text-emerald-400 mb-2" />
                <h4 className="font-bold text-sm text-white">Demanda Constante</h4>
                <p className="text-xs text-slate-400 mt-1">Chamados prontos no seu bairro</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5 backdrop-blur-sm">
                <CalendarCheck className="w-5 h-5 text-sky-400 mb-2" />
                <h4 className="font-bold text-sm text-white">Agenda Flexível</h4>
                <p className="text-xs text-slate-400 mt-1">Você define seus horários livres</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5 backdrop-blur-sm">
                <ShieldCheck className="w-5 h-5 text-blue-400 mb-2" />
                <h4 className="font-bold text-sm text-white">Pagamento Garantido</h4>
                <p className="text-xs text-slate-400 mt-1">Sem risco de inadimplência</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handlePartnerApply}
                id="partner-whatsapp-btn"
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Quero ser parceiro Resolve360</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-400">
                Cadastro simplificado via WhatsApp • Pelotas, RS
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
