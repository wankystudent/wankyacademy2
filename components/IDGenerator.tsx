
import React, { useRef, useState, useEffect, useMemo } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { User, TranslationDictionary, Language } from '../types';
import { ASSETS } from '../constants';
import { 
  Download, ChevronDown, Loader2, RotateCcw, 
  UserCircle, Shield, Mail, Phone, GraduationCap, Building, Globe
} from 'lucide-react';

interface Props { user: User; t: TranslationDictionary['id_card']; lang: Language; }

const getCoursesFromAccessCode = (accessCode: string | undefined): string[] => {
  if (!accessCode) return ["Informatique"];
  const map: Record<string, string[]> = {
    "WA-INF": ["Informatique"],
    "WA-CAN": ["Canva Mastery"],
    "WA-WP": ["WordPress de A à Z"],
    "WA-RAD": ["Création de Radio en Ligne"],
    "WA-SOC": ["Master Réseaux Sociaux"],
    "WA-SUB": ["Sublimation"],
    "WA-TAB": ["Tableaux Personnalisés"],
  };
  const prefix = accessCode.substring(0, 6).toUpperCase();
  return map[prefix] || ["Informatique"];
};

const IDGenerator: React.FC<Props> = ({ user, t, lang }) => {
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const availableCourses = useMemo(() => getCoursesFromAccessCode(user.accessCode || user.idNumber), [user.accessCode, user.idNumber]);

  const [selectedCourse, setSelectedCourse] = useState(() => {
    const saved = localStorage.getItem(`WA_ID_COURSE_${user.idNumber}`);
    return (saved && availableCourses.includes(saved)) ? saved : availableCourses[0];
  });

  useEffect(() => {
    if (!availableCourses.includes(selectedCourse)) {
      setSelectedCourse(availableCourses[0]);
    }
  }, [availableCourses, selectedCourse]);

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedCourse(val);
    localStorage.setItem(`WA_ID_COURSE_${user.idNumber}`, val);
  };

  const downloadPDF = async () => {
    if (!frontRef.current || !backRef.current || downloading) return;
    setDownloading(true);

    try {
      // ID-1 format is 85.6 x 53.98 mm
      const pdf = new jsPDF({ 
        orientation: "landscape", 
        unit: "mm", 
        format: [85.6, 54] 
      });

      // Capture Front Side
      const canvasFront = await html2canvas(frontRef.current, { 
        scale: 4, 
        useCORS: true, 
        backgroundColor: '#ffffff' 
      });
      pdf.addImage(canvasFront.toDataURL('image/png'), 'PNG', 0, 0, 85.6, 54);

      // Add Page 2 for Back Side
      pdf.addPage([85.6, 54], "landscape");

      // Capture Back Side
      const canvasBack = await html2canvas(backRef.current, { 
        scale: 4, 
        useCORS: true, 
        backgroundColor: '#ffffff' 
      });
      pdf.addImage(canvasBack.toDataURL('image/png'), 'PNG', 0, 0, 85.6, 54);

      pdf.save(`WA-ID-${user.accessCode || user.idNumber}.pdf`);
    } catch (e) {
      console.error("ID PDF Error:", e);
      alert("Failed to generate PDF.");
    } finally {
      setDownloading(false);
    }
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://wankyacademy.com/verify?cid=${user.accessCode || user.idNumber}`;

  return (
    <div className="space-y-10 font-body">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-[#003366] tracking-tight">{t.title}</h2>
          <p className="text-gray-500 text-sm mt-1">{lang === Language.ES ? 'Tu identificación oficial de estudiante.' : 'Your official student identification.'}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group">
            <select value={selectedCourse} onChange={handleCourseChange} className="appearance-none bg-white border-2 border-gray-100 text-gray-700 py-4 pl-6 pr-12 rounded-2xl focus:outline-none focus:border-[#003366] text-xs font-black cursor-pointer shadow-sm hover:border-gray-200 transition-colors uppercase tracking-widest">
              {availableCourses.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none text-gray-400" />
          </div>
          <button onClick={() => setIsFlipped(!isFlipped)} className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-4 rounded-2xl hover:bg-gray-200 transition font-black text-xs uppercase tracking-widest active:scale-95">
            <RotateCcw size={18} /> {isFlipped ? 'Show Front' : 'Show Back'}
          </button>
          <button onClick={downloadPDF} disabled={downloading} className="flex items-center gap-2 bg-[#003366] text-white px-10 py-4 rounded-2xl hover:bg-[#002244] transition shadow-xl disabled:opacity-50 font-black text-xs uppercase tracking-[0.2em] active:scale-95">
            {downloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />} {t.download_pdf} (2 Pages)
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-[3rem] shadow-inner perspective-1000">
        {/* Flippable card for UI interaction */}
        <div 
          className={`relative w-[500px] h-[315px] transition-transform duration-700 transform-style-3d cursor-pointer shadow-[0_30px_60px_rgba(0,0,0,0.15)] rounded-[1.25rem] overflow-hidden ${isFlipped ? 'rotate-y-180' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* UI FRONT */}
          <div className="absolute w-full h-full backface-hidden bg-white flex flex-col border border-gray-200" style={{ backfaceVisibility: 'hidden' }}>
             <IDFrontContent user={user} selectedCourse={selectedCourse} />
          </div>

          {/* UI BACK */}
          <div className="absolute w-full h-full backface-hidden bg-white p-10 flex flex-col justify-between rotate-y-180 border border-gray-200" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
             <IDBackContent user={user} qrUrl={qrUrl} />
          </div>
        </div>
        <p className="text-gray-400 mt-8 font-black text-[10px] uppercase tracking-[0.5em] animate-pulse">{lang === Language.ES ? 'Haz clic para ver el dorso' : 'Click card to see back'}</p>
      </div>

      {/* Hidden static elements for high-quality multi-page PDF capture */}
      <div className="fixed -left-[9999px] top-0 flex flex-col gap-10">
        <div ref={frontRef} className="w-[856px] h-[540px] bg-white">
          <IDFrontContent user={user} selectedCourse={selectedCourse} isPrint />
        </div>
        <div ref={backRef} className="w-[856px] h-[540px] bg-white p-20 flex flex-col justify-between">
          <IDBackContent user={user} qrUrl={qrUrl} isPrint />
        </div>
      </div>
      
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </div>
  );
};

const IDFrontContent: React.FC<{ user: User, selectedCourse: string, isPrint?: boolean }> = ({ user, selectedCourse, isPrint }) => (
  <div className="bg-white h-full w-full flex flex-col relative overflow-hidden">
    <div className={`absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center ${isPrint ? 'scale-150' : ''}`}>
       <img src={ASSETS.LOGO} className="w-96 grayscale" alt="" />
    </div>
    
    <div className={`bg-[#f0f9ff] px-6 py-4 flex items-center justify-between border-b border-blue-100 relative z-10 ${isPrint ? 'py-8' : ''}`}>
       <div className="flex items-center gap-4">
          <img src={ASSETS.LOGO} className={`${isPrint ? 'w-20 h-20' : 'w-10 h-10'} drop-shadow-sm`} alt="WA" />
          <div className="leading-tight">
             <h2 className={`${isPrint ? 'text-3xl' : 'text-[16px]'} text-[#003366] font-black tracking-tight uppercase`}>Wanky Academy</h2>
             <p className={`${isPrint ? 'text-sm' : 'text-[8px]'} font-black text-blue-600/60 uppercase tracking-widest`}>CÉDULA DE IDENTIDAD ESTUDIANTIL</p>
          </div>
       </div>
       <div className="text-right">
          <p className={`${isPrint ? 'text-xs' : 'text-[7px]'} font-black text-gray-400 uppercase tracking-widest mb-0.5`}>Nivel / Level</p>
          <span className={`${isPrint ? 'text-xl' : 'text-[10px]'} text-[#003366] font-black uppercase`}>Intermediate</span>
       </div>
    </div>

    <div className={`flex-1 flex px-8 py-6 gap-10 items-start relative z-10 ${isPrint ? 'gap-20 py-10' : ''}`}>
       <div className="relative">
          <div className={`${isPrint ? 'w-64 h-80' : 'w-32 h-40'} rounded-xl border-2 border-gray-100 shadow-md overflow-hidden bg-gray-50 flex items-center justify-center`}>
             {user.photo ? (
               <img src={user.photo} className="w-full h-full object-cover" alt="Student" />
             ) : (
               <UserCircle className={`${isPrint ? 'w-48 h-48' : 'w-24 h-24'} text-gray-300`} />
             )}
          </div>
          <div className={`absolute -bottom-1 -right-1 bg-green-500 ${isPrint ? 'w-10 h-10 border-4' : 'w-5 h-5 border-2'} rounded-full border-white shadow-sm`}></div>
          <div className={`absolute top-2 left-2 opacity-20 transform -rotate-12 ${isPrint ? 'scale-150' : ''}`}>
             <Shield className="text-blue-500 w-10 h-10" />
          </div>
       </div>

       <div className={`flex-1 space-y-4 pt-1 ${isPrint ? 'space-y-8' : ''}`}>
          <div className="grid grid-cols-2 gap-4">
             <div className="col-span-2">
                <p className={`${isPrint ? 'text-xs' : 'text-[8px]'} font-black text-gray-400 uppercase tracking-widest mb-0.5`}>Nombre / Name</p>
                <h3 className={`${isPrint ? 'text-5xl' : 'text-xl'} font-black text-gray-900 leading-tight uppercase tracking-tight`}>{user.name}</h3>
             </div>
             <div className="col-span-2">
                <p className={`${isPrint ? 'text-xs' : 'text-[8px]'} font-black text-gray-400 uppercase tracking-widest mb-0.5`}>Curso / Course</p>
                <p className={`${isPrint ? 'text-2xl' : 'text-sm'} font-black text-gray-800 uppercase leading-tight`}>{selectedCourse}</p>
             </div>
             <div>
                <p className={`${isPrint ? 'text-xs' : 'text-[8px]'} font-black text-gray-400 uppercase tracking-widest mb-0.5`}>Código / Code</p>
                <p className={`${isPrint ? 'text-2xl' : 'text-sm'} font-black text-gray-800 uppercase`}>{user.courseCode || 'INF-001'}</p>
             </div>
             <div className="flex items-center justify-end pr-4">
                <div className={`${isPrint ? 'w-24 h-16 rounded-xl' : 'w-11 h-8 rounded-md'} bg-gradient-to-br from-[#ffd700] to-[#b8860b] relative overflow-hidden shadow-sm border border-black/10`}>
                   <div className="absolute inset-0 opacity-20" style={{ background: 'repeating-linear-gradient(90deg, transparent 0, transparent 4px, black 4px, black 5px)' }}></div>
                   <div className="absolute inset-0 opacity-20" style={{ background: 'repeating-linear-gradient(0deg, transparent 0, transparent 4px, black 4px, black 5px)' }}></div>
                </div>
             </div>
          </div>
       </div>
    </div>

    <div className={`px-8 pb-4 flex items-end justify-between relative z-10 ${isPrint ? 'pb-10' : ''}`}>
       <div className="leading-tight">
          <p className={`${isPrint ? 'text-xs' : 'text-[8px]'} font-black text-gray-400 uppercase tracking-widest mb-0.5`}>Matrícula / Registration ID</p>
          <p className={`${isPrint ? 'text-6xl' : 'text-2xl'} font-mono font-black text-[#003366] tracking-tighter uppercase`}>{user.accessCode || user.idNumber}</p>
       </div>
       <div className="text-right opacity-40">
          <img src={ASSETS.LOGO} className={`${isPrint ? 'h-24' : 'h-8'} grayscale`} alt="" />
       </div>
    </div>

    <div className={`h-1.5 bg-gradient-to-r from-[#1e3a8a] via-[#3b82f6] to-[#1e3a8a] opacity-80 ${isPrint ? 'h-4' : ''}`}></div>
  </div>
);

const IDBackContent: React.FC<{ user: User, qrUrl: string, isPrint?: boolean }> = ({ user, qrUrl, isPrint }) => (
  <div className="relative h-full flex flex-col justify-between w-full">
    <div className="absolute inset-0 opacity-[0.02] flex items-center justify-center pointer-events-none">
       <img src={ASSETS.LOGO} className={isPrint ? "w-[500px]" : "w-64"} alt="" />
    </div>

    <div className="flex items-start justify-between relative z-10">
       <div className="flex items-center gap-4">
          <div className={`${isPrint ? "w-24 h-24" : "w-12 h-12"} bg-[#003366] rounded-xl flex items-center justify-center text-white shadow-lg transform rotate-3`}>
             <Shield size={isPrint ? 48 : 24} />
          </div>
          <div>
             <h2 className={`${isPrint ? "text-4xl" : "text-xl"} font-black text-gray-800 uppercase leading-none mb-1`}>Wanky Academy</h2>
             <p className={`${isPrint ? "text-base" : "text-[9px]"} font-black text-gray-400 uppercase tracking-widest`}>Digital Learning System</p>
          </div>
       </div>
       <div className="text-right">
          <p className={`${isPrint ? "text-sm" : "text-[8px]"} font-black text-gray-400 uppercase mb-0.5`}>Expedido / Issued</p>
          <p className={`${isPrint ? "text-xl" : "text-[10px]"} font-black text-gray-800`}>01/2025</p>
       </div>
    </div>

    <div className={`grid grid-cols-2 gap-8 mt-4 relative z-10 ${isPrint ? 'mt-12' : ''}`}>
       <section className={isPrint ? 'space-y-10' : 'space-y-4'}>
          <h4 className={`${isPrint ? "text-2xl" : "text-[10px]"} font-black text-gray-400 uppercase tracking-widest border-b pb-2`}>Contacto / Support</h4>
          <div className={`${isPrint ? "space-y-6" : "space-y-3"}`}>
             <div className="flex items-center gap-3">
                <Mail size={isPrint ? 24 : 12} className="text-blue-500" />
                <p className={`${isPrint ? "text-xl" : "text-[10px]"} font-bold text-gray-600`}>contact@wankyacademy.com</p>
             </div>
             <div className="flex items-center gap-3">
                <Phone size={isPrint ? 24 : 12} className="text-green-500" />
                <p className={`${isPrint ? "text-xl" : "text-[10px]"} font-bold text-gray-600`}>+1 829 620 9249</p>
             </div>
             <div className="flex items-center gap-3">
                <Globe size={isPrint ? 24 : 12} className="text-purple-500" />
                <p className={`${isPrint ? "text-xl" : "text-[10px]"} font-bold text-gray-600`}>wankyacademy.com</p>
             </div>
          </div>
       </section>

       <section className="flex flex-col items-center justify-center">
          <div className={`bg-white p-2 border-2 border-gray-100 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-500 ${isPrint ? 'p-6' : ''}`}>
             <img src={qrUrl} className={isPrint ? "w-48 h-48" : "w-20 h-20"} alt="QR Verify" />
          </div>
          <p className={`${isPrint ? "text-lg mt-6" : "text-[7px] mt-2"} text-gray-400 font-bold uppercase tracking-widest`}>Verify Authenticity</p>
       </section>
    </div>

    <div className={`${isPrint ? "mt-12 pt-12 text-sm" : "mt-6 pt-4 text-[9px]"} border-t border-gray-50 text-center relative z-10`}>
       <p className="text-gray-400 font-bold leading-relaxed tracking-wider italic">
          Esta tarjeta es propiedad de Wanky Academy. En caso de pérdida, contacte a administración.<br/>
          This card is property of Wanky Academy. Official Student Member.
       </p>
    </div>
  </div>
);

export default IDGenerator;
