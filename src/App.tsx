import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AIDiagnosticScanner } from './components/AIDiagnosticScanner';
import { ServicesList } from './components/ServicesList';
import { CoverageSimulator } from './components/CoverageSimulator';
import { MaintenanceClubSection } from './components/MaintenanceClubSection';
import { HowItWorks } from './components/HowItWorks';
import { BudgetCalculator } from './components/BudgetCalculator';
import { ClientArea } from './components/ClientArea';
import { AdminPricingPanel } from './components/AdminPricingPanel';
import { PartnerSection } from './components/PartnerSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ServiceModal } from './components/ServiceModal';
import { AuthModal } from './components/AuthModal';
import { SchedulingModal } from './components/SchedulingModal';
import { ReviewModal } from './components/ReviewModal';
import { UserProfileModal } from './components/UserProfileModal';
import { HomePassportModal } from './components/HomePassportModal';
import { LiveTrackingModal } from './components/LiveTrackingModal';
import { DigitalWarrantyModal } from './components/DigitalWarrantyModal';
import { INITIAL_PRECOS } from './data/servicesData';
import { PricingRecord, ServiceRequest } from './types';

function MainApp() {
  const [pricingData, setPricingData] = useState<Record<string, PricingRecord>>(() => {
    try {
      const saved = localStorage.getItem('resolve360_precos');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading stored prices:', e);
    }
    return INITIAL_PRECOS;
  });

  const [requestsHistory, setRequestsHistory] = useState<ServiceRequest[]>(() => {
    try {
      const saved = localStorage.getItem('resolve360_requests');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading stored requests:', e);
    }
    return [];
  });

  // Modal States
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<string>('');
  const [modalDescription, setModalDescription] = useState<string>('');

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleServiceId, setScheduleServiceId] = useState<string | undefined>(undefined);
  const [scheduleServiceTitle, setScheduleServiceTitle] = useState<string | undefined>(undefined);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewServiceId, setReviewServiceId] = useState<string>('eletrica');
  const [reviewServiceTitle, setReviewServiceTitle] = useState<string>('Elétrica Residencial');
  const [reviewBookingId, setReviewBookingId] = useState<string | undefined>(undefined);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Innovative Features Modal States
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingBookingId, setTrackingBookingId] = useState<string | undefined>(undefined);
  const [isWarrantyOpen, setIsWarrantyOpen] = useState(false);
  const [warrantyBookingId, setWarrantyBookingId] = useState<string | undefined>(undefined);
  const [warrantyServiceTitle, setWarrantyServiceTitle] = useState<string | undefined>(undefined);

  // Handlers
  const handleOpenRequest = (category: string = '', description: string = '') => {
    setModalCategory(category);
    setModalDescription(description);
    setIsServiceModalOpen(true);
  };

  const handleOpenSchedule = (serviceId?: string, serviceTitle?: string) => {
    setScheduleServiceId(serviceId);
    setScheduleServiceTitle(serviceTitle);
    setIsScheduleModalOpen(true);
  };

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleOpenReview = (serviceId: string, serviceTitle: string, bookingId?: string) => {
    setReviewServiceId(serviceId);
    setReviewServiceTitle(serviceTitle);
    setReviewBookingId(bookingId);
    setIsReviewModalOpen(true);
  };

  const handleOpenTracking = (bookingId?: string) => {
    setTrackingBookingId(bookingId);
    setIsTrackingOpen(true);
  };

  const handleOpenWarranty = (bookingId?: string, serviceTitle?: string) => {
    setWarrantyBookingId(bookingId);
    setWarrantyServiceTitle(serviceTitle);
    setIsWarrantyOpen(true);
  };

  const handleRequestSubmitted = (newRequest: ServiceRequest) => {
    const updated = [newRequest, ...requestsHistory];
    setRequestsHistory(updated);
    try {
      localStorage.setItem('resolve360_requests', JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving request history:', e);
    }
  };

  const handleUpdatePricing = (updated: Record<string, PricingRecord>) => {
    setPricingData(updated);
    try {
      localStorage.setItem('resolve360_precos', JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving updated prices:', e);
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Deseja restaurar a tabela de preços para os valores originais de fábrica?')) {
      setPricingData(INITIAL_PRECOS);
      try {
        localStorage.setItem('resolve360_precos', JSON.stringify(INITIAL_PRECOS));
      } catch (e) {
        console.error('Error resetting prices:', e);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Navigation Bar */}
      <Header
        onOpenRequest={handleOpenRequest}
        onOpenSchedule={handleOpenSchedule}
        onOpenAuth={handleOpenAuth}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenPassport={() => setIsPassportOpen(true)}
        onOpenTracking={() => handleOpenTracking()}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenRequest={handleOpenRequest} />

        {/* 2. Innovative Feature: AI Symptom & Electrical Diagnostic Scanner */}
        <AIDiagnosticScanner
          onRequestService={(cat, desc) => handleOpenRequest(cat, desc)}
        />

        {/* 3. Services Catalogue with Ratings & Scheduling */}
        <ServicesList
          onSelectService={handleOpenRequest}
          onOpenSchedule={handleOpenSchedule}
        />

        {/* 4. Innovative Feature: Interactive Mesh Wi-Fi & Camera Coverage Simulator */}
        <CoverageSimulator />

        {/* 5. Innovative Feature: Maintenance Club Subscription Section */}
        <MaintenanceClubSection />

        {/* 6. How It Works */}
        <HowItWorks onOpenRequest={() => handleOpenRequest()} />

        {/* 7. Budget Calculator */}
        <BudgetCalculator
          pricingData={pricingData}
          onOpenRequestWithEstimate={(serv, qty, total) =>
            handleOpenRequest(serv, `Estimativa do site: ${qty} unidade(s) - Total aprox: R$ ${total.toFixed(2)}`)
          }
        />

        {/* 8. Client Dashboard, Property History & Live Tracking integration */}
        <ClientArea
          requestsHistory={requestsHistory}
          onOpenRequest={handleOpenRequest}
          onOpenSchedule={handleOpenSchedule}
          onOpenAuth={handleOpenAuth}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          onOpenReview={handleOpenReview}
          onOpenPassport={() => setIsPassportOpen(true)}
          onOpenTracking={handleOpenTracking}
          onOpenWarranty={handleOpenWarranty}
        />

        {/* 9. Admin Internal Pricing & Margins Table */}
        <AdminPricingPanel
          pricingData={pricingData}
          onUpdatePricing={handleUpdatePricing}
          onResetDefaults={handleResetDefaults}
        />

        {/* 10. Partner Registration Section */}
        <PartnerSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* --- MODALS --- */}

      {/* 1. Quick Service Request Modal */}
      <ServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        initialCategory={modalCategory}
        initialDescription={modalDescription}
        onRequestSubmitted={handleRequestSubmitted}
      />

      {/* 2. Authentication Modal (Login / Sign Up) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      {/* 3. Service Scheduling & Booking Modal */}
      <SchedulingModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        preSelectedServiceId={scheduleServiceId}
        preSelectedServiceTitle={scheduleServiceTitle}
      />

      {/* 4. Rating and Review Modal for Completed Services */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        serviceId={reviewServiceId}
        serviceTitle={reviewServiceTitle}
        bookingId={reviewBookingId}
      />

      {/* 5. User Profile & Preferences Management Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* 6. Innovative Feature: Home Digital Passport Modal */}
      <HomePassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
      />

      {/* 7. Innovative Feature: Live Technician GPS Tracking Modal */}
      <LiveTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        bookingId={trackingBookingId}
      />

      {/* 8. Innovative Feature: Digital 90-Day Warranty & Inspection Checklist Modal */}
      <DigitalWarrantyModal
        isOpen={isWarrantyOpen}
        onClose={() => setIsWarrantyOpen(false)}
        bookingId={warrantyBookingId}
        serviceTitle={warrantyServiceTitle}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
