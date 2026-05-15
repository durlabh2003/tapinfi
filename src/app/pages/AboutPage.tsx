import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import { Link } from 'react-router-dom';

const stats = [
  { value: '10K+', label: 'Happy Customers' },
  { value: '50K+', label: 'Cards Delivered'  },
  { value: '100%', label: 'Eco-Friendly'     },
  { value: '24/7', label: 'Support Available'},
];

const values = [
  { icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', title: 'Innovation',    desc: 'We constantly push boundaries to deliver cutting-edge solutions that redefine professional networking.'     },
  { icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',                                                                                                                                        title: 'Sustainability', desc: 'Environmental responsibility is at our core, driving us to create eco-friendly digital solutions.'    },
  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',                                                                            title: 'Community',      desc: 'We build meaningful connections and foster a community of forward-thinking professionals.'           },
];

const whyUs = [
  { title: 'Premium Quality',  desc: 'Every Tapinfi card is crafted with precision using high-quality materials and advanced NFC technology.' },
  { title: 'Easy Integration', desc: 'Seamlessly connect your social media, portfolio, and contact information in one tap-enabled card.'       },
  { title: 'Custom Designs',   desc: 'Choose from pre-designed templates or create a fully customized card that reflects your brand.'          },
  { title: '24/7 Support',     desc: 'Our dedicated support team is always ready to help you make the most of your Tapinfi experience.'        },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-[110px]">
        {/* ── Hero ──────────────────────────────────────── */}
        <div className="px-4 sm:px-8 lg:px-20 py-12 lg:py-20 text-center">
          <ScrollReveal animation="fade-up">
            <h1
              className="text-[32px] sm:text-[44px] lg:text-[56px] text-[#100425] mb-6"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}
            >
              About Tapinfi
            </h1>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={100}>
            <p
              className="text-[16px] sm:text-[20px] lg:text-[24px] text-[#656565] max-w-[800px] mx-auto"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Revolutionizing professional networking through innovative NFC technology
            </p>
          </ScrollReveal>
        </div>

        {/* ── Mission ────────────────────────────────────── */}
        <div className="px-4 sm:px-8 lg:px-20 pb-16 lg:pb-20">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <ScrollReveal animation="slide-left">
              <div>
                <h2
                  className="text-[26px] sm:text-[32px] lg:text-[40px] text-[#0e2d6e] mb-6"
                  style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}
                >
                  Our Mission
                </h2>
                <p className="text-[16px] lg:text-[18px] text-[#656565] mb-4 leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  At Tapinfi, we believe that every professional interaction matters. Our mission is to empower individuals and businesses with cutting-edge digital networking solutions that make connections meaningful, memorable, and sustainable.
                </p>
                <p className="text-[16px] lg:text-[18px] text-[#656565] leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  We're committed to eliminating waste, enhancing productivity, and creating a seamless bridge between the physical and digital worlds through our innovative NFC business cards.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="slide-right" delay={80}>
              <div className="bg-gradient-to-br from-[#5aa4f4] to-[#0e2d6e] rounded-3xl p-10 sm:p-12 text-white text-center
                  hover:shadow-2xl transition-shadow duration-300">
                <p className="text-[52px] sm:text-[64px] font-bold mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>10,000+</p>
                <p className="text-[20px] sm:text-[24px]" style={{ fontFamily: "'Poppins', sans-serif" }}>Professionals Connected</p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ── Story ──────────────────────────────────────── */}
        <div className="bg-gray-50 px-4 sm:px-8 lg:px-20 py-16">
          <div className="max-w-[1440px] mx-auto">
            <ScrollReveal animation="fade-up">
              <h2
                className="text-[26px] sm:text-[36px] lg:text-[40px] text-[#0e2d6e] mb-8 text-center"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}
              >
                Our Story
              </h2>
            </ScrollReveal>
            <div className="max-w-[900px] mx-auto space-y-4">
              {[
                'Founded in 2023, Tapinfi emerged from a simple observation: traditional business cards were inefficient, environmentally wasteful, and didn\'t reflect the digital-first world we live in.',
                'What started as a small project quickly grew into a mission to digitize professional networking. We invested countless hours researching NFC technology, understanding user needs, and designing products that are not only functional but beautiful and sustainable.',
                'Today, Tapinfi serves thousands of professionals across various industries — from entrepreneurs and freelancers to corporate executives and creative professionals.',
              ].map((para, i) => (
                <ScrollReveal key={i} animation="fade-up" delay={i * 80}>
                  <p className="text-[16px] lg:text-[18px] text-[#656565] leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {para}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* ── Values ─────────────────────────────────────── */}
        <div className="px-4 sm:px-8 lg:px-20 py-16">
          <div className="max-w-[1440px] mx-auto">
            <ScrollReveal animation="fade-up">
              <h2
                className="text-[26px] sm:text-[36px] lg:text-[40px] text-[#0e2d6e] mb-12 text-center"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}
              >
                Our Values
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {values.map((v, i) => (
                <ScrollReveal key={v.title} animation="zoom" delay={i * 100}>
                  <div className="text-center p-8 rounded-2xl transition-all duration-300 hover:bg-gray-50 hover:shadow-lg hover:-translate-y-1">
                    <div className="w-20 h-20 bg-[#5aa4f4] rounded-full flex items-center justify-center mx-auto mb-6
                        transition-transform duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#5aa4f4]/40">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={v.icon} />
                      </svg>
                    </div>
                    <h3 className="text-[22px] text-[#111315] mb-4 font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>{v.title}</h3>
                    <p className="text-[15px] text-[#656565]" style={{ fontFamily: "'Poppins', sans-serif" }}>{v.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* ── Why Choose Us ────────────────────────────── */}
        <div className="bg-gray-50 px-4 sm:px-8 lg:px-20 py-16">
          <div className="max-w-[1440px] mx-auto">
            <ScrollReveal animation="fade-up">
              <h2
                className="text-[26px] sm:text-[36px] lg:text-[40px] text-[#0e2d6e] mb-12 text-center"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}
              >
                Why Choose Us?
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whyUs.map((item, i) => (
                <ScrollReveal key={item.title} animation="fade-up" delay={i * 80}>
                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-8
                      transition-all duration-300
                      hover:border-[#5aa4f4] hover:shadow-xl hover:-translate-y-1">
                    <h3 className="text-[20px] text-[#111315] mb-3 font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>{item.title}</h3>
                    <p className="text-[15px] text-[#656565]" style={{ fontFamily: "'Poppins', sans-serif" }}>{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* ── Stats Banner ─────────────────────────────── */}
        <div className="px-4 sm:px-8 lg:px-20 py-16">
          <ScrollReveal animation="zoom">
            <div className="max-w-[1440px] mx-auto bg-gradient-to-r from-[#5aa4f4] to-[#0e2d6e] rounded-3xl p-10 sm:p-12">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
                {stats.map((s, i) => (
                  <div key={s.label} className="transition-transform duration-200 hover:scale-105" style={{ transitionDelay: `${i * 60}ms` }}>
                    <p className="text-[36px] sm:text-[48px] font-bold mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>{s.value}</p>
                    <p className="text-[14px] sm:text-[18px]" style={{ fontFamily: "'Poppins', sans-serif" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ── CTA ──────────────────────────────────────── */}
        <div className="px-4 sm:px-8 lg:px-20 pb-20 text-center">
          <ScrollReveal animation="fade-up">
            <div className="max-w-[1440px] mx-auto">
              <h2
                className="text-[24px] sm:text-[36px] lg:text-[40px] text-[#0e2d6e] mb-6"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}
              >
                Ready to Transform Your Networking?
              </h2>
              <p className="text-[16px] sm:text-[20px] text-[#656565] mb-10 max-w-[600px] mx-auto" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Join thousands of professionals who trust Tapinfi for their digital networking needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/shop"
                  className="bg-gradient-to-r from-[#5aa4f4] to-[#0e2d6e] text-white px-10 py-4 rounded-full text-[16px] font-semibold
                    hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 btn-shimmer"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Get Started
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-[#5aa4f4] text-[#5aa4f4] px-10 py-4 rounded-full text-[16px] font-semibold
                    hover:bg-[#5aa4f4] hover:text-white hover:scale-105 active:scale-95 transition-all duration-200"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
