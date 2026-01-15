
import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft } from 'lucide-react';

const OrderCancel: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-24">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border-t-8 border-red-500">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
        <p className="text-gray-600 mb-8">
          The checkout process was not completed. No charges were made.
        </p>
        <Link 
          to="/shop" 
          className="w-full bg-gray-800 text-white py-3 rounded-xl font-bold hover:bg-gray-900 transition block flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Shop
        </Link>
      </div>
    </div>
  );
};

export default OrderCancel;
