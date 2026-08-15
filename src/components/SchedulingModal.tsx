import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, User, Phone, CheckCircle2, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SERVICES_CATALOG, openWhatsAppChat } from '../data/servicesData';
import { Booking } from '../types';

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string;
  preSelectedServiceTitle?: string;
}

const TIME_SLOTS = [
  { id: 'morning', label: '08:30 - 11:30 (Manhã)', badge: 'Mais Popular' },
  { id: 'afternoon', label: '13:30 - 16:30 (Tarde)', badge: 'Disponível' },
  { id: 'evening', label: '17:30 - 19:30 (Fim de Tarde)', badge: 'Horário Especial' },
  { id: 'emergency', label: 'Plantão Emergencial (Hoje)', badge: 'Atendimento Rápido' }
];

const PELOTAS_NEIGHBORHOODS = [
  'Centro',
  'Areal',
  'Fragata',
  'Laranjal (Praia)',
  'Três Vendas',
  'Porto / Guabiroba',
  'São Gonçalo',
  'Py Crespo',
  'Capão do Leão',
  'Arroio do Padre',
  'Rio Grande',
  'Outro Bairro / Cidade'
];

export const SchedulingModal: React.FC<SchedulingModalProps> = ({
  isOpen,
  onClose,
  preSelectedServiceId,
  preSelectedServiceTitle
}) => {
  const { currentUser, createBooking } = useAuth();

  const [selectedServiceId, setSelectedServiceId] = useState(
    preSelectedServiceId || 'eletrica'
  );
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(TIME_SLOTS[0].label);
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [neighborhood, setNeighborhood] = useState(currentUser?.neighborhood || 'Centro');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [notes, setNotes] = useState('');
  
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  if (!isOpen) return null;

  const currentService = SERVICES_CATALOG.find((s) => s.id === selectedServiceId) || SERVICES_CATALOG[0];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const booking = createBooking({
      serviceId: currentService.id,
      serviceTitle: currentService.title,
      category: currentService.category,
      userEmail: email || currentUser?.email || 'cliente@resolve360.com.br',
      userName: name || currentUser?.name || 'Cliente Resolve360',
      userPhone: phone || currentUser?.phone || '(51) 98233-0934',
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      address: address || 'A combinar com o técnico',
      neighborhood,
      city: 'Pelotas',
      notes,
      estimatedPrice: 150
    });

    setConfirmedBooking(booking);
  };

  const handleWhatsAppDispatch = () => {
    if (!confirmedBooking) return;
    const msg = `*NOVO AGENDAMENTO RESOLVE360 PELOTAS*\n` +
      `📅 *Código:* #${confirmedBooking.id}\n` +
      `🛠️ *Serviço:* ${confirmedBooking.serviceTitle}\n` +
      `👤 *Cliente:* ${confirmedBooking.userName}\n` +
      `📱 *Telefone:* ${confirmedBooking.userPhone}\n` +
      `🗓️ *Data Agendada:* ${confirmedBooking.date.split('-').reverse().join('/')}\n` +
      `⏰ *Horário:* ${confirmedBooking.timeSlot}\n` +
      `📍 *Local:* ${confirmedBooking.neighborhood}, Pelotas/RS\n` +
      `🏠 *Endereço:* ${confirmedBooking.address}\n` +
      (confirmedBooking.notes ? `📝 *Observações:* ${confirmedBooking.notes}\n` : '') +
      `\nSolicito a confirmação do técnico para o agendamento!`;

    openWhatsAppChat(msg);
  };

  const nextDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      iso: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''),
      dayNumber: d.getDate(),
      month: d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Agendamento de Atendimento
              </h3>
              <p className="text-xs text-slate-400">
                Escolha o serviço, data e horário em Pelotas e região
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {confirmedBooking ? (
            /* Confirmation Screen */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto animate-in zoom-in-75">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase font-bold text-emerald-400 tracking-widest">
                  Agendamento Confirmado!
                </span>
                <h4 className="text-2xl font-extrabold text-white">
                  {confirmedBooking.serviceTitle}
                </h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Seu agendamento foi registrado e o prestador credenciado foi notificado.
                </p>
              </div>

              {/* Booking Details Ticket */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 text-left text-xs space-y-3 max-w-lg mx-auto">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <span className="text-slate-400">Código do Agendamento:</span>
                  <span className="font-mono font-bold text-blue-400">#{confirmedBooking.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Data Agendada:</span>
                  <span className="font-bold text-white">
                    {confirmedBooking.date.split('-').reverse().join('/')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Horário:</span>
                  <span className="font-bold text-emerald-400">{confirmedBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Técnico Designado:</span>
                  <span className="font-bold text-white">{confirmedBooking.technicianName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Local de Atendimento:</span>
                  <span className="font-bold text-white">{confirmedBooking.neighborhood}, Pelotas/RS</span>
                </div>
              </div>

              {/* Notification Banner */}
              <div className="p-3.5 bg-blue-500/10 border border-blue-400/20 rounded-2xl flex items-center gap-3 text-xs text-blue-200 text-left max-w-lg mx-auto">
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
                <span>
                  <strong>Notificação Enviada:</strong> Você e o técnico receberão lembretes antes do horário marcado.
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2">
                <button
                  onClick={handleWhatsAppDispatch}
                  className="flex-1 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enviar para o WhatsApp</span>
                </button>
                <button
                  onClick={onClose}
                  className="py-3.5 px-6 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-xl transition-all"
                >
                  Ver no Painel
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              
              {/* Service Selection */}
              <div>
                <label className="block text-xs uppercase font-bold text-slate-300 tracking-wider mb-2">
                  1. Selecione o Serviço Desejado
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full bg-slate-950/90 border border-slate-800 focus:border-blue-500 rounded-2xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  {SERVICES_CATALOG.map((s) => (
                    <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                      {s.title} ({s.category}) — {s.priceText}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs uppercase font-bold text-slate-300 tracking-wider">
                    2. Escolha a Data da Visita
                  </label>
                  <span className="text-[11px] text-blue-400 font-medium">
                    Atendimento de Segunda a Sábado
                  </span>
                </div>

                {/* Quick Date Pills */}
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {nextDays.map((d) => (
                    <button
                      key={d.iso}
                      type="button"
                      onClick={() => setSelectedDate(d.iso)}
                      className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                        selectedDate === d.iso
                          ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold opacity-75">{d.dayName}</span>
                      <span className="text-lg font-black">{d.dayNumber}</span>
                      <span className="text-[10px] opacity-75">{d.month}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs uppercase font-bold text-slate-300 tracking-wider mb-2">
                  3. Escolha a Faixa de Horário
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot.label)}
                      className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        selectedTimeSlot === slot.label
                          ? 'bg-blue-600/20 border-blue-500 text-white ring-1 ring-blue-500'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-bold">{slot.label}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400 bg-white/5 px-2 py-0.5 rounded-md">
                        {slot.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location & Contact Info */}
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  4. Informações do Imóvel & Contato
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Seu Nome</label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome completo"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">WhatsApp / Celular</label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(51) 98233-0934"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Bairro em Pelotas</label>
                    <select
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      {PELOTAS_NEIGHBORHOODS.map((b) => (
                        <option key={b} value={b} className="bg-slate-900 text-white">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Endereço / Número</label>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Rua, número, apto..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Detalhes do que precisa ser feito (opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex: Chuveiro parou de aquecer, preciso de troca rápida ou instalação de 2 tomadas adicionais..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <span>Confirmar Agendamento</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
