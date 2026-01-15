
import React, { useState, useEffect } from 'react';
import { User, AttendanceData } from '../types';
import { 
  Users, Shield, ShieldOff, LogOut, Search, 
  CheckCircle, ChevronDown, Filter, Calendar, 
  Download, AlertTriangle, FileText
} from 'lucide-react';
import { getSession } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import { ASSETS } from '../constants';

const ProfessorDashboard: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourseCode, setSelectedCourseCode] = useState('INF-001');
  const [activeTab, setActiveTab] = useState<'students' | 'attendance'>('students');
  const [attendanceData, setAttendanceData] = useState<AttendanceData | null>(null);
  const [stats, setStats] = useState({ total: 0, active: 0, disabled: 0 });
  const navigate = useNavigate();
  const session = getSession();

  const courses = [
    { name: "Informatique", code: "INF-001" },
    { name: "Canva Mastery", code: "CAN-001" },
    { name: "WordPress", code: "WP-001" },
    { name: "Radio en Ligne", code: "RAD-001" },
    { name: "Réseaux Sociaux", code: "SOC-001" },
    { name: "Sublimation", code: "SUB-001" },
    { name: "Tableaux", code: "TAB-001" }
  ];

  useEffect(() => {
    if (!session || (session.role !== 'professor' && session.role !== 'admin')) {
      navigate('/student');
      return;
    }
    loadData();
  }, [session, navigate, selectedCourseCode]);

  const loadData = () => {
    try {
      const rawDb = localStorage.getItem("WA_DATABASE");
      const db = rawDb ? JSON.parse(rawDb) : [];
      const filtered = Array.isArray(db) ? db.filter((u: any) => u.role === 'student' && u.courseCode === selectedCourseCode) : [];
      setStudents(filtered);
      
      const active = filtered.filter((s: any) => s.access).length;
      setStats({
        total: filtered.length,
        active: active,
        disabled: filtered.length - active
      });

      if (selectedCourseCode === 'INF-001') {
        const rawAtt = localStorage.getItem("WA_ATTENDANCE_INF");
        if (rawAtt) setAttendanceData(JSON.parse(rawAtt));
      } else {
        setAttendanceData(null);
      }
    } catch (e) {
      console.error("Failed to load data", e);
    }
  };

  const toggleAccess = (code: string) => {
    const rawDb = localStorage.getItem("WA_DATABASE");
    const db = rawDb ? JSON.parse(rawDb) : [];
    const idx = db.findIndex((u: any) => u.accessCode === code);
    if (idx !== -1) {
      db[idx].access = !db[idx].access;
      localStorage.setItem("WA_DATABASE", JSON.stringify(db));
      loadData();
    }
  };

  const toggleAttendance = (studentCode: string, date: string, checked: boolean) => {
    if (selectedCourseCode !== 'INF-001') return;
    
    // Check payment logic (Mocked as true for Jan/Feb for now, except if WA_PAYMENTS exists)
    const rawPayments = localStorage.getItem("WA_PAYMENTS");
    const payments = rawPayments ? JSON.parse(rawPayments) : {};
    const month = new Date(date).toLocaleString('en-us', { month: 'short' });
    
    // If payments system is active, check if student paid for that month
    if (rawPayments && payments[studentCode] && payments[studentCode][month] === false) {
      alert(`❌ Payment for ${month} not found. Attendance locked.`);
      return;
    }

    const rawAtt = localStorage.getItem("WA_ATTENDANCE_INF");
    if (!rawAtt) return;
    const data: AttendanceData = JSON.parse(rawAtt);
    
    if (!data.records[studentCode]) data.records[studentCode] = {};
    data.records[studentCode][date] = checked;
    
    localStorage.setItem("WA_ATTENDANCE_INF", JSON.stringify(data));
    setAttendanceData(data);
  };

  const exportPDF = (student: any) => {
    if (!attendanceData) return;
    const doc = new jsPDF("landscape");
    
    const logo = new Image();
    logo.src = ASSETS.LOGO;
    logo.onload = () => {
      doc.addImage(logo, "PNG", 10, 10, 30, 30);
      doc.setFontSize(20);
      doc.setTextColor(0, 51, 102);
      doc.text("WANKY ACADEMY", 50, 25);
      doc.setFontSize(14);
      doc.text("Official Attendance Report", 50, 35);
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Student: ${student.name}`, 10, 55);
      doc.text(`Code: ${student.accessCode}`, 10, 65);
      doc.text(`Course: ${student.course}`, 10, 75);
      
      let y = 95;
      doc.setFontSize(10);
      attendanceData.days.forEach((date, i) => {
        const isPresent = attendanceData.records[student.accessCode]?.[date];
        doc.text(`${date}: ${isPresent ? "PRESENT" : "ABSENT"}`, 10 + (Math.floor(i/10) * 80), y + ((i % 10) * 8));
      });
      
      doc.save(`Attendance_${student.accessCode}.pdf`);
    };
  };

  const getAbsences = (studentCode: string) => {
    if (!attendanceData) return 0;
    const records = attendanceData.records[studentCode] || {};
    return attendanceData.days.filter(d => records[d] === false).length;
  };

  const handleLogout = () => {
    localStorage.removeItem("WA_SESSION");
    localStorage.removeItem("wa_logged_user");
    navigate('/student');
  };

  const filteredStudents = students.filter(s => 
    (s.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (s.accessCode || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50 px-4 font-body">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-[#003366] p-4 rounded-2xl text-white shadow-xl">
                <Users size={32} />
            </div>
            <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Management Portal</h1>
                <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">{session?.name} • {session?.role}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm">
             <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="flex gap-4 mb-8 border-b pb-4">
           <button onClick={() => setActiveTab('students')} className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'students' ? 'bg-[#003366] text-white' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>Students</button>
           <button onClick={() => setActiveTab('attendance')} className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'attendance' ? 'bg-[#003366] text-white' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>Attendance (INF)</button>
        </div>

        {activeTab === 'students' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
                    <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><Users /></div>
                    <div>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Total</p>
                        <p className="text-4xl font-black text-gray-800">{stats.total}</p>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
                    <div className="p-4 bg-green-50 text-green-600 rounded-2xl"><CheckCircle /></div>
                    <div>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Active</p>
                        <p className="text-4xl font-black text-gray-800">{stats.active}</p>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
                    <div className="p-4 bg-red-50 text-red-600 rounded-2xl"><ShieldOff /></div>
                    <div>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Disabled</p>
                        <p className="text-4xl font-black text-gray-800">{stats.disabled}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
                <div className="p-8 border-b border-gray-50 flex flex-col lg:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                        <div className="relative w-full sm:w-64 group">
                            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#003366] transition-colors" size={18} />
                            <select 
                                value={selectedCourseCode}
                                onChange={(e) => setSelectedCourseCode(e.target.value)}
                                className="w-full pl-12 pr-10 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-[#003366] focus:bg-white transition-all appearance-none font-black text-xs uppercase tracking-widest cursor-pointer"
                            >
                                {courses.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        </div>
                        <div className="relative w-full sm:w-80 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#003366] transition-colors" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search student..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-[#003366] focus:bg-white transition-all font-bold text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                            <tr>
                                <th className="p-8">Student Name</th>
                                <th className="p-8">Access Code</th>
                                <th className="p-8">Status</th>
                                <th className="p-8 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredStudents.map(student => (
                                <tr key={student.accessCode} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-8 font-black text-gray-800 text-lg">
                                       <div className="flex items-center gap-3">
                                          {student.name}
                                          {!student.editableName && <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border border-blue-100">Official</span>}
                                       </div>
                                    </td>
                                    <td className="p-8">
                                       <span className="font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 uppercase text-xs tracking-widest">{student.accessCode}</span>
                                    </td>
                                    <td className="p-8">
                                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${student.access ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {student.access ? <CheckCircle size={14} /> : <ShieldOff size={14} />}
                                            {student.access ? 'Active' : 'Disabled'}
                                        </span>
                                    </td>
                                    <td className="p-8 text-center">
                                        <button 
                                            onClick={() => toggleAccess(student.accessCode)}
                                            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm active:scale-95 ${student.access ? 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white' : 'bg-green-50 text-green-600 hover:bg-green-600 hover:text-white'}`}
                                        >
                                            {student.access ? 'Revoke' : 'Grant'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 p-8">
             <div className="flex justify-between items-center mb-10">
                <div>
                   <h2 className="text-2xl font-black text-[#003366]">Attendance Control: Informatique</h2>
                   <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Dec 2025 - Apr 2026 (Saturdays Only)</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-xl text-[10px] font-black flex items-center gap-2">
                       <AlertTriangle size={14} /> Warning if absences ≥ 3
                    </div>
                </div>
             </div>

             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                   <thead className="bg-gray-50 text-gray-400 text-[9px] font-black uppercase tracking-widest border-b">
                      <tr>
                         <th className="p-4 sticky left-0 bg-gray-50 z-10 min-w-[200px]">Student</th>
                         {attendanceData?.days.map(d => (
                            <th key={d} className="p-4 text-center min-w-[60px]">{d.split('-').slice(1).reverse().join('/')}</th>
                         ))}
                         <th className="p-4 text-center">% Rate</th>
                         <th className="p-4 text-center">Action</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y">
                      {students.map(student => {
                         const absences = getAbsences(student.accessCode);
                         const totalDays = attendanceData?.days.length || 1;
                         const presentCount = totalDays - absences;
                         const rate = Math.round((presentCount / totalDays) * 100);

                         return (
                            <tr key={student.accessCode} className="hover:bg-gray-50">
                               <td className="p-4 sticky left-0 bg-white z-10 border-r">
                                  <p className="font-bold text-gray-800 text-sm">{student.name}</p>
                                  <p className="text-[9px] font-mono text-gray-400 uppercase">{student.accessCode}</p>
                                  {absences >= 3 && (
                                    <span className="inline-flex items-center gap-1 text-[8px] font-black text-red-600 bg-red-50 px-2 py-0.5 rounded mt-1 uppercase border border-red-100">
                                       <AlertTriangle size={8} /> Absences Excessive
                                    </span>
                                  )}
                               </td>
                               {attendanceData?.days.map(date => (
                                  <td key={date} className="p-4 text-center">
                                     <input 
                                       type="checkbox" 
                                       className="w-5 h-5 rounded cursor-pointer accent-[#003366]"
                                       checked={attendanceData.records[student.accessCode]?.[date] || false}
                                       onChange={(e) => toggleAttendance(student.accessCode, date, e.target.checked)}
                                     />
                                  </td>
                               ))}
                               <td className="p-4 text-center">
                                  <div className="flex flex-col items-center">
                                     <span className={`font-black text-sm ${rate >= 70 ? 'text-green-600' : 'text-red-600'}`}>{rate}%</span>
                                     <div className="w-12 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                                        <div className={`h-full ${rate >= 70 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${rate}%` }}></div>
                                     </div>
                                  </div>
                               </td>
                               <td className="p-4 text-center">
                                  <button 
                                    onClick={() => exportPDF(student)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Export PDF Report"
                                  >
                                     <Download size={18} />
                                  </button>
                               </td>
                            </tr>
                         );
                      })}
                   </tbody>
                </table>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessorDashboard;
