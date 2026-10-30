import React from 'react';
import { RoutePath } from '../types';
import { ArrowLeft, Home, Search, HelpCircle, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../config/siteData';

interface NotFoundPageProps {
  attemptedPath: string;
  onNavigate: (path: RoutePath) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ attemptedPath, onNavigate }) => {
  // Check if legacy URL
  const legacyRedirects: Record<string, RoutePath> = {
    '/index.html': '/',
    '/about.html': '/about',
    '/services.html': '/services',
    '/contact.html': '/contact',
    '/tracking.html': '/track',
    '/quote.html': '/get-a-quote'
  };

  const matchedLegacy = legacyRedirects[attemptedPath.toLowerCase()];

  return (
    <div className="bg-white min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto text-2xl font-bold font-mono">
          404
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            The page <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-700 font-mono text-xs">{attemptedPath}</code> could not be located.
          </p>
        </div>

        {matchedLegacy && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-900 text-left">
            <span className="font-bold block mb-1">Legacy URL Recognized:</span>
            <span>This looks like an older static website page. We can redirect you directly to:</span>
            <button
              onClick={() => onNavigate(matchedLegacy)}
              className="mt-2 w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors block text-center cursor-pointer"
            >
              Go to {matchedLegacy} →
            </button>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('/')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>

          <button
            onClick={() => onNavigate('/track')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Track Consignment</span>
          </button>
        </div>

        <div className="pt-6 border-t border-slate-100 text-xs text-slate-500">
          Need immediate assistance? Call our support desk at{' '}
          <a href={COMPANY_INFO.primaryPhoneTel} className="text-blue-600 font-semibold hover:underline">
            {COMPANY_INFO.primaryPhoneFormatted}
          </a>
        </div>

      </div>
    </div>
  );
};
