import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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

  const [isValidating, setIsValidating] = useState(false);
  const [pincodeError, setPincodeError] = useState('');
  const [isServiceable, setIsServiceable] = useState<boolean | null>(null);

  const validatePincode = async (zip: string) => {
    if (zip.length !== 6) {
      setPincodeError('Pincode must be 6 digits');
      setIsServiceable(null);
      return;
    }

    setIsValidating(true);
    setPincodeError('');
    
    try {
      const response = await fetch(`/api/delhivery/pincode?pincode=${zip}`);

      // If the API itself failed (server error / missing env vars), allow proceeding
      if (!response.ok) {
        console.warn('Pincode API returned error status:', response.status);
        setIsServiceable(true);
        setIsValidating(false);
        return;
      }

      const result = await response.json();

      if (result.serviceable) {
        setIsServiceable(true);
        setPincodeError('');
        // Auto-fill city and state from Delhivery data
        setFormData(prev => ({
          ...prev,
          city: result.data?.city || prev.city,
          state: result.data?.state || prev.state
        }));
      } else if (result.serviceable === false) {
        // Only block if Delhivery explicitly says not serviceable
        setIsServiceable(false);
        setPincodeError('Sorry, we do not deliver to this pincode yet.');
      } else {
        // Ambiguous response — allow through
        setIsServiceable(true);
      }
    } catch (error) {
      console.error('Validation error:', error);
      // Network/parse error — don't block the user
      setIsServiceable(true);
    } finally {
      setIsValidating(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'zipCode') {
      if (value.length === 6) {
        validatePincode(value);
      } else {
        setIsServiceable(null);
        setPincodeError('');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isServiceable === false) {
      setPincodeError('Please enter a serviceable pincode to continue.');
      return;
    }
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
                    placeholder="10-digit mobile number"
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
                  <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-2">ZIP Code</label>
                  <div className="relative">
                    <input 
                      required
                      type="text" 
                      name="zipCode"
                      maxLength={6}
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border ${pincodeError ? 'border-red-500' : isServiceable === true ? 'border-green-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#0A0A0A] focus:border-[#0A0A0A] outline-none font-['Inter'] transition-shadow bg-gray-50`}
                    />
                    {isValidating && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  {pincodeError && <p className="text-red-500 text-xs mt-1 font-['Inter']">{pincodeError}</p>}
                  {isServiceable === true && !isValidating && <p className="text-green-600 text-xs mt-1 font-['Inter'] flex items-center">✓ Serviceable Area</p>}
                </div>
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
              </div>

              <div className="pt-6 flex justify-end border-t border-gray-100">
                <button 
                  type="submit"
                  disabled={isValidating || isServiceable === false}
                  className={`w-full sm:w-auto h-14 px-12 rounded-full bg-[#0e2d6e] text-white font-bold font-['Poppins'] text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-[#0e2d6e]/20 ${ (isValidating || isServiceable === false) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ backgroundImage: "linear-gradient(60.0131deg, rgb(90, 164, 244) 12.824%, rgb(14, 45, 110) 91.128%)" }}
                >
                  {isValidating ? 'Validating...' : 'Continue to Summary'}
                </button>
              </div>
            </form>
          </div>
        </ScrollReveal>
      </main>
    </div>
  );
}

