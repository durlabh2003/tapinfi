import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';

export default function PrivacyPolicyPage() {
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
    { id: 'info-collect', label: '1. Information We Collect' },
    { id: 'use-info', label: '2. How We Use Information' },
    { id: 'marketing-comm', label: '3. Marketing Communications' },
    { id: 'sharing-info', label: '4. Sharing of Information' },
    { id: 'cookies-tracking', label: '5. Cookies & Tracking' },
    { id: 'data-security', label: '6. Data Security' },
    { id: 'data-retention', label: '7. Data Retention' },
    { id: 'user-rights', label: '8. User Rights' },
    { id: 'children-privacy', label: '9. Children’s Privacy' },
    { id: 'third-party-links', label: '10. Third-Party Links' },
    { id: 'international-data', label: '11. International Data' },
    { id: 'changes-policy', label: '12. Changes to Policy' },
    { id: 'contact-us', label: '13. Contact Us' },
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
                Privacy Policy
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
                  Tapinfi Solutions Private Limited (“Tapinfi,” “we,” “our,” or “us”) values your privacy and is committed to protecting your personal information.
                </p>
                <p>
                  This Privacy Policy explains how we collect, use, store, process, and protect information when you use our website, products, and services.
                </p>
                <p>
                  By using Tapinfi services, you consent to the practices described in this Privacy Policy.
                </p>
                <div className="h-px bg-slate-200/80 my-8" />
              </section>

              {/* 1. Information We Collect */}
              <section id="info-collect" className="scroll-mt-32 space-y-6">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  1. Information We Collect
                </h2>
                <p>We may collect the following types of information:</p>

                <div className="space-y-4 pl-4 border-l-2 border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800">1.1 Personal Information</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-none pl-0">
                    {[
                      'Full name',
                      'Email address',
                      'Phone number',
                      'Company name',
                      'Designation',
                      'Billing and shipping information',
                      'Social media links',
                      'Uploaded profile details',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-[#5aa4f4] rounded-full" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4 pl-4 border-l-2 border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800">1.2 Device & Technical Information</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-none pl-0">
                    {[
                      'IP address',
                      'Browser type',
                      'Device information',
                      'Operating system',
                      'Usage activity',
                      'Website interaction data',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-[#5aa4f4] rounded-full" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4 pl-4 border-l-2 border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800">1.3 Analytics Data</h3>
                  <p className="text-sm">For Tapinfi profiles and NFC interactions, we may collect:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-none pl-0">
                    {[
                      'Number of profile visits',
                      'Link clicks',
                      'Tap activity',
                      'Approximate geographic data',
                      'Time and date of interactions',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-[#5aa4f4] rounded-full" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* 2. How We Use Information */}
              <section id="use-info" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  2. How We Use Information
                </h2>
                <p>We use collected information for purposes including:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                  {[
                    'Processing orders',
                    'Delivering products and services',
                    'Managing digital profiles',
                    'Customer support',
                    'Improving user experience',
                    'Analytics and performance tracking',
                    'Marketing and communication',
                    'Fraud prevention and security',
                    'Business operations and legal compliance',
                  ].map((p, i) => (
                    <div key={i} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/50 text-sm">
                      <span className="w-2 h-2 bg-[#5aa4f4] rounded-full" />
                      <span className="font-semibold text-slate-800">{p}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 3. Marketing Communications */}
              <section id="marketing-comm" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  3. Marketing Communications
                </h2>
                <p>Tapinfi may send:</p>
                <ul className="space-y-2 list-none pl-0">
                  {['Order updates', 'Product announcements', 'Promotional offers', 'Service notifications', 'Marketing campaigns'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <span className="text-[#5aa4f4] font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="bg-slate-50 p-4 rounded-xl border border-slate-200/50 text-sm mt-4">
                  Users may opt out of promotional communications at any time.
                </p>
              </section>

              {/* 4. Sharing of Information */}
              <section id="sharing-info" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  4. Sharing of Information
                </h2>
                <p><strong>We do not sell personal information to third parties.</strong></p>
                <p>However, we may share data with operational partners including:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4 text-sm">
                  {[
                    'Payment processors',
                    'Logistics and courier partners',
                    'Cloud hosting providers',
                    'Analytics providers',
                    'Technology service providers',
                    'Legal authorities when required',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg text-slate-700">
                      <span className="text-slate-400">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-500 text-xs italic">Third-party providers may process information only for operational purposes.</p>
              </section>

              {/* 5. Cookies & Tracking Technologies */}
              <section id="cookies-tracking" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  5. Cookies & Tracking Technologies
                </h2>
                <p>Tapinfi may use cookies and similar technologies to:</p>
                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] font-bold">•</span>
                    <span>Improve website functionality.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] font-bold">•</span>
                    <span>Remember user preferences.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] font-bold">•</span>
                    <span>Analyze traffic.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] font-bold">•</span>
                    <span>Enhance performance and personalize experiences.</span>
                  </li>
                </ul>
                <p>Users can manage cookies through browser settings.</p>
              </section>

              {/* 6. Data Security */}
              <section id="data-security" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  6. Data Security
                </h2>
                <p>
                  We implement reasonable technical and organizational security measures to protect information.
                </p>
                <p className="bg-amber-50/50 border border-amber-200/50 p-4 rounded-xl text-amber-900 text-sm font-semibold">
                  However, no online platform can guarantee absolute security. Users are responsible for maintaining account confidentiality and protecting login credentials.
                </p>
              </section>

              {/* 7. Data Retention */}
              <section id="data-retention" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  7. Data Retention
                </h2>
                <p>We retain information for as long as necessary to:</p>
                <ul className="space-y-2 list-none pl-0">
                  {['Provide services', 'Meet legal obligations', 'Resolve disputes', 'Maintain operational records'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <span className="w-1.5 h-1.5 bg-[#5aa4f4] rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>Data may be deleted or anonymized when no longer required.</p>
              </section>

              {/* 8. User Rights */}
              <section id="user-rights" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  8. User Rights
                </h2>
                <p>Subject to applicable laws, users may request:</p>
                <ul className="space-y-3 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] font-bold">•</span>
                    <span>Access to personal information.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] font-bold">•</span>
                    <span>Correction of inaccurate data.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] font-bold">•</span>
                    <span>Deletion of data.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#5aa4f4] font-bold">•</span>
                    <span>Withdrawal of consent or restriction of processing.</span>
                  </li>
                </ul>
                <p>Requests may be submitted through our official contact channels.</p>
              </section>

              {/* 9. Children's Privacy */}
              <section id="children-privacy" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  9. Children’s Privacy
                </h2>
                <p>
                  Tapinfi services are not intended for children under 13 years of age. We do not knowingly collect personal information from children.
                </p>
              </section>

              {/* 10. Third-Party Links */}
              <section id="third-party-links" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  10. Third-Party Links
                </h2>
                <p>
                  Our website or profiles may contain links to third-party websites or platforms.
                </p>
                <p>
                  We are not responsible for the privacy practices or content of external websites. Users should review third-party privacy policies separately.
                </p>
              </section>

              {/* 11. International Data Processing */}
              <section id="international-data" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  11. International Data Processing
                </h2>
                <p>
                  Data may be processed or stored through third-party infrastructure located in different countries. By using our services, users consent to such processing where legally permitted.
                </p>
              </section>

              {/* 12. Changes to Privacy Policy */}
              <section id="changes-policy" className="scroll-mt-32 space-y-4">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  12. Changes to Privacy Policy
                </h2>
                <p>
                  Tapinfi may update this Privacy Policy periodically. Updated versions will be published on the website with revised effective dates.
                </p>
                <p>
                  Continued use of services indicates acceptance of updated policies.
                </p>
              </section>

              {/* 13. Contact Us */}
              <section id="contact-us" className="scroll-mt-32 space-y-6">
                <h2 className="text-[22px] font-bold text-[#0e2d6e] font-['Poppins'] mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-[#5aa4f4] rounded-full" />
                  13. Contact Us
                </h2>
                <p>
                  For privacy-related concerns or requests, users may contact Tapinfi through the official website contact methods.
                </p>
                
                <div className="bg-gradient-to-br from-[#5aa4f4]/5 to-[#0e2d6e]/5 border border-slate-200 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Tapinfi Solutions Pvt. Ltd.</p>
                    <p className="text-slate-500 text-xs mt-1">Official Legal Channel</p>
                  </div>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=support@tapinfi.com&su=Inquiry%20regarding%20Tapinfi%20Privacy%20Policy"
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
