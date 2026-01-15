
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Link, useNavigate } from 'react-router-dom';
import { Menu, X, Facebook, Instagram, Youtube, Video, ExternalLink, ArrowRight, Mail, Phone, MapPin, User as UserIcon, PenTool, Star, Quote, ShoppingBag, BookOpen, CheckCircle, AlertTriangle, Globe } from 'lucide-react';
import { Language, TranslationDictionary, QuizQuestion } from './types';
import { translations, getLocalizedUrl } from './services/translations';
import { COLORS, ASSETS, SOCIAL_LINKS, COURSES_DATA } from './constants';
import LanguageSwitcher from './components/LanguageSwitcher';
import Chatbot from './components/Chatbot';
import LegalPage from './components/LegalPage';
import StudentPortal from './components/StudentPortal';
import AppointmentForm from './components/AppointmentForm';
import Quiz from './components/Quiz';
import VideosPage from './components/VideosPage';
import SubscriptionPage from './components/SubscriptionPage';
import CertificateVerification from './components/CertificateVerification';
import AIQuizGenerator from './components/AIQuizGenerator';
import ShopPage from './components/ShopPage';
import PaymentSuccess from './components/PaymentSuccess';
import OrderSuccessStripe from './components/OrderSuccessStripe';
import OrderSuccessPayPal from './components/OrderSuccessPayPal';
import OrderCancel from './components/OrderCancel';
import AdminDashboard from './components/AdminDashboard';
import ProfessorDashboard from './components/ProfessorDashboard';
import NewYearPopup from './components/NewYearPopup';
import { initDatabase } from './services/auth';

// --- Utils ---
const getLangFromPath = (path: string): Language => {
  const segment = path.split('/')[1];
  if (segment && Object.values(Language).includes(segment as Language)) return segment as Language;
  return Language.EN;
};

function useCurrentLang() {
  const location = useLocation();
  return getLangFromPath(location.pathname);
}

// --- Shared Components ---

