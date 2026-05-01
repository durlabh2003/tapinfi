import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import ScrollReveal from '../components/ScrollReveal';
import { THEMES } from '../data/themes';
import { ArrowLeft, Lock } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function OrderSummaryPage() {
  const { cartItems, cartTotal, deliveryDetails } = useCart();
  const navigate = useNavigate();

  // If there are no delivery details or cart items, redirect back
  if (cartItems.length === 0 || !deliveryDetails) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Header />
        <h1 className="text-3xl font-bold text-[#0e2d6e] mb-4">Something went wrong</h1>
        <p className="text-gray-500 mb-6">Please ensure you have items in your cart and have entered delivery details.</p>
        <Link to="/shop" className="text-[#5aa4f4] hover:underline">Back to Shop</Link>
      </div>
    );
  }

  const shipping = 50; // Flat shipping rate
  const taxes = Math.round(cartTotal * 0.18); // 18% GST approx
  const finalTotal = cartTotal + shipping + taxes;

  const handleConfirmAndPay = () => {
    console.log("Using Razorpay Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: finalTotal * 100, // Amount in paise
      currency: "INR",
      name: "Tapinfi",
      description: "Order Payment",
      image: "https://tapinfi.com/wp-content/uploads/2023/04/Tapinfi-Logo-Final-1.png",
      handler: function (response: any) {
        console.log("Payment Success:", response);
        // Here we would typically verify the payment on the backend
        navigate('/checkout/success', { 
          state: { 
            paymentId: response.razorpay_payment_id,
            total: finalTotal 
          } 
        });
      },
      prefill: {
        name: deliveryDetails.fullName,
        email: deliveryDetails.email,
        contact: deliveryDetails.phone,
      },
      theme: {
        color: "#0e2d6e",
      },
      modal: {
        ondismiss: function() {
          console.log('Checkout modal closed');
        }
      }
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Razorpay failed to load:", error);
      alert("Payment gateway failed to initialize. Please try again.");
    }
  };

  return (
    <div className="bg-[#f3f4f6] min-h-screen pb-20">
      <Header />
      
      <main className="pt-[140px] px-4 sm:px-8 lg:px-20 max-w-[1440px] mx-auto">
        <ScrollReveal animation="fade-up">
          <div className="flex items-center gap-4 mb-8">
              <button onClick={() => navigate('/checkout/delivery')} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-500 hover:text-[#0e2d6e] transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
             <h1 className="text-3xl font-bold text-[#0A0A0A] font-['Poppins']">Order Summary</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Order Items & Delivery Address */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Items List */}
              <div className="bg-white rounded-3xl shadow-sm p-6 lg:p-8">
                <h2 className="text-xl font-bold text-[#0A0A0A] font-['Poppins'] mb-6">Items in your order</h2>
                <div className="space-y-6">
                  {cartItems.map((item) => {
                    const theme = THEMES.find(t => t.id === item.customization?.themeId) || THEMES[0];
                    
                    return (
                      <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
                        {/* Physical Card Image */}
                        <div className="w-full sm:w-32 h-32 bg-white rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 p-2 flex items-center justify-center">
                          <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        
                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-center">
                          <div className="flex justify-between items-start mb-2">
                             <div>
                                <h3 className="font-['Inter'] font-semibold text-[#0e2d6e] text-lg">{item.name}</h3>
                                <p className="text-sm text-gray-500 font-['Inter']">Qty: {item.quantity}</p>
                             </div>
                             <p className="text-[#5aa4f4] font-semibold font-['Inter'] text-lg">₹{item.price * item.quantity}</p>
                          </div>
                          
                          {/* Customization Details preview */}
                          {item.customization && (
                            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                               <div>
                                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Card Details</p>
                                  <p className="text-sm text-gray-700 font-medium">{item.customization.frontOption === 'details' ? item.customization.fullName : 'Custom Logo'}</p>
                                  {item.customization.printQR && <p className="text-xs text-[#5aa4f4] mt-1">✓ QR Code Included</p>}
                               </div>
                               <div>
                                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Selected Profile Theme</p>
                                  {/* Mini Theme Preview */}
                                  <div className="flex items-center gap-3">
                                     <div className={`w-8 h-12 rounded-sm ${theme.color} shadow-inner flex flex-col items-center justify-start pt-2`}>
                                        <div className="w-4 h-4 bg-white/20 rounded-full" />
                                     </div>
                                     <span className="text-sm font-medium text-gray-700">{theme.name}</span>
                                  </div>
                               </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Details Section */}
              <div className="bg-white rounded-3xl shadow-sm p-6 lg:p-8">
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[#0A0A0A] font-['Poppins']">Delivery Address</h2>
                    <button onClick={() => navigate('/checkout/delivery')} className="text-[#5aa4f4] text-sm font-semibold hover:underline">Edit</button>
                 </div>
                 <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#0e2d6e] shadow-sm shrink-0">
                       <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                       <h3 className="font-semibold text-gray-900 font-['Inter'] text-lg">{deliveryDetails.fullName}</h3>
                       <p className="text-gray-600 font-['Inter'] mt-1">{deliveryDetails.address}</p>
                       <p className="text-gray-600 font-['Inter']">{deliveryDetails.city}, {deliveryDetails.state} {deliveryDetails.zipCode}</p>
                       <p className="text-gray-500 font-['Inter'] mt-2 text-sm">{deliveryDetails.phone} | {deliveryDetails.email}</p>
                    </div>
                 </div>
              </div>

            </div>

            {/* Right Column - Payment Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-sm p-6 lg:p-8 sticky top-[120px]">
                <h2 className="text-xl font-bold text-[#0A0A0A] font-['Poppins'] mb-6">Payment Summary</h2>
                
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-100 font-['Inter']">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-gray-900">₹{shipping}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes (18% GST)</span>
                    <span className="font-medium text-gray-900">₹{taxes}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-end mb-8 font-['Inter']">
                  <span className="text-lg font-medium text-gray-600">Total</span>
                  <span className="text-3xl font-bold text-[#0e2d6e]">₹{finalTotal}</span>
                </div>

                <button 
                  onClick={handleConfirmAndPay}
                  className="w-full h-14 rounded-full flex items-center justify-center shadow-lg shadow-[#0e2d6e]/20 transition-transform hover:-translate-y-1"
                  style={{ backgroundImage: "linear-gradient(60.0131deg, rgb(90, 164, 244) 12.824%, rgb(14, 45, 110) 91.128%)" }}
                >
                  <span className="text-white font-['Poppins'] font-semibold text-lg">
                    Confirm and Pay
                  </span>
                </button>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400 font-['Inter']">
                   <Lock className="w-4 h-4" />
                   Secure checkout powered by Razorpay
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </main>
    </div>
  );
}
