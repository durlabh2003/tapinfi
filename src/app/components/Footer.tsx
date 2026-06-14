import { Link } from 'react-router-dom';
import imgLogo from '../../imports/Frame1-1/f00b995e56d83fe3818dbb20f3489f43c9842118.png';

export default function Footer() {
  return (
    <footer className="bg-[#000000] py-16 px-4 sm:px-8 lg:px-20 border-t border-white/5">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20 mb-16">
          {/* Column 1: Brand & Contact */}
          <div className="space-y-6">
            <Link to="/" className="h-[37px] w-[97px] block relative overflow-hidden">
              <img
                alt="Tapinfi Logo"
                src={imgLogo}
                className="absolute h-[100.18%] left-[-33.59%] max-w-none top-[-0.09%] w-[133.59%]"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed font-['Inter'] max-w-xs">
              Redefining networking with eco-friendly smart business cards. Make every connection sustainable and powerful.
            </p>
            <div className="space-y-3">
              <p className="text-white/80 text-sm font-bold font-['Poppins'] uppercase tracking-widest">Support Helpline</p>
              <p className="text-white text-lg font-bold font-['Inter']">+91 73401 81915</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-[#5aa4f4] font-black text-sm font-['Poppins'] uppercase tracking-[0.2em]">Platform</h4>
              <nav className="flex flex-col gap-3">
                <Link to="/shop" className="text-white/60 hover:text-white text-sm transition-colors font-['Inter']">Shop</Link>
                <Link to="/blogs" className="text-white/60 hover:text-white text-sm transition-colors font-['Inter']">Blogs</Link>
                <Link to="/about" className="text-white/60 hover:text-white text-sm transition-colors font-['Inter']">About Us</Link>
                <Link to="/contact" className="text-white/60 hover:text-white text-sm transition-colors font-['Inter']">Contact Us</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="text-[#5aa4f4] font-black text-sm font-['Poppins'] uppercase tracking-[0.2em]">Account</h4>
              <nav className="flex flex-col gap-3">
                <Link to="/orders" className="text-white/60 hover:text-white text-sm transition-colors font-['Inter']">My Orders</Link>
                <a href="https://tapinfi.vercel.app/" className="text-white/60 hover:text-white text-sm transition-colors font-['Inter']">Login / Sign Up</a>
              </nav>
            </div>
          </div>

          {/* Column 3: Corporate */}
          <div className="space-y-6 sm:text-left lg:text-right">
            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm font-['Poppins'] uppercase tracking-widest">Official Inquiry</h4>
              <a href="mailto:support@tapinfi.com" className="text-[#5aa4f4] text-lg font-bold hover:underline font-['Inter']">support@tapinfi.com</a>
            </div>
            <div className="space-y-2">
              <p className="text-white/40 text-xs font-['Inter']">Powered By</p>
              <p className="text-white/80 text-sm font-bold font-['Poppins']">Tapinfi Solutions Pvt. Ltd.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-xs font-['Inter']">
            &copy; 2025 Tapinfi. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/refund-policy" className="text-white/40 hover:text-white text-xs transition-colors font-['Inter']">Refund Policy</Link>
            <Link to="/privacy-policy" className="text-white/40 hover:text-white text-xs transition-colors font-['Inter']">Privacy Policy</Link>
            <Link to="/terms" className="text-white/40 hover:text-white text-xs transition-colors font-['Inter']">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

