import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Booking, ServiceRequest, Review } from '../types';
import { getStoredReviews, addReview as addReviewData } from '../data/reviewsData';

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  bookings: Booking[];
  userRequests: ServiceRequest[];
  reviews: Review[];
  login: (email: string, password?: string) => { success: boolean; error?: string };
  signup: (data: {
    name: string;
    email: string;
    phone: string;
    city: string;
    neighborhood: string;
    address?: string;
    password?: string;
  }) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (updatedData: Partial<UserProfile>) => void;
  createBooking: (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'technicianName' | 'technicianPhone'>) => Booking;
  addServiceRequest: (requestData: Omit<ServiceRequest, 'id' | 'dataCriacao' | 'status'>) => ServiceRequest;
  submitServiceReview: (reviewData: {
    serviceId: string;
    serviceTitle: string;
    rating: number;
    comment: string;
    recomenda: boolean;
    bookingId?: string;
    requestId?: string;
  }) => void;
  completeBooking: (bookingId: string) => void;
  cancelBooking: (bookingId: string) => void;
}

const STORAGE_KEY_USER = 'resolve360_auth_user';
const STORAGE_KEY_USERS_DB = 'resolve360_users_database';
const STORAGE_KEY_BOOKINGS = 'resolve360_bookings_v1';
const STORAGE_KEY_REQUESTS = 'resolve360_user_requests_v1';

export const DEMO_USER: UserProfile = {
  id: 'usr-demo-pelotas',
  name: 'César Cardoso',
  email: 'cesar@resolve360.com.br',
  phone: '(51) 98233-0934',
  city: 'Pelotas',
  neighborhood: 'Centro',
  address: 'Rua Quinze de Novembro, 650 - Apto 302',
  cep: '96015-000',
  notifications: {
    whatsapp: true,
    email: true,
    sms: false
  },
  savedProperties: {
    tipo: 'Apartamento',
    voltagem: '220V',
    possuiSolar: false,
    tipoInternet: 'Fibra Óptica 500MB'
  },
  createdAt: '2026-01-15'
};

