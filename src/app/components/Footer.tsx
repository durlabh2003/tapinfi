import { Link } from 'react-router-dom';

import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#100425] py-16 px-4 sm:px-8 lg:px-20 border-t border-white/5">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20 mb-16">
          {/* Column 1: Brand & Contact */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5aa4f4] to-[#0e2d6e]" />
              <span className="text-xl font-bold tracking-tighter text-white font-['Poppins']">TAPINFI</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed font-['Inter'] max-w-xs">
              Redefining networking with eco-friendly smart business cards. Make every connection sustainable and powerful.
            </p>
            <div className="space-y-3">
              <p className="text-white/80 text-sm font-bold font-['Poppins'] uppercase tracking-widest">Support Hotline</p>
              <p className="text-white text-lg font-bold font-['Inter']">+91 98878 24058</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm font-['Poppins'] uppercase tracking-widest">Platform</h4>
              <nav className="flex flex-col gap-3">
                <Link to="/shop" className="text-white/60 hover:text-[#5aa4f4] text-sm transition-colors font-['Inter']">Shop</Link>
                <Link to="/blogs" className="text-white/60 hover:text-[#5aa4f4] text-sm transition-colors font-['Inter']">Blogs</Link>
                <Link to="/about" className="text-white/60 hover:text-[#5aa4f4] text-sm transition-colors font-['Inter']">About Us</Link>
                <Link to="/contact" className="text-white/60 hover:text-[#5aa4f4] text-sm transition-colors font-['Inter']">Contact Us</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm font-['Poppins'] uppercase tracking-widest">Account</h4>
              <nav className="flex flex-col gap-3">
                <Link to="/orders" className="text-white/60 hover:text-[#5aa4f4] text-sm transition-colors font-['Inter']">My Orders</Link>
                <Link to="/login" className="text-white/60 hover:text-[#5aa4f4] text-sm transition-colors font-['Inter']">Login / Sign Up</Link>
              </nav>
            </div>
          </div>

          {/* Column 3: Corporate */}
          <div className="space-y-6 sm:text-left lg:text-right">
            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm font-['Poppins'] uppercase tracking-widest">Official Inquiry</h4>
              <a href="mailto:tapinfi@gmail.com" className="text-[#5aa4f4] text-lg font-bold hover:underline font-['Inter']">tapinfi@gmail.com</a>
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

