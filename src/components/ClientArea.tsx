import React, { useState } from 'react';
import {
  Wrench,
  FileText,
  Calendar,
  Home,
  CheckCircle2,
  Clock,
  ChevronRight,
  User,
  Phone,
  PlusCircle,
  MessageCircle,
  Star,
  ShieldCheck,
  MapPin,
  Settings,
  Sparkles,
  CalendarCheck,
  Check,
  X,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { openWhatsAppChat, formatCurrencyBRL } from '../data/servicesData';
import { Booking, ServiceRequest } from '../types';

interface ClientAreaProps {
  requestsHistory: ServiceRequest[];
  onOpenRequest: (categoria?: string, descricao?: string) => void;
  onOpenSchedule: (serviceId?: string, serviceTitle?: string) => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onOpenProfile: () => void;
  onOpenReview: (serviceId: string, serviceTitle: string, bookingId?: string) => void;
}

export const ClientArea: React.FC<ClientAreaProps> = ({
  requestsHistory,
  onOpenRequest,
  onOpenSchedule,
  onOpenAuth,
  onOpenProfile,
  onOpenReview
}) => {
  const { currentUser, isAuthenticated, bookings, userRequests, reviews, completeBooking, cancelBooking } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'agendamentos' | 'servicos' | 'orcamentos' | 'casa' | 'avaliacoes'>('agendamentos');
  const [detailModalItem, setDetailModalItem] = useState<any | null>(null);

  const userBookings = bookings.filter(
    (b) => !currentUser || b.userEmail === currentUser.email || b.userName === currentUser.name
  );

  const userReviewsList = reviews.filter(
    (r) => !currentUser || r.userEmail === currentUser.email || r.userName === currentUser.name
  );

  return (
    <section id="cliente" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Sleek Atmospheric Background glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500 blur-[130px] opacity-25 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-700 blur-[120px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header & User Identity Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold uppercase tracking-widest">
              <User className="w-3.5 h-3.5" />
              <span>Painel do Cliente • Resolve360 Pelotas</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {isAuthenticated ? (
                <span>
                  Olá, <span className="text-blue-400">{currentUser?.name.split(' ')[0]}</span> 👋
                </span>
              ) : (
                <span>
                  Área do Cliente <span className="text-blue-400">Resolve360</span>
                </span>
              )}
            </h2>

            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
              {isAuthenticated
                ? `Gerencie seus agendamentos técnicos no ${currentUser?.neighborhood || 'Pelotas'}, histórico de ordens de serviço e avalie manutenções.`
                : 'Acompanhe seus serviços solicitados, agendamentos com técnicos credenciados e histórico de manutenção da sua casa em Pelotas.'}
            </p>
          </div>

          {/* Quick Account Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => onOpenSchedule()}
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Visita</span>
                </button>
                <button
                  onClick={onOpenProfile}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-all flex items-center gap-2"
                >
                  <Settings className="w-4 h-4 text-blue-400" />
                  <span>Meu Perfil</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>Entrar / Cadastrar</span>
                </button>
                <button
                  onClick={() => onOpenSchedule()}
                  className="px-4 py-3 bg-white/10 hover:bg-white/15 border border-white/10 text-slate-200 font-semibold text-xs rounded-xl transition-all flex items-center gap-2 backdrop-blur-sm"
                >
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>Agendar Sem Login</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="mt-8 flex overflow-x-auto no-scrollbar gap-2 pb-2 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('agendamentos')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'agendamentos'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Agendamentos ({userBookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('servicos')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'servicos'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Histórico de Serviços</span>
          </button>

          <button
            onClick={() => setActiveTab('avaliacoes')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'avaliacoes'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Star className="w-4 h-4 text-amber-400" />
            <span>Avaliações & Opiniões</span>
          </button>

          <button
            onClick={() => setActiveTab('casa')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'casa'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Minha Residência</span>
          </button>

          <button
            onClick={() => setActiveTab('orcamentos')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'orcamentos'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Cotações & Orçamentos</span>
          </button>
        </div>

        {/* Dynamic Tab Content */}
        <div className="mt-8">
          
          {/* TAB 1: AGENDAMENTOS */}
          {activeTab === 'agendamentos' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Visitas Técnicas & Agendamentos
                  </h3>
                  <p className="text-xs text-slate-400">
                    Acompanhe a data, horário e o técnico designado para o seu endereço em Pelotas.
                  </p>
                </div>
                <button
                  onClick={() => onOpenSchedule()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-xs transition-colors self-start"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Novo Agendamento</span>
                </button>
              </div>

              {userBookings.length === 0 ? (
                <div className="p-12 text-center bg-slate-800/40 border border-slate-800 rounded-3xl space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-white">Nenhum agendamento ativo</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Você ainda não possui visitas marcadas. Escolha um serviço e selecione o melhor horário para atendimento.
                  </p>
                  <button
                    onClick={() => onOpenSchedule()}
                    className="px-5 py-3 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-500 transition-colors"
                  >
                    Agendar Meu Primeiro Atendimento
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {userBookings.map((bk: Booking) => (
                    <div
                      key={bk.id}
                      className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-lg hover:border-slate-600 transition-all relative overflow-hidden"
                    >
                      {/* Top status indicator */}
                      <div>
                        <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
                          <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
                            #{bk.id}
                          </span>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                              bk.status === 'Concluído'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : bk.status === 'Cancelado'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            }`}
                          >
                            {bk.status}
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-white mt-3 leading-snug">
                          {bk.serviceTitle}
                        </h4>

                        <div className="mt-3 space-y-2 text-xs text-slate-300">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                            <span className="font-semibold text-white">
                              {bk.date.split('-').reverse().join('/')}
                            </span>
                            <span className="text-slate-400">•</span>
                            <span className="text-emerald-400 font-medium">{bk.timeSlot}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                            <span>{bk.neighborhood}, Pelotas / RS</span>
                          </div>

                          <div className="flex items-center gap-2 pt-1 border-t border-slate-700/40">
                            <User className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                            <span className="text-slate-200">{bk.technicianName}</span>
                          </div>
                        </div>

                        {bk.notes && (
                          <p className="mt-2.5 text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                            "{bk.notes}"
                          </p>
                        )}
                      </div>

                      {/* Bottom actions depending on status */}
                      <div className="pt-3 border-t border-slate-700/60 space-y-2">
                        {bk.status === 'Concluído' ? (
                          bk.rating ? (
                            <div className="flex items-center justify-between p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs">
                              <span className="text-amber-300 font-bold flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 fill-amber-400" />
                                {bk.rating}/5 estrelas
                              </span>
                              <span className="text-[10px] text-slate-400">Avaliado</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => onOpenReview(bk.serviceId, bk.serviceTitle, bk.id)}
                              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs"
                            >
                              <Star className="w-3.5 h-3.5 fill-slate-950" />
                              <span>Deixar Avaliação do Atendimento</span>
                            </button>
                          )
                        ) : bk.status === 'Confirmado' ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => completeBooking(bk.id)}
                              className="flex-1 py-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white font-semibold text-[11px] rounded-xl border border-emerald-500/30 transition-colors flex items-center justify-center gap-1"
                            >
                              <Check className="w-3 h-3" />
                              Marcar Concluído
                            </button>
                            <button
                              onClick={() =>
                                openWhatsAppChat(
                                  `Olá! Gostaria de informações sobre meu agendamento #${bk.id} (${bk.serviceTitle}) em Pelotas.`
                                )
                              }
                              className="py-2 px-3 bg-white/10 hover:bg-white/15 text-slate-200 font-semibold text-[11px] rounded-xl transition-colors flex items-center justify-center gap-1"
                            >
                              <MessageCircle className="w-3 h-3 text-emerald-400" />
                              WhatsApp
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SERVIÇOS & HISTÓRICO */}
          {activeTab === 'servicos' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Histórico de Ordens de Serviço
                  </h3>
                  <p className="text-xs text-slate-400">
                    Registro de manutenções, consertos e instalações realizadas pela Resolve360.
                  </p>
                </div>
                <button
                  onClick={() => onOpenRequest()}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Solicitar Serviço
                </button>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'OS-8841',
                    categoria: 'Elétrica Residencial',
                    desc: 'Troca de chuveiro elétrico Lorenzetti 220V e revisão de fiação.',
                    local: 'Centro, Pelotas',
                    data: '12/08/2026',
                    status: 'Concluído',
                    rating: 5
                  },
                  {
                    id: 'OS-8819',
                    categoria: 'Internet & Wi-Fi Mesh',
                    desc: 'Instalação de 2 nós Wi-Fi Mesh TP-Link Deco para cobertura total da casa.',
                    local: 'Laranjal, Pelotas',
                    data: '01/08/2026',
                    status: 'Concluído',
                    rating: 5
                  },
                  {
                    id: 'OS-8790',
                    categoria: 'Segurança Eletrônica',
                    desc: 'Instalação de fechadura digital biometrica e câmera de entrada.',
                    local: 'Areal, Pelotas',
                    data: '20/07/2026',
                    status: 'Concluído',
                    rating: 5
                  }
                ].map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-400">{item.id}</span>
                        <span className="text-xs font-bold text-white">• {item.categoria}</span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">{item.desc}</p>
                      <div className="text-[11px] text-slate-400 flex items-center gap-3">
                        <span>📍 {item.local}</span>
                        <span>🗓️ {item.data}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{item.rating}.0</span>
                      </div>
                      <button
                        onClick={() =>
                          openWhatsAppChat(
                            `Olá! Gostaria da 2ª via do comprovante da OS ${item.id} (${item.categoria}).`
                          )
                        }
                        className="p-2 text-slate-400 hover:text-white bg-slate-700/50 rounded-xl text-xs font-semibold"
                        title="Comprovante no WhatsApp"
                      >
                        Comprovante
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: AVALIAÇÕES */}
          {activeTab === 'avaliacoes' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Avaliações de Clientes em Pelotas
                  </h3>
                  <p className="text-xs text-slate-400">
                    Transparência total com notas reais deixadas após a conclusão dos serviços.
                  </p>
                </div>
                <button
                  onClick={() => onOpenReview('eletrica', 'Elétrica Residencial')}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-all flex items-center gap-2 self-start"
                >
                  <Star className="w-4 h-4 fill-slate-950" />
                  <span>Escrever Nova Avaliação</span>
                </button>
              </div>

              {/* Grid of Verified Reviews */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.slice(0, 6).map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 space-y-3 relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm text-white">{rev.userName}</div>
                        <div className="text-[11px] text-slate-400">
                          {rev.bairro}, {rev.cidade} • {rev.data}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/20">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    <div className="inline-block text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md">
                      {rev.serviceTitle}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      "{rev.comment}"
                    </p>

                    {rev.respostaResolve360 && (
                      <div className="mt-3 p-3 bg-slate-900/90 rounded-2xl border border-slate-800 text-[11px] text-blue-200">
                        <span className="font-bold text-blue-400 block mb-0.5">Resposta Resolve360:</span>
                        {rev.respostaResolve360}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MINHA RESIDÊNCIA */}
          {activeTab === 'casa' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Minha Residência & Instalações
                  </h3>
                  <p className="text-xs text-slate-400">
                    Dados técnicos do seu imóvel em Pelotas para agilizar o atendimento dos técnicos.
                  </p>
                </div>
                {isAuthenticated && (
                  <button
                    onClick={onOpenProfile}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors"
                  >
                    Editar Imóvel
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    ⚡ Rede Elétrica
                  </span>
                  <div className="text-lg font-black text-white">
                    {currentUser?.savedProperties?.voltagem || '220V'}
                  </div>
                  <p className="text-xs text-slate-400">
                    Padrão CEEE Equatorial Pelotas. Disjuntores termomagnéticos compatíveis.
                  </p>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                    📶 Rede & Conectividade
                  </span>
                  <div className="text-lg font-black text-white">
                    {currentUser?.savedProperties?.tipoInternet || 'Fibra Óptica'}
                  </div>
                  <p className="text-xs text-slate-400">
                    Cabeamento CAT6 e suporte a pontos adicionais Wi-Fi Mesh.
                  </p>
                </div>

                <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    🛡️ Garantia Operacional
                  </span>
                  <div className="text-lg font-black text-emerald-400">
                    90 Dias Cobertura
                  </div>
                  <p className="text-xs text-slate-400">
                    Garantia estendida da mão de obra para todos os serviços realizados.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ORÇAMENTOS */}
          {activeTab === 'orcamentos' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Orçamentos e Cotações Salvas
                  </h3>
                  <p className="text-xs text-slate-400">
                    Consulte os valores de referência e formalize propostas com nossos técnicos.
                  </p>
                </div>
                <button
                  onClick={() => onOpenRequest('Orçamento Personalizado')}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Pedir Cotação Rápida
                </button>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                      Cotação #ORC-492
                    </span>
                    <h4 className="text-base font-bold text-white mt-1">
                      Projeto de Instalação Wi-Fi Mesh + CFTV 4 Câmeras
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Pelotas / RS • Imóvel de 2 pavimentos
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-emerald-400 font-mono">
                      R$ 498,00
                    </div>
                    <span className="text-[11px] text-slate-400">Mão de obra estimada</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                  <span className="text-xs text-slate-400">
                    Orçamento válido por 15 dias corridos.
                  </span>
                  <button
                    onClick={() =>
                      openWhatsAppChat(
                        'Olá! Gostaria de aprovar a cotação #ORC-492 de Wi-Fi Mesh e CFTV em Pelotas.'
                      )
                    }
                    className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Aprovar no WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
