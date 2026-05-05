import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import Header from '../components/Header';
import ScrollReveal from '../components/ScrollReveal';

export default function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

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
                  <div key={order.id} className="border border-gray-100 bg-gray-50/50 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                          order.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status || 'Pending'}
                        </span>
                        <span className="text-sm text-gray-400 font-medium">
                          {new Date(order.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#0e2d6e] font-['Inter'] mb-1">
                        {order.card_theme_name || 'Custom NFC Card'}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1 font-['Inter']">
                        Profile Theme: <span className="font-semibold">{order.profile_theme_name || 'Standard'}</span>
                      </p>
                      <p className="text-sm text-gray-600 font-['Inter']">
                        Delivery to: <span className="font-semibold">{order.delivery_name}</span> ({order.delivery_city})
                      </p>
                    </div>
                    <div className="text-left md:text-right w-full md:w-auto border-t md:border-none pt-4 md:pt-0 border-gray-200">
                      <p className="text-sm text-gray-500 mb-1 font-['Inter']">Total Amount</p>
                      <p className="text-2xl font-bold text-[#0e2d6e] font-['Inter']">₹{order.final_amount}</p>
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
    </div>
  );
}
