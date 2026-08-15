import React from 'react';
import { MessageSquare, PhoneCall } from 'lucide-react';
import { openWhatsAppChat, WHATSAPP_DISPLAY } from '../data/servicesData';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 group">
      {/* Floating tooltip badge on desktop */}
      <div className="hidden sm:flex items-center gap-1.5 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none transform translate-y-1 group-hover:translate-y-0">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>Fale conosco em Pelotas ({WHATSAPP_DISPLAY})</span>
      </div>

      <button
        onClick={() => openWhatsAppChat('Olá! Vim pelo site da Resolve360 e gostaria de solicitar um serviço em Pelotas.')}
        id="floating-whatsapp-btn"
        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold px-4 py-3.5 rounded-full shadow-2xl shadow-emerald-600/40 hover:scale-105 active:scale-95 transition-all duration-200"
        aria-label="Falar no WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="text-sm font-extrabold pr-1">WhatsApp</span>
      </button>
    </div>
  );
};
