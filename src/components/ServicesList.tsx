import React, { useState } from 'react';
import {
  Zap,
  Wifi,
  Radio,
  Video,
  Sun,
  Home,
  BatteryCharging,
  Tv,
  Wrench,
  ArrowRight,
  ShieldCheck,
  Check,
  Star,
  Calendar
} from 'lucide-react';
import { SERVICES_CATALOG } from '../data/servicesData';
import { ServiceItem } from '../types';
import { useAuth } from '../context/AuthContext';
import { getServiceStats } from '../data/reviewsData';

interface ServicesListProps {
  onSelectService: (serviceCategory: string, initialDescription?: string) => void;
  onOpenSchedule: (serviceId?: string, serviceTitle?: string) => void;
}

export const ServicesList: React.FC<ServicesListProps> = ({
  onSelectService,
  onOpenSchedule
}) => {
  const { reviews } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const filterTabs = [
    { label: 'Todos os Serviços', value: 'Todos' },
    { label: 'Elétrica', value: 'Elétrica' },
    { label: 'Internet & Wi-Fi', value: 'Internet' },
    { label: 'Segurança & Telecom', value: 'Segurança' },
    { label: 'Solar & Automação', value: 'Solar' },
    { label: 'Tecnologia & Geral', value: 'Tecnologia' }
  ];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-500" />;
      case 'Wifi':
        return <Wifi className="w-6 h-6 text-sky-500" />;
      case 'Radio':
        return <Radio className="w-6 h-6 text-indigo-500" />;
      case 'Video':
        return <Video className="w-6 h-6 text-rose-500" />;
      case 'Sun':
        return <Sun className="w-6 h-6 text-yellow-500" />;
      case 'Home':
        return <Home className="w-6 h-6 text-emerald-500" />;
      case 'BatteryCharging':
        return <BatteryCharging className="w-6 h-6 text-teal-500" />;
      case 'Tv':
        return <Tv className="w-6 h-6 text-blue-500" />;
      default:
        return <Wrench className="w-6 h-6 text-blue-600" />;
    }
  };

  const filteredServices = SERVICES_CATALOG.filter((item) => {
    if (selectedFilter === 'Todos') return true;
    if (selectedFilter === 'Elétrica') return item.category === 'Elétrica';
    if (selectedFilter === 'Internet') return item.category === 'Internet e Wi-Fi';
    if (selectedFilter === 'Segurança') return item.category === 'Segurança' || item.category === 'Telecom';
    if (selectedFilter === 'Solar') return item.category === 'Energia Solar' || item.category === 'Automação';
    if (selectedFilter === 'Tecnologia')
      return (
        item.category === 'Tecnologia' ||
        item.category === 'Outro serviço' ||
        item.category === 'Carregador de carro elétrico'
      );
    return true;
  });

  return (
    <section id="servicos" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            Catálogo Especializado Resolve360
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Nossas soluções residenciais
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Valores de referência para <strong>Pelotas e região</strong>. Atendimento técnico com agendamento pontual e garantia de execução.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedFilter(tab.value)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedFilter === tab.value
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-xs'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service: ServiceItem) => {
            const stats = getServiceStats(service.id, reviews);

            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Header with Icon and Category */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center border border-slate-200 group-hover:border-blue-200 transition-colors">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 uppercase tracking-widest group-hover:bg-blue-100 group-hover:text-blue-800 transition-colors">
                        {service.category}
                      </span>
                      {/* Average Rating Display */}
                      <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{stats.average}</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          ({stats.count} avaliações)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Service Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Tags */}
                  {service.tags && (
                    <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-100">
                      {service.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-[11px] text-slate-600 bg-slate-50 px-2.5 py-0.5 rounded-lg border border-slate-200"
                        >
                          <Check className="w-3 h-3 text-blue-500" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pricing and Action Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-black text-blue-600 font-mono">
                        {service.priceText}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {service.priceSubtext}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenSchedule(service.id, service.title)}
                      className="py-2.5 px-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Agendar</span>
                    </button>
                    <button
                      onClick={() =>
                        onSelectService(
                          service.category,
                          `Gostaria de solicitar orçamento para ${service.title}.`
                        )
                      }
                      className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1"
                    >
                      <span>Orçamento</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Featured Full-Width Bento Highlight Card */}
          <div className="col-span-1 md:grid-cols-2 lg:col-span-3 bg-blue-600 p-8 rounded-3xl text-white flex flex-col md:flex-row items-start md:items-center justify-between shadow-xl shadow-blue-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-20 -mt-20 pointer-events-none"></div>
            <div className="space-y-1 relative z-10 max-w-2xl">
              <span className="text-xs uppercase font-bold text-blue-200 tracking-widest">
                Soluções Inteligentes
              </span>
              <h3 className="text-2xl font-extrabold tracking-tight">
                Automação Residencial, Som & Wi-Fi Mesh Completo
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Transforme sua residência em Pelotas com comandos de voz Alexa, Google Home, interruptores inteligentes e sinal de internet sem pontos cegos.
              </p>
            </div>
            <button
              onClick={() => onOpenSchedule('automacao', 'Automação Residencial')}
              className="mt-6 md:mt-0 bg-white text-blue-600 hover:bg-blue-50 px-6 py-3.5 rounded-xl font-bold text-sm whitespace-nowrap shadow-lg transition-all relative z-10 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Avaliação Técnica</span>
            </button>
          </div>
        </div>

        {/* Bottom helper card */}
        <div className="mt-10 bg-white border border-slate-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl shrink-0 border border-blue-100">
              ?
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">Não encontrou o que procurava?</h4>
              <p className="text-sm text-slate-600">
                Fazemos pequenos reparos, projetos customizados e reformas completas em Pelotas.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectService('Outro serviço', 'Preciso de um serviço personalizado que não está listado.')}
            className="whitespace-nowrap px-5 py-3 bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
          >
            Falar com Atendente
          </button>
        </div>

      </div>
    </section>
  );
};
