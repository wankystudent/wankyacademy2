import React, { useState } from 'react';
import { Calendar, CheckCircle } from 'lucide-react';
import { TranslationDictionary } from '../types';
import { CONTACT_CONFIG, SERVICES_LIST, COLORS } from '../constants';

interface Props { t: TranslationDictionary['appointment']; }

const AppointmentForm: React.FC<Props> = ({ t }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: SERVICES_LIST[0], datetime: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('access_key', CONTACT_CONFIG.WEB3FORMS_ACCESS_KEY);
    Object.entries(formData).forEach(([key, value]) => data.append(key, value as string));
    
    await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
    setSubmitted(true);
  };

  const handleGoogleCalendar = () => {
    if (!formData.datetime) return alert('Select date first');
    const start = new Date(formData.datetime).toISOString().replace(/-|:|\.\d+/g, '');
    const end = new Date(new Date(formData.datetime).getTime() + 3600000).toISOString().replace(/-|:|\.\d+/g, '');
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wanky+Academy+Coaching&details=${formData.service}&dates=${start}/${end}`, '_blank');
  };

  if (submitted) return (
    <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-green-100">
       <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
       <h3 className="text-2xl font-bold text-gray-900">{t.success}</h3>
    </div>
  );

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4" style={{ borderColor: COLORS.NAVY }}>
      <h2 className="text-2xl font-bold mb-2 text-gray-900">{t.title}</h2>
      <p className="text-gray-600 mb-6">{t.subtitle}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input required name="name" placeholder={t.name} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          <input required name="email" type="email" placeholder={t.email} onChange={handleChange} className="w-full p-3 border rounded-lg" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <input name="phone" placeholder={t.phone} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          <select name="service" onChange={handleChange} className="w-full p-3 border rounded-lg bg-white">
            {SERVICES_LIST.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <input required name="datetime" type="datetime-local" onChange={handleChange} className="w-full p-3 border rounded-lg" />
        <textarea name="message" rows={4} placeholder={t.message} onChange={handleChange} className="w-full p-3 border rounded-lg"></textarea>
        <div className="flex gap-4">
          <button type="submit" className="flex-1 text-white font-bold py-3 rounded-lg hover:opacity-90 transition" style={{ backgroundColor: COLORS.NAVY }}>{t.submit}</button>
          <button type="button" onClick={handleGoogleCalendar} className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" /> {t.calendar_btn}
          </button>
        </div>
      </form>
    </div>
  );
};
export default AppointmentForm;