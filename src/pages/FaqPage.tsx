import React, { useState } from 'react';
import { RoutePath } from '../types';
import { GENERAL_FAQS, COMPANY_INFO } from '../config/siteData';
import { Plus, Minus, Search, HelpCircle, Phone, ArrowRight } from 'lucide-react';

interface FaqPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ['All', 'General & Booking', 'Services', 'Tracking & Support', 'Packaging & Regulations'];

  const filteredFaqs = GENERAL_FAQS.filter((faq) => {
    const matchesCat = activeCategory === 'All' || faq.category === activeCategory;
    const query = search.toLowerCase().trim();
    const matchesSearch = 
      !query ||
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4">
            <button onClick={() => onNavigate('/')} className="hover:text-blue-600 cursor-pointer">
              Home
            </button>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Help & FAQ</span>
          </nav>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest block mb-2">
            Knowledge Base
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Helpful answers.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            Practical guidance on choosing freight services, booking pickups, student packing, and tracking consignments.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="space-y-4 mb-10">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by keyword (e.g. tracking, student, weight, packing)..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === c
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs List */}
        <div className="space-y-3 mb-16">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-sm">
              No matching answers found for "{search}". Try searching for another topic or contact our dispatch desk.
            </div>
          ) : (
            filteredFaqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-colors"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                        {faq.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-500">
                      {isOpen ? <Minus className="w-4 h-4 text-blue-600" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-2">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Support Help Banner */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white">
              Still have a specific question about your consignment?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Our dispatch team operates Monday–Saturday from 10:00 AM to 8:00 PM IST.
            </p>
          </div>
          <a
            href={COMPANY_INFO.primaryPhoneTel}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors whitespace-nowrap flex items-center gap-2"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call {COMPANY_INFO.primaryPhoneFormatted}</span>
          </a>
        </div>

      </div>
    </div>
  );
};
