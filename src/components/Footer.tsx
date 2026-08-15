import React from 'react';
import { Wrench, Phone, MapPin, Mail, MessageSquare, ShieldCheck, Heart } from 'lucide-react';
import { WHATSAPP_DISPLAY, openWhatsAppChat } from '../data/servicesData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/25">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-blue-400">
                  RESOLVE<span className="text-white">360</span>
                </span>
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase -mt-1">
                  Pelotas • Rio Grande do Sul
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Você chama. A gente resolve. A plataforma de soluções residenciais que conecta você aos melhores especialistas de Pelotas e região.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Pelotas, RS e Região Sul</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Sistema Operacional em Pelotas</span>
              </div>
            </div>
          </div>

          {/* Solutions Column 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-4">
              Serviços Elétricos & Tech
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#servicos" className="hover:text-blue-400 transition-colors">Instalação de Chuveiro</a></li>
              <li><a href="#servicos" className="hover:text-blue-400 transition-colors">Tomadas & Interruptores</a></li>
              <li><a href="#servicos" className="hover:text-blue-400 transition-colors">Disjuntores e Quadros</a></li>
              <li><a href="#servicos" className="hover:text-blue-400 transition-colors">Iluminação e Pendentes</a></li>
              <li><a href="#servicos" className="hover:text-blue-400 transition-colors">Carregador Carro Elétrico</a></li>
            </ul>
          </div>

          {/* Solutions Column 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-4">
              Redes & Segurança
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#servicos" className="hover:text-blue-400 transition-colors">Internet Wi-Fi Mesh</a></li>
              <li><a href="#servicos" className="hover:text-blue-400 transition-colors">Câmeras de Segurança</a></li>
              <li><a href="#servicos" className="hover:text-blue-400 transition-colors">Fechadura Digital Smart</a></li>
              <li><a href="#servicos" className="hover:text-blue-400 transition-colors">Automação Residencial</a></li>
              <li><a href="#servicos" className="hover:text-blue-400 transition-colors">Energia Solar Fotovoltaica</a></li>
            </ul>
          </div>

          {/* Quick Contact & Action */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-4">
              Atendimento Direto
            </h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Dúvidas ou emergência residencial? Fale com nosso suporte em Pelotas.
            </p>
            <button
              onClick={() => openWhatsAppChat('Olá! Vim pelo site da Resolve360 e gostaria de solicitar um atendimento.')}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chamar no WhatsApp</span>
            </button>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Resolve360 — Todos os direitos reservados. Pelotas, Rio Grande do Sul.
          </div>
          <div className="flex items-center gap-4">
            <a href="#inicio" className="hover:text-slate-300">Voltar ao topo ↑</a>
            <span>•</span>
            <a href="#admin" className="hover:text-slate-300">Painel Operacional</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
