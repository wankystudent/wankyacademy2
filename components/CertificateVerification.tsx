
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Search, Loader2, ArrowLeft } from 'lucide-react';
import { getCertificateFromFirebase, CertificateData } from '../services/firebase';
import { TranslationDictionary, Language } from '../types';
import { translations, getLocalizedUrl } from '../services/translations';
import { ASSETS, COLORS } from '../constants';

interface Props {
  lang: Language;
}

const CertificateVerification: React.FC<Props> = ({ lang }) => {
  const [searchParams] = useSearchParams();
  const cidParam = searchParams.get('cid');
  
  const t = translations[lang].verification;
  const [certId, setCertId] = useState(cidParam || '');
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (cidParam) {
      verifyCertificate(cidParam);
    }
  }, [cidParam]);

  const verifyCertificate = async (id: string) => {
    setLoading(true);
    setSearched(true);
    const data = await getCertificateFromFirebase(id);
    setCertificate(data);
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (certId.trim()) {
      verifyCertificate(certId.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-24 px-4 pb-12">
      <Link to={getLocalizedUrl('/', lang)} className="absolute top-24 left-4 md:left-8 flex items-center text-gray-500 hover:text-[#003366]">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </Link>

      <div className="max-w-md w-full text-center mb-8">
        <img src={ASSETS.LOGO} alt="Wanky Academy" className="w-20 h-20 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-[#003366]">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border-t-4" style={{ borderColor: COLORS.NAVY }}>
        <form onSubmit={handleSearch} className="mb-8 relative">
           <input 
             type="text" 
             value={certId} 
             onChange={(e) => setCertId(e.target.value)}
             placeholder={t.search_placeholder}
             className="w-full p-4 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#003366] outline-none"
           />
           <button 
             type="submit" 
             disabled={loading}
             className="absolute right-2 top-2 bottom-2 bg-[#003366] text-white p-2 rounded-lg hover:bg-blue-900 transition disabled:opacity-50"
           >
             {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
           </button>
        </form>

        {searched && !loading && (
           <div className={`text-center p-6 rounded-xl border-2 ${certificate ? 'border-green-100 bg-green-50' : 'border-red-100 bg-red-50'}`}>
              <div className="mb-4 flex justify-center">
                 {certificate ? (
                   <CheckCircle className="w-16 h-16 text-green-500" />
                 ) : (
                   <XCircle className="w-16 h-16 text-red-500" />
                 )}
              </div>
              
              <h2 className={`text-2xl font-bold mb-1 ${certificate ? 'text-green-800' : 'text-red-800'}`}>
                 {certificate ? t.valid_title : t.invalid_title}
              </h2>
              <p className={`font-bold tracking-widest text-sm mb-6 ${certificate ? 'text-green-600' : 'text-red-600'}`}>
                 {certificate ? t.status_valid : t.status_invalid}
              </p>

              {certificate && (
                <div className="text-left space-y-3 border-t border-green-200 pt-4 text-sm text-gray-700">
                    <div className="flex justify-between">
                       <span className="text-gray-500">{t.label_student}:</span>
                       <span className="font-bold">{certificate.student}</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-gray-500">{t.label_course}:</span>
                       <span className="font-bold">{certificate.course}</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-gray-500">{t.label_date}:</span>
                       <span className="font-bold">{certificate.issueDate}</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-gray-500">{t.label_id}:</span>
                       <span className="font-mono text-xs">{certificate.certId}</span>
                    </div>
                </div>
              )}
           </div>
        )}
      </div>
    </div>
  );
};

export default CertificateVerification;
