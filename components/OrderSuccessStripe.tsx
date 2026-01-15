
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, Loader2, MessageCircle } from 'lucide-react';
import { SHOP_ITEMS, CONTACT_CONFIG } from '../constants';

const OrderSuccessStripe: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  
  const [formData, setFormData] = useState({
    tool: SHOP_ITEMS[0].name,
    whatsapp: '',
    email: '',
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Generate a temporary ID if one doesn't exist yet
    if (!orderId) {
      setOrderId(`ORD-ST-${Date.now().toString().slice(-6)}`);
    }
  }, [orderId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData = {
        orderId: orderId,
        toolName: formData.tool,
        amount: 4.99, // Assumption for basic tools, in real app this comes from session
        currency: "USD",
        paymentMethod: "stripe",
        paymentStatus: "pending", // Will be updated by webhook
        stripeSessionId: sessionId,
        whatsapp: formData.whatsapp,
        email: formData.email,
        createdAt: new Date().toISOString()
    };

    try {
        // Call Firebase Function
        // Assuming relative path if deployed on Firebase Hosting with rewrites, 
        // otherwise full URL: https://us-central1-wankyacademy-payments.cloudfunctions.net/createOrder
        const response = await fetch('/api/createOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            // Redirect to WhatsApp
            const message = `✅ *PAYMENT CONFIRMED*\n\n🆔 Order ID: ${orderId}\n🛠 Tool: ${formData.tool}\n💳 Method: Stripe\n\nPlease activate my service.`;
            const waUrl = `https://wa.me/${CONTACT_CONFIG.PHONE.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
            window.location.href = waUrl;
        } else {
            alert("Connection error. Please contact support manually.");
            setIsSubmitting(false);
        }
    } catch (error) {
        console.error("Order creation failed", error);
        alert("Error saving order. Please contact support on WhatsApp.");
        setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-24">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full border-t-8 border-green-500">
        <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Payment Successful!</h1>
            <p className="text-gray-500 text-sm">Session ID: {sessionId?.slice(0, 10)}...</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
            <p className="text-sm text-blue-800 font-bold mb-1">Final Step:</p>
            <p className="text-xs text-blue-600">Please select your tool and confirm your WhatsApp number to receive access immediately.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Select Purchased Tool</label>
                <select 
                    value={formData.tool} 
                    onChange={e => setFormData({...formData, tool: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    required
                >
                    {SHOP_ITEMS.map(item => (
                        <option key={item.id} value={item.name}>{item.name}</option>
                    ))}
                </select>
            </div>
            
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">WhatsApp Number</label>
                <input 
                    type="tel" 
                    required 
                    placeholder="+1 829 000 0000"
                    value={formData.whatsapp}
                    onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email (Optional)</label>
                <input 
                    type="email" 
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
            </div>

            <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition shadow-lg flex items-center justify-center gap-2"
            >
                {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : (
                    <>
                        Confirm on WhatsApp <MessageCircle className="w-5 h-5" />
                    </>
                )}
            </button>
        </form>
      </div>
    </div>
  );
};

export default OrderSuccessStripe;
