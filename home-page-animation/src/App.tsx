import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronRight, Sparkles, Rss, Cpu, Share2, ArrowRight, CreditCard, Zap, Shield } from 'lucide-react';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Smooth scroll transitions
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Responsive detection for mobile optimizations
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // === ANIMATION TIMING (Pixels) ===
  // 0-100: Card centered, Phone hidden
  // 100-200: Phone appears
  // 120-600: Card movement sequence
  // 580-640: Tap & Ripple
  // 650-850: Notification
  // 900-1150: Profile reveal
  // 1250-1500: CTA Text & Shop Now
  // 1600-1900: Final Headline
  // 2100+: Rest of site

  // Phone - fades in at 100px and stays locked until 1150px
  const phoneOpacity = useTransform(smoothY, [80, 160], [0, 1]);
  const phoneScale = useTransform(smoothY, [80, 160, 1150, 1300], isMobile ? [0.72, 0.88, 0.88, 0.78] : [0.8, 1, 1, 0.85]);
  const phoneY = useTransform(smoothY, [0, 1150, 1300, 1450], isMobile ? [0, 0, -30, -70] : [0, 0, 0, 0]); 
  
  // OPTION B ENHANCED: Phone shifts right on desktop, stays centered on mobile
  const phoneX = useTransform(smoothY, [1250, 1450], [0, isMobile ? 0 : 200]);

  // Card - Natural 3D arc movement (responsive distances)
  const cardX = useTransform(smoothY, [0, 120, 580], [0, 0, isMobile ? 72 : 165]);
  const cardY = useTransform(smoothY, [0, 120, 580], [0, 0, isMobile ? -178 : -235]);
  const cardRotateZ = useTransform(smoothY, [0, 120, 580], [0, 0, isMobile ? -14 : -22]);
  const cardRotateY = useTransform(smoothY, [0, 120, 580], [0, 0, isMobile ? 28 : 45]);
  const cardScale = useTransform(smoothY, [0, 120, 580, 1200, 1400], isMobile ? [0.92, 0.92, 0.42, 0.42, 0] : [1.1, 1.1, 0.48, 0.48, 0]);
  const cardOpacity = useTransform(smoothY, [1200, 1400], [1, 0]);

  // Initial Card Glow
  const initialGlowOpacity = useTransform(smoothY, [0, 250], [0.8, 0]);

  // Tap Ripple
  const rippleScale = useTransform(smoothY, [570, 750], [0, 2.5]);
  const rippleOpacity = useTransform(smoothY, [570, 610, 750], [0, 0.8, 0]);

  // iOS Notification
  const notifY = useTransform(smoothY, [650, 730, 950, 1050], [-120, 24, 24, -120]);
  const notifOpacity = useTransform(smoothY, [650, 730, 950, 1050], [0, 1, 1, 0]);

  // Profile Website Reveal
  const profileHeight = useTransform(smoothY, [900, 1150], ["0%", "100%"]);
  const profileOpacity = useTransform(smoothY, [900, 950], [0, 1]);

  // CTA Elements (Enhanced positioning - left on desktop, centered below on mobile)
  const ctaOpacity = useTransform(smoothY, [1280, 1450, 1950, 2150], [0, 1, 1, 0]);
  const ctaX = useTransform(smoothY, [1280, 1450], [0, 0]);
  const ctaY = useTransform(smoothY, [1280, 1450], [0, 0]);

  // Final Headline
  const finalOpacity = useTransform(smoothY, [2320, 2450, 2550, 2700], [0, 1, 1, 0]);
  const finalScale = useTransform(smoothY, [2320, 2450], [1.2, 1]);

  // Hero section container fade out
  const heroFadeOut = useTransform(smoothY, [2100, 2300], [1, 0]);

  return (
    <div ref={containerRef} className="relative bg-[#020617] text-white selection:bg-violet-500/30">
      
      {/* Hero Animation Track */}
      <div className="relative h-[2600px] z-10">
        <motion.div 
          style={{ opacity: heroFadeOut }}
          className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-[88px] sm:pt-0"
        >
          {/* Top Branding / Intro Space */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ opacity: useTransform(smoothY, [0, 100], [1, 0]) }}
            className="absolute top-12 z-50 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">The New Standard</span>
            </div>
          </motion.div>

          {/* Initial Card Center Glow */}
          <motion.div 
            style={{ opacity: initialGlowOpacity }}
            className="absolute w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] lg:w-[450px] lg:h-[450px] bg-violet-500/25 blur-[90px] sm:blur-[110px] rounded-full pointer-events-none"
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
                <div className="w-11 h-11 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center">
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
                      <img src="/profile-avatar.jpg" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  
                  <div className="flex-1 pt-14 px-6 text-center">
                    <h3 className="text-slate-900 text-2xl font-black tracking-tighter">Marcus Sterling</h3>
                    <p className="text-violet-600 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Founding Partner • Creative</p>
                    
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
              x: isMobile ? 72 : 165, 
              y: isMobile ? -210 : -285 
            }}
            className="absolute z-20 w-44 h-44 md:w-56 md:h-56 border border-violet-400/50 rounded-full pointer-events-none shadow-[0_0_40px_rgba(139,92,246,0.3)]"
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
                  <div className="w-7 h-7 bg-gradient-to-tr from-violet-500 to-indigo-600 rounded-md flex items-center justify-center">
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

          {/* Scrolling CTA Content (Enhanced Option B - Premium Split Layout) */}
          <motion.div
            style={{ 
              opacity: ctaOpacity, 
              x: ctaX, 
              y: ctaY,
              pointerEvents: "auto"
            }}
            className="absolute z-[200] w-full max-w-[640px] px-6 lg:px-0 text-center lg:text-left left-6 lg:left-[100px] xl:left-[120px] translate-x-0 top-[34%] sm:top-[48%] sm:translate-y-0 -translate-y-1/2"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              className="mb-5 sm:mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-1.5 bg-violet-500/10 border border-violet-500/25 rounded-full backdrop-blur-xl"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-bold text-violet-200 uppercase tracking-[0.25em]">Effortless Onboarding</span>
            </motion.div>
            
            <h2 className="text-white text-[32px] leading-[1.05] sm:text-[42px] md:text-[52px] lg:text-[56px] xl:text-[64px] font-black tracking-[-0.02em] mb-6 sm:mb-8">
              Let's Tap into the
              <br className="hidden sm:block"/>
              <span className="sm:hidden"> </span>future for
              <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-fuchsia-200 to-cyan-200 drop-shadow-[0_0_30px_rgba(167,139,250,0.3)]">
                Effortless digital
                <br className="hidden lg:block"/> connection
              </span>
            </h2>

            <p className="text-white/60 text-[15px] sm:text-[17px] leading-relaxed max-w-[480px] mx-auto lg:mx-0 mb-8 sm:mb-10 font-medium">
              One tap. Zero friction. Your entire professional identity, instantly shared.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="group relative w-full sm:w-auto inline-flex justify-center items-center px-8 sm:px-10 py-4 sm:py-[18px] bg-white text-slate-950 rounded-[18px] font-black text-[15px] sm:text-base overflow-hidden transition-all duration-300 shadow-[0_16px_40px_rgba(139,92,246,0.25)] hover:shadow-[0_20px_60px_rgba(139,92,246,0.4)] hover:scale-[1.02] active:scale-[0.98] pointer-events-auto">
                <span className="relative z-10 flex items-center gap-3">
                  Shop Now — $79
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <div className="flex items-center gap-3 text-white/50 text-[13px] font-medium">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-[#020617] bg-gradient-to-br from-violet-600 to-indigo-600" />
                  ))}
                </div>
                <span>12k+ professionals</span>
              </div>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </div>
  );
}

export default App;
