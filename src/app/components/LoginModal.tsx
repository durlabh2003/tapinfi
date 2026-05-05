import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/orders`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      alert(error.message || 'Error logging in with Google');
      setIsLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            }
          }
        });
        if (error) throw error;
        alert('Verification email sent! Please check your inbox.');
        onClose();
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onClose();
        navigate('/orders');
      }
    } catch (error: any) {
      alert(error.message || 'Error during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop with Blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#100425]/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-[420px] bg-white border border-gray-100 rounded-[30px] p-10 shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-10">
              <h1 className="text-[32px] text-[#100425] mb-3 font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h1>
              <p className="text-[#656565] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                {isSignUp ? 'Join Tapinfi to start managing your smart cards.' : 'Log in to view your orders and manage your account.'}
              </p>
            </div>
            
            <form onSubmit={handleAuth} className="space-y-4">
              {isSignUp && (
                <div className="space-y-1 text-left">
                  <label className="text-[12px] font-bold text-[#100425] ml-1">FULL NAME</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-5 py-3.5 rounded-[15px] border border-gray-200 focus:border-[#0e2d6e] focus:outline-none transition-all text-sm"
                    required={isSignUp}
                  />
                </div>
              )}
              
              <div className="space-y-1 text-left">
                <label className="text-[12px] font-bold text-[#100425] ml-1">EMAIL ADDRESS</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-[15px] border border-gray-200 focus:border-[#0e2d6e] focus:outline-none transition-all text-sm"
                  required
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[12px] font-bold text-[#100425] ml-1">PASSWORD</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-[15px] border border-gray-200 focus:border-[#0e2d6e] focus:outline-none transition-all text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-[100px] bg-[#0e2d6e] text-white font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-[#0e2d6e]/20 disabled:opacity-50 mt-4"
              >
                {isLoading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Log In')}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-black text-gray-400">
                <span className="bg-white px-4">Or continue with</span>
              </div>
            </div>
            
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-[100px] border border-gray-200 flex items-center justify-center gap-3 hover:bg-gray-50 transition-all text-sm font-bold text-[#656565] disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>

            <p className="mt-8 text-center text-sm text-[#656565]">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-2 text-[#0e2d6e] font-bold hover:underline"
              >
                {isSignUp ? 'Log In' : 'Sign Up'}
              </button>
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
