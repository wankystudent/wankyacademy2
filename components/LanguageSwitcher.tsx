import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../types';

interface LanguageSwitcherProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLang, onLanguageChange }) => {
  return (
    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
      <Globe className="w-4 h-4 text-white" />
      <select
        value={currentLang}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className="bg-transparent text-white text-sm font-medium focus:outline-none cursor-pointer uppercase [&>option]:text-black"
        aria-label="Select Language"
      >
        <option value={Language.EN}>EN</option>
        <option value={Language.FR}>FR</option>
        <option value={Language.ES}>ES</option>
        <option value={Language.HT}>HT</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;