import { useEffect, useState } from 'react';
import FigmaFrame1 from '../../imports/Frame1-1/Frame1';
import Header from '../components/Header';

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
        overflowX: 'clip',
        minHeight: '100vh',
        width: '100vw',
      }}
    >
      <Header />
      <div
        className={`w-full ${entered ? 'page-enter' : 'opacity-0'}`}
      >
        <FigmaFrame1 />
      </div>
    </div>
  );
}

