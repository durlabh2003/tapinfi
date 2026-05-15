import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import ScrollReveal from '../components/ScrollReveal';
import { THEMES } from '../data/themes';
import { ArrowLeft, Lock } from 'lucide-react';

import { supabase } from '../../lib/supabase';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function OrderSummaryPage() {
  const { cartItems, cartTotal, deliveryDetails } = useCart();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = React.useState('');
  const [discount, setDiscount] = React.useState(0);
  const [couponError, setCouponError] = React.useState('');
  const [isApplied, setIsApplied] = React.useState(false);
  const [appliedCoupon, setAppliedCoupon] = React.useState<any>(null);
  const [themesData, setThemesData] = React.useState<Record<string, any>>({});
  const [shipping, setShipping] = React.useState(80); // Default/Fallback
  const [loadingShipping, setLoadingShipping] = React.useState(false);
  const [expectedDelivery, setExpectedDelivery] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchThemes() {
      const themeIds = cartItems
        .map(item => item.customization?.themeId)
        .filter(Boolean) as string[];
      
      if (themeIds.length === 0) return;

      try {
        const { data, error } = await supabase
          .from('available_themes')
          .select('id, name, image_url')
          .in('id', themeIds);

        if (error) throw error;

        if (data) {
          const map = data.reduce((acc: any, t: any) => {
            acc[t.id] = t;
            return acc;
          }, {});
          setThemesData(map);
        }
      } catch (err) {
        console.error('Error fetching themes for summary:', err);
      }
    }
    fetchThemes();
  }, [cartItems]);

  const totalQuantity = React.useMemo(() => 
    cartItems.reduce((sum, item) => sum + item.quantity, 0),
  [cartItems]);

  React.useEffect(() => {
    async function fetchShippingCost() {
      if (!deliveryDetails?.zipCode || totalQuantity === 0) return;

      setLoadingShipping(true);
      try {
        const response = await fetch(`/api/delhivery/cost?d_pin=${deliveryDetails.zipCode}&count=${totalQuantity}`);;
        
        if (response.ok) {
          const data = await response.json();
          setShipping(parseFloat(data.total_amount));
          setExpectedDelivery(data.expected_delivery);
        } else {
          console.error('Failed to fetch shipping cost, using fallback');
        }
      } catch (err) {
        console.error('Error fetching shipping cost:', err);
      } finally {
        setLoadingShipping(false);
      }
    }
    fetchShippingCost();
  }, [deliveryDetails?.zipCode, totalQuantity]);



  // If there are no delivery details or cart items, redirect back
  if (cartItems.length === 0 || !deliveryDetails) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Header />
        <h1 className="text-3xl font-bold text-[#0e2d6e] mb-4">Something went wrong</h1>
        <p className="text-gray-500 mb-6">Please ensure you have items in your cart and have entered delivery details.</p>
        <Link to="/shop" className="text-[#5aa4f4] hover:underline">Continue Shopping</Link>
      </div>
    );
  }

  // Dynamic shipping from state
  const taxes = 0; // Removed GST
  const finalTotal = (cartTotal - discount) + shipping;

  const handleApplyCoupon = async () => {
    if (couponCode.trim() === '') {
      setCouponError('Please enter a code');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', couponCode.trim().toUpperCase())
        .single();

      if (error || !data) {
        setCouponError('Invalid coupon code');
        setIsApplied(false);
        setDiscount(0);
        return;
      }

      // Validate status (handling potential case sensitivity)
      if (data.status.toLowerCase() !== 'active') {
        setCouponError('This coupon is no longer active');
        return;
      }

      // Check usage limits (using used_count as primary tracker)
      const currentUsage = data.used_count ?? data.used ?? 0;
      const limit = data.usage_limit ?? data.max_global_usage ?? 999999;
      
      if (currentUsage >= limit) {
        setCouponError('This coupon has reached its usage limit');
        return;
      }

      // Check expiration if column exists
      if (data.expiration_date && new Date(data.expiration_date) < new Date()) {
        setCouponError('This coupon has expired');
        return;
      }

      let discountAmount = 0;
      if (data.discount_type === 'percentage') {
        discountAmount = Math.round(cartTotal * (data.discount_value / 100));
      } else if (data.discount_type === 'fixed' || data.discount_type === 'value' || data.discount_type === 'amount') {
        discountAmount = data.discount_value;
      }

      // Ensure discount doesn't exceed total
      discountAmount = Math.min(discountAmount, cartTotal);

      setDiscount(discountAmount);
      setIsApplied(true);
      setAppliedCoupon(data);
      setCouponCode(data.code); // Sync input with validated code
      setCouponError('');
    } catch (err) {
      console.error('Error applying coupon:', err);
      setCouponError('Failed to validate coupon');
    }
  };

  const removeCoupon = () => {
      setIsApplied(false);
      setDiscount(0);
      setCouponCode('');
      setCouponError('');
      setAppliedCoupon(null);
    };

  const handleConfirmAndPay = () => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: finalTotal * 100, // Amount in paise
      currency: "INR",
      name: "Tapinfi",
      description: "Order Payment",
      image: "https://tapinfi.com/wp-content/uploads/2023/04/Tapinfi-Logo-Final-1.png",
      handler: async function (response: any) {
        console.log("Payment Success:", response);
        
        // Save to Supabase
        try {
          const firstItem = cartItems[0];
          const profileThemeName = firstItem?.customization?.themeId ? themesData[firstItem.customization.themeId]?.name : null;
          
          // Map product ID to material
          const materialMap: Record<string, string> = {
            'white-gloss': 'PVC Glossy',
            'matte-black': 'Matte Black',
            'wooden': 'Wooden'
          };
          // Strip the timestamp from the unique ID if present
          const baseProductId = firstItem?.id.split('-')[0];
          const material = materialMap[baseProductId] || 'Standard';

          const { error } = await supabase.from('orders').insert({
            customer_name: deliveryDetails?.fullName,
            customer_email: deliveryDetails?.email,
            customer_phone: deliveryDetails?.phone,
            card_theme_id: baseProductId,
            card_theme_name: firstItem?.name,
            card_material: material,
            profile_theme_id: firstItem?.customization?.themeId,
            profile_theme_name: profileThemeName,
            customization_type: firstItem?.customization?.frontOption === 'logo' ? 'logo' : 'personal',
            personal_full_name: firstItem?.customization?.fullName,
            personal_phone: firstItem?.customization?.phone,
            personal_email: firstItem?.customization?.email,
            company_logo_link: firstItem?.customization?.logoUrl,
            delivery_name: deliveryDetails?.fullName,
            delivery_phone: deliveryDetails?.phone,
            delivery_email: deliveryDetails?.email,
            delivery_address: deliveryDetails?.address,
            delivery_city: deliveryDetails?.city,
            delivery_state: deliveryDetails?.state,
            delivery_pincode: deliveryDetails?.zipCode,
            delivery_charges: shipping,
            final_amount: finalTotal,
            status: 'Pending',
            print_qr: firstItem?.customization?.printQR || false,
            applied_coupon_code: isApplied && appliedCoupon ? appliedCoupon.code : null,
            discount_amount: discount
          });

          if (error) {
            console.error("Error saving order to Supabase:", error);
          } else {
            console.log("Order saved successfully to Supabase");
            
            // Increment coupon usage
            if (isApplied && appliedCoupon) {
              // Fetch latest count to be more accurate
              const { data: latestCoupon } = await supabase
                .from('coupons')
                .select('used_count')
                .eq('id', appliedCoupon.id)
                .single();

              await supabase
                .from('coupons')
                .update({ 
                  used_count: ((latestCoupon?.used_count || appliedCoupon.used_count) || 0) + 1 
                })
                .eq('id', appliedCoupon.id);
            }
          }
        } catch (err) {
          console.error("Unexpected error saving order:", err);
        }

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
                                  {item.customization.companyName && <p className="text-xs text-gray-500">{item.customization.companyName}</p>}
                                  {item.customization.designation && <p className="text-xs text-gray-400 italic">{item.customization.designation}</p>}
                                  {item.customization.printQR && <p className="text-xs text-[#5aa4f4] mt-1 font-semibold">✓ QR Code Included</p>}
                               </div>
                                <div>
                                   <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">Selected Profile Theme</p>
                                   {/* Mini Theme Preview */}
                                   {item.customization?.themeId && themesData[item.customization.themeId] ? (
                                     <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0">
                                           <img 
                                             src={themesData[item.customization.themeId].image_url} 
                                             alt="Theme" 
                                             className="w-full h-full object-contain p-1" 
                                           />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">
                                          {themesData[item.customization.themeId].name}
                                        </span>
                                     </div>
                                   ) : (
                                     <div className="flex items-center gap-3 animate-pulse">
                                        <div className="w-10 h-10 rounded-lg bg-gray-100" />
                                        <div className="h-4 w-24 bg-gray-100 rounded" />
                                     </div>
                                   )}
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
                    <span className="font-medium text-gray-900">
                      {loadingShipping ? (
                        <span className="text-xs text-gray-400 animate-pulse">Calculating...</span>
                      ) : (
                        `₹${shipping}`
                      )}
                    </span>
                  </div>
                  {!loadingShipping && expectedDelivery && (
                    <p className="text-[10px] text-[#5aa4f4] mt-[-12px] font-medium">
                      Estimated delivery: {new Date(expectedDelivery).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </p>
                  )}
                  {isApplied && appliedCoupon && (
                    <div className="flex justify-between text-green-600 font-medium animate-in fade-in slide-in-from-top-2 duration-300 font-['Inter']">
                      <div className="flex items-center gap-1">
                        <span>Discount ({appliedCoupon.code})</span>
                        <button onClick={removeCoupon} className="text-xs text-red-500 hover:underline ml-1">Remove</button>
                      </div>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                </div>

                {/* Coupon Code Input */}
                {!isApplied && (
                  <div className="mb-6 space-y-2">
                    <p className="text-sm font-semibold text-gray-700 font-['Inter']">Have a coupon code?</p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          if (couponError) setCouponError('');
                        }}
                        placeholder="Enter code"
                        className={`flex-1 h-12 px-4 rounded-xl border ${couponError ? 'border-red-500 bg-red-50' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-[#5aa4f4]/20 focus:border-[#5aa4f4] transition-all font-['Inter'] text-sm uppercase`}
                      />
                      <button 
                        onClick={handleApplyCoupon}
                        className="px-6 h-12 bg-[#0e2d6e] text-white rounded-xl font-semibold text-sm hover:bg-[#1a3a7a] transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-sm text-red-600 font-bold ml-1 animate-pulse">
                        ⚠ {couponError}
                      </p>
                    )}
                  </div>
                )}
                
                <div className="flex justify-between items-end mb-8 font-['Inter']">
                  <span className="text-lg font-medium text-gray-600">Total</span>
                  <span className="text-3xl font-bold text-[#0e2d6e]">₹{finalTotal}</span>
                </div>

                <button 
                  onClick={handleConfirmAndPay}
                  className="w-full h-14 rounded-full flex items-center justify-center shadow-lg shadow-[#0e2d6e]/20 transition-transform hover:-translate-y-1 mb-4"
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