const Navbar: React.FC<{ t: TranslationDictionary['nav']; lang: Language; onLangChange: (l: Language) => void }> = ({ t, lang, onLangChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const userStr = localStorage.getItem('wa_logged_user');
  const user = userStr ? JSON.parse(userStr) : null;

  return (
    <nav className="fixed w-full z-50 bg-white shadow-md py-3 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to={getLocalizedUrl('/', lang)} className="flex items-center gap-2">
           <img src={ASSETS.LOGO} className="h-10 w-auto" />
           <span className="text-xl font-bold" style={{ color: COLORS.NAVY }}>Wanky<span style={{ color: COLORS.GOLD }}>Academy</span></span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          {[
            { l: t.home, p: '/' }, { l: t.courses, p: '/courses' }, { l: t.videos, p: '/videos' }, 
            { l: t.about, p: '/about' }, { l: t.contact, p: '/contact' }
          ].map(item => (
            <Link key={item.p} to={getLocalizedUrl(item.p, lang)} className="text-gray-700 hover:text-[#003366] font-medium text-sm transition">{item.l}</Link>
          ))}
          <Link to={getLocalizedUrl('/shop', lang)} className="text-gray-700 hover:text-[#003366] font-medium text-sm transition">{t.shop}</Link>
          <LanguageSwitcher currentLang={lang} onLanguageChange={onLangChange} />
          
          {/* Enroll Button */}
          <Link to={getLocalizedUrl('/subscribe', lang)} className="px-4 py-2 rounded-full font-bold text-[#003366] bg-yellow-400 hover:bg-yellow-500 text-sm flex items-center gap-2 transition shadow-sm">
             <PenTool className="w-4 h-4" /> {t.subscribe}
          </Link>

          <Link to={getLocalizedUrl('/student', lang)} className={`px-4 py-2 rounded-full font-bold text-white text-sm flex items-center gap-2 ${user ? 'bg-green-600' : 'bg-[#003366]'} hover:opacity-90 transition`}>
            <UserIcon className="w-4 h-4" /> {user ? (user.role === 'professor' ? 'Admin' : t.dashboard) : t.login}
          </Link>
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t p-4 flex flex-col space-y-4">
           <Link to={getLocalizedUrl('/', lang)} onClick={() => setIsOpen(false)}>{t.home}</Link>
           <Link to={getLocalizedUrl('/courses', lang)} onClick={() => setIsOpen(false)}>{t.courses}</Link>
           <Link to={getLocalizedUrl('/videos', lang)} onClick={() => setIsOpen(false)}>{t.videos}</Link>
           <Link to={getLocalizedUrl('/shop', lang)} onClick={() => setIsOpen(false)}>{t.shop}</Link>
           <Link to={getLocalizedUrl('/about', lang)} onClick={() => setIsOpen(false)}>{t.about}</Link>
           <Link to={getLocalizedUrl('/contact', lang)} onClick={() => setIsOpen(false)}>{t.contact}</Link>
           <Link to={getLocalizedUrl('/subscribe', lang)} onClick={() => setIsOpen(false)} className="font-bold text-yellow-600">{t.subscribe}</Link>
           <Link to={getLocalizedUrl('/student', lang)} onClick={() => setIsOpen(false)} className="font-bold text-[#003366]">{t.login}</Link>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC<{ t: TranslationDictionary['footer']; lang: Language }> = ({ t, lang }) => (
  <footer className="bg-[#001a33] text-gray-300 py-12">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm">
      <div>
        <div className="flex items-center gap-2 mb-4">
           <img src={ASSETS.LOGO} className="h-8 bg-white rounded-full" />
           <span className="text-xl font-bold text-white">WankyAcademy</span>
        </div>
        <p className="opacity-70 mb-4">{t.desc}</p>
        <div className="flex gap-4">
           {[Facebook, Instagram, Youtube, Video].map((Icon, i) => (
             <a key={i} href={Object.values(SOCIAL_LINKS)[i]} target="_blank" className="hover:text-[#FFD700]"><Icon className="w-5 h-5" /></a>
           ))}
        </div>
      </div>
      <div>
        <h3 className="text-white font-bold mb-4 uppercase">{t.links}</h3>
        <ul className="space-y-2">
           <li><Link to={getLocalizedUrl('/courses', lang)} className="hover:text-white">Courses</Link></li>
           <li><Link to={getLocalizedUrl('/shop', lang)} className="hover:text-white">Shop</Link></li>
           <li><Link to={getLocalizedUrl('/faq', lang)} className="hover:text-white">FAQ</Link></li>
           <li><Link to={getLocalizedUrl('/privacy', lang)} className="hover:text-white">Privacy</Link></li>
           <li><Link to={getLocalizedUrl('/terms', lang)} className="hover:text-white">Terms</Link></li>
           <li><Link to={getLocalizedUrl('/copyright-fair-use', lang)} className="hover:text-white">Copyright & Fair Use</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="text-white font-bold mb-4 uppercase">{t.contact}</h3>
        <ul className="space-y-2">
           <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#FFD700]" /> +1 829 620 9249</li>
           <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#FFD700]" /> support@wankyacademy.com</li>
           <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#FFD700]" /> Online</li>
        </ul>
      </div>
    </div>
    <div className="text-center mt-12 pt-8 border-t border-gray-800 text-xs">{t.copyright}</div>
  </footer>
);

// --- Pages ---

const Hero: React.FC<{ t: any; lang: Language }> = ({ t, lang }) => (
  <header className="relative pt-32 pb-20 bg-[#003366] text-white overflow-hidden">
     <div className="absolute top-0 right-0 w-1/2 h-full bg-[#004080] transform skew-x-12 translate-x-20 opacity-50"></div>
     <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
           <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{t.headline}</h1>
           <p className="text-xl text-blue-100 mb-8">{t.subtext}</p>
           <div className="flex gap-4">
              <Link to={getLocalizedUrl('/courses', lang)} className="bg-[#FFD700] text-gray-900 px-8 py-3 rounded-full font-bold hover:scale-105 transition">{t.btn_start}</Link>
              <Link to={getLocalizedUrl('/shop', lang)} className="border border-white/30 px-8 py-3 rounded-full font-bold hover:bg-white/10 transition">{t.btn_explore}</Link>
           </div>
        </div>
        <div className="md:w-1/2">
           <img src="https://i.postimg.cc/9F2LzS6B/7.png" className="w-full rounded-2xl shadow-2xl border-4 border-[#FFD700]" />
        </div>
     </div>
  </header>
);

const HomeLandingPage: React.FC<{ t: TranslationDictionary; lang: Language }> = ({ t, lang }) => (
  <>
    <Hero t={t.hero} lang={lang} />
    
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
           <div className="md:w-1/2 order-1 md:order-1 relative">
              <div className="absolute top-0 left-0 w-full h-full bg-[#FFD700]/10 rounded-3xl transform -translate-x-4 translate-y-4 -z-10"></div>
              <img src="https://i.postimg.cc/dt13CvbM/wankyacade.png" alt="Wanky Academy" className="w-full rounded-3xl shadow-2xl object-cover" />
           </div>
           <div className="md:w-1/2 order-2 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4 leading-tight">{t.home_sections.about_school.title}</h2>
              <p className="text-lg text-gray-600 font-medium mb-4">{t.home_sections.about_school.subtitle}</p>
              <p className="text-gray-600 mb-8 leading-relaxed">{t.home_sections.about_school.desc}</p>
              <ul className="space-y-4 mb-8">
                 {t.home_sections.about_school.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                       <CheckCircle className="w-6 h-6 text-[#FFD700] flex-shrink-0 mt-0.5" fill="#003366" />
                       <span className="text-gray-700 font-medium">{point}</span>
                    </li>
                 ))}
              </ul>
              <Link to={getLocalizedUrl('/courses', lang)} className="inline-flex items-center gap-2 bg-[#003366] text-white px-8 py-3 rounded-full font-bold hover:bg-[#002244] transition-all transform hover:-translate-y-1">
                 {t.home_sections.about_school.cta} <ArrowRight className="w-5 h-5" />
              </Link>
           </div>
        </div>
      </div>
    </section>

    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
           <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4">{t.home_sections.popular_courses}</h2>
           <div className="w-20 h-1 bg-[#FFD700] mx-auto"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 mb-12">
           {COURSES_DATA.slice(0, 3).map(course => (
              <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden border hover:border-[#FFD700] transition group flex flex-col">
                 <div className="aspect-video bg-gray-200 relative">
                    <img src={`https://img.youtube.com/vi/${course.type === 'video' ? course.src : ''}/hqdefault.jpg`} className="w-full h-full object-cover" onError={(e) => e.currentTarget.src = ASSETS.PLACEHOLDER} />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                       <Link to={getLocalizedUrl(`/course/${course.id}`, lang)} className="bg-[#FFD700] text-black px-6 py-2 rounded-full font-bold">{t.courses_page.watch_now}</Link>
                    </div>
                 </div>
                 <div className="p-6 flex-1 flex flex-col">
                    <span className="text-xs font-bold text-[#003366] uppercase tracking-wide mb-2">{course.type}</span>
                    <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1 whitespace-pre-line">{course.description}</p>
                    <Link to={getLocalizedUrl(`/course/${course.id}`, lang)} className="block text-center border-2 border-[#003366] text-[#003366] py-2 rounded-lg font-bold hover:bg-[#003366] hover:text-white transition">{t.courses_page.start_quiz}</Link>
                 </div>
              </div>
           ))}
        </div>
    </section>

    <section className="py-20 bg-[#003366] text-white relative overflow-hidden text-center">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
         <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.home_sections.premium_tools.title}</h2>
         <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">{t.home_sections.premium_tools.desc}</p>
         <Link to={getLocalizedUrl('/shop', lang)} className="inline-flex items-center gap-2 bg-[#FFD700] text-gray-900 px-8 py-3 rounded-full font-bold hover:scale-105 transition shadow-xl">
            <ShoppingBag className="w-5 h-5" /> {t.home_sections.premium_tools.btn}
         </Link>
      </div>
    </section>

    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 relative">
           <img src={ASSETS.FOUNDER} className="relative rounded-full border-8 border-white shadow-2xl w-full max-w-md mx-auto" alt="Wanky Massenat" />
        </div>
        <div className="md:w-1/2">
           <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-6">{t.home_sections.about_founder.title}</h2>
           <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
             {t.home_sections.about_founder.content.slice(0, 2).map((paragraph, index) => (
               <p key={index}>{paragraph}</p>
             ))}
           </div>
           <div className="mt-8 flex gap-4">
              <Link to={getLocalizedUrl('/about', lang)} className="text-[#003366] font-bold hover:underline flex items-center gap-2">Learn More <ArrowRight className="w-4 h-4" /></Link>
           </div>
        </div>
      </div>
    </section>
  </>
);

const CoursesPage: React.FC<{ t: any; lang: Language }> = ({ t, lang }) => (
  <div className="pt-24 pb-12 bg-gray-50">
     <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
           <h1 className="text-4xl font-bold text-[#003366] mb-4">{t.title}</h1>
           <p className="text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {COURSES_DATA.map(course => (
              <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden border hover:border-[#FFD700] transition group">
                 <div className="aspect-video bg-gray-200 relative">
                    <img src={course.type === 'video' ? `https://img.youtube.com/vi/${course.src}/hqdefault.jpg` : ASSETS.PLACEHOLDER} className="w-full h-full object-cover" onError={(e) => e.currentTarget.src = ASSETS.PLACEHOLDER} />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                       <Link to={getLocalizedUrl(`/course/${course.id}`, lang)} className="bg-[#FFD700] text-black px-6 py-2 rounded-full font-bold">{t.watch_now}</Link>
                    </div>
                 </div>
                 <div className="p-6">
                    <span className="text-xs font-bold text-[#003366] uppercase tracking-wide">{course.type}</span>
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 whitespace-pre-line">{course.description}</p>
                    <Link to={getLocalizedUrl(`/course/${course.id}`, lang)} className="block text-center border-2 border-[#003366] text-[#003366] py-2 rounded-lg font-bold hover:bg-[#003366] hover:text-white transition">{t.start_quiz}</Link>
                 </div>
              </div>
           ))}
        </div>
     </div>
  </div>
);

