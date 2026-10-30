/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { RoutePath, ServiceId } from './types';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ShippingAssistant } from './components/common/ShippingAssistant';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { CoveragePage } from './pages/CoveragePage';
import { TrackPage } from './pages/TrackPage';
import { QuotePage } from './pages/QuotePage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { LegalPage } from './pages/LegalPage';
import { AuditPage } from './pages/AuditPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const getInitialPath = (): string => {
    const p = window.location.pathname;
    if (p === '/index.html') return '/';
    if (p === '/about.html') return '/about';
    if (p === '/services.html') return '/services';
    if (p === '/contact.html') return '/contact';
    return p || '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath());
  const [activeTrackingId, setActiveTrackingId] = useState<string>('');
  const [selectedQuoteService, setSelectedQuoteService] = useState<ServiceId | ''>('');

  // Read initial query parameter if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      setActiveTrackingId(id);
    }
  }, []);

  // Handle browser popstate (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      if (id) setActiveTrackingId(id);

      if (p === '/index.html') setCurrentPath('/');
      else if (p === '/about.html') setCurrentPath('/about');
      else if (p === '/services.html') setCurrentPath('/services');
      else if (p === '/contact.html') setCurrentPath('/contact');
      else setCurrentPath(p || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Central Navigation Handler with query support & smooth scroll to top
  const navigate = (path: RoutePath | string) => {
    const [pathname, search] = path.split('?');
    if (search) {
      const params = new URLSearchParams(search);
      const id = params.get('id');
      if (id) {
        setActiveTrackingId(id);
      }
    }
    setCurrentPath(pathname);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Tracking shortcut handler from widgets
  const handleTrackSubmit = (trackingNumber: string) => {
    setActiveTrackingId(trackingNumber);
    navigate(`/track?id=${encodeURIComponent(trackingNumber)}` as RoutePath);
  };

  // Service pre-selection for quote flow
  const handleSelectQuoteService = (serviceId: ServiceId) => {
    setSelectedQuoteService(serviceId);
  };

  // Route matching & page renderer
  const renderPage = () => {
    // 1. Home
    if (currentPath === '/' || currentPath === '') {
      return (
        <HomePage
          onNavigate={navigate}
          onTrackSubmit={handleTrackSubmit}
        />
      );
    }

    // 2. About
    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    // 3. Services Overview
    if (currentPath === '/services') {
      return <ServicesPage onNavigate={navigate} />;
    }

    // 4. Service Detail Pages
    if (currentPath.startsWith('/services/')) {
      const slug = currentPath.replace('/services/', '');
      return (
        <ServiceDetailPage
          serviceSlug={slug}
          onNavigate={navigate}
          onSelectQuoteService={handleSelectQuoteService}
        />
      );
    }

    // 5. Coverage
    if (currentPath === '/coverage') {
      return <CoveragePage onNavigate={navigate} />;
    }

    // 6. Track
    if (currentPath === '/track') {
      return (
        <TrackPage
          initialTrackingId={activeTrackingId}
          onNavigate={navigate}
        />
      );
    }

    // 7. Get a Quote
    if (currentPath === '/get-a-quote') {
      return (
        <QuotePage
          initialService={selectedQuoteService}
          onNavigate={navigate}
        />
      );
    }

    // 8. Contact
    if (currentPath === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }

    // 9. FAQ
    if (currentPath === '/faq') {
      return <FaqPage onNavigate={navigate} />;
    }

    // 10. Legal: Privacy & Terms
    if (currentPath === '/privacy') {
      return <LegalPage type="privacy" onNavigate={navigate} />;
    }
    if (currentPath === '/terms') {
      return <LegalPage type="terms" onNavigate={navigate} />;
    }

    // 11. Audit & Migration Checklist
    if (currentPath === '/audit') {
      return <AuditPage onNavigate={navigate} />;
    }

    // 12. 404 Fallback
    return (
      <NotFoundPage
        attemptedPath={currentPath}
        onNavigate={navigate}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
      />

      {/* Main Page Landmark */}
      <main className="flex-1" id="main-content">
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigate} />

      {/* Discreet Shipping Help Drawer */}
      <ShippingAssistant onNavigate={navigate} />
    </div>
  );
}
