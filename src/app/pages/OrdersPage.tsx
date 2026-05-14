import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import Header from '../components/Header';
import ScrollReveal from '../components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';

export default function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isLoadingTracking, setIsLoadingTracking] = useState(false);

  useEffect(() => {
    async function checkAuthAndFetch() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }
      
      setUser(session.user);

      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('customer_email', session.user.email)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (err) {
        console.error('Error fetching user orders:', err);
      } finally {
        setIsLoading(false);
      }
    }
    
    checkAuthAndFetch();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const fetchTracking = async (waybill: string) => {
    if (!waybill) return;
    setIsLoadingTracking(true);
    try {
      const baseUrl = import.meta.env.VITE_DASHBOARD_API_URL || 'http://localhost:3001';
      const response = await fetch(`${baseUrl}/api/delhivery/track?waybill=${waybill}`);
      if (response.ok) {
        const data = await response.json();
        // Delhivery tracking returns an object with a 'ShipmentData' array
        setTrackingData(data.ShipmentData?.[0]?.Shipment || null);
      }
    } catch (err) {
      console.error('Error fetching tracking:', err);
    } finally {
      setIsLoadingTracking(false);
    }
  };

  useEffect(() => {
    if (selectedOrder?.waybill) {
      fetchTracking(selectedOrder.waybill);
    } else {
      setTrackingData(null);
    }
  }, [selectedOrder]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'preparing': return 'bg-blue-100 text-blue-700';
      case 'out for delivery': return 'bg-purple-100 text-purple-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (!user) {
    return (
      <div className="bg-[#f3f4f6] min-h-screen pb-20">
        <Header />
      </div>
    );
  }

  return (
    <div className="bg-[#f3f4f6] min-h-screen pb-20">
      <Header />
      <main className="pt-[140px] px-4 sm:px-8 lg:px-20 max-w-[1440px] mx-auto">
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 className="text-[32px] sm:text-[40px] font-bold text-[#100425]" style={{ fontFamily: "'Poppins', sans-serif" }}>
              My Orders
            </h1>
            <button 
              onClick={handleLogout}
              className="px-6 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-50 transition-colors font-semibold"
            >
              Log Out
            </button>
          </div>
          
          <div className="bg-white rounded-3xl shadow-sm p-6 lg:p-8 min-h-[400px]">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse h-24 bg-gray-100 rounded-xl" />
                ))}
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div 
                    key={order.id} 
                    onClick={() => setSelectedOrder(order)}
                    className="border border-gray-100 bg-gray-50/50 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer hover:border-[#5aa4f4]/50 transition-all group"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${getStatusColor(order.status)}`}>
                          {order.status || 'Pending'}
                        </span>
                        <span className="text-sm text-gray-400 font-medium">
                          {new Date(order.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#0e2d6e] font-['Inter'] mb-2 group-hover:text-[#5aa4f4] transition-colors">
                        {order.card_theme_name || 'Custom NFC Card'}
                      </h3>

                      {/* Material & Profile Theme badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {(order.card_material || order.card_type) && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#eef5ff] text-[#0e2d6e] border border-[#5aa4f4]/20 uppercase tracking-widest">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18M3 14h18M3 18h18" />
                            </svg>
                            {order.card_material || order.card_type}
                          </span>
                        )}
                        {(order.profile_theme_name || order.profile_theme_id) && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-100 uppercase tracking-widest">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {order.profile_theme_name || order.profile_theme_id}
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 mb-1 font-['Inter']">
                        Order ID: <span className="font-semibold uppercase text-[10px] tracking-widest">{order.id.slice(0, 8)}</span>
                      </p>
                      <p className="text-sm text-gray-400 font-['Inter'] mt-2 flex items-center gap-1">
                        Click to view full details
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </p>
                    </div>
                    <div className="text-left md:text-right w-full md:w-auto border-t md:border-none pt-4 md:pt-0 border-gray-200">
                      <p className="text-sm text-gray-500 mb-1 font-['Inter']">Total Amount</p>
                      <p className="text-2xl font-bold text-[#0e2d6e] font-['Inter']">₹{order.final_amount.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="text-xl text-gray-800 font-semibold mb-2">No orders yet</p>
                <p className="text-gray-500 mb-6">When you place an order, it will show up here.</p>
                <Link to="/shop" className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#5AA4F4] to-[#0E2D6E] text-white rounded-full font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-[#0e2d6e]/20">
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </ScrollReveal>
      </main>

      {/* Detailed View Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-[#100425]/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-[#100425] mb-1">Order Details</h2>
                    <p className="text-sm text-gray-500 font-medium">#{selectedOrder.id.toUpperCase()}</p>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Status & Date */}
                  <div className="flex flex-wrap gap-4 justify-between items-center bg-gray-50 p-4 rounded-2xl">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order Status</p>
                      <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status || 'Pending'}
                      </span>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order Placed</p>
                      <p className="text-sm font-bold text-[#100425]">{new Date(selectedOrder.created_at).toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Product Config</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Card Theme</span>
                          <span className="text-sm font-bold text-[#100425]">
                            {selectedOrder.card_theme_name || (selectedOrder.card_theme_id === 'white-gloss' ? 'PVC GLOSSY' : selectedOrder.card_theme_id === 'matte-black' ? 'MATTE BLACK' : selectedOrder.card_theme_id === 'wooden' ? 'WOODEN' : 'Standard Card')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Material</span>
                          <span className="text-sm font-bold text-[#100425]">
                            {selectedOrder.card_material || (selectedOrder.card_theme_id === 'white-gloss' ? 'PVC Glossy' : selectedOrder.card_theme_id === 'matte-black' ? 'Matte Black' : selectedOrder.card_theme_id === 'wooden' ? 'Wooden' : 'Standard')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Profile Theme</span>
                          <span className="text-sm font-bold text-[#100425]">{selectedOrder.profile_theme_name || 'Personalized Profile'}</span>
                        </div>
                        {selectedOrder.company_logo_link && (
                          <div className="mt-4">
                            <p className="text-xs text-gray-400 mb-2">Uploaded Logo</p>
                            <img src={selectedOrder.company_logo_link} alt="Logo" className="w-20 h-20 object-contain rounded-lg border border-gray-100 p-2" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Shipping To</h4>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-[#100425]">{selectedOrder.delivery_name}</p>
                        <p className="text-sm text-gray-500 leading-relaxed">{selectedOrder.delivery_address}</p>
                        <p className="text-sm text-gray-500">{selectedOrder.delivery_city}, {selectedOrder.delivery_state} - {selectedOrder.delivery_pincode}</p>
                        <p className="text-sm text-gray-500 mt-2">{selectedOrder.delivery_phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="border-t border-gray-100 pt-8">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Payment Summary</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Items Total</span>
                        <span>₹{(selectedOrder.final_amount + (selectedOrder.discount_amount || 0) - (selectedOrder.delivery_charges || 0)).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Shipping</span>
                        <span>₹{selectedOrder.delivery_charges?.toLocaleString() || '0'}</span>
                      </div>
                      {selectedOrder.discount_amount > 0 && (
                        <div className="flex justify-between text-sm text-red-500 font-medium">
                          <span>Discount ({selectedOrder.applied_coupon_code})</span>
                          <span>- ₹{selectedOrder.discount_amount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center pt-3 border-t border-gray-50 mt-2">
                        <span className="text-lg font-bold text-[#100425]">Total Paid</span>
                        <span className="text-2xl font-bold text-[#0e2d6e]">₹{selectedOrder.final_amount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tracking Section */}
                  {selectedOrder.waybill && (
                    <div className="border-t border-gray-100 pt-8">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Track Shipment</h4>
                      {isLoadingTracking ? (
                        <div className="space-y-4 animate-pulse">
                          <div className="h-4 bg-gray-100 rounded w-1/2" />
                          <div className="h-20 bg-gray-50 rounded-2xl" />
                        </div>
                      ) : trackingData ? (
                        <div className="space-y-6">
                          <div className="bg-[#0e2d6e]/5 border border-[#0e2d6e]/10 p-4 rounded-2xl">
                             <div className="flex justify-between items-center mb-1">
                                <span className="text-xs text-gray-500 font-medium">Waybill: {selectedOrder.waybill}</span>
                                <span className="text-[10px] font-bold text-[#5aa4f4] uppercase tracking-widest bg-white px-2 py-0.5 rounded-full border border-[#5aa4f4]/20">
                                   {trackingData.Status?.Status || 'In Transit'}
                                </span>
                             </div>
                             <p className="text-sm font-bold text-[#100425]">
                                {trackingData.Status?.Instructions || trackingData.Status?.StatusLocation || 'Package is being processed'}
                             </p>
                          </div>

                          {/* Timeline */}
                          <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                            {trackingData.Scans?.slice(0, 4).map((scan: any, idx: number) => (
                              <div key={idx} className="relative">
                                <div className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm ${idx === 0 ? 'bg-[#5aa4f4]' : 'bg-gray-300'}`} />
                                <div>
                                  <p className="text-sm font-bold text-[#100425] leading-tight">{scan.ScanDetail?.Instructions || scan.ScanDetail?.Scan}</p>
                                  <p className="text-[10px] text-gray-400 font-medium mt-1">
                                    {new Date(scan.ScanDetail?.ScanDateTime).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric' })} • {scan.ScanDetail?.ScannedLocation}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl">
                          <p className="text-sm text-orange-700 font-medium">Tracking info is being generated. Please check back in a few hours.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-10 flex gap-4">
                  <button onClick={() => setSelectedOrder(null)} className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-colors">
                    Close
                  </button>
                  <button 
                    onClick={() => navigate('/contact', { state: { orderId: selectedOrder.id } })}
                    className="flex-1 py-4 bg-[#0e2d6e] text-white rounded-2xl font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-[#0e2d6e]/20"
                  >
                    Raise a Query
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f9fafb;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
      `}} />
    </div>
  );
}

