import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import ScrollReveal from '../components/ScrollReveal';

export default function DeliveryDetailsPage() {
  const { setDeliveryDetails, deliveryDetails, cartItems } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: deliveryDetails?.fullName || '',
    email: deliveryDetails?.email || '',
    phone: deliveryDetails?.phone || '',
    address: deliveryDetails?.address || '',
    city: deliveryDetails?.city || '',
    state: deliveryDetails?.state || '',
    zipCode: deliveryDetails?.zipCode || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDeliveryDetails(formData);
    navigate('/checkout/summary');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Header />
        <h1 className="text-3xl font-bold text-[#0e2d6e] mb-4">Your Cart is Empty</h1>
        <Link to="/shop" className="text-[#5aa4f4] hover:underline">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f3f4f6] min-h-screen pb-20">
      <Header />
      
      <main className="pt-[140px] px-4 sm:px-8 lg:px-20 max-w-[1000px] mx-auto">
        <ScrollReveal animation="fade-up">
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            <h1 className="text-3xl font-bold text-[#0A0A0A] font-['Poppins'] mb-2">Delivery Details</h1>
            <p className="text-gray-500 font-['Inter'] mb-8">Where should we send your order?</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">Full Name</label>
                  <input 
                    required
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] outline-none font-['Inter'] transition-shadow bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] outline-none font-['Inter'] transition-shadow bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">Email Address</label>
                <input 
                  required
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] outline-none font-['Inter'] transition-shadow bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">Full Address</label>
                <input 
                  required
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street address, apartment, suite, etc."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] outline-none font-['Inter'] transition-shadow bg-gray-50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">City</label>
                  <input 
                    required
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] outline-none font-['Inter'] transition-shadow bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">State</label>
                  <input 
                    required
                    type="text" 
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] outline-none font-['Inter'] transition-shadow bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">ZIP Code</label>
                  <input 
                    required
                    type="text" 
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] outline-none font-['Inter'] transition-shadow bg-gray-50"
                  />
                </div>
              </div>

              <div className="pt-6 flex justify-end border-t border-gray-100">
                <button 
                  type="submit"
                  className="h-14 px-12 rounded-full bg-[#0A0A0A] text-white font-semibold font-['Inter'] text-lg transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-xl"
                >
                  Continue to Summary
                </button>
              </div>
            </form>
          </div>
        </ScrollReveal>
      </main>
    </div>
  );
}
