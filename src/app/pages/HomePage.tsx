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
    <div
      style={{
        backgroundColor: '#020617',
        overflowX: 'hidden',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Header />
      
      {/* Dynamic Background Glows - Adjusted to Cyan/Blue branding */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#5AA4F4]/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#0E2D6E]/20 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[30%] left-[60%] w-[40%] h-[40%] bg-cyan-500/5 blur-[130px] rounded-full animate-pulse" style={{ animationDelay: '4s' }} />
        <div className="absolute top-[60%] left-[-10%] w-[45%] h-[45%] bg-[#5AA4F4]/5 blur-[140px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div
        className={`w-full relative z-10 ${entered ? 'page-enter' : 'opacity-0'}`}
      >
        <FigmaFrame1 />
      </div>
    </div>
  );
}

