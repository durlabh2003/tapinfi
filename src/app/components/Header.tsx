import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import imgLogo from '../../imports/Frame1-1/f00b995e56d83fe3818dbb20f3489f43c9842118.png';
import { useCart } from '../context/CartContext';
import LoginModal from './LoginModal';

const NAV_FONT: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600,
  fontSize: '16px',
};

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const linkClass = (path: string) =>
    `transition-colors duration-200 ${
      location.pathname === path ? 'text-[#5aa4f4]' : 'text-white hover:text-[#5aa4f4]'
    }`;

  return (
    <div className="absolute left-0 right-0 top-0 z-50">
      {/* Main bar */}
      <div
        className={`h-[90px] flex items-center ${
          isHome
            ? 'bg-transparent'
            : 'bg-[#000000] mx-4 sm:mx-8 rounded-bl-[25px] rounded-br-[25px] border-b border-white/5'
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between px-6 lg:px-[86px]">
          {/* Logo */}
          <Link to="/" className="h-[37px] w-[97px] shrink-0 relative overflow-hidden">
            <img
              alt="Tapinfi Logo"
              src={imgLogo}
              className="absolute h-[100.18%] left-[-33.59%] max-w-none top-[-0.09%] w-[133.59%]"
            />
          </Link>

          {/* Desktop nav — hidden below lg */}
          <nav className="hidden lg:flex items-center gap-10" style={NAV_FONT}>
            <div className="flex items-center gap-10">
              <Link to="/" className={linkClass('/')} style={NAV_FONT}>HOME</Link>
              <Link to="/shop" className={linkClass('/shop')} style={NAV_FONT}>SHOP</Link>
              <Link to="/blogs" className={linkClass('/blogs')} style={NAV_FONT}>BLOGS</Link>
              <Link to="/about" className={linkClass('/about')} style={NAV_FONT}>ABOUT US</Link>

            </div>

            {/* Cart icon */}
            <button 
              aria-label="Cart" 
              className="text-white hover:text-[#5aa4f4] transition-colors relative"
              onClick={() => setIsCartOpen(true)}
            >
              <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#5aa4f4] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#100425]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Login / Orders */}
            {session ? (
              <Link
                to="/orders"
                className="border border-white text-white rounded-[50px] px-6 py-2 hover:bg-white hover:text-[#100425] transition-all duration-200 whitespace-nowrap bg-white/10"
                style={NAV_FONT}
              >
                ORDERS
              </Link>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="border border-white text-white rounded-[50px] px-6 py-2 hover:bg-white hover:text-[#100425] transition-all duration-200 whitespace-nowrap"
                style={NAV_FONT}
              >
                LOGIN
              </button>
            )}
          </nav>

          {/* Mobile right actions */}
          <div className="flex items-center gap-4 lg:hidden">
            <button 
              aria-label="Cart" 
              className="text-white hover:text-[#5aa4f4] transition-colors relative"
              onClick={() => setIsCartOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#5aa4f4] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#100425]">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="text-white p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          className="lg:hidden bg-[#000000] border-t border-white/10 px-6 py-6 flex flex-col gap-5"
          style={NAV_FONT}
        >
          <Link to="/" className={linkClass('/')} style={NAV_FONT} onClick={() => setMenuOpen(false)}>HOME</Link>
          <Link to="/shop" className={linkClass('/shop')} style={NAV_FONT} onClick={() => setMenuOpen(false)}>SHOP</Link>
          <Link to="/blogs" className={linkClass('/blogs')} style={NAV_FONT} onClick={() => setMenuOpen(false)}>BLOGS</Link>
          <Link to="/about" className={linkClass('/about')} style={NAV_FONT} onClick={() => setMenuOpen(false)}>ABOUT US</Link>

          {session ? (
            <Link
              to="/orders"
              className="text-center border border-white text-white rounded-[50px] px-6 py-2 hover:bg-white hover:text-[#100425] transition-all duration-200 mt-2 bg-white/10"
              style={NAV_FONT}
              onClick={() => setMenuOpen(false)}
            >
              ORDERS
            </Link>
          ) : (
            <button
              onClick={() => {
                setIsLoginOpen(true);
                setMenuOpen(false);
              }}
              className="text-center border border-white text-white rounded-[50px] px-6 py-2 hover:bg-white hover:text-[#100425] transition-all duration-200 mt-2"
              style={NAV_FONT}
            >
              LOGIN
            </button>
          )}
        </div>
      )}
      
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}
