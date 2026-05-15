import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const QUERY_TYPES = [
  "General Inquiry",
  "Order Related Query",
  "Technical Support",
  "Bulk/Corporate Orders",
  "Partnership/Collaboration",
  "Internship/Career Inquiry",
  "Feedback & Suggestions",
  "Other Queries"
];

export default function ContactPage() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    query_type: 'General Inquiry',
    order_id: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Name validation: 2-50 chars, letters and spaces only
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]{2,50}$/.test(formData.name)) {
      newErrors.name = 'Please enter a valid name';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation: 10 digits starting with 6-9
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (location.state?.orderId) {
      setFormData(prev => ({
        ...prev,
        order_id: location.state.orderId,
        query_type: 'Order Related Query'
      }));
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('support_queries')
        .insert([{
          ...formData,
          status: 'pending'
        }]);

      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      alert("Failed to submit query: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white min-h-screen">
        <Header />
        <div className="pt-[140px] pb-32 flex flex-col items-center justify-center px-4 text-center">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6"
          >
            <CheckCircle className="w-10 h-10" />
          </motion.div>
          <h1 className="text-3xl font-bold text-[#100425] mb-4">Thank You!</h1>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            Your query has been received. Our team will review your message and get back to you shortly.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-8 py-3 bg-[#0e2d6e] text-white rounded-full font-bold hover:brightness-110 transition-all"
          >
            Send Another Message
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className="pt-[140px] pb-20 px-4 sm:px-8 lg:px-20 max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <h1 className="text-[40px] sm:text-[48px] font-bold text-[#100425] leading-tight mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Let’s make every connection <span className="text-[#5aa4f4]">sustainable</span>
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                Tapinfi helps you network smarter with eco-friendly NFC business cards. 
                Whether you have a technical question or want to discuss a bulk order, 
                we're here to support you at every step of your journey.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-5 items-center p-6 rounded-2xl border border-gray-100 hover:border-[#5aa4f4]/30 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-[#5aa4f4]/10 flex items-center justify-center text-[#5aa4f4]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Us</p>
                  <a href="mailto:support@tapinfi.com" className="text-lg font-bold text-[#100425] group-hover:text-[#5aa4f4] transition-colors">support@tapinfi.com</a>
                </div>
              </div>

              <div className="flex gap-5 items-center p-6 rounded-2xl border border-gray-100 hover:border-[#5aa4f4]/30 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-[#5aa4f4]/10 flex items-center justify-center text-[#5aa4f4]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Call Us</p>
                  <a href="tel:+917340181915" className="text-lg font-bold text-[#100425] group-hover:text-[#5aa4f4] transition-colors">+91 7340181915</a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white border border-gray-100 rounded-[32px] p-8 sm:p-10 shadow-2xl shadow-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#100425] uppercase tracking-widest ml-1">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({...formData, name: e.target.value});
                      if (errors.name) setErrors(prev => ({...prev, name: ''}));
                    }}
                    placeholder="John Doe"
                    className={`w-full px-5 py-3.5 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:border-[#5aa4f4] outline-none transition-all text-sm`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#100425] uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({...formData, email: e.target.value});
                      if (errors.email) setErrors(prev => ({...prev, email: ''}));
                    }}
                    placeholder="john@example.com"
                    className={`w-full px-5 py-3.5 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-[#5aa4f4] outline-none transition-all text-sm`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#100425] uppercase tracking-widest ml-1">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 10) {
                        setFormData({...formData, phone: value});
                        if (errors.phone) setErrors(prev => ({...prev, phone: ''}));
                      }
                    }}
                    placeholder="9876543210"
                    className={`w-full px-5 py-3.5 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:border-[#5aa4f4] outline-none transition-all text-sm`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#100425] uppercase tracking-widest ml-1">Query Type</label>
                  <select 
                    value={formData.query_type}
                    onChange={(e) => setFormData({...formData, query_type: e.target.value})}
                    className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:border-[#5aa4f4] outline-none transition-all text-sm appearance-none bg-no-repeat bg-[right_1.25rem_center]"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundSize: '1.25rem' }}
                  >
                    {QUERY_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#100425] uppercase tracking-widest ml-1">Order ID (Optional)</label>
                <input 
                  type="text" 
                  value={formData.order_id}
                  onChange={(e) => setFormData({...formData, order_id: e.target.value})}
                  placeholder="e.g. #ORD-12345"
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:border-[#5aa4f4] outline-none transition-all text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#100425] uppercase tracking-widest ml-1">Message</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({...formData, message: e.target.value});
                    if (errors.message) setErrors(prev => ({...prev, message: ''}));
                  }}
                  placeholder="How can we help you?"
                  className={`w-full px-5 py-3.5 rounded-xl border ${errors.message ? 'border-red-500' : 'border-gray-200'} focus:border-[#5aa4f4] outline-none transition-all text-sm resize-none`}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1">
                    <AlertCircle className="w-3 h-3" /> {errors.message}
                  </p>
                )}
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#0e2d6e] text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:brightness-110 transition-all shadow-lg shadow-[#0e2d6e]/20 disabled:opacity-50"
              >
                {loading ? 'Sending Query...' : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
