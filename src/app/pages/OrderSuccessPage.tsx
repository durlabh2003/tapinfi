import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function OrderSuccessPage() {
  const location = useLocation();
  const { clearCart } = useCart();
  const { paymentId, total } = location.state || { paymentId: 'N/A', total: 0 };

  // Clear cart on mount
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <Header />
      
      <main className="pt-[140px] px-4 max-w-[800px] mx-auto text-center">
        <ScrollReveal animation="fade-up">
          <div className="bg-white rounded-[40px] shadow-2xl p-10 lg:p-16 border border-gray-100">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            
            <h1 className="text-4xl font-bold text-[#0e2d6e] font-['Poppins'] mb-4">Order Successful!</h1>
            <p className="text-gray-500 font-['Inter'] text-lg mb-10">
              Thank you for your purchase. Your order has been placed successfully and is being processed.
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-6 mb-10 grid grid-cols-2 gap-4 text-left border border-gray-100">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Payment ID</p>
                <p className="text-sm font-mono text-gray-700">{paymentId}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Total Paid</p>
                <p className="text-lg font-bold text-[#0e2d6e]">₹{total}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/shop"
                className="h-14 px-8 rounded-full bg-[#0e2d6e] text-white font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-105"
              >
                <ShoppingBag className="w-5 h-5" />
                Continue Shopping
              </Link>
              <Link 
                to="/"
                className="h-14 px-8 rounded-full border-2 border-gray-100 text-gray-600 font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-105"
              >
                Back to Home
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </main>
    </div>
  );
}
