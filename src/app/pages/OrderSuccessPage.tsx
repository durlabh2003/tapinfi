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

  // Format total cleanly to 2 decimal places (e.g. 498.59, 790.68)
  const formattedTotal = Number(total || 0).toFixed(2);

  // Clear cart on mount
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-['Poppins',sans-serif]">
      <Header />
      
      <main className="pt-[140px] px-4 max-w-[800px] mx-auto text-center">
        <ScrollReveal animation="fade-up">
          <div className="bg-white rounded-[40px] shadow-2xl p-8 sm:p-12 lg:p-16 border border-gray-100">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" />
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0e2d6e] mb-4">Order Successful!</h1>
            <p className="text-gray-500 text-base sm:text-lg mb-8 max-w-[600px] mx-auto">
              Thank you for your purchase. Your order has been placed successfully and is being processed.
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-6 mb-10 border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
              <div className="min-w-0 flex-1 w-full sm:w-auto">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Payment ID</p>
                <p className="text-sm font-mono text-gray-700 break-all select-all">{paymentId}</p>
              </div>
              <div className="sm:text-right shrink-0 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-200">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Total Paid</p>
                <p className="text-2xl font-bold text-[#0e2d6e]">₹{formattedTotal}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-30">
              <Link 
                to="/shop"
                className="h-14 px-8 rounded-full bg-[#0e2d6e] text-white font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-lg shadow-[#0e2d6e]/20 text-base"
              >
                <ShoppingBag className="w-5 h-5" />
                Continue Shopping
              </Link>
              <Link 
                to="/"
                className="h-14 px-8 rounded-full border-2 border-gray-200 text-gray-700 font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 text-base"
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