const INITIAL_DEMO_BOOKINGS: Booking[] = [
  {
    id: 'bk-101',
    serviceId: 'eletrica',
    serviceTitle: 'Instalação de Chuveiro e Quadro Elétrico',
    category: 'Elétrica',
    userEmail: 'cesar@resolve360.com.br',
    userName: 'César Cardoso',
    userPhone: '(51) 98233-0934',
    date: '2026-08-16',
    timeSlot: '09:00 - 12:00 (Manhã)',
    address: 'Rua Quinze de Novembro, 650',
    neighborhood: 'Centro',
    city: 'Pelotas',
    notes: 'Substituição de disjuntor de 40A e instalação de chuveiro elétrico blindado.',
    status: 'Confirmado',
    technicianName: 'Rodrigo Medeiros (Técnico Eletricista)',
    technicianPhone: '(53) 99124-5588',
    estimatedPrice: 229,
    createdAt: '14/08/2026'
  },
  {
    id: 'bk-102',
    serviceId: 'internet',
    serviceTitle: 'Configuração Wi-Fi Mesh e Ponto de Rede',
    category: 'Internet e Wi-Fi',
    userEmail: 'cesar@resolve360.com.br',
    userName: 'César Cardoso',
    userPhone: '(51) 98233-0934',
    date: '2026-07-20',
    timeSlot: '14:00 - 17:00 (Tarde)',
    address: 'Rua Quinze de Novembro, 650',
    neighborhood: 'Centro',
    city: 'Pelotas',
    notes: 'Instalação de 2 nós Deco M4 e cabeamento CAT6 até o escritório.',
    status: 'Concluído',
    technicianName: 'Lucas Ferreira (Especialista em Redes)',
    technicianPhone: '(53) 98455-1290',
    estimatedPrice: 199,
    createdAt: '18/07/2026',
    rating: 5,
    reviewComment: 'Excelente trabalho, rede rápida e sem quedas em toda a casa!'
  },
  {
    id: 'bk-103',
    serviceId: 'seguranca',
    serviceTitle: 'Instalação de Câmeras Wi-Fi Externas',
    category: 'Segurança',
    userEmail: 'cesar@resolve360.com.br',
    userName: 'César Cardoso',
    userPhone: '(51) 98233-0934',
    date: '2026-06-10',
    timeSlot: '14:00 - 17:00 (Tarde)',
    address: 'Av. Adolfo Fetter, 1200',
    neighborhood: 'Laranjal',
    city: 'Pelotas',
    notes: '2 câmeras Intelbras com visão noturna e gravação em nuvem.',
    status: 'Concluído',
    technicianName: 'Cristiano Souza (Segurança Eletrônica)',
    technicianPhone: '(53) 99877-3344',
    estimatedPrice: 299,
    createdAt: '08/06/2026'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading stored user', e);
    }
    // Default to demo user for smooth testing
    return DEMO_USER;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading bookings', e);
    }
    return INITIAL_DEMO_BOOKINGS;
  });

  const [userRequests, setUserRequests] = useState<ServiceRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REQUESTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading requests', e);
    }
    return [];
  });

  const [reviews, setReviews] = useState<Review[]>(() => getStoredReviews());

  // Sync to local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(userRequests));
  }, [userRequests]);

  const login = (email: string): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, error: 'Por favor, informe seu e-mail.' };
    }

    try {
      const dbUsersStr = localStorage.getItem(STORAGE_KEY_USERS_DB);
      const dbUsers: UserProfile[] = dbUsersStr ? JSON.parse(dbUsersStr) : [DEMO_USER];
      const found = dbUsers.find((u) => u.email.toLowerCase() === cleanEmail);

      if (found) {
        setCurrentUser(found);
        return { success: true };
      }

      // If user isn't in mock DB yet, automatically generate profile for instant friction-free access
      const autoUser: UserProfile = {
        id: `usr-${Date.now()}`,
        name: cleanEmail.split('@')[0].replace('.', ' ').replace(/^\w/, (c) => c.toUpperCase()),
        email: cleanEmail,
        phone: '(51) 98233-0934',
        city: 'Pelotas',
        neighborhood: 'Centro',
        notifications: { whatsapp: true, email: true, sms: false },
        createdAt: new Date().toISOString().split('T')[0]
      };

      const updatedDb = [...dbUsers, autoUser];
      localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(updatedDb));
      setCurrentUser(autoUser);
      return { success: true };
    } catch (e) {
      return { success: false, error: 'Erro ao processar login.' };
    }
  };

  const signup = (data: {
    name: string;
    email: string;
    phone: string;
    city: string;
    neighborhood: string;
    address?: string;
  }): { success: boolean; error?: string } => {
    if (!data.name || !data.email || !data.phone) {
      return { success: false, error: 'Preencha todos os campos obrigatórios.' };
    }

    const cleanEmail = data.email.trim().toLowerCase();
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: data.name,
      email: cleanEmail,
      phone: data.phone,
      city: data.city || 'Pelotas',
      neighborhood: data.neighborhood || 'Centro',
      address: data.address || '',
      notifications: {
        whatsapp: true,
        email: true,
        sms: false
      },
      createdAt: new Date().toISOString().split('T')[0]
    };

    try {
      const dbUsersStr = localStorage.getItem(STORAGE_KEY_USERS_DB);
      const dbUsers: UserProfile[] = dbUsersStr ? JSON.parse(dbUsersStr) : [DEMO_USER];
      const updatedDb = [newUser, ...dbUsers.filter((u) => u.email.toLowerCase() !== cleanEmail)];
      localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(updatedDb));
      setCurrentUser(newUser);
      return { success: true };
    } catch (e) {
      return { success: false, error: 'Erro ao criar conta.' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updatedData: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);

    try {
      const dbUsersStr = localStorage.getItem(STORAGE_KEY_USERS_DB);
      const dbUsers: UserProfile[] = dbUsersStr ? JSON.parse(dbUsersStr) : [];
      const updatedDb = dbUsers.map((u) => (u.id === currentUser.id ? updated : u));
      localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(updatedDb));
    } catch (e) {
      console.error('Error updating users db', e);
    }
  };

  const createBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'technicianName' | 'technicianPhone'>): Booking => {
    const technicianPool = [
      { name: 'Rodrigo Medeiros (Eletricista)', phone: '(53) 99124-5588' },
      { name: 'Lucas Ferreira (Redes e Wi-Fi)', phone: '(53) 98455-1290' },
      { name: 'Cristiano Souza (Segurança)', phone: '(53) 99877-3344' },
      { name: 'Marcio Vargas (Técnico Geral)', phone: '(53) 99166-7788' }
    ];
    const tech = technicianPool[Math.floor(Math.random() * technicianPool.length)];

    const newBooking: Booking = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      status: 'Confirmado',
      technicianName: tech.name,
      technicianPhone: tech.phone,
      createdAt: new Date().toLocaleDateString('pt-BR')
    };

    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const addServiceRequest = (requestData: Omit<ServiceRequest, 'id' | 'dataCriacao' | 'status'>): ServiceRequest => {
    const newReq: ServiceRequest = {
      ...requestData,
      id: `req-${Date.now()}`,
      dataCriacao: new Date().toLocaleDateString('pt-BR'),
      status: 'Pendente'
    };
    setUserRequests((prev) => [newReq, ...prev]);
    return newReq;
  };

  const submitServiceReview = (reviewData: {
    serviceId: string;
    serviceTitle: string;
    rating: number;
    comment: string;
    recomenda: boolean;
    bookingId?: string;
    requestId?: string;
  }) => {
    const userName = currentUser ? currentUser.name : 'Cliente Resolve360';
    const userEmail = currentUser ? currentUser.email : 'cliente@resolve360.com.br';
    const userCity = currentUser ? currentUser.city : 'Pelotas';
    const userNeighborhood = currentUser ? currentUser.neighborhood : 'Pelotas';

    const newReview = addReviewData({
      serviceId: reviewData.serviceId,
      serviceTitle: reviewData.serviceTitle,
      userName,
      userEmail,
      rating: reviewData.rating,
      comment: reviewData.comment,
      bairro: userNeighborhood,
      cidade: userCity,
      recomenda: reviewData.recomenda
    });

    setReviews(getStoredReviews());

    // Update booking if attached
    if (reviewData.bookingId) {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === reviewData.bookingId
            ? { ...b, rating: reviewData.rating, reviewComment: reviewData.comment }
            : b
        )
      );
    }
  };

  const completeBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Concluído' } : b))
    );
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelado' } : b))
    );
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        bookings,
        userRequests,
        reviews,
        login,
        signup,
        logout,
        updateProfile,
        createBooking,
        addServiceRequest,
        submitServiceReview,
        completeBooking,
        cancelBooking
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
