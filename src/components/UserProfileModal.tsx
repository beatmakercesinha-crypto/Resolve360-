import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, Bell, Home, CheckCircle2, Shield, LogOut, Zap, Wifi } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PELOTAS_BAIRROS = [
  'Centro',
  'Areal',
  'Fragata',
  'Laranjal (Praia)',
  'Três Vendas',
  'Porto / Guabiroba',
  'São Gonçalo',
  'Py Crespo',
  'Capão do Leão',
  'Arroio do Padre',
  'Rio Grande',
  'Outro Bairro / Cidade'
];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose
}) => {
  const { currentUser, updateProfile, logout } = useAuth();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [bairro, setBairro] = useState(currentUser?.neighborhood || 'Centro');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [cep, setCep] = useState(currentUser?.cep || '96015-000');
  
  const [whatsappNotif, setWhatsappNotif] = useState(
    currentUser?.notifications.whatsapp ?? true
  );
  const [emailNotif, setEmailNotif] = useState(
    currentUser?.notifications.email ?? true
  );

  const [propertyType, setPropertyType] = useState<'Casa' | 'Apartamento' | 'Comércio'>(
    currentUser?.savedProperties?.tipo || 'Apartamento'
  );
  const [voltagem, setVoltagem] = useState<'110V' | '220V' | 'Bivolt'>(
    currentUser?.savedProperties?.voltagem || '220V'
  );
  const [hasSolar, setHasSolar] = useState(
    currentUser?.savedProperties?.possuiSolar || false
  );
  const [internetType, setInternetType] = useState(
    currentUser?.savedProperties?.tipoInternet || 'Fibra Óptica 500MB'
  );

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen || !currentUser) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      phone,
      neighborhood: bairro,
      address,
      cep,
      notifications: {
        whatsapp: whatsappNotif,
        email: emailNotif,
        sms: false
      },
      savedProperties: {
        tipo: propertyType,
        voltagem,
        possuiSolar: hasSolar,
        tipoInternet: internetType
      }
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  const handleLogoutClick = () => {
    logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-blue-600/30">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Meu Perfil & Preferências
              </h3>
              <p className="text-xs text-slate-400">
                Gerencie seus dados pessoais, endereço e preferências em Pelotas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto flex-1 space-y-6">
          {savedSuccess && (
            <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center gap-2 text-emerald-300 text-xs font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              Preferências e perfil salvos com sucesso!
            </div>
          )}

          {/* Personal Info */}
          <div className="space-y-3">
            <span className="text-xs uppercase font-bold text-blue-400 tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              Dados do Titular
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Nome Completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">WhatsApp / Telefone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Bairro em Pelotas</label>
                <select
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  className="w-full bg-slate-950/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                >
                  {PELOTAS_BAIRROS.map((b) => (
                    <option key={b} value={b} className="bg-slate-900 text-white">
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Endereço Completo</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Rua / Av., número, complemento"
                  className="w-full bg-slate-950/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">CEP</label>
                <input
                  type="text"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  placeholder="96000-000"
                  className="w-full bg-slate-950/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Residence Preferences */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <span className="text-xs uppercase font-bold text-purple-400 tracking-wider flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5" />
              Características do Imóvel
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Tipo de Imóvel</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as any)}
                  className="w-full bg-slate-950/90 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="Casa">Casa</option>
                  <option value="Apartamento">Apartamento</option>
                  <option value="Comércio">Comércio / Sala</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Voltagem Padrão</label>
                <select
                  value={voltagem}
                  onChange={(e) => setVoltagem(e.target.value as any)}
                  className="w-full bg-slate-950/90 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="220V">220V (Padrão Pelotas)</option>
                  <option value="110V">110V</option>
                  <option value="Bivolt">Bivolt</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Energia Solar</label>
                <button
                  type="button"
                  onClick={() => setHasSolar(!hasSolar)}
                  className={`w-full py-2 px-3 rounded-xl border text-xs font-bold transition-colors ${
                    hasSolar
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'bg-slate-950/90 border-slate-800 text-slate-400'
                  }`}
                >
                  {hasSolar ? 'Possui Placas' : 'Não Possui'}
                </button>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Internet Atual</label>
                <input
                  type="text"
                  value={internetType}
                  onChange={(e) => setInternetType(e.target.value)}
                  placeholder="Ex: Fibra 500MB"
                  className="w-full bg-slate-950/90 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5" />
              Notificações de Atendimento
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="p-3 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-between cursor-pointer">
                <div>
                  <div className="text-xs font-bold text-white">Alertas via WhatsApp</div>
                  <div className="text-[10px] text-slate-400">Confirmação de horário e chegada do técnico</div>
                </div>
                <input
                  type="checkbox"
                  checked={whatsappNotif}
                  onChange={(e) => setWhatsappNotif(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-0"
                />
              </label>

              <label className="p-3 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-between cursor-pointer">
                <div>
                  <div className="text-xs font-bold text-white">Comprovantes por E-mail</div>
                  <div className="text-[10px] text-slate-400">Laudos técnicos e recibos de serviço</div>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotif}
                  onChange={(e) => setEmailNotif(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-0"
                />
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={handleLogoutClick}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1.5 py-2 px-3 hover:bg-rose-500/10 rounded-xl transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Encerrar Sessão
            </button>

            <div className="flex gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="py-2.5 px-6 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Salvar Alterações
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
