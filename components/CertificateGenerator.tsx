
import React, { useRef, useState, useEffect, useMemo } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { User, StoredCertificate } from '../types';
import { ASSETS } from '../constants';
import { Download, Loader2, Lock } from 'lucide-react';
import { saveCertificateToFirebase } from '../services/firebase';

interface Props { 
  user: User; 
  courseName: string;
  courseId: string;
  completionDate: string;
  lang?: 'en' | 'es' | 'fr' | 'ht';
}

const CertificateGenerator: React.FC<Props> = ({ user, courseName, courseId, completionDate, lang = 'en' }) => {
  const certRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [certId, setCertId] = useState('');
  const currentScore = user?.quizScores?.[courseId] ?? 0;
  const isUnlocked = currentScore >= 70;

  useEffect(() => {
    const randomPart = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    setCertId(`WA-CERT-${new Date().getFullYear()}-${randomPart}`);
  }, [courseId]);

  const labels = {
    title: lang === 'es' ? 'Certificado' : 'Certificate',
    subtitle: lang === 'es' ? 'de Finalización' : 'of Completion',
    thisCertifies: lang === 'es' ? 'Esto certifica que' : 'This certifies that',
    completed: lang === 'es' ? 'ha completado con éxito el curso' : 'has successfully completed the course',
    issueDate: lang === 'es' ? 'Fecha de Emisión' : 'Issue Date',
    studentId: lang === 'es' ? 'ID del Estudiante' : 'Student ID',
    certId: lang === 'es' ? 'ID de Certificado' : 'Certificate ID',
    download: lang === 'es' ? 'Descargar PDF' : 'Download PDF',
    locked: lang === 'es' ? 'Bloqueado (Mínimo 70%)' : 'Locked (Minimum 70%)'
  };

  const downloadPDF = async () => {
    if (!certRef.current || isGenerating || !isUnlocked) return;
    setIsGenerating(true);
    try {
      await new Promise(r => requestAnimationFrame(r));
      const canvas = await html2canvas(certRef.current, { scale: 3, useCORS: true, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'in', format: [11, 14] });
      pdf.addImage(imgData, 'PNG', 0.5, 0.5, 10, 13);
      pdf.save(`Certificate-${user.accessCode || 'STUDENT'}-${courseId}.pdf`);
      saveCertificateToFirebase({ certId, student: user.name, course: courseName, level: 'Professional', issueDate: completionDate, hash: '', createdAt: new Date().toISOString() }).catch(() => {});
    } catch (err) {
      console.error(err);
      alert("Error generating PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://wankyacademy.com/verify?cid=${certId}`;

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-bold text-gray-900">{courseName}</div>
          <div className="text-xs text-gray-500">Score: {currentScore}%</div>
        </div>
        <button onClick={downloadPDF} disabled={!isUnlocked || isGenerating} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-bold text-sm transition ${isUnlocked ? 'bg-[#003366] hover:bg-[#002244]' : 'bg-gray-400'}`}>
          {isGenerating ? <Loader2 size={14} className="animate-spin" /> : isUnlocked ? <Download size={14} /> : <Lock size={14} />}
          {isUnlocked ? labels.download : labels.locked}
        </button>
      </div>
      <div className="fixed -left-[9999px]">
        <div ref={certRef} className="bg-white text-center p-16 border-[12px] border-double border-[#003366]" style={{ width: '1056px', height: '1344px', minWidth: '1056px', minHeight: '1344px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <img src={ASSETS.LOGO} alt="Logo" className="w-32 h-32 mx-auto mb-6 object-contain" />
            <h1 className="text-7xl font-serif text-[#003366] mb-4 uppercase tracking-[0.2em] font-bold">{labels.title}</h1>
            <p className="text-3xl text-yellow-500 font-bold uppercase tracking-widest">{labels.subtitle}</p>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-12">
            <div>
              <p className="text-3xl text-gray-500 italic font-serif">{labels.thisCertifies}</p>
              <h2 className="text-6xl font-bold text-[#003366] border-b-2 border-gray-300 pb-4 inline-block px-12 font-serif">{user.name}</h2>
            </div>
            <div>
              <p className="text-3xl text-gray-500 italic font-serif">{labels.completed}</p>
              <h3 className="text-5xl font-bold text-gray-800 uppercase tracking-wide px-4">{courseName}</h3>
            </div>
          </div>
          <div className="flex flex-col items-center gap-6">
            <img src={qrUrl} className="w-32 h-32" alt="Verify" />
            <div className="flex flex-col items-center">
              <img src={ASSETS.SIGNATURE} className="h-24 object-contain" alt="Sign" />
              <div className="h-0.5 w-80 bg-[#003366] mt-1" />
              <p className="font-bold text-2xl text-[#003366] font-serif">Director: Wanky Massenat</p>
            </div>
            <div className="text-base text-gray-600">
              <p><b>{labels.issueDate}:</b> {completionDate}</p>
              <p><b>{labels.studentId}:</b> {user.accessCode || user.idNumber}</p>
              <p><b>{labels.certId}:</b> {certId}</p>
            </div>
            <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">Official Document • Wanky Academy • wankyacademy.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CertificateGenerator;
