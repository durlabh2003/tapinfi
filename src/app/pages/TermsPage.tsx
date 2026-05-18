import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    // Dark body background - premium look
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
    { id: 'definitions', label: '1. Definitions' },
    { id: 'eligibility', label: '2. Eligibility' },
    { id: 'use-of-services', label: '3. Use of Services' },
    { id: 'product-info', label: '4. Product Information' },
    { id: 'orders-payments', label: '5. Orders & Payments' },
    { id: 'shipping-delivery', label: '6. Shipping & Delivery' },
    { id: 'user-accounts', label: '7. User Accounts' },
    { id: 'digital-profiles', label: '8. Digital Profiles & Content' },
    { id: 'analytics-tracking', label: '9. Analytics & Data Tracking' },
    { id: 'intellectual-property', label: '10. Intellectual Property' },
    { id: 'sustainability', label: '11. Sustainability Commitment' },
    { id: 'third-party', label: '12. Third-Party Services' },
    { id: 'limitation-liability', label: '13. Limitation of Liability' },
    { id: 'indemnification', label: '14. Indemnification' },
    { id: 'suspension-termination', label: '15. Suspension & Termination' },
    { id: 'privacy', label: '16. Privacy' },
    { id: 'governing-law', label: '17. Governing Law' },
    { id: 'changes-terms', label: '18. Changes to Terms' },
    { id: 'contact-info', label: '19. Contact Information' },
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
                Terms & Conditions
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
                  Welcome to Tapinfi. These Terms & Conditions govern your use of the Tapinfi website, products, services, NFC cards, digital profiles, and related solutions offered by Tapinfi Solutions Private Limited (“Tapinfi,” “we,” “our,” or “us”).
                </p>
                <p>
                  By accessing our website, placing an order, using our products, or interacting with our services, you agree to comply with and be legally bound by these Terms & Conditions.
                </p>
                <div className="h-px bg-slate-200/80 my-8" />
              </section>

              {/* 1. Definitions */}
              <section id="definitions" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  1. Definitions
                </h2>
                <ul className="space-y-4 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] mt-1 font-bold">•</span>
                    <span><strong>Platform</strong> refers to the Tapinfi website, applications, dashboard, digital profiles, and related services.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] mt-1 font-bold">•</span>
                    <span><strong>User</strong> refers to any individual, business, organization, or visitor using Tapinfi services.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] mt-1 font-bold">•</span>
                    <span><strong>NFC Card</strong> refers to Tapinfi smart cards and related NFC-enabled products.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] mt-1 font-bold">•</span>
                    <span><strong>Digital Profile</strong> refers to the digital landing page, contact profile, or networking profile associated with Tapinfi products.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] mt-1 font-bold">•</span>
                    <span><strong>Services</strong> include all Tapinfi offerings including NFC business cards, digital networking solutions, team cards, event passes, visitor cards, analytics, profile management, and related technologies.</span>
                  </li>
                </ul>
              </section>

              {/* 2. Eligibility */}
              <section id="eligibility" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  2. Eligibility
                </h2>
                <p>By using Tapinfi services, you confirm that:</p>
                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] mt-1 font-bold">•</span>
                    <span>You are at least 18 years old or using the service under parental or legal supervision.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] mt-1 font-bold">•</span>
                    <span>You have the authority to enter into legally binding agreements.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] mt-1 font-bold">•</span>
                    <span>Any information provided by you is accurate and complete.</span>
                  </li>
                </ul>
                <p className="bg-slate-50 border-l-4 border-amber-500 p-4 rounded-r-xl text-slate-600 text-sm mt-4">
                  We reserve the right to suspend or terminate accounts containing false, misleading, or unauthorized information.
                </p>
              </section>

              {/* 3. Use of Services */}
              <section id="use-of-services" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  3. Use of Services
                </h2>
                <p>You agree to use Tapinfi services only for lawful and ethical purposes.</p>
                <p>You shall not:</p>
                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <span className="text-rose-500 mt-1 font-bold">✕</span>
                    <span>Use the platform for illegal activities.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-500 mt-1 font-bold">✕</span>
                    <span>Upload harmful, offensive, fraudulent, or misleading content.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-500 mt-1 font-bold">✕</span>
                    <span>Attempt unauthorized access to servers, databases, or systems.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-500 mt-1 font-bold">✕</span>
                    <span>Copy, reverse engineer, reproduce, or exploit Tapinfi technology without written permission.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-500 mt-1 font-bold">✕</span>
                    <span>Use Tapinfi services for spam, phishing, harassment, or malicious networking activities.</span>
                  </li>
                </ul>
                <p className="text-slate-600 italic">Tapinfi reserves the right to restrict access or terminate services for misuse.</p>
              </section>

              {/* 4. Product Information */}
              <section id="product-info" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  4. Product Information
                </h2>
                <p>Tapinfi provides NFC-enabled networking products including but not limited to:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                  {[
                    'Digital business cards',
                    'Team cards',
                    'NFC event passes',
                    'Smart visitor cards',
                    'Digital identity solutions',
                  ].map((p, i) => (
                    <div key={i} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/50">
                      <span className="w-2.5 h-2.5 bg-[#5aa4f4] rounded-full" />
                      <span className="font-semibold text-slate-800 text-sm">{p}</span>
                    </div>
                  ))}
                </div>
                <p>
                  Product appearance, color, design, packaging, and features may vary slightly from displayed visuals due to manufacturing, display settings, or updates.
                </p>
              </section>

              {/* 5. Orders & Payments */}
              <section id="orders-payments" className="scroll-mt-32 space-y-6">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  5. Orders & Payments
                </h2>
                
                <div className="space-y-4 pl-4 border-l-2 border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800">5.1 Order Acceptance</h3>
                  <p>All orders placed through Tapinfi are subject to acceptance and availability.</p>
                  <p>We reserve the right to:</p>
                  <ul className="space-y-2 list-none pl-0">
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                      <span>Refuse or cancel orders</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                      <span>Limit quantities</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                      <span>Request additional verification</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                      <span>Cancel suspicious or fraudulent transactions</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4 pl-4 border-l-2 border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800">5.2 Pricing</h3>
                  <p>All prices displayed are subject to change without prior notice.</p>
                  <p>
                    Applicable taxes, shipping charges, customization costs, or service charges may be added during checkout.
                  </p>
                </div>

                <div className="space-y-4 pl-4 border-l-2 border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800">5.3 Payment Methods</h3>
                  <p>We may accept payment via UPI, Debit/Credit Cards, Net Banking, Wallets, and other secure third-party payment gateways.</p>
                  <p className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-blue-900 text-sm">
                    <strong>Note:</strong> Payments are processed through secure third-party payment providers. Tapinfi does not store sensitive payment details such as card numbers or CVV information.
                  </p>
                </div>
              </section>

              {/* 6. Shipping & Delivery */}
              <section id="shipping-delivery" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  6. Shipping & Delivery
                </h2>
                <p>Delivery timelines are estimates and may vary depending on:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                  {['Location', 'Courier availability', 'Manufacturing timelines', 'Bulk/custom orders', 'External disruptions'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg text-sm text-slate-700">
                      <span className="text-[#5aa4f4]">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p>
                  Tapinfi shall not be held liable for delays caused by logistics providers, natural events, government restrictions, or force majeure conditions.
                </p>
                <p>
                  Users must provide accurate shipping information. Additional charges may apply for incorrect addresses or re-delivery attempts.
                </p>
              </section>

              {/* 7. User Accounts */}
              <section id="user-accounts" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  7. User Accounts
                </h2>
                <p>Certain features may require account registration. Users are responsible for:</p>
                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] mt-1 font-bold">•</span>
                    <span>Maintaining account confidentiality.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] mt-1 font-bold">•</span>
                    <span>Protecting passwords.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] mt-1 font-bold">•</span>
                    <span>All activities under their account.</span>
                  </li>
                </ul>
                <p>Tapinfi reserves the right to suspend accounts involved in suspicious, abusive, or fraudulent activity.</p>
              </section>

              {/* 8. Digital Profiles & Content */}
              <section id="digital-profiles" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  8. Digital Profiles & Content
                </h2>
                <p>Users may upload: Contact details, social links, business information, images, logos, videos, and promotional content.</p>
                <p>By uploading content, you confirm that:</p>
                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] mt-1 font-bold">•</span>
                    <span>You own the rights to the content.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] mt-1 font-bold">•</span>
                    <span>The content does not violate laws or third-party rights.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] mt-1 font-bold">•</span>
                    <span>The content is not harmful, misleading, or offensive.</span>
                  </li>
                </ul>
                <p className="text-slate-600 italic">Tapinfi reserves the right to remove inappropriate content without prior notice.</p>
              </section>

              {/* 9. Analytics & Data Tracking */}
              <section id="analytics-tracking" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  9. Analytics & Data Tracking
                </h2>
                <p>Tapinfi may provide analytics including profile visits, tap interactions, link clicks, lead engagement, and device/browser insights.</p>
                <p>
                  These analytics are intended for informational purposes only. We do not guarantee uninterrupted or perfectly accurate analytics reporting.
                </p>
              </section>

              {/* 10. Intellectual Property */}
              <section id="intellectual-property" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  10. Intellectual Property
                </h2>
                <p>
                  All Tapinfi branding, technology, software, website design, graphics, logos, trademarks, product concepts, and content are the intellectual property of Tapinfi Solutions Private Limited.
                </p>
                <p>Users may not:</p>
                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <span className="text-rose-500 mt-1 font-bold">✕</span>
                    <span>Reproduce our designs.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-500 mt-1 font-bold">✕</span>
                    <span>Resell our technology without authorization.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-500 mt-1 font-bold">✕</span>
                    <span>Copy branding elements.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-500 mt-1 font-bold">✕</span>
                    <span>Use Tapinfi trademarks without written approval.</span>
                  </li>
                </ul>
                <p className="bg-rose-50 text-rose-900 border-l-4 border-rose-500 p-4 rounded-r-xl text-sm font-semibold mt-4">
                  Unauthorized usage may result in swift legal action.
                </p>
              </section>

              {/* 11. Sustainability Commitment */}
              <section id="sustainability" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  11. Sustainability Commitment
                </h2>
                <p>
                  Tapinfi promotes eco-friendly networking by reducing dependency on paper-based cards.
                </p>
                <p>
                  However, environmental impact claims are based on intended product usage and estimated paper reduction benefits. Actual environmental impact may vary depending on user behavior and adoption.
                </p>
              </section>

              {/* 12. Third-Party Services */}
              <section id="third-party" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  12. Third-Party Services
                </h2>
                <p>
                  Tapinfi may integrate or link with third-party services including payment gateways, social media platforms, analytics providers, cloud hosting services, and CRM integrations.
                </p>
                <p>
                  We are not responsible for third-party content, availability, policies, or security practices. Users should review third-party terms independently.
                </p>
              </section>

              {/* 13. Limitation of Liability */}
              <section id="limitation-liability" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  13. Limitation of Liability
                </h2>
                <p>To the maximum extent permitted by law, Tapinfi shall not be liable for:</p>
                <ul className="space-y-2 list-none pl-0">
                  {['Indirect or consequential damages', 'Loss of business or revenue', 'Data loss', 'Service interruptions', 'Technical failures', 'Unauthorized account access', 'Delays caused by external providers'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="bg-amber-50/50 border border-amber-200/50 p-4 rounded-xl text-amber-900 text-sm font-semibold mt-4">
                  Use of Tapinfi services is at the user's own risk. Our total liability shall not exceed the amount paid by the user for the specific product or service.
                </p>
              </section>

              {/* 14. Indemnification */}
              <section id="indemnification" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  14. Indemnification
                </h2>
                <p>
                  You agree to indemnify and hold harmless Tapinfi Solutions Private Limited, its directors, employees, affiliates, and partners from any claims, liabilities, damages, expenses, or legal costs arising from:
                </p>
                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] font-bold">•</span>
                    <span>Violation of these terms.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] font-bold">•</span>
                    <span>Misuse of services.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] font-bold">•</span>
                    <span>Uploaded content.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] font-bold">•</span>
                    <span>Third-party disputes.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] font-bold">•</span>
                    <span>Illegal activities conducted through your account.</span>
                  </li>
                </ul>
              </section>

              {/* 15. Account Suspension & Termination */}
              <section id="suspension-termination" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  15. Account Suspension & Termination
                </h2>
                <p>We reserve the right to suspend or terminate access without prior notice if:</p>
                <ul className="space-y-3 list-none pl-0 font-medium">
                  <li className="flex items-center gap-3 text-sm text-slate-800">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span>Terms are violated</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-800">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span>Fraudulent activities are detected</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-800">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span>Abuse or misuse occurs</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-800">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span>Legal obligations require action</span>
                  </li>
                </ul>
                <p className="text-slate-500 text-xs italic mt-4">Termination does not waive outstanding obligations or liabilities.</p>
              </section>

              {/* 16. Privacy */}
              <section id="privacy" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  16. Privacy
                </h2>
                <p>
                  Your use of Tapinfi is also governed by our Privacy Policy. By using our services, you consent to our collection and processing of information as described in the Privacy Policy.
                </p>
              </section>

              {/* 17. Governing Law */}
              <section id="governing-law" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  17. Governing Law
                </h2>
                <p>
                  These Terms & Conditions shall be governed by and interpreted under the laws of India.
                </p>
                <p>
                  Any disputes arising shall be subject to the exclusive jurisdiction of competent courts in India.
                </p>
              </section>

              {/* 18. Changes to Terms */}
              <section id="changes-terms" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  18. Changes to Terms
                </h2>
                <p>
                  Tapinfi may update these Terms & Conditions at any time. Updated versions will be posted on the website with a revised effective date.
                </p>
                <p>
                  Continued use of services after updates constitutes acceptance of revised terms.
                </p>
              </section>

              {/* 19. Contact Information */}
              <section id="contact-info" className="scroll-mt-32 space-y-6">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  19. Contact Information
                </h2>
                <p>
                  For support, legal inquiries, or concerns regarding these Terms & Conditions, users may contact Tapinfi through the official website contact channels.
                </p>
                
                <div className="bg-gradient-to-br from-[#5aa4f4]/5 to-[#0e2d6e]/5 border border-slate-200 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Tapinfi Solutions Pvt. Ltd.</p>
                    <p className="text-slate-500 text-xs mt-1">Official Legal Channel</p>
                  </div>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=support@tapinfi.com&su=Inquiry%20regarding%20Tapinfi%20Terms%20%26%20Conditions"
                    target="_blank"
                    rel="noopener noreferrer"
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
