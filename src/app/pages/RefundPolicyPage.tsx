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
        // If the top of the section is near or above the viewport scroll line
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
    { id: 'non-refundable', label: '2. Non-Refundable Items' },
    { id: 'damaged-defective', label: '3. Damaged or Defective' },
    { id: 'replacement-eligibility', label: '4. Replacement Eligibility' },
    { id: 'refund-processing', label: '5. Refund Processing Time' },
    { id: 'shipping-charges', label: '6. Shipping Charges' },
    { id: 'return-conditions', label: '7. Return Conditions' },
    { id: 'digital-services', label: '8. Digital Services' },
    { id: 'bulk-enterprise', label: '9. Bulk & Enterprise Orders' },
    { id: 'fraudulent-claims', label: '10. Fraudulent Claims' },
    { id: 'changes-policy', label: '11. Changes to Policy' },
    { id: 'contact-support', label: '12. Contact Support' },
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
                className="text-[36px] sm:text-[48px] lg:text-[56px] text-white font-bold leading-tight mb-4"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Refund Policy
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={80}>
              <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-slate-300 font-['Inter']">
                <span><strong>Effective Date:</strong> 18 May 2026</span>
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full hidden sm:inline" />
                <span><strong>Company:</strong> Tapinfi Solutions Private Limited</span>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ── Document Container ─────────────────────────── */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-20 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
            
            {/* ── Sticky Navigation Sidebar ───────────────── */}
            <aside className="hidden lg:block lg:col-span-1 sticky top-[130px] max-h-[calc(100vh-170px)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-200">
              <h4 className="text-slate-400 font-black text-xs font-['Poppins'] uppercase tracking-[0.2em] mb-6">
                Table of Contents
              </h4>
              <nav className="flex flex-col gap-2 font-['Inter'] text-sm">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer ${
                      activeSection === item.id
                        ? 'bg-[#5aa4f4]/10 text-[#0e2d6e] font-semibold border-l-4 border-[#5aa4f4]'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </aside>

            {/* ── Document Content Column ───────────────────── */}
            <div className="lg:col-span-3 bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-100/50 font-['Inter'] text-[16px] text-slate-700 leading-relaxed space-y-12">
              
              {/* Introduction Section */}
              <section id="introduction" className="scroll-mt-32 space-y-6">
                <p className="text-lg text-slate-800 font-medium">
                  At Tapinfi, we strive to provide high-quality NFC networking products and digital solutions. This Refund Policy outlines the conditions under which refunds, cancellations, and replacements may be provided for purchases made through our website or associated platforms.
                </p>
                <p>
                  By placing an order with Tapinfi, you agree to this Refund Policy.
                </p>
                <div className="h-px bg-slate-200/80 my-8" />
              </section>

              {/* 1. Order Cancellation */}
              <section id="order-cancellation" className="scroll-mt-32 space-y-6">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  1. Order Cancellation
                </h2>
                
                <div className="space-y-3 pl-4 border-l-2 border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800">1.1 Cancellation Before Production</h3>
                  <p>Orders may be canceled before customization, printing, or production begins.</p>
                  <p className="text-sm text-slate-500 italic">
                    Eligible cancellations may receive a refund after deduction of applicable payment gateway, transaction, or processing charges.
                  </p>
                </div>

                <div className="space-y-3 pl-4 border-l-2 border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800">1.2 Cancellation After Production Begins</h3>
                  <p>Once production, printing, customization, or digital setup has started, orders cannot be canceled.</p>
                  <p className="text-sm font-semibold text-rose-600">This includes:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-none pl-0">
                    {[
                      'Customized NFC cards',
                      'Personalized digital profiles',
                      'Team cards',
                      'Event cards and passes',
                      'Corporate bulk orders',
                      'Custom branding or printing work',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* 2. Non-Refundable Products & Services */}
              <section id="non-refundable" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  2. Non-Refundable Products & Services
                </h2>
                <p>The following items and services are non-refundable unless proven defective:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                  {[
                    'Customized or personalized products',
                    'Digital profile setup charges',
                    'Subscription or onboarding fees',
                    'Design and customization services',
                    'Bulk manufacturing orders',
                    'Used, damaged, or altered products',
                    'Digital services already delivered or activated',
                  ].map((p, i) => (
                    <div key={i} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/50 text-sm">
                      <span className="w-2 h-2 bg-rose-400 rounded-full" />
                      <span className="font-semibold text-slate-800">{p}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 3. Damaged or Defective Products */}
              <section id="damaged-defective" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  3. Damaged or Defective Products
                </h2>
                <p>If a product arrives damaged, defective, or non-functional:</p>
                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] font-bold">•</span>
                    <span>The issue must be reported within <strong>48 hours</strong> of delivery.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] font-bold">•</span>
                    <span>Users may be required to provide clear photos or videos for verification.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] font-bold">•</span>
                    <span>After verification, Tapinfi may provide: a replacement, repair support, or a partial/full refund (where applicable).</span>
                  </li>
                </ul>
                <p className="bg-amber-50 text-amber-900 border-l-4 border-amber-500 p-4 rounded-r-xl text-sm font-semibold mt-4">
                  Claims submitted beyond the 48-hour reporting period may not qualify for a refund or replacement.
                </p>
              </section>

              {/* 4. Replacement Eligibility */}
              <section id="replacement-eligibility" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  4. Replacement Eligibility
                </h2>
                <p>Replacement requests may be approved for:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4 text-sm">
                  {['Manufacturing defects', 'NFC functionality issues', 'Wrong item delivered', 'Transit damage caused during shipping'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg text-slate-700">
                      <span className="text-[#5aa4f4] font-bold">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-500 text-xs italic">Tapinfi reserves the right to inspect and verify all claims before approval.</p>
              </section>

              {/* 5. Refund Processing Time */}
              <section id="refund-processing" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  5. Refund Processing Time
                </h2>
                <p>Approved refunds are generally processed through the original payment method used during purchase.</p>
                <p>Refund timelines may vary depending on: Banks, UPI providers, Payment gateways, and Financial institutions.</p>
                <p className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl text-blue-900 text-sm font-semibold">
                  Typically, approved refunds may take 5–15 business days to reflect in your account.
                </p>
              </section>

              {/* 6. Shipping Charges */}
              <section id="shipping-charges" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  6. Shipping Charges
                </h2>
                <p>Shipping and delivery charges are generally non-refundable except in cases where:</p>
                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] font-bold">•</span>
                    <span>An incorrect product was delivered.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] font-bold">•</span>
                    <span>The product was damaged during transit.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] font-bold">•</span>
                    <span>The issue occurred due to Tapinfi’s error.</span>
                  </li>
                </ul>
              </section>

              {/* 7. Return Conditions */}
              <section id="return-conditions" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  7. Return Conditions
                </h2>
                <p>Approved returns must meet the following criteria:</p>
                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] font-bold">•</span>
                    <span>Be unused and undamaged where applicable.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] font-bold">•</span>
                    <span>Include original packaging and accessories.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] font-bold">•</span>
                    <span>Be securely packed for return shipment.</span>
                  </li>
                </ul>
                <p className="text-slate-600 italic">Tapinfi reserves the right to reject returns that fail to meet these conditions.</p>
              </section>

              {/* 8. Digital Products & Services */}
              <section id="digital-services" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  8. Digital Products & Services
                </h2>
                <p>
                  Digital setup services, onboarding, customization work, profile creation, analytics setup, and related digital services are non-refundable once delivered or activated.
                </p>
              </section>

              {/* 9. Bulk & Enterprise Orders */}
              <section id="bulk-enterprise" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  9. Bulk & Enterprise Orders
                </h2>
                <p>
                  Corporate, enterprise, reseller, or bulk orders may be governed by separate agreements or contracts.
                </p>
                <p>
                  In such cases, the mutually agreed contractual terms shall prevail over this refund policy.
                </p>
              </section>

              {/* 10. Fraudulent or Misleading Claims */}
              <section id="fraudulent-claims" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  10. Fraudulent or Misleading Claims
                </h2>
                <p>Tapinfi reserves the right to deny refunds or replacements in cases involving:</p>
                <ul className="space-y-2 list-none pl-0">
                  {['False or misleading claims', 'Intentional product damage', 'Misuse of products', 'Repeated suspicious refund requests', 'Abuse of refund systems'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 11. Changes to Refund Policy */}
              <section id="changes-policy" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  11. Changes to Refund Policy
                </h2>
                <p>
                  Tapinfi may modify or update this Refund Policy at any time without prior notice. Updated versions will be published on the website with the revised effective date.
                </p>
              </section>

              {/* 12. Contact Support */}
              <section id="contact-support" className="scroll-mt-32 space-y-6">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  12. Contact Support
                </h2>
                <p>
                  For refund, replacement, cancellation, or return-related assistance, users may contact Tapinfi through the official website contact channels.
                </p>
                
                <div className="bg-gradient-to-br from-[#5aa4f4]/5 to-[#0e2d6e]/5 border border-slate-200 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Tapinfi Solutions Pvt. Ltd.</p>
                    <p className="text-slate-500 text-xs mt-1">Official Legal Channel</p>
                  </div>
                  <a
                    href="mailto:support@tapinfi.com"
                    className="bg-gradient-to-r from-[#5aa4f4] to-[#0e2d6e] text-white px-6 py-2.5 rounded-full text-xs font-semibold hover:opacity-95 hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    Email Support
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
