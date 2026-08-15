import React, { useState } from 'react';
import {
  X,
  QrCode,
  ShieldCheck,
  Zap,
  Wifi,
  Sun,
  Shield,
  Printer,
  Share2,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  FileText,
  MapPin,
  Home,
  Info
} from 'lucide-react';
import { HomePassportData, CircuitLog } from '../types';

interface HomePassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  userAddress?: string;
  userNeighborhood?: string;
  userName?: string;
}

export const HomePassportModal: React.FC<HomePassportModalProps> = ({
  isOpen,
  onClose,
  userAddress = 'Rua Gonçalves Chaves, 450 - Centro',
  userNeighborhood = 'Pelotas / RS',
  userName = 'César Cardoso'
}) => {
  const [activeTab, setActiveTab] = useState<'geral' | 'eletrica' | 'wifi' | 'solar' | 'qrcode'>('geral');
  const [selectedCircuit, setSelectedCircuit] = useState<CircuitLog | null>(null);

  const passportData: HomePassportData = {
    propertyId: 'RES-PEL-8829-2026',
    ownerName: userName,
    address: userAddress,
    neighborhood: userNeighborhood,
    city: 'Pelotas',
    propertyType: 'Casa',
    qrCodeUrl: 'https://resolve360.pelotas.rs/passaporte/RES-PEL-8829-2026',
    warrantyExpiry: '15/11/2026',
    warrantyActive: true,
    serviceHistoryCount: 4,
    circuits: [
      { id: 'c1', number: 1, label: 'Geral Bipolar 220V', amperage: '50A', voltage: '220V', status: 'Operacional', lastInspection: '12/08/2026' },
      { id: 'c2', number: 2, label: 'Chuveiro Master 6800W', amperage: '32A', voltage: '220V', status: 'Operacional', lastInspection: '12/08/2026' },
      { id: 'c3', number: 3, label: 'Ar Condicionado Inverter Sala', amperage: '20A', voltage: '220V', status: 'Operacional', lastInspection: '05/06/2026' },
      { id: 'c4', number: 4, label: 'Tomadas Cozinha & Forno', amperage: '25A', voltage: '220V', status: 'Operacional', lastInspection: '12/08/2026' },
      { id: 'c5', number: 5, label: 'Iluminação LED Geral', amperage: '10A', voltage: '220V', status: 'Operacional', lastInspection: '12/08/2026' },
      { id: 'c6', number: 6, label: 'Tomadas Quartos & TV', amperage: '16A', voltage: '220V', status: 'Operacional', lastInspection: '12/08/2026' },
      { id: 'c7', number: 7, label: 'Dispositivo DPS Clamper Anti-raio', amperage: '45kA', voltage: '220V', status: 'Operacional', lastInspection: '12/08/2026' },
      { id: 'c8', number: 8, label: 'Interruptor Diferencial DR 30mA', amperage: '40A', voltage: '220V', status: 'Operacional', lastInspection: '12/08/2026' }
    ],
    wifiNodes: [
      { name: 'Nó Primário (Sala de Estar)', model: 'Deco Mesh AX3000 Wi-Fi 6', location: 'Rack da Sala', status: 'Excelente' },
      { name: 'Nó Secundário (Quartos)', model: 'Deco Mesh AX3000 Wi-Fi 6', location: 'Corredor Superior', status: 'Excelente' },
      { name: 'Nó Externo (Pátio & Garagem)', model: 'Deco Mesh Outdoor IP65', location: 'Área Gourmet', status: 'Bom' }
    ],
    securityDevices: [
      { type: 'Câmera Wi-Fi Externa 2K', model: 'Intelbras IM5 SC', location: 'Portão Principal / Rua' },
      { type: 'Câmera Wi-Fi 360°', model: 'Intelbras IM4', location: 'Garagem Coberta' },
      { type: 'Fechadura Digital Biométrica', model: 'Yale YMC 420W', location: 'Porta de Entrada Social' }
    ],
    solarSystem: {
      panelsCount: 12,
      powerKwp: 6.6,
      lastCleaning: '10/07/2026',
      healthPercent: 98
    }
  };

  if (!isOpen) return null;

  const handlePrintSticker = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className="bg-white text-slate-900 rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200 my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black shadow-md">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-white">Passaporte Digital da Residência</h3>
                <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  {passportData.propertyId}
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>{passportData.address}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('geral')}
            className={`py-3 px-3.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'geral'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Visão Geral</span>
          </button>
          <button
            onClick={() => setActiveTab('eletrica')}
            className={`py-3 px-3.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'eletrica'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Quadro Elétrico (220V)</span>
          </button>
          <button
            onClick={() => setActiveTab('wifi')}
            className={`py-3 px-3.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'wifi'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wifi className="w-3.5 h-3.5" />
            <span>Topologia Wi-Fi & CFTV</span>
          </button>
          <button
            onClick={() => setActiveTab('solar')}
            className={`py-3 px-3.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'solar'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Energia Solar</span>
          </button>
          <button
            onClick={() => setActiveTab('qrcode')}
            className={`py-3 px-3.5 text-xs font-bold whitespace-nowrap border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'qrcode'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Adesivo QR Code</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: GERAL */}
          {activeTab === 'geral' && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Garantia Ativa</span>
                  </div>
                  <div className="text-xl font-extrabold text-emerald-900 mt-1">90 Dias Ativos</div>
                  <div className="text-[11px] text-emerald-700 mt-0.5">Válido até {passportData.warrantyExpiry}</div>
                </div>

                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wider">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span>Circuitos Mapeados</span>
                  </div>
                  <div className="text-xl font-extrabold text-blue-900 mt-1">8 Disjuntores</div>
                  <div className="text-[11px] text-blue-700 mt-0.5">100% Norma NBR 5410</div>
                </div>

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
                    <Sun className="w-4 h-4 text-amber-600" />
                    <span>Solar & Wi-Fi</span>
                  </div>
                  <div className="text-xl font-extrabold text-amber-900 mt-1">6.6 kWp • Mesh</div>
                  <div className="text-[11px] text-amber-700 mt-0.5">Saúde do Sistema: 98%</div>
                </div>
              </div>

              {/* Property Specs */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-600" />
                  <span>Ficha Técnica do Imóvel</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Titular:</span>
                    <span className="font-bold text-slate-900">{passportData.ownerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Padrão Elétrico:</span>
                    <span className="font-bold text-slate-900">Bifásico 220V CEEE</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Proteção Anti-raio:</span>
                    <span className="font-bold text-emerald-600">DPS Instalado ✓</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Proteção Contra Choque:</span>
                    <span className="font-bold text-emerald-600">DR 30mA Ativo ✓</span>
                  </div>
                </div>
              </div>

              {/* Service timeline recap */}
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-slate-900">Histórico de Intervenções Técnicas</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      <div>
                        <span className="font-bold text-slate-900">Troca do Disjuntor Geral & Instalação DPS</span>
                        <span className="text-slate-500 block text-[11px]">Técnico: Carlos E. • Pelotas</span>
                      </div>
                    </div>
                    <span className="text-slate-500 font-medium">12/08/2026</span>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      <div>
                        <span className="font-bold text-slate-900">Configuração de Wi-Fi Mesh Gigabit nos Quartos</span>
                        <span className="text-slate-500 block text-[11px]">Técnico: Rafael M. • Pelotas</span>
                      </div>
                    </div>
                    <span className="text-slate-500 font-medium">05/06/2026</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ELÉTRICA / QUADRO */}
          {activeTab === 'eletrica' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Quadro de Distribuição de Circuitos (QDC)</h4>
                  <p className="text-xs text-slate-500">Clique em qualquer disjuntor para inspecionar amperagem e carga.</p>
                </div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                  Tensão Padrão: 220V
                </span>
              </div>

              {/* Visual Breaker Rail representation */}
              <div className="bg-slate-900 rounded-3xl p-6 border-4 border-slate-800 shadow-inner text-white">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700 text-xs">
                  <span className="font-bold text-slate-400 font-mono">Trilho DIN Superior • QDC Residencial</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Barramento Bifásico 220V
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {passportData.circuits.map((c) => {
                    const isSelected = selectedCircuit?.id === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCircuit(c)}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'bg-blue-600 border-white text-white shadow-lg'
                            : 'bg-slate-800 border-slate-700 hover:bg-slate-700/80 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold bg-slate-900 px-1.5 py-0.5 rounded text-blue-400">
                            #{c.number}
                          </span>
                          <span className="text-xs font-black font-mono text-amber-400">{c.amperage}</span>
                        </div>
                        <div className="text-xs font-bold mt-2 truncate">{c.label}</div>
                        <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                          <span>{c.voltage}</span>
                          <span className="text-emerald-400">✓ {c.status}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedCircuit && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs space-y-1 animate-in fade-in">
                  <div className="font-bold text-blue-900 text-sm">
                    Circuito #{selectedCircuit.number}: {selectedCircuit.label} ({selectedCircuit.amperage})
                  </div>
                  <p className="text-blue-800">
                    Última inspeção realizada em <strong>{selectedCircuit.lastInspection}</strong> com torque aferido nos bornes e medição de corrente operacional estável.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: WIFI & CFTV */}
          {activeTab === 'wifi' && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-slate-900">Nós de Rede Mesh & Câmeras de Segurança</h4>
              
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Wi-Fi Mesh Residencial:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {passportData.wifiNodes.map((node, i) => (
                    <div key={i} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                      <div className="flex items-center justify-between text-blue-600 font-bold mb-1">
                        <Wifi className="w-4 h-4" />
                        <span className="text-emerald-600 font-bold text-[10px] bg-emerald-100 px-2 py-0.5 rounded-full">
                          {node.status}
                        </span>
                      </div>
                      <div className="font-bold text-slate-900">{node.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{node.model}</div>
                      <div className="text-[10px] text-slate-400 mt-2 font-mono">📍 {node.location}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Dispositivos de Segurança & Fechadura:
                </span>
                <div className="space-y-2">
                  {passportData.securityDevices.map((dev, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <Shield className="w-4 h-4 text-indigo-600" />
                        <div>
                          <span className="font-bold text-slate-900">{dev.type} ({dev.model})</span>
                          <span className="text-slate-500 block text-[11px]">Posição: {dev.location}</span>
                        </div>
                      </div>
                      <span className="text-emerald-600 font-bold font-mono">Online</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SOLAR */}
          {activeTab === 'solar' && passportData.solarSystem && (
            <div className="space-y-4">
              <div className="p-5 bg-amber-50 rounded-3xl border border-amber-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
                    <Sun className="w-4 h-4 text-amber-600" />
                    <span>Usina Solar Fotovoltaica</span>
                  </div>
                  <h3 className="text-2xl font-black text-amber-950 mt-1">
                    {passportData.solarSystem.powerKwp} kWp de Potência
                  </h3>
                  <p className="text-xs text-amber-800 mt-1">
                    Composta por <strong>{passportData.solarSystem.panelsCount} módulos solares</strong> com monitoramento ativo.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-amber-600 font-mono">
                    {passportData.solarSystem.healthPercent}%
                  </span>
                  <span className="text-[10px] uppercase font-bold text-amber-800 block">Eficiência</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-slate-500 block">Última Limpeza de Placas:</span>
                  <span className="font-bold text-slate-900 text-sm">{passportData.solarSystem.lastCleaning}</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-slate-500 block">Próxima Revisão Recomendada:</span>
                  <span className="font-bold text-slate-900 text-sm">Novembro / 2026</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: QR CODE STICKER */}
          {activeTab === 'qrcode' && (
            <div className="space-y-6 text-center">
              <div className="max-w-sm mx-auto bg-white p-6 rounded-3xl border-2 border-slate-900 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-black text-sm text-blue-600">RESOLVE360</span>
                  <span className="text-[10px] font-bold uppercase text-slate-600">Adesivo de Quadro</span>
                </div>

                {/* Stylized QR Code Container */}
                <div className="w-44 h-44 mx-auto bg-slate-900 p-3 rounded-2xl flex items-center justify-center shadow-md">
                  {/* High fidelity SVG QR representation */}
                  <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="currentColor">
                    {/* Corner Position Detection Squares */}
                    <rect x="5" y="5" width="25" height="25" rx="3" fill="white" />
                    <rect x="9" y="9" width="17" height="17" rx="2" fill="#0f172a" />
                    <rect x="13" y="13" width="9" height="9" fill="white" />

                    <rect x="70" y="5" width="25" height="25" rx="3" fill="white" />
                    <rect x="74" y="9" width="17" height="17" rx="2" fill="#0f172a" />
                    <rect x="78" y="13" width="9" height="9" fill="white" />

                    <rect x="5" y="70" width="25" height="25" rx="3" fill="white" />
                    <rect x="9" y="74" width="17" height="17" rx="2" fill="#0f172a" />
                    <rect x="13" y="78" width="9" height="9" fill="white" />

                    {/* Data Matrix Dots */}
                    <rect x="36" y="8" width="5" height="5" fill="white" />
                    <rect x="46" y="8" width="5" height="5" fill="white" />
                    <rect x="56" y="8" width="5" height="5" fill="white" />
                    <rect x="36" y="20" width="8" height="8" fill="white" />
                    <rect x="50" y="20" width="6" height="6" fill="white" />
                    <rect x="8" y="38" width="6" height="6" fill="white" />
                    <rect x="20" y="38" width="8" height="8" fill="white" />
                    <rect x="34" y="36" width="12" height="12" fill="white" />
                    <rect x="52" y="38" width="14" height="6" fill="white" />
                    <rect x="72" y="38" width="18" height="6" fill="white" />
                    <rect x="8" y="52" width="12" height="8" fill="white" />
                    <rect x="26" y="52" width="6" height="6" fill="white" />
                    <rect x="38" y="54" width="8" height="8" fill="white" />
                    <rect x="52" y="50" width="10" height="10" fill="white" />
                    <rect x="68" y="52" width="8" height="8" fill="white" />
                    <rect x="82" y="52" width="8" height="8" fill="white" />
                    <rect x="36" y="72" width="10" height="10" fill="white" />
                    <rect x="52" y="72" width="8" height="8" fill="white" />
                    <rect x="66" y="72" width="14" height="14" fill="white" />
                    <rect x="86" y="72" width="6" height="6" fill="white" />
                    <rect x="36" y="86" width="6" height="6" fill="white" />
                    <rect x="48" y="86" width="8" height="8" fill="white" />
                    <rect x="86" y="86" width="6" height="6" fill="white" />
                  </svg>
                </div>

                <div className="space-y-1">
                  <div className="font-mono text-xs font-bold text-slate-900">
                    ID: {passportData.propertyId}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Escaneie para acessar o mapa elétrico, data de revisões e acionar assistência em Pelotas.
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={handlePrintSticker}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir Adesivo para o Quadro</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Prontuário Registrado sob Normas NBR 5410 & CREA-RS
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs transition-colors"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