const SingleCoursePage: React.FC<{ t: TranslationDictionary; lang: Language }> = ({ t, lang }) => {
   const { id } = useLocation().pathname.split('/').pop() ? { id: useLocation().pathname.split('/').pop() } : { id: '' };
   const course = COURSES_DATA.find(c => c.id === id);
   const [quizMode, setQuizMode] = useState(false);
   const [generatedQuestions, setGeneratedQuestions] = useState<QuizQuestion[] | null>(null);
   const [quizType, setQuizType] = useState<'MCQ' | 'TrueFalse' | 'Static'>('Static');

   if (!course) return <div className="pt-32 text-center">Course not found</div>;

   const handleQuizGenerated = (questions: QuizQuestion[], type: 'MCQ' | 'TrueFalse') => {
      setGeneratedQuestions(questions);
      setQuizType(type);
      setQuizMode(true);
   };

   return (
      <div className="pt-24 pb-12 max-w-6xl mx-auto px-4">
         <div className="mb-8">
            <Link to={getLocalizedUrl('/courses', lang)} className="text-gray-500 hover:underline mb-4 block">&larr; {t.courses_page.title}</Link>
            <h1 className="text-3xl font-bold text-[#003366]">{course.title}</h1>
         </div>
         <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
               {!quizMode ? (
                  <>
                    {/* Mandatory Disclaimer Banner for External Content */}
                    {course.isExternal && (
                       <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded-r-xl flex items-start gap-3 shadow-sm animate-in fade-in slide-in-from-top-2 duration-500">
                          <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                          <p className="text-sm text-yellow-800 font-medium leading-relaxed">
                             ⚠️ Cette vidéo provient d’une source externe. Wanky Academy n’est pas le propriétaire du contenu.<br/>
                             La vidéo est utilisée uniquement à des fins éducatives.
                          </p>
                       </div>
                    )}
                    <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                        {course.type === 'video' ? (
                            <iframe width="100%" height="100%" src={`https://www.youtube-nocookie.com/embed/${course.src}`} frameBorder="0" allowFullScreen></iframe>
                        ) : (
                            <iframe width="100%" height="100%" src={`https://www.youtube-nocookie.com/embed/videoseries?list=${course.src}`} frameBorder="0" allowFullScreen></iframe>
                        )}
                    </div>
                  </>
               ) : (
                  <Quiz questions={generatedQuestions || course.questions} courseId={course.id} courseTitle={course.title} lang={lang} quizType={quizType} onComplete={() => {}} />
               )}
               <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Lesson Content</h2>
                  <button onClick={() => setQuizMode(!quizMode)} className="bg-[#FFD700] px-6 py-2 rounded-lg font-bold hover:opacity-80 transition">{quizMode ? t.courses_page.watch_now : t.courses_page.start_quiz}</button>
               </div>
               <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{course.description}</p>
               <div className="border-t border-gray-200 pt-8 mt-8">
                  <AIQuizGenerator courseTitle={course.title} courseDescription={course.description} lang={lang} onQuizGenerated={handleQuizGenerated} t={t.quiz_generator} />
               </div>
            </div>
            <div className="lg:col-span-1">
               <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-[#003366] sticky top-24">
                  <h3 className="font-bold text-lg mb-4">Instructor</h3>
                  <div className="flex items-center gap-4 mb-4">
                     <img src={ASSETS.FOUNDER} className="w-12 h-12 rounded-full object-cover" />
                     <div>
                        <p className="font-bold">Wanky Massenat</p>
                        <p className="text-xs text-gray-500">Founder, Wanky Academy</p>
                     </div>
                  </div>
                  <Link to={getLocalizedUrl('/contact', lang)} className="block w-full text-center bg-gray-100 py-2 rounded-lg text-sm font-bold hover:bg-gray-200">Contact Instructor</Link>
               </div>
            </div>
         </div>
      </div>
   );
};

const AboutPage: React.FC<{ t: TranslationDictionary; lang: Language }> = ({ t, lang }) => (
   <div className="pt-24 pb-20 bg-gray-50 min-h-screen font-body">
      <div className="max-w-4xl mx-auto px-4">
         <div className="text-center mb-12">
             <div className="relative inline-block">
                <img src={ASSETS.FOUNDER} className="w-48 h-48 rounded-full mx-auto mb-6 border-4 border-white shadow-2xl object-cover relative z-10" />
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#003366] to-yellow-400 rounded-full blur opacity-20"></div>
             </div>
             <h1 className="text-4xl md:text-5xl font-black text-[#003366] tracking-tight mb-2">{t.home_sections.about_founder.title}</h1>
             <p className="text-[#003366]/60 font-bold uppercase tracking-[0.2em] text-sm">Wanky Massenat</p>
         </div>

         <div className="space-y-12">
            {/* Main Content Card */}
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl space-y-8 text-gray-700 leading-relaxed text-lg border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5"><Quote size={120} /></div>
                
                <div className="space-y-6 relative z-10">
                   {t.home_sections.about_founder.content.slice(0, 3).map((c: string, i: number) => (
                     <p key={i} className={i === 0 ? "text-xl font-medium text-gray-800" : ""}>{c}</p>
                   ))}
                </div>

                {/* Mission Section */}
                <div className="bg-[#003366] p-8 md:p-10 rounded-[2rem] text-white shadow-2xl relative group">
                   <div className="absolute top-4 left-4 opacity-20 group-hover:scale-110 transition-transform"><Star size={40} fill="currentColor" /></div>
                   <h3 className="text-sm font-black uppercase tracking-[0.3em] text-yellow-400 mb-6 flex items-center gap-3">
                      <Globe size={18} /> Our Global Mission
                   </h3>
                   <p className="text-2xl md:text-3xl font-black leading-tight italic tracking-tight">
                      "{t.home_sections.about_founder.content[3]}"
                   </p>
                </div>

                <div className="space-y-6">
                   {t.home_sections.about_founder.content.slice(4).map((c: string, i: number) => (
                     <p key={i}>{c}</p>
                   ))}
                </div>
            </div>

            {/* Social Connect Card */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-lg border border-gray-100 text-center">
               <h3 className="text-xl font-black text-[#003366] mb-8 uppercase tracking-widest">Connect with Wanky Massenat</h3>
               <div className="flex flex-wrap justify-center gap-6">
                  <a 
                    href="https://facebook.com/wan.massenat" 
                    target="_blank" 
                    className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black hover:scale-105 transition-all shadow-lg shadow-blue-200"
                  >
                     <Facebook size={24} fill="currentColor" /> Facebook
                  </a>
                  <a 
                    href="https://youtube.com/@WankyAcademy" 
                    target="_blank" 
                    className="flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-2xl font-black hover:scale-105 transition-all shadow-lg shadow-red-200"
                  >
                     <Youtube size={24} fill="currentColor" /> YouTube
                  </a>
               </div>
            </div>
         </div>
      </div>
   </div>
);

// --- Main App Logic ---

function AppContent() {
   const lang = useCurrentLang();
   const t = translations[lang];
   const navigate = useNavigate();

   useEffect(() => {
     initDatabase();
   }, []);

   const handleLangChange = (l: Language) => {
      const p = window.location.hash.replace('#', '').replace(`/${lang}`, '') || '/';
      const dest = getLocalizedUrl(p, l);
      navigate(dest);
   };

   return (
      <div className="font-sans antialiased bg-gray-50 min-h-screen flex flex-col">
         <Navbar t={t.nav} lang={lang} onLangChange={handleLangChange} />
         <main className="flex-grow">
            <Routes>
               {['', 'fr', 'es', 'ht'].map(prefix => {
                  const p = prefix ? `/${prefix}` : '';
                  return (
                     <React.Fragment key={prefix}>
                        <Route path={`${p}/`} element={<HomeLandingPage t={t} lang={lang} />} />
                        <Route path={`${p}/courses`} element={<CoursesPage t={t.courses_page} lang={lang} />} />
                        <Route path={`${p}/course/:id`} element={<SingleCoursePage t={t} lang={lang} />} />
                        <Route path={`${p}/videos`} element={<VideosPage t={t} lang={lang} />} />
                        <Route path={`${p}/shop`} element={<ShopPage t={t.shop_page} />} />
                        <Route path={`${p}/about`} element={<AboutPage t={t} lang={lang} />} />
                        <Route path={`${p}/contact`} element={<div className="pt-24 pb-20 max-w-4xl mx-auto px-4"><h1 className="text-3xl font-bold text-center mb-8">{t.contact.title}</h1><AppointmentForm t={t.appointment} /></div>} />
                        <Route path={`${p}/subscribe`} element={<SubscriptionPage t={t.subscription} />} />
                        <Route path={`${p}/student`} element={<StudentPortal t={t} lang={lang} />} />
                        <Route path={`${p}/professor-dashboard`} element={<ProfessorDashboard />} />
                        <Route path={`${p}/faq`} element={<div className="pt-24 max-w-3xl mx-auto px-4 pb-20"><h1 className="text-3xl font-bold mb-8">{t.faq.title}</h1>{t.faq.items.map((i, k) => (<div key={k} className="mb-4 p-4 bg-white rounded-lg shadow"><h3 className="font-bold text-[#003366]">{i.q}</h3><p>{i.a}</p></div>))}</div>} />
                        <Route path={`${p}/privacy`} element={<LegalPage content={t.privacy} homeLabel={t.nav.home} homeUrl={getLocalizedUrl('/', lang)} />} />
                        <Route path={`${p}/terms`} element={<LegalPage content={t.terms} homeLabel={t.nav.home} homeUrl={getLocalizedUrl('/', lang)} />} />
                        <Route path={`${p}/copyright-fair-use`} element={<LegalPage content={t.copyright} homeLabel={t.nav.home} homeUrl={getLocalizedUrl('/', lang)} />} />
                        <Route path={`${p}/verify`} element={<CertificateVerification lang={lang} />} />
                        <Route path={`${p}/payment-success`} element={<PaymentSuccess />} />
                     </React.Fragment>
                  );
               })}
            </Routes>
         </main>
         <Footer t={t.footer} lang={lang} />
         <Chatbot />
         <NewYearPopup />
      </div>
   );
}

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}
