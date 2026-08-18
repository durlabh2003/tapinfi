import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import imgLogo from '../../imports/Frame1-1/f00b995e56d83fe3818dbb20f3489f43c9842118.png';
import { useCart } from '../context/CartContext';
import LoginModal from './LoginModal';
import { ChevronRight, Mail, Phone } from 'lucide-react';

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
  const headerRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu on page navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Click-outside dismissal for desktop header
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Scroll listener for sticky header animation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);

      // Keep navbar visible if mobile dropdown menu is open
      if (menuOpen) {
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY <= 50) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, menuOpen]);

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

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'SHOP', path: '/shop' },
    { label: 'BLOGS', path: '/blogs' },
    { label: 'ABOUT US', path: '/about' },
  ];

  return (
    <div
      ref={headerRef}
      className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Main bar */}
      <div
        className={`h-[80px] lg:h-[90px] flex items-center transition-all duration-300 ${
          isScrolled || menuOpen
            ? 'bg-[#020617]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : isHome
            ? 'bg-transparent'
            : 'bg-[#020617] border-b border-white/5'
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between px-4 sm:px-8 lg:px-[86px]">
          {/* Logo */}
          <Link to="/" className="h-[34px] sm:h-[37px] w-[90px] sm:w-[97px] shrink-0 relative overflow-hidden">
            <img
              alt="Tapinfi Logo"
              src={imgLogo}
              className="absolute h-[100.18%] left-[-33.59%] max-w-none top-[-0.09%] w-[133.59%]"
            />
          </Link>

          {/* Desktop nav — hidden below lg */}
          <nav className="hidden lg:flex items-center gap-10" style={NAV_FONT}>
            <div className="flex items-center gap-10">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} className={linkClass(item.path)} style={NAV_FONT}>
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Cart icon */}
            <button 
              aria-label="Cart" 
              className="text-white hover:text-[#5aa4f4] transition-colors relative p-1"
              onClick={() => setIsCartOpen(true)}
            >
              <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#5aa4f4] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#100425]">
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
              <a
                href="https://tapinfi.vercel.app/"
                className="border border-white text-white rounded-[50px] px-6 py-2 hover:bg-white hover:text-[#100425] transition-all duration-200 whitespace-nowrap"
                style={NAV_FONT}
              >
                LOGIN
              </a>
            )}
          </nav>

          {/* Mobile right actions */}
          <div className="flex items-center gap-3 lg:hidden">
            <button 
              aria-label="Cart" 
              className="text-white hover:text-[#5aa4f4] transition-colors relative p-2"
              onClick={() => setIsCartOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#5aa4f4] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#100425]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger Toggle Button with stopPropagation */}
            <button
              className="text-white p-2.5 rounded-full hover:bg-white/10 transition-all active:scale-95 cursor-pointer relative z-[110]"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(prev => !prev);
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop & Navigation Drawer */}
      {menuOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 top-[80px] lg:top-[90px] bg-black/70 backdrop-blur-md z-[80] lg:hidden"
            onClick={() => setMenuOpen(false)}
          />

          {/* Full-screen drawer */}
          <div
            className="fixed inset-x-0 top-[80px] lg:top-[90px] bottom-0 bg-[#020617] z-[90] lg:hidden flex flex-col justify-between p-6 sm:p-8 border-t border-white/10 overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300"
          >
            {/* Navigation Links */}
            <nav className="flex flex-col space-y-4 pt-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-200 font-['Poppins',sans-serif] ${
                      isActive 
                        ? 'bg-[#5aa4f4]/15 border border-[#5aa4f4]/40 text-[#5aa4f4] font-bold' 
                        : 'text-white/90 hover:bg-white/5 hover:text-white font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isActive && <span className="w-2 h-2 rounded-full bg-[#5aa4f4] shadow-[0_0_10px_#5aa4f4]" />}
                      <span className="text-xl tracking-wider">{item.label}</span>
                    </div>
                    <ChevronRight className={`w-5 h-5 ${isActive ? 'text-[#5aa4f4]' : 'text-white/40'}`} />
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Actions & Support info */}
            <div className="space-y-6 pt-6 border-t border-white/10 mt-auto">
              {session ? (
                <Link
                  to="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="w-full h-14 bg-[#5aa4f4] text-white font-['Poppins',sans-serif] font-bold rounded-2xl flex items-center justify-center gap-2 text-lg shadow-lg shadow-[#5aa4f4]/30 hover:bg-[#4a94e4] transition-all"
                >
                  MY ORDERS
                </Link>
              ) : (
                <a
                  href="https://tapinfi.vercel.app/"
                  onClick={() => setMenuOpen(false)}
                  className="w-full h-14 bg-gradient-to-r from-[#5aa4f4] to-[#0e2d6e] text-white font-['Poppins',sans-serif] font-bold rounded-2xl flex items-center justify-center gap-2 text-lg shadow-lg shadow-[#5aa4f4]/20 hover:opacity-95 transition-all"
                >
                  LOGIN TO DASHBOARD
                </a>
              )}

              <div className="grid grid-cols-2 gap-3 text-xs text-white/60 pt-2 font-['Inter',sans-serif]">
                <a href="mailto:support@tapinfi.com" className="flex items-center gap-2 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <Mail className="w-4 h-4 text-[#5aa4f4]" />
                  <span className="truncate">Email Us</span>
                </a>
                <a href="tel:+917340181915" className="flex items-center gap-2 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <Phone className="w-4 h-4 text-[#5aa4f4]" />
                  <span>+91 7340181915</span>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
      
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}
