import React, { useState } from 'react';
import {
  Sparkles,
  Camera,
  Upload,
  Mic,
  MicOff,
  AlertTriangle,
  CheckCircle2,
  Wrench,
  Clock,
  DollarSign,
  ArrowRight,
  RefreshCw,
  Zap,
  Wifi,
  Sun,
  Shield,
  FileText
} from 'lucide-react';
import { AIDiagnosisResult } from '../types';
import { openWhatsAppChat } from '../data/servicesData';

interface AIDiagnosticScannerProps {
  onScheduleWithDiagnosis?: (diagnosis: AIDiagnosisResult) => void;
}

interface DemoScenario {
  id: string;
  title: string;
  category: string;
  icon: string;
  thumbnail: string;
  description: string;
  result: AIDiagnosisResult;
}

export const AIDiagnosticScanner: React.FC<AIDiagnosticScannerProps> = ({
  onScheduleWithDiagnosis
}) => {
  const [selectedScenario, setSelectedScenario] = useState<DemoScenario | null>(null);
  const [customText, setCustomText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioTranscript, setAudioTranscript] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIDiagnosisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'presets' | 'upload' | 'audio'>('presets');

  const demoScenarios: DemoScenario[] = [
    {
      id: 'disjuntor-aquecendo',
      title: 'Disjuntor Desarmando / Cheiro de Queimado',
      category: 'Elétrica',
      icon: 'Zap',
      thumbnail: '⚡ Quadro com disjuntor de 20A sobrecarregado',
      description: 'Chuveiro e aquecedor ligados juntos desarmam a chave geral no quadro.',
      result: {
        id: 'AI-DIAG-001',
        problemSummary: 'Sobrecarga de circuito 220V e aquecimento nos bornes do disjuntor',
        probableCause: 'Dimensionamento incorreto do disjuntor de 20A para carga simultânea de 5.500W + cabos com bitola inferior (2.5mm² em vez de 6mm²).',
        riskLevel: 'Crítico',
        requiredParts: [
          { name: 'Disjuntor Bipolar DIN 32A Curva C (Schneider/Steck)', estimatedPrice: 48.0, category: 'Dispositivos' },
          { name: 'Cabo Flexível 6mm² 750V Anti-chama (15m)', estimatedPrice: 85.0, category: 'Cabos' },
          { name: 'Conector WAGO 221 para Chuveiro 6mm²', estimatedPrice: 18.0, category: 'Conexões' }
        ],
        suggestedAction: 'Substituição do circuito exclusivo do chuveiro com cabo 6mm² e disjuntor bipolar 32A com reaperto de barramento.',
        estimatedLaborCost: 140.0,
        estimatedDuration: '1h 30min',
        category: 'Elétrica',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }
    },
    {
      id: 'wifi-queda',
      title: 'Wi-Fi com Queda no Quarto e Pátio',
      category: 'Internet e Wi-Fi',
      icon: 'Wifi',
      thumbnail: '📶 Roteador embutido em móvel fechado',
      description: 'Internet da operadora chega na sala mas nos quartos o sinal oscila e cai.',
      result: {
        id: 'AI-DIAG-002',
        problemSummary: 'Atenuação severa de sinal 5GHz por paredes de alvenaria e canal congestionado',
        probableCause: 'Roteador único em posição desfavorável com paredes espessas em Pelotas e interferência de redes vizinhas no canal 36.',
        riskLevel: 'Médio',
        requiredParts: [
          { name: 'Nó Wi-Fi Mesh Gigabit Dual-Band AC1200', estimatedPrice: 220.0, category: 'Equipamentos' },
          { name: 'Cabo de Rede CAT6 100% Cobre Homologado (20m)', estimatedPrice: 65.0, category: 'Cabeamento' },
          { name: 'Conectores RJ45 Blindados + Conduíte aparente', estimatedPrice: 25.0, category: 'Acessórios' }
        ],
        suggestedAction: 'Instalação de Ponto de Rede cabeado (Backhaul) interligando nó Mesh no corredor para cobertura 100% sem zonas cegas.',
        estimatedLaborCost: 110.0,
        estimatedDuration: '1h 15min',
        category: 'Internet e Wi-Fi',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }
    },
    {
      id: 'solar-queda',
      title: 'Inversor Solar com Alerta de Falha',
      category: 'Energia Solar',
      icon: 'Sun',
      thumbnail: '☀️ Inversor com LED de isolamento',
      description: 'Geração solar caiu 40% este mês e o inversor exibe erro de fuga de corrente.',
      result: {
        id: 'AI-DIAG-003',
        problemSummary: 'Baixa resistência de isolamento em string CC e sujidade acumulada',
        probableCause: 'Possível infiltração em conector MC4 no telhado após chuvas recentes em Pelotas ou poeira/fuligem aderida aos módulos.',
        riskLevel: 'Alto',
        requiredParts: [
          { name: 'Par de Conectores MC4 com proteção IP67 Solar', estimatedPrice: 32.0, category: 'Conectores' },
          { name: 'Fusível Solar CC 1000V 15A gPV', estimatedPrice: 28.0, category: 'Proteção' }
        ],
        suggestedAction: 'Inspeção com megômetro em corrente contínua, troca de conectores oxidados e lavagem técnica com água desmineralizada.',
        estimatedLaborCost: 220.0,
        estimatedDuration: '2h 30min',
        category: 'Energia Solar',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }
    },
    {
      id: 'camera-sem-sinal',
      title: 'Câmera Externa Sem Imagem Noturna',
      category: 'Segurança',
      icon: 'Shield',
      thumbnail: '📹 Câmera bullet com LED infravermelho desligado',
      description: 'Câmera da garagem funciona de dia mas à noite fica totalmente preta.',
      result: {
        id: 'AI-DIAG-004',
        problemSummary: 'Queda de tensão na fonte chaveada 12V ao acionar LEDs IR noturnos',
        probableCause: 'Fonte 12V 1A com capacitores desgastados ou cabo de alimentação longo com bitola fina gerando queda abaixo de 10.5V.',
        riskLevel: 'Baixo',
        requiredParts: [
          { name: 'Fonte Chaveada Estabilizada 12V 3A com Filtro Anti-ruído', estimatedPrice: 45.0, category: 'Alimentação' },
          { name: 'Conector P4 Macho com Borne Borracha', estimatedPrice: 8.0, category: 'Conectores' }
        ],
        suggestedAction: 'Substituição da fonte de alimentação por modelo com maior amperagem e medição de tensão no ponto da câmera.',
        estimatedLaborCost: 85.0,
        estimatedDuration: '45min',
        category: 'Segurança',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }
    }
  ];

  const handleSelectScenario = (scenario: DemoScenario) => {
    setSelectedScenario(scenario);
    setAnalysisResult(null);
  };

  const handleStartAnalysis = (scenarioOverride?: DemoScenario) => {
    const target = scenarioOverride || selectedScenario || demoScenarios[0];
    setIsAnalyzing(true);
    setAnalysisResult(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      if (customText.trim() && !scenarioOverride) {
        // Build dynamic result based on user custom text
        setAnalysisResult({
          id: `AI-DIAG-${Math.floor(100 + Math.random() * 900)}`,
          problemSummary: `Análise de sintoma: "${customText.slice(0, 60)}..."`,
          probableCause: 'Identificada necessidade de intervenção preventiva e calibração de carga com instrumentos de precisão.',
          riskLevel: 'Médio',
          requiredParts: [
            { name: 'Material de reparo e fiação de conformidade NBR 5410', estimatedPrice: 45.0, category: 'Insumos' },
            { name: 'Dispositivo de proteção e isolamento antichama', estimatedPrice: 35.0, category: 'Segurança' }
          ],
          suggestedAction: 'Visita técnica com maleta diagnóstica completa para verificação e reparo no local em Pelotas.',
          estimatedLaborCost: 95.0,
          estimatedDuration: '1h 00min',
          category: 'Elétrica / Reparos',
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        });
      } else {
        setAnalysisResult(target.result);
      }
    }, 1800);
  };

  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setAudioTranscript('Gravando descrição do ruído / problema elétrico...');
      setTimeout(() => {
        setAudioTranscript('“O chuveiro começou a fazer um chiado na parede e o disjuntor do corredor esquentou e desarmou duas vezes hoje cedo...”');
        setIsRecording(false);
        setSelectedScenario(demoScenarios[0]);
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  const handleSendWhatsAppReport = () => {
    if (!analysisResult) return;
    const partsList = analysisResult.requiredParts
      .map((p) => `• ${p.name} (~R$ ${p.estimatedPrice.toFixed(2)})`)
      .join('\n');

    const msg = `Olá, Resolve360! 🤖 Fiz o *Diagnóstico Inteligente por IA* no site:

🔍 *Laudo Preliminar:* ${analysisResult.problemSummary}
⚠️ *Gravidade:* ${analysisResult.riskLevel}
🔧 *Causa Provável:* ${analysisResult.probableCause}

📦 *Peças Recomendadas para o Técnico Levar:*
${partsList}

⏱️ *Tempo Estimado:* ${analysisResult.estimatedDuration}
💰 *Mão de Obra Estimada:* R$ ${analysisResult.estimatedLaborCost.toFixed(2)}

Gostaria de agendar a visita técnica com o técnico já preparado com essas peças!`;

    openWhatsAppChat(msg);
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'Crítico':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'Alto':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Médio':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
  };

  return (
    <section id="diagnostico-ia" className="py-16 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            Inovação Resolve360 • Triagem com Inteligência Artificial
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Diagnóstico Inteligente Residencial
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Envie uma foto, áudio ou descreva o sintoma. Nossa IA pré-identifica a causa, lista as peças certas e o técnico de Pelotas já chega com a solução pronta.
          </p>
        </div>

        {/* Interactive Workspace Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input Selection */}
          <div className="lg:col-span-6 bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl">
            {/* Tabs */}
            <div className="flex items-center gap-2 p-1 bg-slate-900/80 rounded-2xl border border-slate-700/60 mb-6">
              <button
                onClick={() => setActiveTab('presets')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'presets'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Casos Frequentes</span>
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'upload'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Foto / Câmera</span>
              </button>
              <button
                onClick={() => setActiveTab('audio')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'audio'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Áudio / Voz</span>
              </button>
            </div>

            {/* Content for Casos Frequentes */}
            {activeTab === 'presets' && (
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Selecione um sintoma ou situação:
                </span>
                <div className="grid grid-cols-1 gap-2.5">
                  {demoScenarios.map((scenario) => {
                    const isSelected = selectedScenario?.id === scenario.id;
                    return (
                      <button
                        key={scenario.id}
                        onClick={() => handleSelectScenario(scenario)}
                        className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-blue-600/20 border-blue-500 text-white ring-2 ring-blue-500/30'
                            : 'bg-slate-900/50 border-slate-700/60 text-slate-300 hover:border-slate-500 hover:bg-slate-900/80'
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold ${
                            isSelected
                              ? 'bg-blue-500 text-white'
                              : 'bg-slate-800 text-blue-400 border border-slate-700'
                          }`}
                        >
                          {scenario.icon === 'Zap' && <Zap className="w-5 h-5" />}
                          {scenario.icon === 'Wifi' && <Wifi className="w-5 h-5" />}
                          {scenario.icon === 'Sun' && <Sun className="w-5 h-5" />}
                          {scenario.icon === 'Shield' && <Shield className="w-5 h-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-sm text-white truncate">
                              {scenario.title}
                            </span>
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 shrink-0">
                              {scenario.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                            {scenario.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Content for Upload / Foto */}
            {activeTab === 'upload' && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-2xl p-6 text-center bg-slate-900/40 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto mb-3 border border-blue-500/20">
                    <Camera className="w-7 h-7" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    Fotografe a tomada, quadro de luz ou equipamento
                  </h4>
                  <p className="text-xs text-slate-400 mb-4 max-w-xs mx-auto">
                    Nossos modelos de visão computacional detectam superaquecimento, folgas em bornes e conexões incorretas.
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleSelectScenario(demoScenarios[0])}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                    >
                      Usar Foto Exemplo (Quadro 220V)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Observações adicionais (opcional):
                  </label>
                  <textarea
                    rows={2}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Ex: Ocorreu após ligar o micro-ondas junto com o forno elétrico..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
              </div>
            )}

            {/* Content for Audio / Gravador */}
            {activeTab === 'audio' && (
              <div className="space-y-4 text-center py-4">
                <div className="w-20 h-20 rounded-full bg-blue-500/10 border-2 border-blue-500/30 flex items-center justify-center mx-auto relative">
                  {isRecording && (
                    <span className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping"></span>
                  )}
                  <button
                    onClick={handleToggleRecord}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg ${
                      isRecording
                        ? 'bg-rose-600 text-white scale-110'
                        : 'bg-blue-600 hover:bg-blue-500 text-white'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                  </button>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {isRecording ? 'Ouvindo... Fale agora' : 'Grave um áudio de até 30s'}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    Explique como se estivesse conversando com o técnico. A IA transcreverá e estruturará os termos técnicos.
                  </p>
                </div>

                {audioTranscript && (
                  <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-700 text-left text-xs text-slate-300 italic">
                    <span className="text-[10px] font-bold uppercase text-blue-400 not-italic block mb-1">
                      Transcrição Automática:
                    </span>
                    {audioTranscript}
                  </div>
                )}
              </div>
            )}

            {/* Action Button */}
            <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center gap-3">
              <button
                onClick={() => handleStartAnalysis()}
                disabled={isAnalyzing}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Processando Laudo Técnico com IA...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Executar Diagnóstico com IA</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: AI Analysis Result Display */}
          <div className="lg:col-span-6">
            {isAnalyzing ? (
              <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-8 text-center min-h-[460px] flex flex-col items-center justify-center space-y-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-blue-400 animate-pulse" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
                    <RefreshCw className="w-3.5 h-3.5 text-white animate-spin" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-white">Analisando Normas NBR 5410 & Padrões CEEE/Equatorial</h4>
                  <p className="text-xs text-slate-400 max-w-sm">
                    Cruzando dados de tensão local (220V Pelotas), dimensionamento de carga e catálogo de peças necessárias...
                  </p>
                </div>
                <div className="w-48 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-blue-500 animate-[pulse_1s_infinite]"></div>
                </div>
              </div>
            ) : analysisResult ? (
              <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
                {/* Result Header */}
                <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-700">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-blue-400">
                        {analysisResult.id}
                      </span>
                      <span className="text-[10px] text-slate-400">• {analysisResult.timestamp}</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-white mt-0.5">
                      {analysisResult.problemSummary}
                    </h3>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shrink-0 ${getRiskBadge(
                      analysisResult.riskLevel
                    )}`}
                  >
                    Risco {analysisResult.riskLevel}
                  </span>
                </div>

                {/* Probable Cause */}
                <div className="bg-slate-900/70 rounded-2xl p-4 border border-slate-700/60 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Causa Técnica Identificada:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {analysisResult.probableCause}
                  </p>
                </div>

                {/* Parts Shopping List for Technician */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider">
                    <span>Peças que o técnico levará na viatura:</span>
                    <span className="text-emerald-400">Estoque Local em Pelotas</span>
                  </div>
                  <div className="space-y-1.5">
                    {analysisResult.requiredParts.map((part, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 bg-slate-900/50 rounded-xl border border-slate-700/50 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="text-white font-medium">{part.name}</span>
                        </div>
                        <span className="font-mono text-slate-300 shrink-0 font-semibold">
                          ~R$ {part.estimatedPrice.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cost & Duration Summary */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-700/50">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                      Tempo de Execução
                    </span>
                    <div className="flex items-center gap-1.5 mt-1 text-sm font-bold text-white">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span>{analysisResult.estimatedDuration}</span>
                    </div>
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-700/50">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                      Mão de Obra de Referência
                    </span>
                    <div className="flex items-center gap-1.5 mt-1 text-sm font-bold text-emerald-400 font-mono">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      <span>R$ {analysisResult.estimatedLaborCost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={handleSendWhatsAppReport}
                    className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Enviar Laudo no WhatsApp</span>
                  </button>
                  {onScheduleWithDiagnosis && (
                    <button
                      onClick={() => onScheduleWithDiagnosis(analysisResult)}
                      className="py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      <span>Agendar Visita com Peças</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-slate-800/40 border border-slate-700/60 rounded-3xl p-8 text-center min-h-[460px] flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 text-slate-500 flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Nenhum diagnóstico gerado ainda</h4>
                  <p className="text-xs text-slate-400 max-w-xs mt-1">
                    Selecione um dos casos ao lado ou envie uma foto/áudio e clique em <strong>Executar Diagnóstico</strong>.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
