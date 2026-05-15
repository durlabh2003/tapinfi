import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-[400px] max-w-[100vw] bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-['Poppins'] font-semibold text-[#0e2d6e]">Your Cart</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-gray-500 font-['Inter']">Your cart is empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-[#5aa4f4] font-medium font-['Inter'] hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 p-2">
                  <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-['Inter'] font-semibold text-[#0e2d6e] text-lg leading-tight">{item.name}</h3>
                        {item.customization && (
                          <span className="inline-block px-2 py-0.5 mt-1 text-[10px] font-semibold tracking-wider text-white bg-[#5aa4f4] rounded-full uppercase">
                            Customized
                          </span>
                        )}
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-[#5aa4f4] font-semibold font-['Inter'] mt-1">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors"
                    >
                      -
                    </button>
                    <span className="font-medium w-4 text-center text-[#0e2d6e]">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-['Inter'] font-medium">Subtotal</span>
              <span className="text-2xl font-bold text-[#0e2d6e] font-['Inter']">₹{cartTotal}</span>
            </div>
            <button 
              className="w-full h-14 rounded-full text-white font-semibold font-['Inter'] text-lg transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#5aa4f4]/20"
              style={{ backgroundImage: "linear-gradient(60.0131deg, rgb(90, 164, 244) 12.824%, rgb(14, 45, 110) 91.128%)" }}
              onClick={() => {
                setIsCartOpen(false);
                navigate('/checkout/delivery');
              }}
            >
              Checkout Now
            </button>
            <button
              className="w-full h-12 mt-3 rounded-full border-2 border-[#5aa4f4] text-[#0e2d6e] font-semibold font-['Inter'] text-base transition-all hover:bg-[#5aa4f4]/10 active:scale-[0.98]"
              onClick={() => setIsCartOpen(false)}
            >
              Continue Shopping
            </button>
            <p className="text-center text-xs text-gray-400 mt-4 font-['Inter']">Shipping and taxes calculated at checkout.</p>
          </div>
        )}
      </div>
    </>
  );
}
