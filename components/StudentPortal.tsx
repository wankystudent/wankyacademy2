
import React, { useState, useEffect, useMemo } from 'react';
import { User, TranslationDictionary, Language, QuizHistoryItem, AttendanceData } from '../types';
import { COLORS, COURSES_DATA, ASSETS, CONTACT_CONFIG } from '../constants';
import { 
  UserCircle, LogOut, CreditCard, Moon, Sun, Save, 
  LayoutDashboard, Award, ArrowRight, CheckCircle, 
  Clock, Edit, ClipboardList, Lock, ShieldCheck,
  TrendingUp, Camera, Upload, Link as LinkIcon, Loader2,
  BarChart3, BookOpen, Calendar, DollarSign, HelpCircle,
  Shield, FileText, Info, Mail, ChevronRight, ExternalLink,
  MessageSquare, X, User as UserIcon, XCircle, AlertTriangle
} from 'lucide-react';
import IDGenerator from './IDGenerator';
import CertificateGenerator from './CertificateGenerator';
import { Link, useNavigate } from 'react-router-dom';
import { getLocalizedUrl } from '../services/translations';
import { initDatabase, getSession } from '../services/auth';

interface Props { t: TranslationDictionary; lang: Language; }

type FormType = 'email' | 'change_code' | 'insurance' | 'support' | null;

