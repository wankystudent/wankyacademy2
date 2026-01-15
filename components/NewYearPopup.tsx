
import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Sparkles } from 'lucide-react';
import { ASSETS } from '../constants';

const NewYearPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Configuration
    const EXPIRATION_DATE = new Date('2026-02-03T00:00:00'); // Valid until end of Feb 2nd
    const STORAGE_KEY = 'WA_NEW_YEAR_2026_SHOWN';
    const now = new Date();

    // Logic: Only show if before expiration and not already shown
    if (now < EXPIRATION_DATE) {
      const isShown = localStorage.getItem(STORAGE_KEY);
      if (!isShown) {
        // Small delay for better UX after page load
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('WA_NEW_YEAR_2026_SHOWN', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="relative bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-500 border-t-8 border-[#003366]">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Sparkles size={120} className="text-[#003366]" />
        </div>
        <div className="absolute bottom-0 left-0 p-8 opacity-5 pointer-events-none">
          <Sparkles size={80} className="text-yellow-500" />
        </div>

        <div className="p-10 text-center relative z-10">
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 bg-[#003366] rounded-3xl flex items-center justify-center shadow-xl transform -rotate-3 p-4">
              <img src={ASSETS.LOGO} alt="Wanky Academy" className="w-full h-full object-contain brightness-0 invert" />
            </div>
          </div>

          <h2 className="text-3xl font-black text-[#003366] mb-4 tracking-tight">
            🎉 Bonne Année 2026 !
          </h2>
          
          <div className="space-y-4 mb-10">
            <p className="text-gray-700 leading-relaxed font-medium">
              Que cette nouvelle année vous apporte réussite, santé et excellence dans votre parcours académique.
            </p>
            <p className="text-gray-600">
              Merci de faire partie de la communauté <span className="font-bold text-[#003366]">Wanky Academy</span> 💙
            </p>
          </div>

          <button 
            onClick={handleClose}
            className="w-full bg-[#003366] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#002244] transition-all transform active:scale-95 flex items-center justify-center gap-3"
          >
            <CheckCircle size={20} /> ✅ Continuer
          </button>
        </div>

        {/* Floating close X for accessibility */}
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default NewYearPopup;
