
import React, { useState } from 'react';
import { TranslationDictionary } from '../types';
import { COLORS, CONTACT_CONFIG } from '../constants';
import { CheckCircle, Mail, Phone, BookOpen, Star, Globe, Award, Loader2, CreditCard, Calendar } from 'lucide-react';

interface Props {
  t: TranslationDictionary['subscription'];
}

const SubscriptionPage: React.FC<Props> = ({ t }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    startDate: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [paymentLoading, setPaymentLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    const data = new FormData();
    data.append('access_key', CONTACT_CONFIG.WEB3FORMS_ACCESS_KEY);
    data.append('subject', '📥 New Course Enrollment Request - Wanky Academy');
    data.append('full_name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('course', formData.course);
    data.append('preferred_start_date', formData.startDate);
    data.append('message', formData.message);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', course: '', startDate: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const handleStripePayment = async () => {
    if (!formData.course) {
        alert("Please select a course first.");
        return;
    }
    
    setPaymentLoading(true);
    try {
      // Extract ID from parenthesis if present, e.g. "Informatique (INF-001)" -> "INF-001"
      const match = formData.course.match(/\((.*?)\)/);
      const courseId = match ? match[1] : 'canva-mastery';

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: courseId })
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to initiate payment. Please make sure the server is running.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Error connecting to payment server.");
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
           <h1 className="text-4xl md:text-5xl font-bold text-[#003366] mb-4">{t.title}</h1>
           <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">{t.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
           
           {/* Left Column: Info & Why Us */}
           <div className="space-y-8">
              <div className="bg-[#003366] text-white p-8 rounded-2xl shadow-xl">
                 <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                   <Star className="w-6 h-6 text-[#FFD700]" /> {t.why_us.title}
                 </h2>
                 <div className="space-y-6">
                    {t.why_us.items.map((item, idx) => (
                       <div key={idx} className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-[#FFD700]">
                             {idx === 0 && <BookOpen className="w-5 h-5" />}
                             {idx === 1 && <Star className="w-5 h-5" />}
                             {idx === 2 && <Globe className="w-5 h-5" />}
                             {idx === 3 && <Award className="w-5 h-5" />}
                          </div>
                          <div>
                             <h3 className="font-bold text-lg">{item.title}</h3>
                             <p className="text-blue-100 text-sm">{item.desc}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">{t.contact_box.title}</h3>
                  <div className="space-y-4">
                     <a href={CONTACT_CONFIG.PHONE ? `https://wa.me/${CONTACT_CONFIG.PHONE.replace(/\D/g,'')}` : '#'} target="_blank" className="flex items-center gap-3 p-4 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition">
                        <Phone className="w-5 h-5" />
                        <span className="font-bold">{t.contact_box.whatsapp}: {CONTACT_CONFIG.PHONE}</span>
                     </a>
                     <a href={`mailto:${CONTACT_CONFIG.EMAIL}`} className="flex items-center gap-3 p-4 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition">
                        <Mail className="w-5 h-5" />
                        <span className="font-bold">{t.contact_box.email}: {CONTACT_CONFIG.EMAIL}</span>
                     </a>
                  </div>
              </div>
           </div>

           {/* Right Column: Form */}
           <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border-t-8 border-[#FFD700]">
              <h2 className="text-2xl font-bold text-[#003366] text-center mb-6">
                🎓 Course Enrollment
              </h2>

              {status === 'success' ? (
                <div className="text-center py-12">
                   <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10" />
                   </div>
                   <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.form.success_msg}</h3>
                   <p className="text-gray-500">We have received your enrollment request. We will contact you shortly.</p>
                   <button onClick={() => setStatus('idle')} className="mt-8 text-[#003366] font-bold hover:underline">Submit another request</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                   {/* Full Name */}
                   <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">{t.form.name} <span className="text-red-500">*</span></label>
                      <input 
                        required 
                        type="text" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#003366] focus:border-transparent outline-none transition"
                        placeholder="Your full name"
                      />
                   </div>
                   
                   <div className="grid md:grid-cols-2 gap-5">
                      {/* Email */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t.form.email} <span className="text-red-500">*</span></label>
                        <input 
                            required 
                            type="email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#003366] focus:border-transparent outline-none transition"
                            placeholder="your@email.com"
                        />
                      </div>
                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{t.form.phone}</label>
                        <input 
                            type="tel" 
                            name="phone" 
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#003366] focus:border-transparent outline-none transition"
                            placeholder="+1 829 000 0000"
                        />
                      </div>
                   </div>

                   {/* Course Selection */}
                   <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">{t.form.course} <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select 
                            required 
                            name="course" 
                            value={formData.course}
                            onChange={handleChange}
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#003366] focus:border-transparent outline-none transition appearance-none"
                        >
                            <option value="">-- Select a course --</option>
                            <option value="Informatique (INF-001)">Informatique (INF-001)</option>
                            <option value="Canva Mastery (CAN-001)">Canva Mastery (CAN-001)</option>
                            <option value="WordPress de A à Z (WP-001)">WordPress de A à Z (WP-001)</option>
                            <option value="Création de Radio en Ligne (RAD-001)">Création de Radio en Ligne (RAD-001)</option>
                            <option value="Master Réseaux Sociaux (SOC-001)">Master Réseaux Sociaux (SOC-001)</option>
                            <option value="Sublimation (SUB-001)">Sublimation (SUB-001)</option>
                            <option value="Tableaux Personnalisés (TAB-001)">Tableaux Personnalisés (TAB-001)</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                        </div>
                      </div>
                   </div>

                   {/* Start Date */}
                   <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Start Date (Optional)</label>
                      <div className="relative">
                        <input 
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#003366] focus:border-transparent outline-none transition"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                          <Calendar className="w-5 h-5" />
                        </div>
                      </div>
                   </div>

                   {/* Message */}
                   <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">{t.form.message}</label>
                      <textarea 
                        name="message" 
                        rows={4} 
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#003366] focus:border-transparent outline-none transition resize-none"
                        placeholder="Any additional details..."
                      ></textarea>
                   </div>

                   <div className="flex flex-col gap-3">
                        <button 
                            type="submit" 
                            disabled={status === 'submitting'}
                            className="w-full bg-[#003366] text-white font-bold py-4 rounded-xl hover:bg-[#002244] transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {status === 'submitting' ? <Loader2 className="animate-spin w-5 h-5" /> : t.form.submit_btn}
                        </button>

                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase">Or Pay Instantly</span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>

                        <button 
                            type="button"
                            onClick={handleStripePayment}
                            disabled={paymentLoading || !formData.course}
                            className="w-full bg-[#635BFF] text-white font-bold py-4 rounded-xl hover:bg-[#534be0] transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {paymentLoading ? (
                                <Loader2 className="animate-spin w-5 h-5" /> 
                            ) : (
                                <>
                                    <CreditCard className="w-5 h-5" /> Pay with Stripe
                                </>
                            )}
                        </button>
                        {!formData.course && (
                            <p className="text-center text-xs text-red-400">Select a course to enable payment</p>
                        )}
                   </div>
                </form>
              )}
           </div>

        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
