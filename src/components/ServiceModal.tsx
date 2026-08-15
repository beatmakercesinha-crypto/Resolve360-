import React, { useState, useEffect } from 'react';
import { X, Send, MapPin, Phone, User, Wrench, Clock, ShieldCheck } from 'lucide-react';
import { ServiceRequest } from '../types';
import { openWhatsAppChat, DEFAULT_CITY } from '../data/servicesData';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  initialDescription?: string;
  onRequestSubmitted: (request: ServiceRequest) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  onClose,
  initialCategory = '',
  initialDescription = '',
  onRequestSubmitted
}) => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cidade, setCidade] = useState(DEFAULT_CITY);
  const [bairro, setBairro] = useState('');
  const [descricao, setDescricao] = useState('');
  const [urgencia, setUrgencia] = useState<'normal' | 'urgente' | 'agendamento'>('normal');

  useEffect(() => {
    if (isOpen) {
      if (initialCategory) setCategoria(initialCategory);
      if (initialDescription) setDescricao(initialDescription);
    }
  }, [isOpen, initialCategory, initialDescription]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !telefone.trim() || !categoria) {
      alert('Por favor, preencha nome, telefone e serviço.');
      return;
    }

    const newRequest: ServiceRequest = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      nome: nome.trim(),
      telefone: telefone.trim(),
      categoria,
      cidade,
      bairro: bairro.trim() || 'Não informado',
      descricao: descricao.trim() || 'Sem descrição adicional',
      urgencia,
      dataCriacao: new Date().toLocaleDateString('pt-BR'),
      status: 'Em Triagem'
    };

    // Save locally
    onRequestSubmitted(newRequest);

    // Build WhatsApp message
    const urgenciaTexto =
      urgencia === 'urgente'
        ? '🚨 URGENTE (Hoje)'
        : urgencia === 'agendamento'
        ? '📅 Agendamento com antecedência'
        : '⚡ Normal / Próximos dias';

    const mensagem = `Olá, Resolve360! 🛠️

Gostaria de solicitar atendimento técnico.

👤 *Nome:* ${newRequest.nome}
📱 *Telefone:* ${newRequest.telefone}
🔧 *Serviço:* ${newRequest.categoria}
📍 *Cidade:* ${newRequest.cidade}/RS
🏠 *Bairro:* ${newRequest.bairro}
⏳ *Urgência:* ${urgenciaTexto}
📝 *Descrição do Problema:*
${newRequest.descricao}

Gostaria de receber o atendimento e a estimativa de orçamento.`;

    openWhatsAppChat(mensagem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200 my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-modal-btn"
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Wrench className="w-3.5 h-3.5 text-blue-600" />
            Atendimento Rápido Pelotas/RS
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            Solicitar serviço residencial
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Conte o que sua casa precisa. Responderemos rapidamente no WhatsApp.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nome */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-blue-600" />
                Seu Nome *
              </label>
              <input
                type="text"
                required
                id="modal-nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: João da Silva"
                className="w-full bg-slate-50 border border-slate-300 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                WhatsApp com DDD *
              </label>
              <input
                type="tel"
                required
                id="modal-telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="Ex: (51) 98233-0934"
                className="w-full bg-slate-50 border border-slate-300 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Categoria do Serviço */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Wrench className="w-3.5 h-3.5 text-blue-600" />
              Qual serviço você precisa? *
            </label>
            <select
              required
              id="modal-categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">Selecione uma categoria...</option>
              <option value="Elétrica">Elétrica (Tomadas, Chuveiro, Disjuntores, Iluminação)</option>
              <option value="Internet e Wi-Fi">Internet & Wi-Fi (Mesh, Roteador, Ponto de Rede)</option>
              <option value="Telecom">Telecom (Interfone, Antena, Vídeo Porteiro)</option>
              <option value="Segurança">Segurança (Câmeras, Alarmes, Fechadura Digital)</option>
              <option value="Energia Solar">Energia Solar (Projeto, Manutenção, Limpeza)</option>
              <option value="Automação">Automação (Alexa, Dispositivos Smart, Iluminação)</option>
              <option value="Carregador de carro elétrico">Carregador de Carro Elétrico (Wallbox)</option>
              <option value="Tecnologia">Tecnologia (Suporte TV, Áudio, Som)</option>
              <option value="Não sei o que preciso">Não sei o que preciso (Preciso de Diagnóstico)</option>
              <option value="Outro serviço">Outro serviço residencial</option>
            </select>
          </div>

          {/* Cidade e Bairro */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                Cidade (RS)
              </label>
              <select
                id="modal-cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none"
              >
                <option value="Pelotas">Pelotas</option>
                <option value="Capão do Leão">Capão do Leão</option>
                <option value="Rio Grande">Rio Grande</option>
                <option value="São Lourenço do Sul">São Lourenço do Sul</option>
                <option value="Arroio do Padre">Arroio do Padre</option>
                <option value="Outra região">Outra cidade da região</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Bairro / Ponto de Referência
              </label>
              <input
                type="text"
                id="modal-bairro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                placeholder="Ex: Centro, Laranjal, Areal, Três Vendas..."
                className="w-full bg-slate-50 border border-slate-300 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Urgência */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              Prioridade / Urgência
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setUrgencia('normal')}
                className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all ${
                  urgencia === 'normal'
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Normal
              </button>
              <button
                type="button"
                onClick={() => setUrgencia('urgente')}
                className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all ${
                  urgencia === 'urgente'
                    ? 'bg-rose-50 border-rose-500 text-rose-700 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                🚨 Urgente (Hoje)
              </button>
              <button
                type="button"
                onClick={() => setUrgencia('agendamento')}
                className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all ${
                  urgencia === 'agendamento'
                    ? 'bg-purple-50 border-purple-500 text-purple-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Agendamento
              </button>
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Detalhes do que aconteceu ou precisa ser feito:
            </label>
            <textarea
              required
              id="modal-descricao"
              rows={3}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva o problema com o máximo de detalhes possível (ex: chuveiro queimou, tomada com faísca, ponto de internet novo)..."
              className="w-full bg-slate-50 border border-slate-300 focus:border-blue-500 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
            ></textarea>
          </div>

          {/* Trust Banner */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-2.5 text-xs text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Seus dados são confidenciais e usados apenas para o atendimento em Pelotas.</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            id="modal-enviar-btn"
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 text-base mt-2"
          >
            <Send className="w-4 h-4" />
            <span>Continuar solicitação no WhatsApp</span>
          </button>
        </form>

      </div>
    </div>
  );
};
