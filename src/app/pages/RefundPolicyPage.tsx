import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';

export default function RefundPolicyPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    // Light body background - premium look
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#fdfdfd';
    return () => {
      document.body.style.backgroundColor = prev;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'introduction';
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 160) {
          currentSection = section.getAttribute('id') || 'introduction';
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Sticky header offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  const menuItems = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'order-cancellation', label: '1. Order Cancellation' },
    { id: 'return-eligibility', label: '2. Return Eligibility' },
    { id: 'return-period', label: '3. Return Period' },
    { id: 'customized-products', label: '4. Customized Products' },
    { id: 'damaged-defective', label: '5. Damaged or Defective' },
    { id: 'replacement-eligibility', label: '6. Replacement Eligibility' },
    { id: 'nfc-functionality', label: '7. NFC Functionality' },
    { id: 'digital-products', label: '8. Digital Services' },
    { id: 'subscription-fees', label: '9. Subscription Fees' },
    { id: 'bulk-orders', label: '10. Bulk & Enterprise' },
    { id: 'return-shipping', label: '11. Return Shipping' },
    { id: 'non-refundable', label: '12. Non-Refundable Items' },
    { id: 'customer-damage', label: '13. Customer Damage' },
    { id: 'return-process', label: '14. Return Request Process' },
    { id: 'refund-processing', label: '15. Refund Processing' },
    { id: 'partial-refunds', label: '16. Partial Refunds' },
    { id: 'shipping-charges', label: '17. Shipping Charges' },
    { id: 'delivery-inspection', label: '18. Delivery & Inspection' },
    { id: 'fraudulent-claims', label: '19. Fraudulent Claims' },
    { id: 'marketplace-purchases', label: '20. Marketplace Purchases' },
    { id: 'consumer-rights', label: '21. Consumer Rights' },
    { id: 'policy-changes', label: '22. Policy Changes' },
    { id: 'contact-support', label: '23. Contact & Support' },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Header />

      <main className="pt-[110px]">
        {/* ── Header Banner ───────────────────────────────── */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0e2d6e] to-[#020617] py-20 px-4 sm:px-8 lg:px-20 text-center text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#5aa4f4]/20 rounded-full blur-[80px]" />
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-[80px]" />
          
          <div className="max-w-[1280px] mx-auto relative z-10">
            <ScrollReveal animation="fade-up">
              <span className="text-[#5aa4f4] text-xs font-black tracking-[0.3em] uppercase block mb-3 font-['Poppins']">
                Legal & Governance
              </span>
              <h1
                className="text-[32px] sm:text-[44px] lg:text-[54px] text-white font-bold leading-tight mb-4"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Refund & Return Policy
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={80}>
              <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-slate-300 font-['Inter']">
                <span><strong>Effective Date:</strong> 20 August 2026</span>
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full hidden sm:inline" />
                <span><strong>Company:</strong> Tapinfi Solutions Pvt. Ltd.</span>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ── Document Container ─────────────────────────── */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-20 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
            
            {/* ── Sticky Navigation Sidebar ───────────────── */}
            <aside className="hidden lg:block lg:col-span-1 sticky top-[130px] max-h-[calc(100vh-170px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
              <h4 className="text-slate-400 font-black text-xs font-['Poppins'] uppercase tracking-[0.2em] mb-4">
                Table of Contents
              </h4>
              <nav className="flex flex-col gap-1 font-['Inter'] text-xs">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer truncate ${
                      activeSection === item.id
                        ? 'bg-[#5aa4f4]/15 text-[#0e2d6e] font-semibold border-l-4 border-[#5aa4f4]'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </aside>

            {/* ── Document Content Column ───────────────────── */}
            <div className="lg:col-span-3 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-12 shadow-xl shadow-slate-100/50 font-['Inter'] text-[15px] sm:text-[16px] text-slate-700 leading-relaxed space-y-12">
              
              {/* Introduction Section */}
              <section id="introduction" className="scroll-mt-32 space-y-4">
                <p className="text-lg text-slate-800 font-medium">
                  At <strong>Tapinfi Solutions Pvt. Ltd.</strong>, we are committed to providing high-quality NFC networking products, smart business cards, digital profiles, and related digital solutions.
                </p>
                <p>
                  This Refund & Return Policy explains the conditions under which customers may request order cancellations, returns, replacements, or refunds for products and services purchased through the Tapinfi website or other authorized sales channels.
                </p>
                <p className="text-slate-600 font-medium">
                  By placing an order with Tapinfi, you acknowledge that you have read and agreed to this policy.
                </p>
                <div className="h-px bg-slate-200/80 my-8" />
              </section>

              {/* 1. Order Cancellation */}
              <section id="order-cancellation" className="scroll-mt-32 space-y-6">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  1. Order Cancellation
                </h2>
                
                <div className="space-y-3 pl-4 border-l-2 border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800">1.1 Cancellation Before Production</h3>
                  <p>Customers may request cancellation of an order before customization, printing, personalization, or production has started.</p>
                  <p className="text-sm text-slate-500 italic">
                    Eligible cancellations may qualify for a refund after deduction of applicable payment gateway, transaction, processing, or other charges, where applicable. Cancellation requests should be submitted as soon as possible after placing the order.
                  </p>
                </div>

                <div className="space-y-3 pl-4 border-l-2 border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800">1.2 Cancellation After Production Begins</h3>
                  <p>Once customization, printing, personalization, digital profile setup, or production has started, the order generally cannot be cancelled.</p>
                  <p className="text-sm font-semibold text-rose-600">This includes, but is not limited to:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-none pl-0">
                    {[
                      'Customized NFC business cards',
                      'Personalized digital profiles',
                      'Team or employee cards',
                      'Event cards and passes',
                      'Corporate and bulk orders',
                      'Custom branding and printing',
                      'Personalized designs',
                      'Digital profile configuration',
                      'Customized products or services',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-slate-500 italic mt-2">
                    If production has already started based on information or specifications provided by the customer, cancellation may not be possible.
                  </p>
                </div>
              </section>

              {/* 2. Return Eligibility */}
              <section id="return-eligibility" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  2. Return Eligibility
                </h2>
                <p>Returns may be accepted only for eligible products and under the conditions specified in this policy.</p>
                <p className="font-semibold text-slate-800">To qualify for a return, the product should generally:</p>
                <div className="grid grid-cols-1 gap-3 my-4">
                  {[
                    'Be unused and in its original condition',
                    'Not have been intentionally damaged, modified, or altered',
                    'Include original packaging and accessories, where applicable',
                    'Be securely packed for return shipment',
                    'Be accompanied by valid order details or proof of purchase',
                  ].map((p, i) => (
                    <div key={i} className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 text-sm">
                      <span className="w-2 h-2 bg-[#5aa4f4] rounded-full" />
                      <span className="font-medium text-slate-800">{p}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-500 italic">
                  Tapinfi may inspect the returned product before approving a refund or replacement. Returns that do not meet the applicable eligibility conditions may be rejected.
                </p>
              </section>

              {/* 3. Return Period */}
              <section id="return-period" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  3. Return Period
                </h2>
                <p>
                  Eligible return requests should generally be submitted within <strong>7 days from the date of delivery</strong>, unless a different period is specifically mentioned for a particular product or order.
                </p>
                <div className="bg-amber-50 text-amber-950 border-l-4 border-amber-500 p-4 rounded-r-xl text-sm space-y-1">
                  <p className="font-bold">Damaged, Defective, or Non-Functional Report Window:</p>
                  <p>
                    For products that arrive damaged, defective, or non-functional, customers should report the issue within <strong>48 hours of delivery</strong> to allow Tapinfi to properly investigate the matter.
                  </p>
                </div>
                <p className="text-xs text-slate-500 italic">
                  The applicable return or defect reporting period may vary depending on the product, order type, or sales channel.
                </p>
              </section>

              {/* 4. Customized & Personalized Products */}
              <section id="customized-products" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  4. Customized & Personalized Products
                </h2>
                <p>
                  Tapinfi offers customized and personalized NFC products that may be produced according to information, designs, branding, and specifications provided by the customer.
                </p>
                <p className="font-semibold text-rose-700 bg-rose-50 border border-rose-200 p-4 rounded-xl">
                  Customized or personalized products are generally <strong>not eligible for return or refund once production has started</strong>, except where the product is defective, incorrectly manufactured, incorrectly supplied, or otherwise affected by an issue attributable to Tapinfi.
                </p>
                <p className="text-sm font-semibold text-slate-800 pt-2">This includes situations where:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-none pl-0 text-sm text-slate-600">
                  {[
                    'Customer changes mind after production begins',
                    'Customer provides incorrect information',
                    'Customer provides incorrect contact details',
                    'Customer provides incorrect social media links',
                    'Customer approves an incorrect design',
                    'Customer requests changes after production started',
                    'Customer no longer requires the product',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-500 italic">
                  Customers are responsible for carefully reviewing and confirming the information and design details provided to Tapinfi before production.
                </p>
              </section>

              {/* 5. Damaged, Defective, or Non-Functional Products */}
              <section id="damaged-defective" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  5. Damaged, Defective, or Non-Functional Products
                </h2>
                <p>
                  If a product arrives damaged, defective, incorrectly manufactured, or non-functional, the customer should contact Tapinfi within <strong>48 hours of delivery</strong>.
                </p>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2 text-sm">
                  <p className="font-bold text-slate-800">Customers may be required to provide:</p>
                  <ul className="space-y-1 pl-4 list-disc text-slate-600">
                    <li>Order number</li>
                    <li>Clear photographs of the product</li>
                    <li>Video showing the issue, where applicable</li>
                    <li>Photographs of the packaging</li>
                    <li>A brief description of the problem</li>
                  </ul>
                </div>
                <p className="text-sm font-semibold text-slate-800">After reviewing and verifying the claim, Tapinfi may, at its discretion and where applicable, provide:</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
                  {['Replacement Product', 'Repair / Support', 'Partial Refund', 'Full Refund'].map((opt, i) => (
                    <div key={i} className="bg-[#5aa4f4]/10 text-[#0e2d6e] font-bold p-3 rounded-xl border border-[#5aa4f4]/30">
                      {opt}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 italic">
                  The resolution will depend on the nature of the issue, product availability, and the circumstances of the claim.
                </p>
              </section>

              {/* 6. Replacement Eligibility */}
              <section id="replacement-eligibility" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  6. Replacement Eligibility
                </h2>
                <p>A replacement may be considered in cases including:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3 text-sm">
                  {[
                    'Manufacturing defects',
                    'NFC functionality failure attributable to the product',
                    'Wrong product delivered',
                    'Incorrect product manufactured by Tapinfi',
                    'Product damaged during transit',
                    'Significant quality issues attributable to Tapinfi',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg text-slate-700">
                      <span className="text-[#5aa4f4] font-bold">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 italic">
                  Tapinfi reserves the right to inspect and verify the product and claim before approving a replacement. Minor variations in color, printing, material, or appearance that naturally occur due to manufacturing or display settings may not necessarily be considered defects.
                </p>
              </section>

              {/* 7. NFC Functionality */}
              <section id="nfc-functionality" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  7. NFC Functionality
                </h2>
                <p>Tapinfi NFC products are designed to provide contactless access to digital profiles and related information.</p>
                <p className="text-sm font-semibold text-slate-800">NFC performance may depend on factors outside Tapinfi's control, including:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600 pl-0 list-none">
                  {[
                    'Compatibility of smartphone',
                    'Device settings & NFC toggle',
                    'Mobile operating system',
                    'Browser/software configuration',
                    'Physical interference or metal cases',
                    'User handling or card bending',
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-slate-700">
                  If an NFC card does not function as expected, customers should contact Tapinfi Support so that the issue can be investigated. If determined to be a product defect, an appropriate replacement or resolution will be provided.
                </p>
              </section>

              {/* 8. Digital Products & Services */}
              <section id="digital-products" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  8. Digital Products & Services
                </h2>
                <p>Digital products and services provided by Tapinfi may include:</p>
                <div className="flex flex-wrap gap-2 my-2 text-xs">
                  {[
                    'Digital profile creation',
                    'Profile customization',
                    'Onboarding services',
                    'Digital profile configuration',
                    'Analytics setup',
                    'Team profile setup',
                    'Event profile setup',
                  ].map((s, i) => (
                    <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full font-medium">
                      {s}
                    </span>
                  ))}
                </div>
                <p className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-xl text-sm font-semibold text-rose-950">
                  Digital services that have already been delivered, activated, configured, or substantially completed are generally <strong>non-refundable</strong>.
                </p>
                <p className="text-xs text-slate-500 italic">
                  Where a digital service has not yet been started, Tapinfi may consider a cancellation request depending on the circumstances.
                </p>
              </section>

              {/* 9. Subscription & Onboarding Fees */}
              <section id="subscription-fees" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  9. Subscription & Onboarding Fees
                </h2>
                <p>
                  Subscription, onboarding, setup, configuration, or service fees may be non-refundable once the relevant service has been activated or delivered.
                </p>
                <p className="text-sm text-slate-600">
                  Where a subscription is involved, the applicable subscription terms may provide additional information regarding renewal, cancellation, and refund eligibility.
                </p>
              </section>

              {/* 10. Bulk, Corporate & Enterprise Orders */}
              <section id="bulk-orders" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  10. Bulk, Corporate & Enterprise Orders
                </h2>
                <p>
                  Corporate, enterprise, reseller, institutional, event, and bulk orders may be subject to separate quotations, purchase orders, agreements, or contracts.
                </p>
                <p className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-sm font-semibold text-blue-900">
                  Where separate contractual terms have been agreed in writing, those terms will govern the applicable cancellation, return, replacement, and refund conditions for that order.
                </p>
                <p className="text-xs text-slate-500 italic">
                  Bulk and customized manufacturing orders may not be eligible for cancellation or return once production has commenced.
                </p>
              </section>

              {/* 11. Return Shipping Charges */}
              <section id="return-shipping" className="scroll-mt-32 space-y-6">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  11. Return Shipping Charges
                </h2>
                
                <div className="space-y-3 pl-4 border-l-2 border-[#5aa4f4]">
                  <h3 className="text-base font-bold text-slate-800">11.1 Issue Attributable to Tapinfi</h3>
                  <p className="text-sm">
                    If the product was incorrectly supplied, defective due to manufacturing, damaged during transit, or incorrectly manufactured, Tapinfi may bear the applicable return shipping cost or provide appropriate shipping assistance, subject to verification.
                  </p>
                </div>

                <div className="space-y-3 pl-4 border-l-2 border-slate-300">
                  <h3 className="text-base font-bold text-slate-800">11.2 Issue Attributable to Customer</h3>
                  <p className="text-sm">
                    Where a return is accepted for an eligible reason that is not attributable to Tapinfi, the customer may be responsible for applicable return shipping costs. Shipping arrangements will be communicated by Tapinfi during the return process.
                  </p>
                </div>
              </section>

              {/* 12. Non-Refundable Products & Services */}
              <section id="non-refundable" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  12. Non-Refundable Products & Services
                </h2>
                <p>Unless otherwise required under applicable law or specifically approved by Tapinfi, the following are generally non-refundable once production or service delivery has commenced:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                  {[
                    'Customized NFC cards',
                    'Personalized products',
                    'Personalized digital profiles',
                    'Team cards',
                    'Event cards and passes',
                    'Corporate and bulk orders',
                    'Custom branding and printing',
                    'Design and customization services',
                    'Digital profile setup',
                    'Onboarding services',
                    'Analytics or profile configuration',
                    'Used, damaged, or altered products',
                  ].map((p, i) => (
                    <div key={i} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/50 text-sm">
                      <span className="w-2 h-2 bg-rose-400 rounded-full" />
                      <span className="font-semibold text-slate-800">{p}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 13. Products Damaged or Altered by the Customer */}
              <section id="customer-damage" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  13. Products Damaged or Altered by Customer
                </h2>
                <p>Refunds or replacements may not be available where damage or malfunction is caused by:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600 pl-0 list-none">
                  {[
                    'Misuse',
                    'Accidental damage after delivery',
                    'Improper storage',
                    'Unauthorized modification',
                    'Physical alteration',
                    'Tampering',
                    'Excessive bending or damage',
                    'Exposure to harsh conditions',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-500 italic">
                  Tapinfi may request photographs, videos, or other information to determine the cause of the issue.
                </p>
              </section>

              {/* 14. Return Request Process */}
              <section id="return-process" className="scroll-mt-32 space-y-6">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  14. Return Request Process
                </h2>
                <p>
                  To request a return, replacement, cancellation, or refund, customers should contact Tapinfi through the official support/contact channels provided on the website.
                </p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2">
                  <p className="font-bold text-slate-800">The request should include:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                    <span>• Customer Name</span>
                    <span>• Order Number</span>
                    <span>• Date of Purchase</span>
                    <span>• Product Details</span>
                    <span>• Reason for Request</span>
                    <span>• Photos/Videos (if applicable)</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-bold text-[#0e2d6e] font-['Poppins']">Step-by-Step Return Process</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                    {[
                      { step: 'Step 1', title: 'Submit Request', desc: 'Submit return/replacement request' },
                      { step: 'Step 2', title: 'Review', desc: 'Tapinfi reviews request & evidence' },
                      { step: 'Step 3', title: 'Instructions', desc: 'If approved, receive return steps' },
                      { step: 'Step 4', title: 'Return Item', desc: 'Ship product back where required' },
                      { step: 'Step 5', title: 'Inspection', desc: 'Tapinfi inspects returned product' },
                      { step: 'Step 6', title: 'Resolution', desc: 'Approved refund/replacement processed' },
                    ].map((s, i) => (
                      <div key={i} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                        <span className="text-[#5aa4f4] font-black uppercase text-[10px] block">{s.step}</span>
                        <span className="font-bold text-slate-800 block text-sm">{s.title}</span>
                        <span className="text-slate-500 mt-1 block">{s.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-amber-800 bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs font-semibold">
                  Customers should not ship products back without receiving return instructions from Tapinfi.
                </p>
              </section>

              {/* 15. Refund Processing */}
              <section id="refund-processing" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  15. Refund Processing
                </h2>
                <p>Approved refunds will generally be processed using the original payment method used for the purchase.</p>
                <p className="text-sm text-slate-600">
                  Refund processing times may vary depending on Banks, Payment gateways, UPI providers, Card networks, and Financial institutions.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-blue-900 text-sm font-semibold">
                  Once Tapinfi initiates an approved refund, it may generally take <strong>5–15 business days</strong> to reflect in the customer's account.
                </div>
                <p className="text-xs text-slate-500 italic">
                  Tapinfi is not responsible for delays caused by banks, payment gateways, or other third-party financial institutions.
                </p>
              </section>

              {/* 16. Partial Refunds */}
              <section id="partial-refunds" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  16. Partial Refunds
                </h2>
                <p>In certain circumstances, Tapinfi may provide a partial refund instead of a full refund. A partial refund may be considered where:</p>
                <ul className="space-y-2 list-none pl-0 text-sm text-slate-700">
                  {[
                    'Only part of an order is affected',
                    'The product has a minor verified defect',
                    'A partial resolution has been mutually agreed upon',
                    'The circumstances justify a partial refund',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-[#5aa4f4] font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 17. Shipping Charges */}
              <section id="shipping-charges" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  17. Shipping Charges
                </h2>
                <p>Original shipping and delivery charges are generally non-refundable.</p>
                <p className="text-sm text-slate-700 font-semibold">
                  However, shipping charges may be refunded or reimbursed where the issue occurred due to Tapinfi's error, such as:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
                  <span>✓ Incorrect product supplied</span>
                  <span>✓ Incorrect order fulfillment</span>
                  <span>✓ Verified manufacturing defect</span>
                  <span>✓ Significant transit damage</span>
                </div>
              </section>

              {/* 18. Order Delivery & Inspection */}
              <section id="delivery-inspection" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  18. Order Delivery & Inspection
                </h2>
                <p>Customers are encouraged to inspect their products promptly after delivery.</p>
                <p className="text-sm text-slate-700">
                  If the package appears significantly damaged at the time of delivery, customers should, where possible, document the condition of the package and product through photographs or video.
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  Any visible damage, missing item, wrong product, or significant defect should be reported to Tapinfi as soon as reasonably possible.
                </p>
              </section>

              {/* 19. Fraudulent or Misleading Claims */}
              <section id="fraudulent-claims" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  19. Fraudulent or Misleading Claims
                </h2>
                <p>Tapinfi reserves the right to investigate and deny refund or replacement requests where there is evidence of:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2 text-sm text-rose-700">
                  {[
                    'False or misleading claims',
                    'Intentional product damage',
                    'Product misuse',
                    'Unauthorized modifications',
                    'Repeated suspicious requests',
                    'Abuse of return/refund process',
                    'Fraudulent activity',
                    'Manipulated photos/videos',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                      <span className="font-bold">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 italic">
                  Where appropriate, Tapinfi may take further action in accordance with applicable laws and platform policies.
                </p>
              </section>

              {/* 20. Marketplace Purchases */}
              <section id="marketplace-purchases" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  20. Marketplace Purchases
                </h2>
                <p>
                  Products purchased through third-party marketplaces such as e-commerce platforms may also be subject to the return, refund, cancellation, and replacement policies of the respective marketplace.
                </p>
                <p className="text-sm text-slate-600">
                  In the event of a conflict between Tapinfi's policy and mandatory marketplace rules, the applicable marketplace rules may govern the transaction.
                </p>
              </section>

              {/* 21. Consumer Rights */}
              <section id="consumer-rights" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  21. Consumer Rights
                </h2>
                <p>
                  Nothing in this Refund & Return Policy is intended to limit or exclude any rights or remedies that customers may have under applicable consumer protection laws or other applicable laws and regulations.
                </p>
                <p className="text-sm text-slate-600">
                  Where applicable law provides a customer with rights beyond those described in this policy, such rights will continue to apply.
                </p>
              </section>

              {/* 22. Policy Changes */}
              <section id="policy-changes" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  22. Policy Changes
                </h2>
                <p>
                  Tapinfi Solutions Pvt. Ltd. reserves the right to modify, update, or revise this Refund & Return Policy from time to time.
                </p>
                <p className="text-sm text-slate-600">
                  Any updated version will be published on the Tapinfi website with the revised effective date. Customers are encouraged to review this page periodically.
                </p>
              </section>

              {/* 23. Contact & Support */}
              <section id="contact-support" className="scroll-mt-32 space-y-6">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  23. Contact & Support
                </h2>
                <p>
                  For questions or assistance regarding refunds, returns, replacements, order cancellations, damaged or defective products, digital services, or other order-related concerns, customers may contact Tapinfi through official support channels.
                </p>
                
                <div className="bg-gradient-to-br from-[#5aa4f4]/10 to-[#0e2d6e]/10 border border-slate-200 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <p className="font-bold text-slate-900 text-base">Tapinfi Solutions Pvt. Ltd.</p>
                    <p className="text-slate-500 text-xs mt-1">Official Legal & Support Channel</p>
                  </div>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=support@tapinfi.com&su=Inquiry%20regarding%20Tapinfi%20Refund%20%26%20Return%20Policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-[#5aa4f4] to-[#0e2d6e] text-white px-6 py-3 rounded-full text-xs font-semibold hover:opacity-95 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
                  >
                    Email Support (support@tapinfi.com)
                  </a>
                </div>
              </section>

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
