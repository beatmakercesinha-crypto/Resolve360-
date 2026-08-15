import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  Phone,
  MessageSquare,
  ShieldCheck,
  Navigation,
  Clock,
  Car,
  Star,
  CheckCircle2,
  AlertCircle,
  Radio
} from 'lucide-react';
import { TechnicianLocation } from '../types';
import { openWhatsAppChat } from '../data/servicesData';

interface LiveTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId?: string;
  serviceTitle?: string;
  clientAddress?: string;
  clientNeighborhood?: string;
}

export const LiveTrackingModal: React.FC<LiveTrackingModalProps> = ({
  isOpen,
  onClose,
  bookingId = 'AGD-2026-8841',
  serviceTitle = 'Manutenção Elétrica & Quadro 220V',
  clientAddress = 'Rua Gonçalves Chaves, 450',
  clientNeighborhood = 'Centro'
}) => {
  // Simulated dynamic technician telemetry
  const [technicianData, setTechnicianData] = useState<TechnicianLocation>({
    technicianId: 'TEC-RS-09',
    name: 'Carlos Eduardo Silveira',
    role: 'Eletrotécnico & Especialista em Redes',
    vehicle: 'Fiat Strada Branca (Equipada com Escada e Maleta Fluke)',
    plate: 'JXX-4D90 (Pelotas/RS)',
    rating: 4.96,
    phone: '(53) 98124-7730',
    currentLat: -31.7654,
    currentLng: -52.3376,
    destinationLat: -31.7719,
    destinationLng: -52.3424,
    destinationNeighborhood: clientNeighborhood,
    estimatedArrivalMinutes: 8,
    status: 'A caminho',
    currentRouteStep: 'Deslocando pela Av. Bento Gonçalves próximo ao Parque Dom Antônio Zattera'
  });

  const [progressPercent, setProgressPercent] = useState(45);
  const [pulseLive, setPulseLive] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    // Simulation of progress countdown
    const interval = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 92) {
          setTechnicianData((t) => ({
            ...t,
            estimatedArrivalMinutes: 2,
            status: 'Chegando em 5 min',
            currentRouteStep: 'Entrando na sua rua. Preparando ferramentas e crachá de segurança.'
          }));
          return 95;
        }
        return prev + 4;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCallTechnician = () => {
    window.location.href = `tel:${technicianData.phone.replace(/\D/g, '')}`;
  };

  const handleWhatsAppTechnician = () => {
    openWhatsAppChat(
      `Olá Carlos! Aqui é o cliente do agendamento ${bookingId} (${serviceTitle}). Estou aguardando no endereço ${clientAddress}, ${clientNeighborhood}.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className="bg-slate-900 text-white rounded-3xl max-w-2xl w-full border border-slate-700 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200 my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Micro Bar */}
        <div className="bg-slate-950 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Rastreamento em Tempo Real • Pelotas
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Map Stage Simulator (Vector-rendered Pelotas Route) */}
        <div className="relative bg-slate-950 h-56 sm:h-64 overflow-hidden border-b border-slate-800 flex items-center justify-center">
          {/* Stylized Dark GPS Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

          {/* SVG Route Visualization */}
          <svg className="w-full h-full absolute inset-0" viewBox="0 0 600 240">
            {/* Street Lines */}
            <path
              d="M 50 120 Q 200 40 320 140 T 540 90"
              fill="none"
              stroke="#334155"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M 50 120 Q 200 40 320 140 T 540 90"
              fill="none"
              stroke="#0b5cff"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="8 6"
            />

            {/* Departure Point (Base Resolve360) */}
            <g transform="translate(50, 120)">
              <circle r="12" fill="#0f172a" stroke="#0b5cff" strokeWidth="3" />
              <circle r="5" fill="#3b82f6" />
              <text x="0" y="26" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
                Base Centro
              </text>
            </g>

            {/* Live Moving Technician Vehicle */}
            <g
              transform={`translate(${50 + (490 * progressPercent) / 100}, ${
                120 - Math.sin((progressPercent / 100) * Math.PI) * 50
              })`}
            >
              {/* Radar pulse wave */}
              <circle r="22" fill="#3b82f6" opacity="0.2" className="animate-ping" />
              <circle r="16" fill="#0b5cff" stroke="#ffffff" strokeWidth="2.5" />
              <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                🚗
              </text>
            </g>

            {/* Destination Point (Client House) */}
            <g transform="translate(540, 90)">
              <circle r="14" fill="#059669" stroke="#ffffff" strokeWidth="2.5" />
              <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                🏠
              </text>
              <text x="0" y="28" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">
                Seu Imóvel ({clientNeighborhood})
              </text>
            </g>
          </svg>

          {/* Floating ETA Badge */}
          <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center font-black">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Tempo Estimado de Chegada
              </span>
              <div className="text-lg font-black text-white flex items-center gap-1.5">
                <span>{technicianData.estimatedArrivalMinutes} minutos</span>
                <span className="text-xs text-emerald-400 font-bold font-mono">({technicianData.status})</span>
              </div>
            </div>
          </div>

          {/* Live Speed / Telemetry Badge */}
          <div className="absolute bottom-3 right-4 bg-slate-900/80 backdrop-blur-sm border border-slate-700/80 rounded-xl px-3 py-1.5 text-[11px] text-slate-300 flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>GPS 4G Ativo • Atualizado há 3s</span>
          </div>
        </div>

        {/* Live Route Description */}
        <div className="p-6 sm:p-7 space-y-6">
          <div className="bg-slate-800/80 rounded-2xl p-3.5 border border-slate-700/80 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Navigation className="w-4 h-4" />
            </div>
            <div className="text-xs text-slate-300">
              <span className="font-bold text-white block">Posição Atual:</span>
              <span>{technicianData.currentRouteStep}</span>
            </div>
          </div>

          {/* Technician Profile Card (Safety & Identity verification) */}
          <div className="bg-slate-800/90 rounded-3xl p-5 border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-black text-xl flex items-center justify-center border-2 border-blue-400 shadow-md">
                  CE
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-[10px]">
                  ✓
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-white">{technicianData.name}</h4>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{technicianData.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400">{technicianData.role}</p>
                <div className="text-[11px] text-slate-300 flex items-center gap-1.5 mt-1">
                  <Car className="w-3.5 h-3.5 text-blue-400" />
                  <span>{technicianData.vehicle} • <strong>{technicianData.plate}</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleWhatsAppTechnician}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleCallTechnician}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Ligar</span>
              </button>
            </div>
          </div>

          {/* Safety & Protocol Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-800/40 rounded-2xl border border-slate-700/60 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
              <span className="text-slate-300">
                Profissional Uniformizado com Crachá Digital Resolve360
              </span>
            </div>
            <div className="p-3 bg-slate-800/40 rounded-2xl border border-slate-700/60 flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-slate-300">
                EPIs completos & Ferramental aferido (Calçado isolante 1000V)
              </span>
            </div>
          </div>

          {/* Service Recap */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-500">Agendamento:</span>
              <span className="text-white font-medium">{serviceTitle}</span>
            </div>
            <div className="text-right">
              <span className="block text-[10px] uppercase font-bold text-slate-500">Destino:</span>
              <span className="text-white font-medium">{clientAddress}, {clientNeighborhood}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
