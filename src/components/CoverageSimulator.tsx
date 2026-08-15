import React, { useState } from 'react';
import {
  Wifi,
  Video,
  Shield,
  Plus,
  Trash2,
  Sparkles,
  Info,
  Maximize2,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  Zap
} from 'lucide-react';
import { openWhatsAppChat } from '../data/servicesData';

interface NodeDevice {
  id: string;
  type: 'wifi' | 'camera';
  name: string;
  x: number; // percent 0 to 100
  y: number; // percent 0 to 100
  range: number; // radius in percent
  angle?: number; // for camera FOV
}

export const CoverageSimulator: React.FC = () => {
  const [selectedHouseType, setSelectedHouseType] = useState<'casa-terrea' | 'sobrado' | 'apartamento' | 'praia-laranjal'>('casa-terrea');
  
  // Interactive nodes placed in the plan
  const [devices, setDevices] = useState<NodeDevice[]>([
    { id: 'dev-1', type: 'wifi', name: 'Roteador Principal (Sala)', x: 30, y: 55, range: 35 },
    { id: 'dev-2', type: 'wifi', name: 'Nó Mesh (Quartos)', x: 70, y: 35, range: 35 },
    { id: 'dev-3', type: 'camera', name: 'Câmera Portão / Garagem', x: 15, y: 80, range: 30, angle: 45 },
    { id: 'dev-4', type: 'camera', name: 'Câmera Pátio dos Fundos', x: 85, y: 20, range: 30, angle: 220 }
  ]);

  const [activeTool, setActiveTool] = useState<'wifi' | 'camera'>('wifi');
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

  const houseTypes = [
    { id: 'casa-terrea', label: 'Casa Térrea 120m²', subtitle: 'Sala, Cozinha, 3 Quartos e Pátio', bgRooms: '3 quartos • 2 banheiros' },
    { id: 'sobrado', label: 'Sobrado 2 Pisos 180m²', subtitle: 'Piso inferior e superior integrado', bgRooms: 'Andar Térreo + Superior' },
    { id: 'apartamento', label: 'Apartamento 85m²', subtitle: 'Estrutura compacta com paredes duplas', bgRooms: '2 Quartos • Sala Estendida' },
    { id: 'praia-laranjal', label: 'Casa Laranjal c/ Pátio', subtitle: 'Área gourmet e cobertura externa ampla', bgRooms: 'Varanda & Churrasqueira' }
  ];

  const handleAddDevice = (type: 'wifi' | 'camera') => {
    const newId = `dev-${Date.now()}`;
    const newDevice: NodeDevice = {
      id: newId,
      type,
      name: type === 'wifi' ? `Nó Mesh #${devices.filter(d => d.type === 'wifi').length + 1}` : `Câmera #${devices.filter(d => d.type === 'camera').length + 1}`,
      x: 45 + Math.random() * 15,
      y: 45 + Math.random() * 15,
      range: type === 'wifi' ? 35 : 28,
      angle: type === 'camera' ? 90 : undefined
    };
    setDevices([...devices, newDevice]);
    setSelectedDeviceId(newId);
  };

  const handleRemoveDevice = (id: string) => {
    setDevices(devices.filter((d) => d.id !== id));
    if (selectedDeviceId === id) setSelectedDeviceId(null);
  };

  const handleResetPreset = () => {
    setDevices([
      { id: 'dev-1', type: 'wifi', name: 'Roteador Principal (Sala)', x: 30, y: 55, range: 35 },
      { id: 'dev-2', type: 'wifi', name: 'Nó Mesh (Quartos)', x: 70, y: 35, range: 35 },
      { id: 'dev-3', type: 'camera', name: 'Câmera Portão / Garagem', x: 15, y: 80, range: 30, angle: 45 },
      { id: 'dev-4', type: 'camera', name: 'Câmera Pátio dos Fundos', x: 85, y: 20, range: 30, angle: 220 }
    ]);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    const newId = `dev-${Date.now()}`;
    const newDev: NodeDevice = {
      id: newId,
      type: activeTool,
      name: activeTool === 'wifi' ? `Nó Wi-Fi Mesh` : `Câmera de Segurança`,
      x,
      y,
      range: activeTool === 'wifi' ? 35 : 28,
      angle: activeTool === 'camera' ? 45 : undefined
    };

    setDevices([...devices, newDev]);
    setSelectedDeviceId(newId);
  };

  const wifiCount = devices.filter((d) => d.type === 'wifi').length;
  const cameraCount = devices.filter((d) => d.type === 'camera').length;

  // Calculated Coverage Rating Score
  const coveragePercent = Math.min(99, Math.round(wifiCount * 42 + cameraCount * 8));

  const handleRequestCustomProject = () => {
    const msg = `Olá, Resolve360! 📶 Montei uma simulação de cobertura no site:

🏠 *Planta:* ${houseTypes.find((h) => h.id === selectedHouseType)?.label}
📶 *Nós Wi-Fi Mesh:* ${wifiCount} unidade(s)
📹 *Câmeras de Segurança:* ${cameraCount} unidade(s)
🎯 *Cobertura Estimada:* ${coveragePercent}%

Gostaria de um orçamento para instalação física desses pontos cabeados na minha residência em Pelotas!`;

    openWhatsAppChat(msg);
  };

  return (
    <section id="simulador-cobertura" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Simulador Interativo 360°
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Simulador de Cobertura Wi-Fi & Câmeras
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Posicione roteadores Mesh e câmeras na planta da casa para eliminar zonas cegas de sinal e pontos desprotegidos.
          </p>

          {/* House Type Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {houseTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedHouseType(type.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedHouseType === type.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Simulator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Floorplan Stage */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Ferramenta Ativa:
                </span>
                <button
                  onClick={() => setActiveTool('wifi')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    activeTool === 'wifi'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Wifi className="w-3.5 h-3.5" />
                  <span>Nó Wi-Fi Mesh</span>
                </button>
                <button
                  onClick={() => setActiveTool('camera')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    activeTool === 'camera'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Câmera CFTV</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetPreset}
                  className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                  title="Restaurar layout inicial"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Canvas */}
            <div
              onClick={handleCanvasClick}
              className="relative w-full h-[380px] sm:h-[430px] bg-slate-900 rounded-2xl overflow-hidden cursor-crosshair border-2 border-slate-800 shadow-inner select-none"
            >
              {/* Floorplan Architectural Grid & Rooms Layout */}
              <svg className="w-full h-full absolute inset-0 opacity-40 pointer-events-none" viewBox="0 0 100 100">
                {/* Outer walls */}
                <rect x="5" y="5" width="90" height="90" fill="none" stroke="#475569" strokeWidth="1.5" />
                {/* Room Dividers */}
                <line x1="5" y1="45" x2="65" y2="45" stroke="#475569" strokeWidth="1.2" />
                <line x1="65" y1="5" x2="65" y2="95" stroke="#475569" strokeWidth="1.2" />
                <line x1="65" y1="50" x2="95" y2="50" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="35" y1="45" x2="35" y2="95" stroke="#475569" strokeWidth="1.2" />
              </svg>

              {/* Room Text Labels */}
              <div className="absolute top-8 left-10 text-[11px] font-bold text-slate-500 pointer-events-none uppercase">
                Quarto Casal
              </div>
              <div className="absolute top-8 right-12 text-[11px] font-bold text-slate-500 pointer-events-none uppercase">
                Pátio / Gourmet
              </div>
              <div className="absolute bottom-12 left-10 text-[11px] font-bold text-slate-500 pointer-events-none uppercase">
                Garagem / Entrada
              </div>
              <div className="absolute bottom-12 right-20 text-[11px] font-bold text-slate-500 pointer-events-none uppercase">
                Sala de Estar
              </div>

              {/* Render Wi-Fi Coverage Heatmap Waves */}
              {devices
                .filter((d) => d.type === 'wifi')
                .map((dev) => (
                  <div
                    key={`wave-${dev.id}`}
                    className="absolute rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${dev.x}%`,
                      top: `${dev.y}%`,
                      width: `${dev.range * 2.4}%`,
                      height: `${dev.range * 2.4}%`,
                      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.45) 0%, rgba(16, 185, 129, 0.25) 50%, rgba(59, 130, 246, 0) 75%)'
                    }}
                  />
                ))}

              {/* Render Camera Vision FOV Cones */}
              {devices
                .filter((d) => d.type === 'camera')
                .map((dev) => (
                  <div
                    key={`fov-${dev.id}`}
                    className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${dev.x}%`,
                      top: `${dev.y}%`,
                      width: `${dev.range * 2}%`,
                      height: `${dev.range * 2}%`,
                      transform: `translate(-50%, -50%) rotate(${dev.angle || 0}deg)`,
                      background: 'conic-gradient(from -45deg at 50% 50%, rgba(99, 102, 241, 0.4) 0deg, rgba(99, 102, 241, 0.4) 90deg, transparent 90deg, transparent 360deg)',
                      borderRadius: '50%'
                    }}
                  />
                ))}

              {/* Render Interactive Device Icons on Stage */}
              {devices.map((dev) => {
                const isSelected = selectedDeviceId === dev.id;
                return (
                  <div
                    key={dev.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDeviceId(dev.id);
                    }}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer p-2 rounded-2xl shadow-xl transition-transform ${
                      isSelected ? 'scale-125 ring-2 ring-white' : 'hover:scale-110'
                    } ${dev.type === 'wifi' ? 'bg-blue-600 text-white' : 'bg-indigo-600 text-white'}`}
                    style={{ left: `${dev.x}%`, top: `${dev.y}%` }}
                    title={dev.name}
                  >
                    {dev.type === 'wifi' ? <Wifi className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                  </div>
                );
              })}

              {/* Click prompt overlay */}
              <div className="absolute bottom-3 left-4 bg-slate-900/80 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-700 text-[11px] text-slate-300 pointer-events-none flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-400" />
                <span>Clique em qualquer cômodo para adicionar {activeTool === 'wifi' ? 'Nó Mesh' : 'Câmera'}</span>
              </div>
            </div>

            {/* Canvas Legend */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-slate-600">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  <span>Sinal Wi-Fi 5GHz Excelente</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                  <span>Ângulo de Visão Câmera (110°)</span>
                </div>
              </div>
              <span className="font-mono text-[11px] text-slate-400">
                {devices.length} dispositivos posicionados
              </span>
            </div>
          </div>

          {/* Right Column: Diagnostic Analysis & Equipment Recommendation */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Efficiency Score Card */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Índice de Cobertura Residencial
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                  Pelotas Conectada
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-white font-mono">{coveragePercent}%</span>
                <span className="text-sm font-semibold text-emerald-400">
                  {coveragePercent > 80 ? 'Sem Zonas Cegas' : 'Zonas com Baixo Sinal'}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-500"
                  style={{ width: `${coveragePercent}%` }}
                ></div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Com <strong>{wifiCount} nó(s) Mesh</strong> e <strong>{cameraCount} câmera(s)</strong>, você garante internet estável para home office e streaming em todos os cômodos.
              </p>
            </div>

            {/* Placed devices list with delete option */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Dispositivos no Projeto ({devices.length}):
                </h4>
                <button
                  onClick={() => handleAddDevice(activeTool)}
                  className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar</span>
                </button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {devices.map((d) => (
                  <div
                    key={d.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-xs border transition-all ${
                      selectedDeviceId === d.id
                        ? 'bg-blue-50 border-blue-300 text-blue-900'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {d.type === 'wifi' ? (
                        <Wifi className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      ) : (
                        <Video className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      )}
                      <span className="font-semibold truncate">{d.name}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveDevice(d.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded-lg transition-colors shrink-0"
                      title="Remover"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleRequestCustomProject}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 text-xs"
            >
              <span>Solicitar Orçamento Desta Simulação</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};
