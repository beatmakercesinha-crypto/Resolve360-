import React, { useState } from 'react';
import { ShieldCheck, Plus, RefreshCw, Check, Sparkles, TrendingUp, AlertCircle, Trash2 } from 'lucide-react';
import { PricingRecord } from '../types';
import { formatCurrencyBRL } from '../data/servicesData';

interface AdminPricingPanelProps {
  pricingData: Record<string, PricingRecord>;
  onUpdatePricing: (updatedData: Record<string, PricingRecord>) => void;
  onResetDefaults: () => void;
}

export const AdminPricingPanel: React.FC<AdminPricingPanelProps> = ({
  pricingData,
  onUpdatePricing,
  onResetDefaults
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCost, setNewItemCost] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  const handleCustoChange = (key: string, value: string) => {
    const num = parseFloat(value) || 0;
    const updated = {
      ...pricingData,
      [key]: {
        ...pricingData[key],
        custo: num
      }
    };
    onUpdatePricing(updated);
    triggerToast();
  };

  const handleClienteChange = (key: string, value: string) => {
    const num = parseFloat(value) || 0;
    const updated = {
      ...pricingData,
      [key]: {
        ...pricingData[key],
        cliente: num
      }
    };
    onUpdatePricing(updated);
    triggerToast();
  };

  const handleDeleteItem = (key: string) => {
    if (confirm(`Tem certeza que deseja excluir o item "${pricingData[key].nome}" da tabela?`)) {
      const updated = { ...pricingData };
      delete updated[key];
      onUpdatePricing(updated);
      triggerToast();
    }
  };

  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const key = newItemName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '_') + '_' + Date.now();

    const costNum = parseFloat(newItemCost) || 0;
    const priceNum = parseFloat(newItemPrice) || costNum * 1.6;

    const updated = {
      ...pricingData,
      [key]: {
        id: key,
        nome: newItemName.trim(),
        custo: costNum,
        cliente: priceNum,
        categoria: 'Geral'
      }
    };

    onUpdatePricing(updated);
    setNewItemName('');
    setNewItemCost('');
    setNewItemPrice('');
    setIsAddingNew(false);
    triggerToast();
  };

  const triggerToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  // Calculations for summary KPI cards
  const itemsList: [string, PricingRecord][] = Object.entries(pricingData);
  const filteredList = itemsList.filter(([_, item]) =>
    item.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = itemsList.length;
  const avgMargin =
    itemsList.reduce((acc: number, [_, item]) => {
      if (item.cliente <= 0) return acc;
      const margin = ((item.cliente - item.custo) / item.cliente) * 100;
      return acc + margin;
    }, 0) / (totalItems || 1);

  return (
    <section id="admin" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            Gestão Interna & Tabela Operacional
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Painel interno de preços e margens
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Área de precificação e controle de custos para Pelotas/RS. Os custos parceiros e margens são calculados em tempo real.
          </p>
        </div>

        {/* KPI Mini Dashboards - Sleek Bento */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Serviços Tabelados</span>
              <div className="text-2xl font-black text-slate-900 mt-1">{totalItems} itens</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg border border-blue-100">
              #
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Margem Média Bruta</span>
              <div className="text-2xl font-black text-emerald-600 mt-1">{avgMargin.toFixed(1)}%</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-100">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Armazenamento</span>
              <div className="text-sm font-bold text-slate-800 mt-1">Salvo no navegador</div>
            </div>
            <button
              onClick={onResetDefaults}
              title="Restaurar preços originais de fábrica"
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Restaurar
            </button>
          </div>
        </div>

        {/* Admin Table Panel Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          
          {/* Table Toolbar */}
          <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-80">
              <input
                type="text"
                placeholder="Filtrar serviço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {saveToast && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 animate-in fade-in duration-200">
                  <Check className="w-3.5 h-3.5" /> Salvo com sucesso!
                </span>
              )}

              <button
                onClick={() => setIsAddingNew(!isAddingNew)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar Serviço</span>
              </button>
            </div>
          </div>

          {/* Add New Item Form (collapsible) */}
          {isAddingNew && (
            <form onSubmit={handleAddNewItem} className="p-5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-end gap-3 animate-in slide-in-from-top-2">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-bold text-slate-700 mb-1">Nome do Serviço</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Instalação de Sensor de Presença"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>
              <div className="w-32">
                <label className="block text-xs font-bold text-slate-700 mb-1">Custo Parceiro (R$)</label>
                <input
                  type="number"
                  required
                  placeholder="60"
                  value={newItemCost}
                  onChange={(e) => setNewItemCost(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>
              <div className="w-32">
                <label className="block text-xs font-bold text-slate-700 mb-1">Preço Cliente (R$)</label>
                <input
                  type="number"
                  required
                  placeholder="120"
                  value={newItemPrice}
                  onChange={(e) => setNewItemPrice(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-3.5 py-2 bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Serviço Cadastrado</th>
                  <th className="py-3.5 px-4">Custo Parceiro</th>
                  <th className="py-3.5 px-4">Preço Sugerido Cliente</th>
                  <th className="py-3.5 px-4 text-center">Lucro Bruto</th>
                  <th className="py-3.5 px-4 text-right">Margem %</th>
                  <th className="py-3.5 px-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredList.map(([key, item]) => {
                  const lucro = item.cliente - item.custo;
                  const margem = item.cliente > 0 ? (lucro / item.cliente) * 100 : 0;

                  return (
                    <tr key={key} className="hover:bg-slate-50/80 transition-colors">
                      {/* Name */}
                      <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900">
                        {item.nome}
                      </td>

                      {/* Custo Parceiro Input */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-slate-400 font-medium">R$</span>
                          <input
                            type="number"
                            min="0"
                            step="5"
                            value={item.custo}
                            onChange={(e) => handleCustoChange(key, e.target.value)}
                            className="w-24 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-blue-500 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      </td>

                      {/* Preco Cliente Input */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-slate-400 font-medium">R$</span>
                          <input
                            type="number"
                            min="0"
                            step="5"
                            value={item.cliente}
                            onChange={(e) => handleClienteChange(key, e.target.value)}
                            className="w-24 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-blue-500 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      </td>

                      {/* Lucro Bruto */}
                      <td className="py-3.5 px-4 text-center font-mono text-xs font-bold text-slate-700">
                        {formatCurrencyBRL(lucro)}
                      </td>

                      {/* Margem % */}
                      <td className="py-3.5 px-4 text-right font-mono font-black text-emerald-600">
                        {margem.toFixed(1)}%
                      </td>

                      {/* Delete item */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleDeleteItem(key)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Remover serviço"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer info */}
          <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Valores refletidos instantaneamente na calculadora de orçamento acima.</span>
            <span className="font-semibold text-slate-700">Resolve360 Control Center</span>
          </div>

        </div>

      </div>
    </section>
  );
};
