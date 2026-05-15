import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, Rss, Cpu, Share2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import profileAvatar from './profile-avatar.jpg';

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll transitions
  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Responsive detection for mobile optimizations
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const isDesktop = windowSize.width >= 1024;

  // === ANIMATION TIMING (0 to 1 Progress) ===
  const phoneOpacity = useTransform(smoothY, [0.05, 0.12], [0, 1]);
  const phoneScale = useTransform(smoothY, [0.05, 0.12, 0.50, 0.58],
    isMobile ? [0.6, 0.75, 0.75, 0.65] :
      isTablet ? [0.7, 0.85, 0.85, 0.75] : [0.8, 1, 1, 0.85]
  );
  // On mobile/tablet, move phone UP to be at the top
  const phoneY = useTransform(smoothY, [0, 0.50, 0.58, 0.65],
    isMobile ? [0, 0, -140, -250] :
      isTablet ? [0, 0, -180, -320] : [0, 0, 0, 0]
  );
  const phoneX = useTransform(smoothY, [0.55, 0.65],
    [0, isMobile ? 0 : isTablet ? 0 : 250]
  );

  // Card
  const cardX = useTransform(smoothY, [0.04, 0.12, 0.30],
    [0, 0, isMobile ? 55 : isTablet ? 100 : 185]
  );
  const cardY = useTransform(smoothY, [0.04, 0.12, 0.30],
    [0, 0, isMobile ? -140 : isTablet ? -180 : -255]
  );
  const cardRotateZ = useTransform(smoothY, [0.04, 0.12, 0.30],
    [0, 0, isMobile ? -10 : -20]
  );
  const cardRotateY = useTransform(smoothY, [0.04, 0.12, 0.30],
    [0, 0, isMobile ? 20 : 45]
  );
  const cardScale = useTransform(smoothY, [0.04, 0.12, 0.30, 0.55, 0.62],
    isMobile ? [0.8, 0.8, 0.38, 0.38, 0] :
      isTablet ? [0.95, 0.95, 0.42, 0.42, 0] : [1.1, 1.1, 0.48, 0.48, 0]
  );
  const cardOpacity = useTransform(smoothY, [0.55, 0.62], [1, 0]);

  // Initial Card Glow
  const initialGlowOpacity = useTransform(smoothY, [0, 0.10], [0.8, 0]);

  // Tap Ripple
  const rippleScale = useTransform(smoothY, [0.30, 0.38], [0, 2.5]);
  const rippleOpacity = useTransform(smoothY, [0.30, 0.32, 0.38], [0, 0.8, 0]);

  // iOS Notification
  const notifY = useTransform(smoothY, [0.33, 0.38, 0.48, 0.54], [-120, 24, 24, -120]);
  const notifOpacity = useTransform(smoothY, [0.33, 0.38, 0.48, 0.54], [0, 1, 1, 0]);

  // Profile Website Reveal
  const profileHeight = useTransform(smoothY, [0.46, 0.56], ["0%", "100%"]);
  const profileOpacity = useTransform(smoothY, [0.46, 0.48], [0, 1]);

  // CTA Elements
  const ctaOpacity = useTransform(smoothY, [0.62, 0.70], [0, 1]);
  const ctaX = useTransform(smoothY, [0.62, 0.70], [0, 0]);
  const ctaY = useTransform(smoothY, [0.62, 0.70], [0, 0]);

  return (
    <div ref={containerRef} className="relative text-white selection:bg-violet-500/30">

      {/* Hero Animation Track */}
      <div className="relative h-[1800px] sm:h-[2000px] z-10">
        <motion.div
          className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-[100px] sm:pt-[120px]"
          style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
        >


          {/* Initial Card Center Glow */}
          <motion.div
            style={{ opacity: initialGlowOpacity }}
            className="absolute w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] lg:w-[450px] lg:h-[450px] bg-cyan-500/20 blur-[90px] sm:blur-[110px] rounded-full pointer-events-none"
          />

          {/* iPhone 15 Pro Mockup */}
          <motion.div
            style={{
              opacity: phoneOpacity,
              scale: phoneScale,
              y: phoneY,
              x: phoneX,
              perspective: "1200px"
            }}
            className="relative z-10 w-[260px] h-[530px] sm:w-[280px] sm:h-[570px] lg:w-[300px] lg:h-[610px] bg-slate-900 rounded-[2.8rem] sm:rounded-[3.2rem] lg:rounded-[3.5rem] border-[8px] sm:border-[9px] lg:border-[10px] border-slate-800 shadow-[0_30px_80px_rgba(0,0,0,0.6)] lg:shadow-[0_40px_100px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden"
          >
            <div className="relative flex-1 bg-black overflow-hidden">
              {/* Dynamic Island */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-[100] ring-[1px] ring-white/10" />

              {/* Home Screen Icons */}
              <div className="h-full flex flex-col p-6 pt-16 space-y-6 opacity-40">
                <div className="flex justify-between">
                  <div className="w-14 h-14 bg-slate-800/40 rounded-2xl border border-white/5" />
                  <div className="w-14 h-14 bg-slate-800/40 rounded-2xl border border-white/5" />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="aspect-square bg-slate-800/20 rounded-xl border border-white/5" />
                  ))}
                </div>
              </div>

              {/* iOS Notification */}
              <motion.div
                style={{ y: notifY, opacity: notifOpacity }}
                className="absolute top-4 inset-x-3 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[1.5rem] p-4 z-[110] flex items-center gap-4 shadow-2xl"
              >
                <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-[0_4px_12px_rgba(6,182,212,0.3)]">
                  <Rss className="text-white w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-[10px] text-white/40 uppercase font-black tracking-widest">NFC LINK</span>
                    <span className="text-[10px] text-white/30 tracking-tight">Now</span>
                  </div>
                  <p className="text-sm text-white font-bold leading-tight">Digital Business Card</p>
                  <p className="text-[11px] text-white/50 truncate">Tap to view professional profile</p>
                </div>
              </motion.div>

              {/* Profile Website View */}
              <motion.div
                style={{ height: profileHeight, opacity: profileOpacity }}
                className="absolute inset-0 bg-white z-[120] overflow-hidden shadow-inner"
              >
                <div className="h-full w-full flex flex-col">
                  {/* Banner */}
                  <div className="h-40 bg-[#0a0a0c] relative">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center" />
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-[5px] border-white shadow-xl overflow-hidden bg-slate-200">
                      <img src={profileAvatar} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="flex-1 pt-14 px-6 text-center">
                    <h3 className="text-slate-900 text-2xl font-black tracking-tighter">Marcus Sterling</h3>
                    <p className="text-cyan-600 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Founding Partner • Creative</p>

                    <div className="flex justify-center gap-3 my-6">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                          <Share2 className="w-4 h-4" />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <button className="w-full py-3.5 bg-slate-950 text-white rounded-2xl text-[13px] font-black shadow-lg">Save Contact</button>
                      <button className="w-full py-3.5 border-2 border-slate-100 text-slate-500 rounded-2xl text-[13px] font-bold">Message</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Tap Ripple Effect */}
          <motion.div
            style={{
              scale: rippleScale,
              opacity: rippleOpacity,
              x: isMobile ? 55 : isTablet ? 100 : 185,
              y: isMobile ? -170 : isTablet ? -220 : -310
            }}
            className="absolute z-20 w-44 h-44 md:w-56 md:h-56 border border-cyan-400/50 rounded-full pointer-events-none shadow-[0_0_40px_rgba(34,211,238,0.3)]"
          />

          {/* Premium NFC Card */}
          <motion.div
            style={{
              x: cardX,
              y: cardY,
              rotateZ: cardRotateZ,
              rotateY: cardRotateY,
              scale: cardScale,
              opacity: cardOpacity,
              transformStyle: "preserve-3d"
            }}
            className="absolute z-50 w-[280px] h-[175px] sm:w-[310px] sm:h-[192px] lg:w-[340px] lg:h-[210px] bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-black border border-white/10 rounded-2xl shadow-[0_25px_60px_-12px_rgba(0,0,0,0.8)] flex flex-col p-6 sm:p-7 lg:p-8 overflow-hidden group"
          >
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]" />
            <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_50%)]" />

            <div className="flex justify-between items-start relative z-10">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center">
                  <div className="w-7 h-7 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-md flex items-center justify-center">
                    <Cpu className="text-white w-4 h-4" />
                  </div>
                </div>
                <div>
                  <p className="text-[8px] text-white/30 tracking-[0.4em] font-black uppercase">Stealth Edition</p>
                  <h4 className="text-white text-lg font-bold tracking-tight">NEXUS CARD</h4>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1.5 justify-end">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="text-[9px] text-emerald-500 font-black uppercase tracking-[0.1em]">Ready</span>
                </div>
              </div>
            </div>

            <div className="mt-auto relative z-10">
              <p className="text-white/80 font-mono tracking-[0.25em] text-sm">•••• •••• •••• 2026</p>
            </div>
          </motion.div>

          {/* Scrolling CTA Content */}
          <motion.div
            style={{
              opacity: ctaOpacity,
              x: ctaX,
              y: ctaY,
              pointerEvents: "auto"
            }}
            className="absolute z-[200] w-full max-w-[640px] px-6 lg:px-0 text-center lg:text-left lg:left-[100px] xl:left-[150px] left-1/2 -translate-x-1/2 lg:translate-x-0 top-[68%] sm:top-[65%] lg:top-[40%] sm:translate-y-0 -translate-y-1/2"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              className="mb-5 sm:mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-1.5 bg-[#5AA4F4]/10 border border-[#5AA4F4]/25 rounded-full backdrop-blur-xl"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-bold text-cyan-200 uppercase tracking-[0.25em]">Effortless Onboarding</span>
            </motion.div>

            <h2 className="text-white text-[32px] leading-[1.1] sm:text-[48px] md:text-[64px] lg:text-[72px] xl:text-[80px] font-bold tracking-tight mb-4 sm:mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5AA4F4] to-[#0E2D6E]">Tap with </span>
              <span className="text-white"> Tapinfi.</span>
              <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                The Future of
                <br className="hidden lg:block"/> Connection.
              </span>
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-8 sm:mb-10">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#5AA4F4] to-[#0E2D6E] rounded-full px-8 py-3.5 font-['Inter',sans-serif] font-bold text-[16px] text-white shadow-lg hover:scale-105 hover:shadow-[#5AA4F4]/40 transition-all active:scale-95 group pointer-events-auto"
              >
                SHOP NOW
                <div className="transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>

              <div className="flex items-center gap-3 text-white/70 text-[13px] font-medium">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border border-[#020617] bg-gradient-to-br from-cyan-600 to-blue-600" />
                  ))}
                </div>
                <span>12k+ professionals</span>
              </div>
            </div>

            <p className="text-white/60 text-[15px] sm:text-[17px] leading-relaxed max-w-[480px] mx-auto lg:mx-0 font-medium">
              One tap. Zero friction. Your entire professional identity, instantly shared.
            </p>
          </motion.div>

        </motion.div>

      </div>
    </div>
  );
}
