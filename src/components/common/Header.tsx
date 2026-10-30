import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { RoutePath } from '../../types';
import { COMPANY_INFO, SERVICES_LIST } from '../../config/siteData';
import { Menu, X, ChevronDown, Phone, ArrowRight, ShieldCheck, Box } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: RoutePath) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  const handleNav = (path: RoutePath) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { label: string; path: RoutePath }[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Coverage', path: '/coverage' },
    { label: 'Track', path: '/track' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200'
            : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Zone 1: Brand Wordmark / Link */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNav('/');
              }}
              className="flex-shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1"
              aria-label="Jahan Express Home"
            >
              <Logo size="md" />
            </a>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                if (link.label === 'Services') {
                  const isServicesActive = currentPath.startsWith('/services');
                  return (
                    <div
                      key={link.path}
                      className="relative"
                      onMouseEnter={() => setServicesDropdownOpen(true)}
                      onMouseLeave={() => setServicesDropdownOpen(false)}
                    >
                      <button
                        onClick={() => handleNav('/services')}
                        className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                          isServicesActive
                            ? 'text-[#1A73E8] font-semibold'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                        aria-expanded={servicesDropdownOpen}
                      >
                        Services
                        <ChevronDown className="w-4 h-4 text-slate-400 transition-transform duration-150" />
                      </button>

                      {/* Dropdown Menu */}
                      {servicesDropdownOpen && (
                        <div className="absolute top-full left-0 w-72 pt-1 z-50">
                          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-2 text-slate-800">
                            <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                              Logistics Solutions
                            </div>
                            {SERVICES_LIST.map((srv) => (
                              <button
                                key={srv.id}
                                onClick={() => handleNav(`/services/${srv.slug}` as RoutePath)}
                                className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-[#F0F6FF] transition-colors flex flex-col group cursor-pointer"
                              >
                                <span className="font-semibold text-slate-800 group-hover:text-[#1A73E8] flex items-center justify-between">
                                  {srv.name}
                                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#1A73E8] transition-opacity" />
                                </span>
                                <span className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                  {srv.tagline}
                                </span>
                              </button>
                            ))}
                            <div className="pt-2 mt-1 border-t border-slate-100">
                              <button
                                onClick={() => handleNav('/services')}
                                className="w-full text-center text-xs font-medium text-[#1A73E8] hover:text-[#1557B0] py-1 cursor-pointer"
                              >
                                View all services & comparison →
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNav(link.path)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'text-[#1A73E8] font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Primary Action + Contact info + Mobile Trigger */}
            <div className="flex items-center gap-3">
              {/* Phone quick link (desktop) */}
              <a
                href={COMPANY_INFO.primaryPhoneTel}
                className="hidden xl:flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-[#1A73E8] px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                title="Call Jahan Express Support"
              >
                <Phone className="w-3.5 h-3.5 text-[#1A73E8]" />
                <span>{COMPANY_INFO.primaryPhoneFormatted}</span>
              </a>

              {/* Get a Quote Primary CTA */}
              <button
                onClick={() => handleNav('/get-a-quote')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1A73E8] hover:bg-[#1557B0] active:bg-[#174EA6] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] focus-visible:ring-offset-2"
              >
                <span>Get a quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Mobile menu hamburger button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-20 bg-white border-b border-slate-200 shadow-xl max-h-[calc(100vh-5rem)] overflow-y-auto px-5 py-6 flex flex-col gap-5 animate-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-1">
                Navigation
              </span>
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`text-left px-3 py-3 text-base font-medium rounded-lg transition-colors cursor-pointer ${
                    currentPath === link.path
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobile Services quick list */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2">
                Our Core Services
              </span>
              <div className="grid grid-cols-1 gap-1 mt-2">
                {SERVICES_LIST.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => handleNav(`/services/${srv.slug}` as RoutePath)}
                    className="text-left px-2 py-2 rounded-lg text-sm text-slate-700 hover:text-blue-600 hover:bg-white transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{srv.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile actions & contact */}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-3">
              <a
                href={COMPANY_INFO.primaryPhoneTel}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-slate-100 text-slate-800 font-semibold rounded-xl text-sm hover:bg-slate-200 transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Call {COMPANY_INFO.primaryPhoneFormatted}</span>
              </a>

              <button
                onClick={() => handleNav('/get-a-quote')}
                className="w-full py-3.5 px-4 bg-blue-600 text-white font-semibold rounded-xl text-base text-center shadow-xs hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Request a Free Quote
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Operating hours: {COMPANY_INFO.operatingHoursShort}</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
