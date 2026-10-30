import React, { useState } from 'react';
import { RoutePath, CoverageZone } from '../types';
import { COVERAGE_ZONES, COMPANY_INFO } from '../config/siteData';
import { 
  MapPin, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Info, 
  ShieldCheck,
  Compass,
  Filter
} from 'lucide-react';

interface CoveragePageProps {
  onNavigate: (path: RoutePath) => void;
}

export const CoveragePage: React.FC<CoveragePageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [pinInput, setPinInput] = useState('');
  const [pinResult, setPinResult] = useState<string | null>(null);

  const categories = ['All', 'Special Zone', 'North India Hub', 'Domestic Network', 'International Gateway'];

  const filteredZones = COVERAGE_ZONES.filter((zone) => {
    const matchesCategory = selectedCategory === 'All' || zone.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = 
      !query ||
      zone.name.toLowerCase().includes(query) ||
      zone.coverageDescription.toLowerCase().includes(query) ||
      zone.keyHubs.some((hub) => hub.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });

  const handlePinCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pinInput.trim();
    if (!/^\d{6}$/.test(clean)) {
      setPinResult('Please enter a valid 6-digit Indian PIN code.');
      return;
    }

    // Pin routing guidance
    const prefix = clean.substring(0, 2);
    if (clean.startsWith('194') || clean.startsWith('192')) {
      setPinResult(`PIN ${clean} is located in Leh / Ladakh. Serviceable under our Special Zone high-altitude protocols. Route transit subject to weather.`);
    } else if (clean.startsWith('744')) {
      setPinResult(`PIN ${clean} is located in Andaman & Nicobar Islands (Port Blair). Serviceable via air cargo or maritime coastal routes.`);
    } else if (['11', '12', '13', '14', '15', '16', '17', '18', '20', '24', '30'].includes(prefix)) {
      setPinResult(`PIN ${clean} is within our core North India self-network with daily scheduled line-hauls and doorstep collection.`);
    } else {
      setPinResult(`PIN ${clean} is serviceable via our pan-India express network. Exact transit schedule and tariff confirmed upon booking request.`);
    }
  };

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-4">
            <button onClick={() => onNavigate('/')} className="hover:text-blue-600 cursor-pointer">
              Home
            </button>
            <span>/</span>
            <span className="text-slate-900 font-semibold">Network & Coverage</span>
          </nav>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest block mb-2">
            Regional Network Directory
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Connecting industrial corridors, Himalayan valleys, and island ports.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
            Jahan Express operates a self-network specialization throughout North India, paired with specialized high-altitude routes to Leh & Ladakh and coastal island cargo to Port Blair.
          </p>
        </div>

        {/* PIN Code Quick Check Tool */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 mb-14">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
              Direct Serviceability Check
            </span>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Check Service Availability for Your PIN Code
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-4">
              Enter a 6-digit Indian PIN code to view delivery protocols and regional network routing.
            </p>

            <form onSubmit={handlePinCheck} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="e.g. 194101 (Leh), 110064 (Delhi), 744101 (Port Blair)"
                className="flex-1 p-3 rounded-xl border border-slate-300 bg-white text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                Check Route Availability
              </button>
            </form>

            {pinResult && (
              <div className="mt-4 p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 leading-relaxed flex items-start gap-2.5">
                <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>{pinResult}</span>
              </div>
            )}
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city, hub, or zone..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {filteredZones.map((zone) => (
            <div
              key={zone.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {zone.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span>Modes:</span>
                    <span className="font-semibold text-slate-800">{zone.transportModes.join(' · ')}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  {zone.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {zone.coverageDescription}
                </p>

                {/* Key Hubs */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-700 block mb-2">
                    Key Hubs & Corridors
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {zone.keyHubs.map((hub, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-medium"
                      >
                        {hub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Special Terrain Notice if present */}
                {zone.terrainNotes && (
                  <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed">
                    <strong>Transit condition:</strong> {zone.terrainNotes}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Subject to route clearance
                </span>
                <button
                  onClick={() => onNavigate('/get-a-quote')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Request route tariff</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Special Zone Protocols Info */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 mb-16">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-2">
              Specialized Operations
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
              Navigating High-Altitude & Island Geography
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Unlike standard plains logistics, consignments into Leh Ladakh involve high mountain passes (Zoji La, Khardung La) prone to heavy snowfall, road blockages, and oxygen-thin passes. Jahan Express maintains seasonal route monitoring, transitioning to air cargo solutions when roads are officially closed.
            </p>
            <div className="flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Cold-resistant multi-layer packaging</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Pre-flight security screening for air cargo</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Port drayage manifest for Andaman ocean containers</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
