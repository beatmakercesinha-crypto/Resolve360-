import { Review } from '../types';

const STORAGE_KEY_REVIEWS = 'resolve360_reviews_v1';

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    serviceId: 'eletrica',
    serviceTitle: 'Elétrica Residencial',
    userName: 'Carlos Eduardo Silveira',
    userEmail: 'carlos.silveira@gmail.com',
    rating: 5,
    comment: 'Troca de fiação e instalação de 2 chuveiros no Fragata. O técnico chegou no horário combinado com pontualidade rara em Pelotas, serviço limpo e explicou tudo certinho.',
    bairro: 'Fragata',
    cidade: 'Pelotas',
    data: '12/08/2026',
    recomenda: true,
    respostaResolve360: 'Muito obrigado, Carlos! Ficamos felizes em garantir a segurança elétrica da sua família.'
  },
  {
    id: 'rev-2',
    serviceId: 'internet',
    serviceTitle: 'Internet & Wi-Fi',
    userName: 'Mariana Duarte',
    userEmail: 'mariana.d@yahoo.com.br',
    rating: 5,
    comment: 'Instalaram Wi-Fi Mesh na nossa casa de 2 andares no Laranjal. O sinal agora pega perfeito até na área da churrasqueira. Recomendo muito!',
    bairro: 'Laranjal',
    cidade: 'Pelotas',
    data: '10/08/2026',
    recomenda: true
  },
  {
    id: 'rev-3',
    serviceId: 'seguranca',
    serviceTitle: 'Segurança Eletrônica',
    userName: 'Rogério Bittencourt',
    userEmail: 'rogerio.b@hotmail.com',
    rating: 5,
    comment: 'Instalação de 4 câmeras Wi-Fi e fechadura digital no Areal. Excelente acabamento sem fios aparentes. App no celular funcionando perfeitamente.',
    bairro: 'Areal',
    cidade: 'Pelotas',
    data: '08/08/2026',
    recomenda: true,
    respostaResolve360: 'Obrigado pela confiança, Rogério! Qualquer dúvida com o aplicativo de monitoramento, estamos à disposição.'
  },
  {
    id: 'rev-4',
    serviceId: 'automacao',
    serviceTitle: 'Automação Residencial',
    userName: 'Fernanda Oliveira',
    userEmail: 'fernanda.eng@gmail.com',
    rating: 5,
    comment: 'Configuração completa de iluminação inteligente integrada com a Alexa na sala e quartos. Ficou sensacional e muito prático.',
    bairro: 'Centro',
    cidade: 'Pelotas',
    data: '05/08/2026',
    recomenda: true
  },
  {
    id: 'rev-5',
    serviceId: 'eletrica',
    serviceTitle: 'Elétrica Residencial',
    userName: 'Paulo Mendes',
    userEmail: 'pmendes.pelotas@gmail.com',
    rating: 4,
    comment: 'Troca de disjuntor principal que desarmava toda hora com ar condicionado ligado. Resolvido com rapidez e preço justo.',
    bairro: 'Três Vendas',
    cidade: 'Pelotas',
    data: '02/08/2026',
    recomenda: true
  },
  {
    id: 'rev-6',
    serviceId: 'tecnologia',
    serviceTitle: 'Tecnologia & Áudio/Vídeo',
    userName: 'Juliana Krause',
    userEmail: 'ju.krause@outlook.com',
    rating: 5,
    comment: 'Instalação de TV de 65 polegadas na parede com suporte articulado e passagem de cabos embutidos. Trabalho impecável.',
    bairro: 'Porto',
    cidade: 'Pelotas',
    data: '28/07/2026',
    recomenda: true
  },
  {
    id: 'rev-7',
    serviceId: 'solar',
    serviceTitle: 'Energia Solar',
    userName: 'Lucas Antunes',
    userEmail: 'lucas.antunes@uol.com.br',
    rating: 5,
    comment: 'Manutenção preventiva e limpeza de 12 placas solares. Rendimento voltou ao máximo esperado. Equipe muito atenciosa e equipada.',
    bairro: 'São Gonçalo',
    cidade: 'Pelotas',
    data: '24/07/2026',
    recomenda: true
  }
];

export function getStoredReviews(): Review[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_REVIEWS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading reviews from localStorage', e);
  }
  return INITIAL_REVIEWS;
}

export function saveReviews(reviews: Review[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(reviews));
  } catch (e) {
    console.error('Error saving reviews to localStorage', e);
  }
}

export function addReview(newReview: Omit<Review, 'id' | 'data'>): Review {
  const reviews = getStoredReviews();
  const today = new Date().toLocaleDateString('pt-BR');
  const review: Review = {
    ...newReview,
    id: `rev-${Date.now()}`,
    data: today
  };
  const updated = [review, ...reviews];
  saveReviews(updated);
  return review;
}

export function getServiceStats(serviceId: string, allReviews?: Review[]): { average: number; count: number } {
  const reviews = allReviews || getStoredReviews();
  const serviceReviews = reviews.filter((r) => r.serviceId === serviceId);
  if (serviceReviews.length === 0) {
    // Default high base rating for Pelotas services
    return { average: 4.9, count: 18 };
  }
  const sum = serviceReviews.reduce((acc, r) => acc + r.rating, 0);
  const avg = Number((sum / serviceReviews.length).toFixed(1));
  return { average: avg, count: serviceReviews.length + 15 };
}

export function getOverallRating(allReviews?: Review[]): { average: number; totalCount: number } {
  const reviews = allReviews || getStoredReviews();
  if (reviews.length === 0) return { average: 4.9, totalCount: 142 };
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const avg = Number((sum / reviews.length).toFixed(1));
  return { average: avg, totalCount: reviews.length + 135 };
}
