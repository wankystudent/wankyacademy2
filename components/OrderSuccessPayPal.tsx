
import React, { useState, useEffect } from 'react';
import { CheckCircle, Loader2, MessageCircle } from 'lucide-react';
import { SHOP_ITEMS, CONTACT_CONFIG } from '../constants';

const OrderSuccessPayPal: React.FC = () => {
  const [formData, setFormData] = useState({
    tool: SHOP_ITEMS[0].name,
    transactionId: '',
    whatsapp: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    setOrderId(`ORD-PP-${Date.now().toString().slice(-6)}`);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData = {
        orderId: orderId,
        toolName: formData.tool,
        amount: 4.99, 
        currency: "USD",
        paymentMethod: "paypal",
        paymentStatus: "pending", 
        paypalTransactionId: formData.transactionId,
        whatsapp: formData.whatsapp,
        email: formData.email,
        createdAt: new Date().toISOString()
    };

    try {
        const response = await fetch('/api/createOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            const message = `✅ *PAYMENT CONFIRMED (PayPal)*\n\n🆔 Order ID: ${orderId}\n🔢 Trans ID: ${formData.transactionId}\n🛠 Tool: ${formData.tool}\n\nPlease activate my service.`;
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
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full border-t-8 border-blue-600">
        <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">PayPal Confirmation</h1>
            <p className="text-gray-500 text-sm">Order ID: {orderId}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Select Purchased Tool</label>
                <select 
                    value={formData.tool} 
                    onChange={e => setFormData({...formData, tool: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                >
                    {SHOP_ITEMS.map(item => (
                        <option key={item.id} value={item.name}>{item.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">PayPal Transaction ID</label>
                <input 
                    type="text" 
                    required 
                    placeholder="Enter ID from PayPal receipt"
                    value={formData.transactionId}
                    onChange={e => setFormData({...formData, transactionId: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                />
            </div>
            
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">WhatsApp Number</label>
                <input 
                    type="tel" 
                    required 
                    placeholder="+1 829 000 0000"
                    value={formData.whatsapp}
                    onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>

            <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#003366] text-white py-4 rounded-xl font-bold hover:bg-[#002244] transition shadow-lg flex items-center justify-center gap-2"
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

export default OrderSuccessPayPal;