const StudentPortal: React.FC<Props> = ({ t, lang }) => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'login' | 'portal'>('login');
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [quizHistory, setQuizHistory] = useState<QuizHistoryItem[]>([]);
  const [attendance, setAttendance] = useState<AttendanceData | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [savingPhoto, setSavingPhoto] = useState(false);
  
  // Hidden Admin Access State
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  // Name Editing State
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState('');

  // Modal for Web3Forms
  const [activeForm, setActiveForm] = useState<FormType>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const navigate = useNavigate();

  useEffect(() => {
    initDatabase();
    const session = getSession();
    if (session) {
      if (session.role === 'professor' || session.role === 'admin') {
        navigate('/professor-dashboard');
      } else {
        setUser(session);
        setPhotoPreview(session.photo || null);
        setNewName(session.name);
        setView('portal');
        loadAttendance(session.accessCode!);
      }
    }
    const historyStr = localStorage.getItem('wanky_quiz_history') || localStorage.getItem('QUIZ_RESULTS');
    if (historyStr) {
      try { 
        setQuizHistory(JSON.parse(historyStr).reverse()); 
      } catch(e) {
        console.error("History parse error", e);
      }
    }
  }, [navigate]);

  const loadAttendance = (code: string) => {
    const rawAtt = localStorage.getItem("WA_ATTENDANCE_INF");
    if (rawAtt) setAttendance(JSON.parse(rawAtt));
  };

  const handleLogoClick = () => {
    const now = Date.now();
    if (now - lastClickTime > 5000) {
      setClickCount(1);
    } else {
      const newCount = clickCount + 1;
      setClickCount(newCount);
      if (newCount === 5) {
        const pin = prompt("🔐 ACCÈS ADMINISTRATION - Entrez le code PIN:");
        if (pin === "1999") {
          navigate('/professor-dashboard');
        } else {
          alert("Accès réservé à l’administration");
        }
        setClickCount(0);
      }
    }
    setLastClickTime(now);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return alert("Images only.");
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result as string);
      setPhotoUrl('');
    };
    reader.readAsDataURL(file);
  };

  const saveProfilePhoto = () => {
    const photoData = photoUrl || photoPreview;
    if (!photoData || !user) return;
    setSavingPhoto(true);
    try {
      const db: any[] = JSON.parse(localStorage.getItem("WA_DATABASE") || "[]");
      const session = JSON.parse(localStorage.getItem("WA_SESSION") || "{}");
      const idx = db.findIndex(u => u.accessCode === user.accessCode);
      if (idx !== -1) {
        db[idx].photo = photoData;
        session.photo = photoData;
        localStorage.setItem("WA_DATABASE", JSON.stringify(db));
        localStorage.setItem("WA_SESSION", JSON.stringify(session));
        localStorage.setItem("wa_logged_user", JSON.stringify(session));
        setUser(session);
        alert(lang === Language.ES ? "¡Foto guardada!" : "Photo saved!");
      }
    } finally { 
      setSavingPhoto(false); 
    }
  };

  const handleUpdateName = () => {
    if (!newName.trim() || !user || !user.editableName) return;
    
    try {
      const db: any[] = JSON.parse(localStorage.getItem("WA_DATABASE") || "[]");
      const session = JSON.parse(localStorage.getItem("WA_SESSION") || "{}");
      const idx = db.findIndex(u => u.accessCode === user.accessCode);
      
      if (idx !== -1) {
        const updatedName = newName.trim();
        db[idx].name = updatedName;
        session.name = updatedName;
        
        localStorage.setItem("WA_DATABASE", JSON.stringify(db));
        localStorage.setItem("WA_SESSION", JSON.stringify(session));
        localStorage.setItem("wa_logged_user", JSON.stringify(session));
        
        setUser(session);
        setIsEditingName(false);
      }
    } catch (e) {
      console.error("Error updating name", e);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const db: any[] = JSON.parse(localStorage.getItem("WA_DATABASE") || "[]");
    const found = db.find(u => u.accessCode === accessCode.toUpperCase().trim() && u.access);
    if (found) {
      const appUser: User = {
        ...found,
        idNumber: found.accessCode,
        joinedDate: found.createdAt || new Date().toISOString(),
        courses: found.course ? [found.course] : [],
        notes: found.notes || '',
        quizScores: found.quizScores || {}
      };
      localStorage.setItem("WA_SESSION", JSON.stringify(appUser));
      localStorage.setItem("wa_logged_user", JSON.stringify(appUser));
      setUser(appUser);
      setPhotoPreview(appUser.photo || null);
      setNewName(appUser.name);
      setView('portal');
      loadAttendance(appUser.accessCode!);
    } else {
      setError(lang === Language.ES ? "Acceso denegado. Código inválido." : 
              lang === Language.FR ? "Accès refusé. Code invalide." : "Access denied. Invalid code.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('WA_SESSION');
    localStorage.removeItem('wa_logged_user');
    setUser(null);
    setView('login');
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        setFormStatus('success');
        setTimeout(() => {
          setActiveForm(null);
          setFormStatus('idle');
        }, 3000);
      } else {
        alert("Submission failed. Please try again later.");
        setFormStatus('idle');
      }
    } catch (err) {
      alert("Error connecting to server.");
      setFormStatus('idle');
    }
  };

  const analytics = useMemo(() => {
    if (!quizHistory.length) return { total: 0, avg: 0, highest: 0, eligible: 0 };
    const scores = quizHistory.map(h => (h.total > 0 ? (h.score / h.total) * 100 : h.score) || 0);
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const eligible = COURSES_DATA.filter(c => (user?.quizScores?.[c.id] ?? 0) >= 70).length;
    return { 
      total: quizHistory.length, 
      avg: Math.round(avg), 
      highest: Math.round(Math.max(...scores)), 
      eligible 
    };
  }, [quizHistory, user]);

  const pt = t.student_portal;

  if (view === 'login') return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-gray-50 flex items-center justify-center font-body">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border-t-8 border-[#003366]">
        <div className="text-center mb-8">
          <ShieldCheck 
            className="w-16 h-16 text-[#003366] mx-auto mb-4 cursor-pointer active:scale-90 transition-transform" 
            onClick={handleLogoClick}
          />
          <h2 className="text-2xl font-bold">{lang === Language.ES ? 'Portal Estudiante' : lang === Language.FR ? 'Portail Étudiant' : 'Student Portal'}</h2>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="studentId" className="block text-sm font-semibold text-gray-700 text-center uppercase tracking-wider">
              {lang === Language.ES ? 'Ingrese su ID de Estudiante' : 
               lang === Language.FR ? 'Entrez votre identifiant étudiant' : 
               lang === Language.HT ? 'Mete ID Elèv ou' : 'Enter your Student ID'}
            </label>
            <input 
              id="studentId"
              type="text" 
              autoComplete="off"
              placeholder="•••••••••••" 
              className="w-full p-4 border rounded-2xl text-center font-mono text-lg focus:ring-2 focus:ring-[#003366] transition-all" 
              value={accessCode} 
              onChange={e => setAccessCode(e.target.value.toUpperCase())} 
              required 
            />
            <p className="text-[10px] text-gray-400 text-center italic">
              {lang === Language.ES ? 'Use el ID de Estudiante proporcionado por Wanky Academy.' : 
               lang === Language.FR ? 'Utilisez l\'identifiant fourni par Wanky Academy.' : 
               'Use the Student ID provided by Wanky Academy.'}
            </p>
          </div>
          {error && <p className="text-red-500 text-center font-bold text-sm bg-red-50 py-2 rounded-xl border border-red-100">{error}</p>}
          <button type="submit" className="w-full bg-[#003366] text-white py-4 rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg active:scale-[0.98]">
            {lang === Language.ES ? 'Entrar' : lang === Language.FR ? 'Se connecter' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen pt-20 font-body transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] overflow-hidden">
        {/* Sidebar */}
        <div className={`w-full lg:w-72 flex-shrink-0 flex flex-row lg:flex-col p-4 border-b lg:border-r overflow-x-auto lg:overflow-y-auto ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200 shadow-sm'}`}>
          <div className="flex lg:flex-col gap-2 w-full">
            <button onClick={() => setActiveTab('dashboard')} className={`flex-shrink-0 lg:w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'dashboard' ? 'bg-[#003366] text-white font-bold shadow-lg' : 'hover:bg-gray-100'}`}>
              <LayoutDashboard size={20} /> <span>{lang === Language.ES ? 'Tablero' : 'Dashboard'}</span>
            </button>
            <button onClick={() => setActiveTab('courses')} className={`flex-shrink-0 lg:w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'courses' ? 'bg-[#003366] text-white font-bold shadow-lg' : 'hover:bg-gray-100'}`}>
              <BookOpen size={20} /> <span>{pt.my_courses}</span>
            </button>
            <button onClick={() => setActiveTab('attendance')} className={`flex-shrink-0 lg:w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'attendance' ? 'bg-[#003366] text-white font-bold shadow-lg' : 'hover:bg-gray-100'}`}>
              <Calendar size={20} /> <span>Attendance</span>
            </button>
            <button onClick={() => setActiveTab('status')} className={`flex-shrink-0 lg:w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'status' ? 'bg-[#003366] text-white font-bold shadow-lg' : 'hover:bg-gray-100'}`}>
              <BarChart3 size={20} /> <span>{pt.academic_status}</span>
            </button>
            <button onClick={() => setActiveTab('assessments')} className={`flex-shrink-0 lg:w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'assessments' ? 'bg-[#003366] text-white font-bold shadow-lg' : 'hover:bg-gray-100'}`}>
              <ClipboardList size={20} /> <span>{pt.assessments}</span>
            </button>
            <button onClick={() => setActiveTab('certificates')} className={`flex-shrink-0 lg:w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'certificates' ? 'bg-[#003366] text-white font-bold shadow-lg' : 'hover:bg-gray-100'}`}>
              <Award size={20} /> <span>{lang === Language.ES ? 'Certificados' : 'Certificates'}</span>
            </button>
            <button onClick={() => setActiveTab('idcard')} className={`flex-shrink-0 lg:w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'idcard' ? 'bg-[#003366] text-white font-bold shadow-lg' : 'hover:bg-gray-100'}`}>
              <CreditCard size={20} /> <span>{t.dashboard.my_id}</span>
            </button>
            <button onClick={() => setActiveTab('services')} className={`flex-shrink-0 lg:w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'services' ? 'bg-[#003366] text-white font-bold shadow-lg' : 'hover:bg-gray-100'}`}>
              <HelpCircle size={20} /> <span>{pt.digital_services}</span>
            </button>
          </div>
          <div className="flex lg:flex-col gap-2 mt-auto p-2 border-t lg:border-0">
            <button onClick={() => setDarkMode(!darkMode)} className={`p-3 rounded-xl hover:bg-gray-100 flex items-center gap-3 w-full transition-colors ${darkMode ? 'text-yellow-400' : 'text-gray-600'}`}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />} <span>{t.dashboard.dark_mode}</span>
            </button>
            <button onClick={handleLogout} className="p-3 rounded-xl text-red-500 flex items-center gap-3 hover:bg-red-50 w-full transition-colors">
              <LogOut size={20} /> <span>{t.auth.logout}</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-10 scroll-smooth">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
            <div>
              <div className="flex items-center gap-3">
                 <img 
                    src={ASSETS.LOGO} 
                    className="h-10 w-auto cursor-pointer active:scale-95" 
                    onClick={handleLogoClick}
                    alt="Logo"
                 />
                 <h1 className="text-3xl font-black text-[#003366] tracking-tight">
                   {lang === Language.ES ? `¡Bienvenido, ${user?.name}!` : `Welcome back, ${user?.name}!`} 👋
                 </h1>
                 {user?.editableName && (
                    <button 
                      onClick={() => setIsEditingName(!isEditingName)}
                      className="p-2 bg-gray-100 text-gray-500 rounded-full hover:bg-[#003366] hover:text-white transition-all shadow-sm"
                      title="Modifier mon nom"
                    >
                      <Edit size={16} />
                    </button>
                 )}
              </div>
              <div className="flex items-center gap-2 mt-1 ml-12">
                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">{user?.role}</span>
                <p className="text-gray-500 font-medium text-sm">{user?.course || 'Student'} • {user?.accessCode}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
               <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{lang === Language.ES ? 'ÚLTIMO ACCESO' : 'LAST ACCESS'}</p>
                  <p className="text-sm font-bold text-gray-700">{new Date().toLocaleDateString()}</p>
               </div>
               <div className="w-16 h-16 rounded-2xl border-4 border-white overflow-hidden bg-gray-100 flex items-center justify-center shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                 {user?.photo ? (
                   <img src={user.photo} className="w-full h-full object-cover" alt="Profile" />
                 ) : (
                   <UserCircle className="text-gray-300 w-full h-full p-1" />
                 )}
               </div>
            </div>
          </header>

          {/* DASHBOARD SUMMARY TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Active Course Card (Academic Program) */}
                <div className="lg:col-span-2 bg-gradient-to-br from-[#003366] to-[#0056FF] rounded-[2.5rem] p-10 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-40 -mt-40 blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
                  <div className="relative z-10 max-w-lg">
                    <span className="bg-yellow-400 text-[#003366] px-4 py-1.5 rounded-full text-[10px] font-black uppercase mb-6 inline-block shadow-lg border border-yellow-500">
                        {pt.academic_program}
                    </span>
                    <h2 className="text-4xl font-black mb-2 tracking-tight">{user?.course || 'Informatique'}</h2>
                    <p className="text-blue-100 font-medium mb-10 text-lg opacity-90 leading-relaxed">
                        {lang === Language.ES ? 'Te damos la bienvenida a tu portal académico. Aquí puedes gestionar tu aprendizaje.' : 'Welcome to your academic portal. Manage your learning journey here.'}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button onClick={() => setActiveTab('courses')} className="bg-white text-[#003366] px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all inline-flex items-center gap-2 shadow-2xl">
                        {lang === Language.ES ? 'MIS CURSOS' : 'MY COURSES'} <ArrowRight size={20} />
                      </button>
                      <button onClick={() => setActiveTab('idcard')} className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-2xl font-black hover:bg-white/20 transition-all inline-flex items-center gap-2">
                        {lang === Language.ES ? 'MI CARNET' : 'MY ID'} <CreditCard size={20} />
                      </button>
                    </div>
                  </div>
                  <BookOpen size={220} className="text-white/10 absolute right-[-20px] bottom-[-20px] transform -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                </div>

                {/* Profile Settings (Quick Access) */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl text-center flex flex-col items-center justify-center group hover:border-[#003366]/20 transition-colors">
                  <div className="relative mb-8">
                    <div className="w-32 h-32 rounded-[2.5rem] border-4 border-yellow-400 overflow-hidden bg-gray-50 flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-transform">
                      {photoPreview ? <img src={photoPreview} className="w-full h-full object-cover" /> : <Camera className="w-12 h-12 text-gray-300" />}
                    </div>
                    <label className="absolute -bottom-2 -right-2 bg-[#003366] text-white p-3.5 rounded-2xl cursor-pointer hover:scale-110 transition-all shadow-2xl hover:bg-[#0056FF]">
                      <Upload size={20} /><input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                    </label>
                  </div>
                  <div className="w-full space-y-4">
                    {/* Name Edit Form */}
                    {isEditingName && user?.editableName && (
                       <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 mb-2 animate-in slide-in-from-top-2 duration-300">
                          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 text-left">Modifier mon nom</p>
                          <div className="flex gap-2">
                             <input 
                               type="text" 
                               value={newName}
                               onChange={e => setNewName(e.target.value)}
                               className="flex-1 px-3 py-2 bg-white border rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#003366]"
                               placeholder="Nouveau nom..."
                             />
                             <button 
                               onClick={handleUpdateName}
                               className="bg-green-500 text-white p-2 rounded-xl hover:bg-green-600 transition-colors shadow-md"
                             >
                               <Save size={16} />
                             </button>
                          </div>
                       </div>
                    )}

                    <div className="relative group/input">
                       <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-[#0056FF] transition-colors" size={18} />
                       <input 
                         type="text" 
                         placeholder="Image URL..." 
                         value={photoUrl} 
                         onChange={e => { setPhotoUrl(e.target.value); if(e.target.value) setPhotoPreview(e.target.value); }} 
                         className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-[1.5rem] text-sm outline-none focus:border-[#0056FF] focus:bg-white transition-all shadow-inner" 
                       />
                    </div>
                    <button onClick={saveProfilePhoto} disabled={savingPhoto} className="w-full bg-[#003366] text-white py-4 rounded-[1.5rem] font-black text-sm flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg hover:shadow-2xl hover:bg-[#002244] transition-all transform active:scale-95">
                      {savingPhoto ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />} {lang === Language.ES ? 'Guardar Foto' : 'Save Profile'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Overview Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: lang === Language.ES ? 'PRUEBAS' : 'QUIZZES', val: analytics.total, color: 'text-gray-800' },
                  { label: lang === Language.ES ? 'PROMEDIO' : 'AVERAGE', val: `${analytics.avg}%`, color: 'text-blue-600' },
                  { label: lang === Language.ES ? 'MEJOR' : 'BEST', val: `${analytics.highest}%`, color: 'text-green-600' },
                  { label: lang === Language.ES ? 'CERTIFICADOS' : 'CERTIFICATES', val: analytics.eligible, color: 'text-yellow-600' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                    <p className={`text-4xl font-black ${stat.color}`}>{stat.val}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ATTENDANCE TAB (READ ONLY) */}
          {activeTab === 'attendance' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h2 className="text-3xl font-black text-[#003366] tracking-tight">Attendance Record</h2>
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl">
                   <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-blue-50 text-[#003366] rounded-2xl flex items-center justify-center"><Calendar /></div>
                         <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">COURSE</p>
                            <p className="font-black text-gray-800">{user?.course || 'Informatique'}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">STATUS</p>
                         <p className="font-black text-green-600 uppercase">Registered</p>
                      </div>
                   </div>

                   {attendance ? (
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {attendance.days.map(date => {
                          const isPresent = attendance.records[user?.accessCode!]?.[date];
                          return (
                            <div key={date} className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all ${isPresent ? 'bg-green-50 border-green-100 text-green-700' : isPresent === false ? 'bg-red-50 border-red-100 text-red-700' : 'bg-gray-50 border-gray-100 text-gray-400 opacity-40'}`}>
                               <p className="text-[9px] font-black uppercase mb-1">{date.split('-').slice(1).reverse().join('/')}</p>
                               {isPresent ? <CheckCircle size={24} /> : isPresent === false ? <XCircle size={24} /> : <Clock size={24} />}
                               <p className="text-[8px] font-black uppercase mt-2">{isPresent ? 'Present' : isPresent === false ? 'Absent' : 'Pending'}</p>
                            </div>
                          );
                        })}
                     </div>
                   ) : (
                     <div className="p-12 text-center text-gray-400 font-bold">No attendance records found for this course.</div>
                   )}

                   <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                      <h4 className="font-black text-[#003366] text-sm uppercase mb-4 flex items-center gap-2"><Info size={16} /> Academic Rules</h4>
                      <ul className="text-xs text-gray-500 space-y-2">
                         <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> Attendance is recorded every Saturday.</li>
                         <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" /> 70% minimum attendance is required for certificate eligibility.</li>
                         <li className="flex items-center gap-2"><AlertTriangle size={14} className="text-yellow-500" /> 3 consecutive absences may lead to account suspension.</li>
                      </ul>
                   </div>
                </div>
            </div>
          )}

          {/* MY COURSES TAB */}
          {activeTab === 'courses' && (
            <div className="space-y-10 animate-in slide-in-from-left-4 duration-700">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                 <h2 className="text-3xl font-black text-[#003366] tracking-tight">{pt.my_courses}</h2>
                 <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-2xl border border-blue-100">
                    <TrendingUp size={16} className="text-blue-600" />
                    <span className="text-xs font-black text-[#003366] uppercase">{analytics.avg}% Overall Progress</span>
                 </div>
               </div>

               <div className="grid md:grid-cols-2 gap-8">
                  {COURSES_DATA.map(course => {
                    const score = user?.quizScores?.[course.id] || 0;
                    const isCompleted = score >= 70;
                    
                    return (
                      <div key={course.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-lg hover:shadow-2xl transition-all group flex flex-col justify-between">
                         <div>
                            <div className="flex justify-between items-start mb-6">
                               <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                                 {course.id.includes('wp') ? '🌐' : course.id.includes('canva') ? '🎨' : '💻'}
                               </div>
                               <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${isCompleted ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
                                  {isCompleted ? (lang === Language.ES ? 'COMPLETADO' : 'COMPLETED') : (lang === Language.ES ? 'EN CURSO' : 'IN PROGRESS')}
                               </span>
                            </div>
                            <h3 className="text-2xl font-black text-gray-800 mb-3 tracking-tight group-hover:text-[#003366] transition-colors">{course.title}</h3>
                            <p className="text-gray-500 text-sm mb-8 leading-relaxed line-clamp-2">{course.description}</p>
                            
                            {/* Progress Bar */}
                            <div className="mb-10">
                              <div className="flex justify-between items-end mb-2">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{lang === Language.ES ? 'PROGRESO' : 'PROGRESS'}</span>
                                <span className="text-sm font-black text-[#003366]">{score}%</span>
                              </div>
                              <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
                                <div 
                                  className={`h-full transition-all duration-1000 ease-out ${isCompleted ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-[#003366] shadow-[0_0_10px_rgba(0,51,102,0.3)]'}`} 
                                  style={{ width: `${Math.max(5, score)}%` }}
                                ></div>
                              </div>
                            </div>
                         </div>
                         
                         <button 
                            onClick={() => navigate(getLocalizedUrl(`/course/${course.id}`, lang))}
                            className={`w-full py-4 rounded-[1.25rem] font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${isCompleted ? 'bg-green-50 text-green-700 hover:bg-green-100' : 'bg-[#003366] text-white hover:bg-[#002244] shadow-xl hover:shadow-2xl'}`}
                          >
                            {lang === Language.ES ? 'REANUDAR CURSO' : 'RESUME COURSE'} <ArrowRight size={18} />
                         </button>
                      </div>
                    );
                  })}
               </div>
            </div>
          )}

          {/* ACADEMIC STATUS TAB */}
          {activeTab === 'status' && (
            <div className="space-y-10 animate-in slide-in-from-right-4 duration-700">
              <h2 className="text-3xl font-black text-[#003366] tracking-tight">{pt.academic_status}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { label: pt.enrolled_subjects, value: user?.course || 'Informatique', icon: <BookOpen className="text-blue-500" />, status: pt.active, count: COURSES_DATA.length.toString() },
                  { label: pt.pending_subjects, value: '—', icon: <Clock className="text-gray-400" />, status: 'N/A' },
                  { label: pt.grades, value: `${analytics.avg}%`, icon: <BarChart3 className="text-green-500" />, sub: `Best: ${analytics.highest}%` },
                  { label: pt.schedule, value: pt.coming_soon, icon: <Calendar className="text-purple-500" /> },
                  { label: pt.account_status, value: pt.active, icon: <ShieldCheck className="text-green-600" />, status: 'Verified' },
                  { label: pt.withdrawal, value: pt.active, icon: <LogOut className="text-red-500" />, action: true },
                ].map((item, i) => (
                   <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl hover:shadow-2xl transition-all group hover:-translate-y-2">
                      <div className="flex justify-between items-start mb-8">
                         <div className="p-5 bg-gray-50 rounded-2xl group-hover:bg-[#003366] group-hover:text-white transition-colors shadow-sm">{item.icon}</div>
                         {item.count && <span className="bg-[#003366] text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg tracking-widest">{item.count}</span>}
                      </div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">{item.label}</p>
                      <p className="text-2xl font-black text-gray-800 mb-6 tracking-tight">{item.value}</p>
                      <div className="flex items-center gap-2">
                        {item.status && <span className="text-[10px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-lg uppercase border border-green-100">{item.status}</span>}
                        {item.sub && <p className="text-xs font-bold text-gray-400">{item.sub}</p>}
                      </div>
                   </div>
                ))}
              </div>
            </div>
          )}

          {/* ASSESSMENTS TAB (QUIZZES) */}
          {activeTab === 'assessments' && (
            <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <h2 className="text-3xl font-black text-[#003366] tracking-tight">{pt.assessments}</h2>
                  <div className="bg-green-50 px-8 py-4 rounded-3xl border border-green-100 shadow-sm flex items-center gap-4">
                     <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-green-600"><TrendingUp /></div>
                     <div>
                       <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-0.5">{pt.performance_analytics}</p>
                       <p className="text-2xl font-black text-[#003366]">{analytics.avg}% Avg</p>
                     </div>
                  </div>
               </div>

               <div className="grid lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2 space-y-6">
                     {quizHistory.length === 0 ? (
                       <div className="bg-white p-24 rounded-[3.5rem] text-center border-4 border-dashed border-gray-100 shadow-inner">
                          <ClipboardList size={80} className="mx-auto text-gray-100 mb-8" />
                          <p className="text-2xl font-black text-gray-300 tracking-tight">No attempts yet.<br/>Start a course to see results.</p>
                       </div>
                     ) : (
                       <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
                          <table className="w-full text-left">
                             <thead className="bg-gray-50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                                <tr>
                                   <th className="p-8">COURSE</th>
                                   <th className="p-8">SCORE</th>
                                   <th className="p-8 text-right">STATUS</th>
                                </tr>
                             </thead>
                             <tbody className="divide-y divide-gray-50">
                                {quizHistory.map((h, i) => {
                                   const p = Math.round((h.score / h.total) * 100);
                                   return (
                                     <tr key={i} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-8">
                                           <p className="font-black text-gray-800 text-lg tracking-tight mb-1">{h.course_title}</p>
                                           <div className="flex items-center gap-2">
                                              <Calendar size={12} className="text-gray-300" />
                                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{new Date(h.date).toLocaleDateString()}</p>
                                           </div>
                                        </td>
                                        <td className="p-8">
                                           <div className="flex flex-col gap-2 w-32">
                                              <div className="flex justify-between items-end"><span className="text-xl font-black text-[#003366]">{p}%</span></div>
                                              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                                                 <div className={`h-full transition-all duration-1000 ${p >= 70 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${p}%` }}></div>
                                              </div>
                                           </div>
                                        </td>
                                        <td className="p-8 text-right">
                                           <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] shadow-sm border ${p >= 70 ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                                              {p >= 70 ? 'Passed' : 'Failed'}
                                           </span>
                                        </td>
                                     </tr>
                                   );
                                })}
                             </tbody>
                          </table>
                       </div>
                     )}
                  </div>
                  <div className="space-y-8">
                     <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-10 rounded-[3rem] text-[#003366] shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-20 transform group-hover:scale-125 transition-transform"><Award size={140} /></div>
                        <h3 className="text-3xl font-black mb-2 tracking-tight">{pt.certificates_available}</h3>
                        <p className="font-bold text-yellow-100 mb-10 opacity-90 leading-relaxed">{lang === Language.ES ? 'Obtén más del 70% para certificar tu talento.' : 'Score above 70% to certify your talent.'}</p>
                        <div className="flex items-baseline gap-2">
                           <p className="text-8xl font-black tracking-tighter">{analytics.eligible}</p>
                           <p className="text-xl font-black opacity-60">/{COURSES_DATA.length}</p>
                        </div>
                        <button onClick={() => setActiveTab('certificates')} className="mt-10 bg-white text-[#003366] hover:bg-[#003366] hover:text-white transition-all p-5 rounded-[1.5rem] w-full font-black text-xs uppercase tracking-[0.2em] shadow-xl transform active:scale-95">
                           {lang === Language.ES ? 'RECLAMAR MIS CERTIFICADOS' : 'CLAIM MY CERTIFICATES'}
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* CERTIFICATES TAB */}
          {activeTab === 'certificates' && (
            <div className="space-y-10 animate-in slide-in-from-right-4 duration-700">
               <h2 className="text-3xl font-black text-[#003366] tracking-tight mb-10">{lang === Language.ES ? 'Mis Certificados' : 'My Certificates'}</h2>
               <div className="grid md:grid-cols-2 gap-10">
                  {COURSES_DATA.map(c => (
                     <div key={c.id} className="hover:-translate-y-2 transition-transform duration-300">
                        <CertificateGenerator 
                          user={user!} 
                          courseName={c.title} 
                          courseId={c.id} 
                          completionDate={new Date().toLocaleDateString()} 
                          lang={lang as any} 
                        />
                     </div>
                  ))}
               </div>
            </div>
          )}

          {/* ID CARD TAB */}
          {activeTab === 'idcard' && user && (
            <div className="animate-in zoom-in-95 duration-700">
              <IDGenerator user={user} t={t.id_card} lang={lang} />
            </div>
          )}

          {/* SERVICES TAB */}
          {activeTab === 'services' && (
            <div className="space-y-10 animate-in slide-in-from-left-4 duration-700">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                 <h2 className="text-3xl font-black text-[#003366] tracking-tight">{pt.digital_services}</h2>
               </div>
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { id: 'email', title: pt.institutional_email, desc: 'Official professional email @wankyacademy.com with Outlook and OneDrive access.', icon: <Mail size={24}/>, color: 'bg-blue-50 text-blue-600', action: 'Apply' },
                    { id: 'guide', title: pt.info_guide, desc: 'Official student information guide: Rules, certificates, support, and assistance.', icon: <FileText size={24}/>, color: 'bg-yellow-50 text-yellow-600', action: 'Read', isDirect: true, link: 'https://wa.me/18296209249?text=Hola%20Wanky%20Academy' },
                    { id: 'change_code', title: pt.change_access_code, desc: 'Securely request a change if you believe your access code is compromised.', icon: <Edit size={24}/>, color: 'bg-purple-50 text-purple-600', action: 'Request Change' },
                    { id: 'insurance', title: pt.accident_insurance, desc: 'Optional basic accident protection program for students.', icon: <Shield size={24}/>, color: 'bg-red-50 text-red-600', action: 'Request Details' },
                    { id: 'support', title: pt.online_assistance, desc: 'Direct technical or academic support for students.', icon: <MessageSquare size={24}/>, color: 'bg-green-50 text-green-600', action: 'Contact Support' }
                  ].map((service, i) => (
                    <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl hover:shadow-2xl transition-all group flex flex-col justify-between hover:-translate-y-2">
                       <div>
                          <div className={`p-5 rounded-2xl inline-block mb-8 ${service.color} group-hover:scale-110 transition-transform shadow-sm`}>{service.icon}</div>
                          <h3 className="text-2xl font-black text-gray-800 mb-3 tracking-tight">{service.title}</h3>
                          <p className="text-gray-500 font-medium mb-10 text-sm leading-relaxed">{service.desc}</p>
                       </div>
                       {service.isDirect ? (
                         <a href={service.link} target="_blank" className="bg-gray-50 text-gray-800 p-5 rounded-[1.25rem] font-black text-xs uppercase tracking-[0.2em] text-center group-hover:bg-[#003366] group-hover:text-white transition-all transform active:scale-95 shadow-sm">
                           {service.action}
                         </a>
                       ) : (
                         <button 
                           onClick={() => setActiveForm(service.id as FormType)}
                           className="bg-gray-50 text-gray-800 p-5 rounded-[1.25rem] font-black text-xs uppercase tracking-[0.2em] text-center group-hover:bg-[#003366] group-hover:text-white transition-all transform active:scale-95 shadow-sm"
                         >
                           {service.action}
                         </button>
                       )}
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>
      </div>

      {/* WEB3FORMS MODAL */}
      {activeForm && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setActiveForm(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400"
            >
              <X size={24} />
            </button>
            
            {formStatus === 'success' ? (
              <div className="p-16 text-center">
                 <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} />
                 </div>
                 <h2 className="text-3xl font-black text-gray-900 mb-2">Request Sent!</h2>
                 <p className="text-gray-500">We will process your request shortly. Check your email for updates.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="p-10 space-y-6">
                 <input type="hidden" name="access_key" value={CONTACT_CONFIG.WEB3FORMS_ACCESS_KEY} />
                 <input type="hidden" name="from_name" value="Wanky Academy Student Portal" />
                 <input type="hidden" name="subject" value={`📩 Student Request (${activeForm}) – Wanky Academy`} />
                 
                 <div className="mb-4">
                   <h2 className="text-2xl font-black text-[#003366] tracking-tight">
                     {activeForm === 'email' && 'Apply for Institutional Email'}
                     {activeForm === 'change_code' && 'Request Access Code Change'}
                     {activeForm === 'insurance' && 'Personal Accident Insurance Request'}
                     {activeForm === 'support' && 'Contact Online Support'}
                   </h2>
                   <p className="text-sm text-gray-500">Please fill out the form below to proceed.</p>
                 </div>

                 <div className="grid md:grid-cols-2 gap-4">
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                      <input name="name" defaultValue={user?.name} required className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-[#003366]" />
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</label>
                      <input name="email" defaultValue={user?.email} required type="email" className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-[#003366]" />
                   </div>
                 </div>

                 <div className="grid md:grid-cols-2 gap-4">
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Code</label>
                      <input name="student_code" defaultValue={user?.accessCode} required className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-[#003366]" />
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Course</label>
                      <input name="course" defaultValue={user?.course} required className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-[#003366]" />
                   </div>
                 </div>

                 <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      {activeForm === 'change_code' ? 'Reason for change' : 'Message (Optional)'}
                    </label>
                    <textarea name="message" rows={4} className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-[#003366] resize-none" />
                 </div>

                 {activeForm === 'insurance' && (
                   <div className="bg-blue-50 p-4 rounded-2xl text-xs space-y-2">
                     <p className="font-bold text-[#003366]">Static Info:</p>
                     <p>📧 Email: seguro@wankyacademy.com</p>
                     <p>💳 Payment options: PayPal / Stripe (Available in dashboard)</p>
                   </div>
                 )}

                 <button 
                   type="submit" 
                   disabled={formStatus === 'sending'}
                   className="w-full bg-[#003366] text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                 >
                   {formStatus === 'sending' ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                   Submit Request
                 </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPortal;
