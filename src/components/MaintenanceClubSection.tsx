import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  Check,
  Sparkles,
  Calendar,
  Clock,
  Award,
  ArrowRight,
  Sun,
  Snowflake,
  Flame,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { MaintenancePlan } from '../types';
import { openWhatsAppChat } from '../data/servicesData';

interface MaintenanceClubSectionProps {
  onSelectPlan?: (plan: MaintenancePlan) => void;
}

export const MaintenanceClubSection: React.FC<MaintenanceClubSectionProps> = ({
  onSelectPlan
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [subscribedPlan, setSubscribedPlan] = useState<string | null>(null);

  const plans: MaintenancePlan[] = [
    {
      id: 'plano-essencial',
      name: 'Essencial Pelotas',
      tagline: 'Ideal para apartamentos e casas compactas',
      monthlyPrice: 49.9,
      annualDiscountPrice: 39.9,
      features: [
        '1 Check-up Elétrico Anual Completo (Quadro e Tomadas)',
        'Mão de obra inclusa para pequenos reparos elétricos (até 2h/ano)',
        'Desconto de 20% em qualquer serviço extra',
        'Atendimento prioritário em fila de agendamento',
        'Passaporte Digital da Residência Gratuito'
      ],
      seasonalPerks: [
        'Revisão preventiva de chuveiro elétrico antes do inverno'
      ],
      recommendedFor: 'Apartamentos até 80m²'
    },
    {
      id: 'plano-casa-segura',
      name: 'Casa Segura & Conectada',
      tagline: 'O mais escolhido para residências familiares em Pelotas',
      monthlyPrice: 89.9,
      annualDiscountPrice: 71.9,
      popular: true,
      features: [
        '2 Visitas Técnicas Preventivas Programadas por Ano',
        'Revisão de Wi-Fi Mesh e cabeamento de rede',
        'Manutenção e ajuste de câmeras de segurança e interfone',
        '1 Atendimento Emergencial 24h Gratuito por semestre',
        'Mão de obra inclusa até 5 horas no ano',
        'Desconto de 30% em novos projetos e automação',
        'Etiqueta QR Code blindada no quadro de luz'
      ],
      seasonalPerks: [
        'Inverno: Teste de disjuntores de aquecedores e estufas',
        'Verão: Otimização de Wi-Fi no pátio e ar-condicionado'
      ],
      recommendedFor: 'Casas de 2 a 4 quartos e Sobrados'
    },
    {
      id: 'plano-solar-premium',
      name: 'Solar & Alto Padrão',
      tagline: 'Proteção total para residências com energia solar e automação',
      monthlyPrice: 149.9,
      annualDiscountPrice: 119.9,
      features: [
        '2 Limpezas Técnicas Anuais de Placas Solares (Água Desmineralizada)',
        'Revisão termográfica do inversor e strings CC',
        'Suporte dedicado para automação Alexa / Google Home',
        'Atendimento Emergencial Ilimitado com SLA de 3 horas em Pelotas',
        'Cobertura total de mão de obra para reparos',
        'Desconto de 40% em ampliações solares e baterias',
        'Garantia Estendida de 1 ano em todos os serviços executados'
      ],
      seasonalPerks: [
        'Relatório de rendimento fotovoltaico com drone/termografia',
        'Revisão pré-temporal de verão e proteção DPS'
      ],
      recommendedFor: 'Casas com Usina Solar, Laranjal e Condomínios Fechados'
    }
  ];

  const handleSubscribe = (plan: MaintenancePlan) => {
    setSubscribedPlan(plan.id);
    const priceStr =
      billingCycle === 'annual'
        ? `R$ ${plan.annualDiscountPrice.toFixed(2)}/mês (Plano Anual)`
        : `R$ ${plan.monthlyPrice.toFixed(2)}/mês`;

    const msg = `Olá, Resolve360! 🛡️ Gostaria de assinar o *${plan.name}* (${priceStr}) do *Clube de Manutenção Preventiva*.

Minha residência fica em Pelotas e gostaria de agendar a 1ª visita de check-up preventivo!`;

    openWhatsAppChat(msg);
  };

  return (
    <section id="clube-manutencao" className="py-20 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      {/* Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            Clube Resolve360 • Proteção Preventiva Anual
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Sua casa sempre segura e funcionando
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Evite curtos-circuitos no inverno e falhas elétricas. Tenha um técnico de confiança sempre pronto para sua residência em Pelotas.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 bg-slate-800/80 rounded-2xl border border-slate-700/80 mt-8">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Anual</span>
              <span className="text-[10px] bg-emerald-400 text-slate-900 px-1.5 py-0.2 rounded-full font-black">
                -20% OFF
              </span>
            </button>
          </div>
        </div>

        {/* Plans Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => {
            const price = billingCycle === 'annual' ? plan.annualDiscountPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular
                    ? 'bg-gradient-to-b from-slate-800 to-slate-850 border-2 border-blue-500 shadow-2xl shadow-blue-500/20 scale-102'
                    : 'bg-slate-800/60 border border-slate-700/80 hover:border-slate-500'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-[10px] uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Mais Escolhido em Pelotas</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {plan.recommendedFor}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white mt-1">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{plan.tagline}</p>

                  {/* Price */}
                  <div className="mt-5 pb-5 border-b border-slate-700/70">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-slate-400 font-bold">R$</span>
                      <span className="text-4xl font-black text-white font-mono">
                        {price.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-xs text-slate-400">/mês</span>
                    </div>
                    {billingCycle === 'annual' && (
                      <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">
                        Faturamento anual com 2 meses gratuitos
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="mt-5 space-y-2.5">
                    <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider block">
                      Benefícios Inclusos:
                    </span>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                        <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Seasonal Perks */}
                  {plan.seasonalPerks && (
                    <div className="mt-5 pt-4 border-t border-slate-700/50 space-y-2">
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Vantagens Sazonais (Inverno & Verão):</span>
                      </span>
                      {plan.seasonalPerks.map((perk, idx) => (
                        <div key={idx} className="text-[11px] text-amber-200/90 bg-amber-400/10 p-2 rounded-xl border border-amber-400/20">
                          {perk}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Subscribe Button */}
                <div className="mt-8 pt-4">
                  <button
                    onClick={() => handleSubscribe(plan)}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg ${
                      plan.popular
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
                  >
                    <span>Assinar {plan.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Seasonal Care Banner for Pelotas Climate */}
        <div className="mt-12 bg-gradient-to-r from-blue-900/60 to-slate-800 rounded-3xl p-6 sm:p-7 border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-400/30">
              <Snowflake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                Preparado para o inverno e umidade da região de Pelotas
              </h4>
              <p className="text-xs text-slate-300 mt-0.5 max-w-xl">
                Nos meses frios, o uso de chuveiros e estufas aumenta em 65% o risco de queima de tomadas e desarmes de disjuntores. O clube garante revisão prévia.
              </p>
            </div>
          </div>
          <button
            onClick={() => openWhatsAppChat('Olá! Gostaria de agendar um check-up elétrico de inverno para minha casa em Pelotas.')}
            className="whitespace-nowrap px-5 py-3 bg-white text-slate-900 hover:bg-blue-50 font-bold rounded-xl text-xs transition-colors shadow-md"
          >
            Agendar Check-up Avulso
          </button>
        </div>

      </div>
    </section>
  );
};
