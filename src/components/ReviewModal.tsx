import React, { useState } from 'react';
import { X, Star, ThumbsUp, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
  serviceTitle: string;
  bookingId?: string;
  requestId?: string;
}

const QUICK_TAGS = [
  '⭐ Atendimento pontual',
  '🧹 Serviço limpo e organizado',
  '💡 Tirou todas as dúvidas',
  '💰 Preço justo e transparente',
  '⚡ Solução rápida no mesmo dia',
  '🛡️ Técnico muito educado e profissional'
];

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  serviceId,
  serviceTitle,
  bookingId,
  requestId
}) => {
  const { currentUser, submitServiceReview } = useAuth();

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [recomenda, setRecomenda] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const getRatingLabel = (val: number) => {
    switch (val) {
      case 5:
        return 'Excelente! Superou as expectativas';
      case 4:
        return 'Muito Bom! Serviço de qualidade';
      case 3:
        return 'Bom! Atendeu o esperado';
      case 2:
        return 'Regular';
      case 1:
        return 'Ruim / Insatisfeito';
      default:
        return '';
    }
  };

  const handleTagClick = (tag: string) => {
    const cleanTag = tag.replace(/^[^\s]+\s/, ''); // remove emoji
    if (!comment) {
      setComment(cleanTag);
    } else if (!comment.includes(cleanTag)) {
      setComment(`${comment}. ${cleanTag}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitServiceReview({
      serviceId,
      serviceTitle,
      rating,
      comment: comment.trim() || 'Serviço executado com excelência e pontualidade em Pelotas.',
      recomenda,
      bookingId,
      requestId
    });

    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setComment('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Decorative blur */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500 blur-[90px] opacity-25 pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Avaliar Atendimento
              </h3>
              <p className="text-xs text-slate-400">
                Sua opinião ajuda a manter a qualidade técnica em Pelotas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 relative z-10">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto animate-in zoom-in-75">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-xl font-extrabold text-white">Avaliação Enviada!</h4>
              <p className="text-xs text-slate-300">
                Muito obrigado por contribuir com a comunidade Resolve360.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Service Details Card */}
              <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                    Serviço Concluído
                  </span>
                  <div className="text-sm font-bold text-white">{serviceTitle}</div>
                </div>
                <span className="text-xs text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                  Pelotas, RS
                </span>
              </div>

              {/* Star Rating Selector */}
              <div className="text-center py-2 space-y-2">
                <label className="block text-xs uppercase font-bold text-slate-300 tracking-wider">
                  Como foi a sua experiência?
                </label>
                
                <div className="flex justify-center items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const active = (hoverRating !== null ? hoverRating : rating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        onClick={() => setRating(star)}
                        className="p-2 transition-transform hover:scale-125 focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            active
                              ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]'
                              : 'text-slate-700'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="text-xs font-bold text-amber-400 min-h-[18px]">
                  {getRatingLabel(hoverRating !== null ? hoverRating : rating)}
                </div>
              </div>

              {/* Quick Tags */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
                  Destaques rápidos (clique para adicionar ao seu depoimento):
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_TAGS.map((tag, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleTagClick(tag)}
                      className="text-[11px] bg-slate-950/80 hover:bg-blue-600 hover:text-white border border-slate-800 text-slate-300 px-2.5 py-1 rounded-xl transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs uppercase font-bold text-slate-300 tracking-wider mb-1.5">
                  Comentário ou Detalhes (opcional)
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Conte como foi o atendimento do profissional, acabamento, pontualidade..."
                  className="w-full bg-slate-950/90 border border-slate-800 focus:border-blue-500 rounded-2xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none leading-relaxed"
                ></textarea>
              </div>

              {/* Recommends Toggle */}
              <div className="flex items-center justify-between p-3.5 bg-slate-950/70 border border-slate-800 rounded-2xl">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-slate-200">
                    Você recomenda a Resolve360 para amigos e vizinhos?
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setRecomenda(!recomenda)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                    recomenda
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {recomenda ? 'Sim, recomendo!' : 'Não'}
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold rounded-2xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Star className="w-4 h-4 fill-slate-950" />
                <span>Publicar Avaliação</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Avaliação verificada por {currentUser?.name || 'Cliente'}</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
