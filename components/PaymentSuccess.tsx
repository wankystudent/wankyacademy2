
import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, BookOpen } from 'lucide-react';
import { COLORS } from '../constants';

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('course');

  useEffect(() => {
    // Here you could trigger a call to your backend to confirm the order 
    // if you aren't using Webhooks yet.
    console.log("Payment successful for:", courseId);
  }, [courseId]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-24">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl max-w-lg w-full text-center border-t-8" style={{ borderColor: COLORS.GOLD }}>
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-[#003366] mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Thank you for enrolling. Your access to the <strong>{courseId || 'Course'}</strong> has been confirmed.
        </p>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8">
           <p className="text-sm text-blue-800 mb-2 font-bold">What happens next?</p>
           <p className="text-sm text-blue-600">You will receive an email confirmation shortly. You can now access your course materials in the Student Portal.</p>
        </div>

        <div className="space-y-3">
          <Link to="/student" className="w-full bg-[#003366] text-white py-3 rounded-xl font-bold hover:opacity-90 transition flex items-center justify-center gap-2">
             Go to Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/" className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition block">
             Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
