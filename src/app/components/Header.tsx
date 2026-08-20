import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import imgLogo from '../../imports/Frame1-1/f00b995e56d83fe3818dbb20f3489f43c9842118.png';
import { useCart } from '../context/CartContext';
import LoginModal from './LoginModal';
import { Home, ShoppingBag, FileText, Users, LogIn, Package, X, Menu } from 'lucide-react';

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

  // Click-outside dismissal for mobile dropdown and desktop header
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

      // Keep navbar 100% visible if mobile dropdown menu is open
      if (menuOpen) {
        setVisible(true);
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
    { label: 'Home', path: '/', icon: Home },
    { label: 'Shop', path: '/shop', icon: ShoppingBag },
    { label: 'Blog', path: '/blogs', icon: FileText },
    { label: 'About Us', path: '/about', icon: Users },
  ];

  return (
    <div
      ref={headerRef}
      className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-300 ${
        visible || menuOpen ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Main bar */}
      <div
        className={`h-[80px] lg:h-[90px] flex items-center transition-all duration-300 ${
          isScrolled || menuOpen || !isHome
            ? 'bg-[#040817] border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-transparent'
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
                  {item.label.toUpperCase()}
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
          <div className="flex items-center gap-4 lg:hidden">
            <button 
              aria-label="Cart" 
              className="text-white hover:text-[#5aa4f4] transition-colors relative p-1.5"
              onClick={() => setIsCartOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[#5aa4f4] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#100425]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger / Close Circular Toggle Button matching screenshot */}
            <button
              className={`w-10 h-10 rounded-full border transition-all flex items-center justify-center cursor-pointer relative z-[110] active:scale-95 ${
                menuOpen
                  ? 'border-white/80 bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                  : 'border-white/50 bg-white/5 text-white hover:bg-white/10 hover:border-white/70'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setVisible(true);
                setMenuOpen(prev => !prev);
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Popover Dropdown Card */}
      {menuOpen && (
        <div className="absolute top-[76px] right-4 sm:right-8 w-64 bg-[#080d1e]/98 backdrop-blur-2xl border border-white/15 rounded-2xl p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.85)] z-[120] lg:hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Top Notch / Triangular Arrow pointing to circular button */}
          <div className="absolute -top-[7px] right-[14px] w-3.5 h-3.5 bg-[#080d1e] rotate-45 border-t border-l border-white/15" />

          <nav className="flex flex-col gap-1 relative z-20">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#182645] text-[#5aa4f4] font-semibold'
                      : 'text-white/90 hover:bg-white/10 hover:text-white font-medium'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#5aa4f4]' : 'text-white/90'}`} />
                  <span className="text-base tracking-wide">{item.label}</span>
                </Link>
              );
            })}

            <div className="h-[1px] bg-white/10 my-1.5" />

            {session ? (
              <Link
                to="/orders"
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all ${
                  location.pathname.startsWith('/orders')
                    ? 'bg-[#182645] text-[#5aa4f4] font-semibold'
                    : 'text-white/90 hover:bg-white/10 hover:text-white font-medium'
                }`}
              >
                <Package className={`w-5 h-5 ${location.pathname.startsWith('/orders') ? 'text-[#5aa4f4]' : 'text-white/90'}`} />
                <span className="text-base tracking-wide">My Orders</span>
              </Link>
            ) : (
              <a
                href="https://tapinfi.vercel.app/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-white/90 hover:bg-white/10 hover:text-white font-medium transition-all"
              >
                <LogIn className="w-5 h-5 text-white/90" />
                <span className="text-base tracking-wide">Login</span>
              </a>
            )}
          </nav>
        </div>
      )}
      
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}


