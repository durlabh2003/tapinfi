import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="bg-[#100425] py-16 px-20 mt-32">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex justify-between mb-8">
          <div>
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[16px] text-white mb-4">
              Quick Links
            </p>
            <div className="flex flex-col gap-2">
              <Link to="/shop" className="font-['Inter:Medium',sans-serif] font-medium text-[16px] text-white hover:text-[#5aa4f4] transition-colors">
                Shop
              </Link>
              <Link to="/blogs" className="font-['Inter:Medium',sans-serif] font-medium text-[16px] text-white hover:text-[#5aa4f4] transition-colors">
                Analytics
              </Link>
              <Link to="/orders" className="font-['Inter:Medium',sans-serif] font-medium text-[16px] text-white hover:text-[#5aa4f4] transition-colors">
                Your Orders
              </Link>
              <Link to="/contact" className="font-['Inter:Medium',sans-serif] font-medium text-[16px] text-white hover:text-[#5aa4f4] transition-colors">
                Contact Us
              </Link>
              <Link to="/plan" className="font-['Inter:Medium',sans-serif] font-medium text-[16px] text-white hover:text-[#5aa4f4] transition-colors">
                My Plan
              </Link>
            </div>
          </div>

          <div className="text-right">
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[16px] text-white mb-4">
              Contact Information
            </p>
            <a
              href="mailto:tapinfi@gmail.com"
              className="font-['Inter:Medium',sans-serif] font-medium text-[16px] text-white hover:text-[#5aa4f4] transition-colors"
            >
              tapinfi@gmail.com
            </a>
          </div>
        </div>

        <div className="w-full h-[1px] bg-white my-6"></div>

        <div className="flex justify-between items-center">
          <p className="font-['Inter:Medium',sans-serif] font-medium text-[16px] text-white">
            Tapinfi 2025. All Rights Reserved
          </p>
          <p className="font-['Inter:Medium',sans-serif] font-medium text-[16px] text-white">
            Powered By : Tapinfi Solutions Pvt. Ltd.
          </p>
          <div className="flex gap-6">
            <Link to="/refund-policy" className="font-['Inter:Medium',sans-serif] font-medium text-[16px] text-white hover:text-[#5aa4f4] transition-colors">
              Refund Policy
            </Link>
            <Link to="/privacy-policy" className="font-['Inter:Medium',sans-serif] font-medium text-[16px] text-white hover:text-[#5aa4f4] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="font-['Inter:Medium',sans-serif] font-medium text-[16px] text-white hover:text-[#5aa4f4] transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
