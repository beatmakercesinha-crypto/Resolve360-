import React, { useState } from 'react';
import { Calculator, MessageSquare, Plus, Minus, Info, Check, Sparkles, MapPin } from 'lucide-react';
import { PricingRecord } from '../types';
import { formatCurrencyBRL, openWhatsAppChat, DEFAULT_CITY } from '../data/servicesData';

interface BudgetCalculatorProps {
  pricingData: Record<string, PricingRecord>;
  onOpenRequestWithEstimate?: (serviceName: string, quantity: number, total: number) => void;
}

export const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({
  pricingData,
  onOpenRequestWithEstimate
}) => {
  const [selectedServiceKey, setSelectedServiceKey] = useState<string>('tomada');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedCity, setSelectedCity] = useState<string>(DEFAULT_CITY);
  const [neighborhood, setNeighborhood] = useState<string>('');
  const [hasMaterials, setHasMaterials] = useState<boolean>(false);

  const currentItem = pricingData[selectedServiceKey] || Object.values(pricingData)[0];
  const unitPrice = currentItem ? currentItem.cliente : 0;
  const subtotal = unitPrice * Math.max(1, quantity);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleSendWhatsAppBudget = () => {
    if (!currentItem) return;

    const message = `Olá, Resolve360! 🛠️

Fiz uma estimativa rápida de orçamento pelo site.

🔧 *Serviço:* ${currentItem.nome}
📦 *Quantidade:* ${quantity} ${quantity === 1 ? 'unidade/ponto' : 'unidades/pontos'}
💰 *Estimativa de Mão de Obra:* ${formatCurrencyBRL(subtotal)}
📍 *Local:* ${selectedCity}/RS ${neighborhood ? `(Bairro: ${neighborhood})` : ''}
📦 *Possui materiais comprados?* ${hasMaterials ? 'Sim, já possuo os materiais' : 'Não, preciso de recomendação/orçamento de materiais'}

Gostaria de confirmar o orçamento e verificar a disponibilidade para agendamento!`;

    openWhatsAppChat(message);
  };

  return (
    <section id="orcamento" className="py-20 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            Simulador Instantâneo
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Estimativa de orçamento online
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Calcule uma estimativa prévia de mão de obra para os serviços mais comuns em Pelotas.
          </p>
        </div>

        {/* Calculator Box */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl shadow-slate-200/50">
          <div className="space-y-6">
            
            {/* Service Selection */}
            <div>
              <label htmlFor="servicoCalculo" className="block text-sm font-bold text-slate-900 mb-2 flex items-center justify-between">
                <span>1. Escolha o serviço que você precisa:</span>
                <span className="text-xs text-blue-600 font-semibold">{Object.keys(pricingData).length} opções disponíveis</span>
              </label>
              
              <div className="relative">
                <select
                  id="servicoCalculo"
                  value={selectedServiceKey}
                  onChange={(e) => setSelectedServiceKey(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 hover:border-blue-400 focus:border-blue-600 rounded-xl px-4 py-3.5 text-sm sm:text-base font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors cursor-pointer appearance-none"
                >
                  {(Object.entries(pricingData) as [string, PricingRecord][]).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.nome} — {formatCurrencyBRL(item.cliente)}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 font-bold">
                  ▼
                </div>
              </div>
            </div>

            {/* Quantity and Location Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Quantity */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  2. Quantidade de pontos / itens:
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    className="w-12 h-12 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 rounded-l-xl font-bold flex items-center justify-center border border-r-0 border-slate-300 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    id="quantidade"
                    min="1"
                    max="50"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full h-12 text-center text-lg font-bold text-slate-900 bg-slate-50 border-y border-slate-300 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleIncrement}
                    className="w-12 h-12 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 rounded-r-xl font-bold flex items-center justify-center border border-l-0 border-slate-300 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* City and Neighborhood */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  3. Bairro / Região (Pelotas):
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-3 py-3 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Pelotas">Pelotas</option>
                    <option value="Capão do Leão">Capão do Leão</option>
                    <option value="Rio Grande">Rio Grande</option>
                    <option value="São Lourenço do Sul">São Lourenço</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Ex: Centro, Areal..."
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-1/2 bg-slate-50 border border-slate-300 rounded-xl px-3 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Materials Checkbox */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <input
                type="checkbox"
                id="hasMaterialsCheck"
                checked={hasMaterials}
                onChange={(e) => setHasMaterials(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded-md border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="hasMaterialsCheck" className="text-xs sm:text-sm text-slate-700 font-medium cursor-pointer">
                Já possuo os materiais elétricos/equipamentos comprados
              </label>
            </div>

            {/* Estimate Result Display Box - Sleek Style */}
            <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 blur-[80px] opacity-30 pointer-events-none"></div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                <div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Estimativa de Mão de Obra
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-1" id="estimativa">
                    {formatCurrencyBRL(subtotal)}
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-1">
                    Cálculo: {quantity}x {currentItem?.nome} ({formatCurrencyBRL(unitPrice)} unitário)
                  </div>
                </div>

                <div className="text-left sm:text-right text-xs text-slate-300 max-w-xs space-y-1 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  <p className="flex items-center sm:justify-end gap-1 font-semibold text-white">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    <span>{selectedCity} / RS</span>
                  </p>
                  <p className="text-emerald-400 font-medium">✓ Sem compromisso</p>
                  <p className="text-slate-400">✓ Atendimento ágil via WhatsApp</p>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-start gap-2 text-xs text-slate-400 relative z-10">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Nota informativa:</strong> Estimativa de referência para mão de obra. Detalhes de fiação embutida ou materiais adicionais serão confirmados com você.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleSendWhatsAppBudget}
                id="calc-whatsapp-btn"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 text-base"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Solicitar orçamento pelo WhatsApp</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
