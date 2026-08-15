import React, { useState } from 'react';
import { Menu, X, Phone, MessageSquare, ShieldCheck, MapPin, User, Calendar, LogOut, Settings } from 'lucide-react';
import { WHATSAPP_DISPLAY, openWhatsAppChat } from '../data/servicesData';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onOpenRequest: (category?: string, description?: string) => void;
  onOpenSchedule: (serviceId?: string, serviceTitle?: string) => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenRequest,
  onOpenSchedule,
  onOpenAuth,
  onOpenProfile
}) => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Orçamento', href: '#orcamento' },
    { label: 'Área do Cliente', href: '#cliente' },
    { label: 'Tabela de Preços', href: '#admin' },
    { label: 'Seja Parceiro', href: '#parceiros' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Top micro bar for Pelotas location & status */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Atendimento em <strong>Pelotas e Região Sul / RS</strong></span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Sistema Operacional em Pelotas
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <div className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Garantia & Profissionais Avaliados</span>
            </div>
            {isAuthenticated && (
              <span className="text-xs text-blue-400 font-semibold">
                👤 Conectado como {currentUser?.name.split(' ')[0]} ({currentUser?.neighborhood})
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo - Sleek Style */}
          <a
            href="#inicio"
            id="brand-logo-btn"
            className="flex items-center gap-2.5 group transition-transform active:scale-95"
          >
            <div className="bg-blue-600 text-white font-black px-3 py-1 rounded-lg text-lg sm:text-xl tracking-tight shadow-md shadow-blue-500/20 flex items-center gap-1.5">
              <span>RESOLVE</span>
              <span className="opacity-70">360</span>
            </div>
            <span className="text-slate-500 font-medium text-xs sm:text-sm hidden sm:inline-block">
              Pelotas, RS
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-blue-600 transition-colors py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Header Action Buttons & User Menu */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenSchedule()}
              className="px-3.5 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl flex items-center gap-1.5 border border-blue-200 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>Agendar Visita</span>
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 transition-colors"
                >
                  <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-black">
                    {currentUser?.name.charAt(0)}
                  </div>
                  <span>{currentUser?.name.split(' ')[0]}</span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 text-xs text-slate-700 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3.5 py-2 border-b border-slate-100">
                      <div className="font-bold text-slate-900">{currentUser?.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{currentUser?.email}</div>
                      <div className="text-[10px] text-blue-600 font-semibold mt-0.5">
                        📍 {currentUser?.neighborhood}, Pelotas
                      </div>
                    </div>

                    <a
                      href="#cliente"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 font-medium"
                    >
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      <span>Meu Painel</span>
                    </a>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenProfile();
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 font-medium"
                    >
                      <Settings className="w-3.5 h-3.5 text-slate-500" />
                      <span>Editar Perfil</span>
                    </button>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3.5 py-2 text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sair da Conta</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Entrar</span>
              </button>
            )}

            <button
              onClick={() => onOpenRequest()}
              id="header-solicitar-btn"
              className="bg-blue-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Solicitar</span>
            </button>
          </div>

          {/* Mobile menu toggle button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="grid gap-1 pb-3 border-b border-slate-100">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            {isAuthenticated ? (
              <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">{currentUser?.name}</div>
                  <div className="text-[10px] text-slate-500">{currentUser?.email}</div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="text-xs text-rose-600 font-bold"
                >
                  Sair
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
                className="w-full py-2.5 bg-slate-100 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Entrar / Cadastrar</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSchedule();
              }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm shadow-md"
            >
              <Calendar className="w-4 h-4" />
              Agendar Visita Técnica
            </button>
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openWhatsAppChat('Olá! Gostaria de falar no WhatsApp com a Resolve360.');
              }}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 text-sm shadow-sm"
            >
              <Phone className="w-4 h-4" />
              WhatsApp ({WHATSAPP_DISPLAY})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
