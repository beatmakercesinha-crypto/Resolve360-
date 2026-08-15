import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  FileCheck,
  Award,
  Download,
  Share2,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { WarrantyInspectionChecklist } from '../types';

interface DigitalWarrantyModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId?: string;
  serviceTitle?: string;
  clientName?: string;
  amount?: number;
}

export const DigitalWarrantyModal: React.FC<DigitalWarrantyModalProps> = ({
  isOpen,
  onClose,
  bookingId = 'AGD-2026-8841',
  serviceTitle = 'Manutenção Elétrica & Quadro 220V',
  clientName = 'César Cardoso',
  amount = 180.0
}) => {
  const [checklist, setChecklist] = useState([
    { id: 'item-1', label: 'Tensão operacional 220V aferida com multímetro digital', checked: true },
    { id: 'item-2', label: 'Conexões e barramentos apertados com torque especificado', checked: true },
    { id: 'item-3', label: 'Disjuntores e circuitos identificados no espelho do quadro', checked: true },
    { id: 'item-4', label: 'Área de trabalho limpa e sem resíduos de fios ou fita', checked: true },
    { id: 'item-5', label: 'Equipamento/chuveiro/tomada testado na presença do cliente', checked: true }
  ]);

  const [signerName, setSignerName] = useState(clientName);
  const [isSigned, setIsSigned] = useState(false);
  const [certificateCode] = useState(`CERT-RS-90D-${Math.floor(100000 + Math.random() * 900000)}`);

  if (!isOpen) return null;

  const handleToggleItem = (id: string) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleSignWarranty = (e: React.FormEvent) => {
    e.preventDefault();
    if (checklist.some((item) => !item.checked)) {
      alert('Por favor, confirme todos os itens do checklist de conformidade.');
      return;
    }
    setIsSigned(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className="bg-white text-slate-900 rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200 my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">Garantia Blindada & Checklist</h3>
              <p className="text-xs text-slate-400">Termo de Entrega com Certificado Digital</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6">
          
          {/* Service & Escrow Info */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-500 block">Agendamento:</span>
              <span className="font-bold text-slate-900 text-sm">{serviceTitle}</span>
              <span className="text-[11px] text-blue-600 block mt-0.5">Código: {bookingId}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block">Valor com Proteção:</span>
              <span className="font-mono font-black text-emerald-600 text-base">
                R$ {amount.toFixed(2)}
              </span>
            </div>
          </div>

          {!isSigned ? (
            <form onSubmit={handleSignWarranty} className="space-y-5">
              
              {/* Checklist */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Checklist de Inspeção e Conformidade Técnica:
                </span>
                <div className="space-y-2">
                  {checklist.map((item) => (
                    <label
                      key={item.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        item.checked
                          ? 'bg-emerald-50/50 border-emerald-300 text-slate-900'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => handleToggleItem(item.id)}
                        className="w-4 h-4 mt-0.5 rounded text-emerald-600 focus:ring-0"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Digital Signature */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nome Completo do Cliente para Assinatura Digital:
                </label>
                <input
                  type="text"
                  required
                  value={signerName}
                  onChange={(e) => setSignerName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
                />
              </div>

              {/* Security Escrow explanation */}
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  O pagamento só é repassado ao técnico após a assinatura deste termo. 90 dias de cobertura integral assegurados.
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 text-xs transition-all flex items-center justify-center gap-2"
              >
                <FileCheck className="w-4 h-4" />
                <span>Assinar Digitalmente e Emitir Certificado de 90 Dias</span>
              </button>
            </form>
          ) : (
            /* Signed Certificate View */
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase font-bold text-emerald-600 tracking-widest block">
                  Garantia Homologada
                </span>
                <h4 className="text-xl font-extrabold text-slate-900 mt-1">
                  Certificado de Garantia de 90 Dias Ativo
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Assinado digitalmente por <strong>{signerName}</strong> em {new Date().toLocaleDateString('pt-BR')}.
                </p>
              </div>

              {/* Certificate Badge */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl border-2 border-emerald-500 space-y-2 text-left">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-emerald-400 font-bold">{certificateCode}</span>
                  <span className="text-[10px] uppercase font-bold bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">
                    Autenticado
                  </span>
                </div>
                <div className="text-xs text-slate-300">
                  Imóvel coberto contra falhas de execução, desarmes por aquecimento ou desconexões por 90 dias com recall gratuito em Pelotas.
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Imprimir / Salvar PDF</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
                >
                  Concluir
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
