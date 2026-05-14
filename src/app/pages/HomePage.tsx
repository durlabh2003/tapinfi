import { useEffect, useState } from 'react';
import FigmaFrame1 from '../../imports/Frame1-1/Frame1';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HomePage() {
  const [entered, setEntered] = useState(false);

  // Dark body background - using the animation theme color
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#020617';
    return () => { document.body.style.backgroundColor = prev; };
  }, []);

  // Page-enter animation — one tick after mount
  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="bg-[#020617] min-h-screen relative">
      <Header />
      
      {/* Dynamic Background Glows - Ultimate Premium Edition */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Deep Ambient Base */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#5AA4F4]/25 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#0E2D6E]/40 blur-[180px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Intense Focal Glows */}
        <div className="absolute top-[20%] left-[15%] w-[30%] h-[30%] bg-cyan-400/30 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[45%] right-[10%] w-[25%] h-[25%] bg-[#5AA4F4]/25 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-[20%] left-[10%] w-[35%] h-[35%] bg-blue-600/20 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '5s' }} />
        
        {/* Pure White 'Star' Highlights */}
        <div className="absolute top-[15%] right-[25%] w-[4px] h-[4px] bg-white rounded-full shadow-[0_0_15px_#fff]" />
        <div className="absolute top-[40%] left-[10%] w-[3px] h-[3px] bg-cyan-300 rounded-full shadow-[0_0_12px_#5AA4F4]" />
        <div className="absolute bottom-[40%] right-[30%] w-[3px] h-[3px] bg-white rounded-full shadow-[0_0_10px_#fff]" />
        <div className="absolute bottom-[15%] left-[20%] w-[4px] h-[4px] bg-cyan-200 rounded-full shadow-[0_0_15px_#5AA4F4]" />
        
        {/* Floating Digital Particles */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-float"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDuration: (Math.random() * 10 + 10) + 's',
              animationDelay: (Math.random() * 5) + 's',
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      <div
        className={`w-full relative z-10 ${entered ? 'page-enter' : 'opacity-0'}`}
      >
        <FigmaFrame1 />
        <Footer />
      </div>
    </div>
  );
}

