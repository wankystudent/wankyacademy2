
import React from 'react';
import { ShoppingBag, Star, Check, ExternalLink, Info, DollarSign } from 'lucide-react';
import { SHOP_ITEMS, CONTACT_CONFIG } from '../constants';
import { TranslationDictionary } from '../types';

interface Props {
  t: TranslationDictionary['shop_page'];
}

const ShopPage: React.FC<Props> = ({ t }) => {
  const handleBuy = (item: { name: string; price: number }) => {
    // Direct WhatsApp Integration for quick checkout
    const message = `Hello WankyAcademy, I am interested in buying: ${item.name} for $${item.price.toFixed(2)}`;
    const url = `https://wa.me/${CONTACT_CONFIG.PHONE.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
           <div className="inline-flex items-center justify-center p-3 bg-blue-100 text-[#003366] rounded-full mb-4">
              <ShoppingBag className="w-8 h-8" />
           </div>
           <h1 className="text-4xl md:text-5xl font-bold text-[#003366] mb-4">{t.title}</h1>
           <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">{t.subtitle}</p>
        </div>

        {/* Pricing Notes */}
        <div className="max-w-3xl mx-auto mb-16 bg-blue-50 border-l-4 border-[#003366] p-6 rounded-r-xl shadow-sm">
          <h3 className="font-bold text-[#003366] mb-3 flex items-center gap-2 text-lg">
            <Info className="w-5 h-5"/> Pricing & Delivery Notes
          </h3>
          <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
            <li>Most tools are <strong>$4.99 USD</strong> (Shared / Activation-based).</li>
            <li>Delivery time: <strong>Instant – 24 hours</strong>.</li>
            <li>TikTok & YouTube monetization are <strong>manual services</strong>.</li>
            <li>CapCut includes <strong>9 months access</strong>.</li>
          </ul>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {SHOP_ITEMS.map((item) => (
             <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:border-[#FFD700] hover:shadow-2xl transition-all duration-300 group flex flex-col">
                
                {/* Image Area */}
                <div className="aspect-video bg-gray-100 relative overflow-hidden p-6 flex items-center justify-center">
                   <div className="absolute inset-0 bg-[#003366]/5 group-hover:bg-[#003366]/0 transition"></div>
                   <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-contain transform group-hover:scale-110 transition duration-500 drop-shadow-md"
                   />
                   <div className="absolute top-4 right-4 bg-[#FFD700] text-[#003366] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 fill-current" /> Premium
                   </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                   <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-[#003366] leading-tight">{item.name}</h3>
                      <span className="bg-green-100 text-green-800 text-sm font-bold px-2 py-1 rounded-lg whitespace-nowrap">
                        ${item.price.toFixed(2)}
                      </span>
                   </div>
                   
                   <p className="text-gray-600 text-sm mb-6 flex-1 leading-relaxed">
                      {item.description}
                   </p>
                   
                   <div className="space-y-3 mt-auto">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Check className="w-3 h-3 text-green-500" /> 
                          {item.price > 50 ? 'Manual Activation' : 'Instant/Fast Delivery'}
                      </div>
                      
                      <button 
                        onClick={() => handleBuy(item)}
                        className="w-full bg-[#003366] text-white py-3 rounded-xl font-bold hover:bg-[#002244] transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 group-hover:bg-[#FFD700] group-hover:text-[#003366]"
                      >
                          {t.btn_buy} for ${item.price.toFixed(2)} <ExternalLink className="w-4 h-4" />
                      </button>
                   </div>
                </div>

             </div>
           ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
           <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-green-500" /> Secure payment and delivery via Official Wanky Academy Support
           </p>
        </div>

      </div>
    </div>
  );
};

export default ShopPage;
