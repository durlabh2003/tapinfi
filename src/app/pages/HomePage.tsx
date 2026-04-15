import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import FigmaFrame1 from '../../imports/Frame1-1/Frame1';

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 5585;   // footer copyright ends ~5575px; +10px breathing room


export default function HomePage() {
  const [scale, setScale] = useState(1);
  const [entered, setEntered] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);

  // Dark body background
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#100425';
    return () => { document.body.style.backgroundColor = prev; };
  }, []);

  // Scale 1440px design to visible viewport
  useEffect(() => {
    const update = () => setScale(document.documentElement.clientWidth / DESIGN_WIDTH);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Page-enter animation — one tick after mount
  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const parallaxY = Math.min(scrollY * 0.06, 30);

  return (
    <div
      style={{
        height: `${(DESIGN_HEIGHT * scale) + 24}px`,
        backgroundColor: '#100425',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '24px',
      }}
    >
      <div
        ref={frameRef}
        className={entered ? 'page-enter' : 'opacity-0'}
        style={{
          width: `${DESIGN_WIDTH}px`,
          flexShrink: 0,
          transformOrigin: 'top center',
          transform: `scale(${scale}) translateY(${parallaxY}px)`,
          willChange: 'transform',
        }}
      >
        <FigmaFrame1 />

        {/* ── Nav click zones ───────────────────────────────── */}
        <Link to="/" className="absolute left-[687px]  top-[67px] w-[60px]  h-[40px] z-10" aria-label="Home" />
        <Link to="/shop" className="absolute left-[801px]  top-[67px] w-[55px]  h-[40px] z-10" aria-label="Shop" />
        <Link to="/blogs" className="absolute left-[911px]  top-[67px] w-[65px]  h-[40px] z-10" aria-label="Blogs" />
        <Link to="/about" className="absolute left-[1030px] top-[67px] w-[110px] h-[40px] z-10" aria-label="About Us" />

        {/* ── Hero SHOP NOW button ───────────────────────────── */}
        {/* cta-pulse = always-on pulsing ring; hp-btn = hover scale + glow */}
        <Link
          to="/shop"
          className="cta-pulse hp-btn absolute left-[616px] top-[701px] w-[208px] h-[52.658px] z-10"
          aria-label="Shop Now"
        />

        {/* ── Product card overlay zones (ring glow on hover) ── */}
        <Link
          to="/product/white-gloss"
          className="product-overlay absolute left-[101px] top-[2054px] w-[355px] h-[455px] z-10"
          aria-label="White Gloss NFC Card"
        />
        <Link
          to="/product/matte-black"
          className="product-overlay absolute left-[543px] top-[2054px] w-[355px] h-[455px] z-10"
          aria-label="Matte Black NFC Card"
        />
        <Link
          to="/product/wooden"
          className="product-overlay absolute left-[985px] top-[2054px] w-[355px] h-[455px] z-10"
          aria-label="Wooden NFC Card"
        />

        {/* ── Card SHOP NOW mini-button overlays (z-20 > card zones) ── */}
        <Link
          to="/product/white-gloss"
          className="hp-btn-sm absolute left-[292px] top-[2431px] w-[141px] h-[36px] z-20"
          aria-label="Shop White Gloss"
        />
        <Link
          to="/product/matte-black"
          className="hp-btn-sm absolute left-[725px] top-[2430px] w-[141px] h-[36px] z-20"
          aria-label="Shop Matte Black"
        />
        <Link
          to="/product/wooden"
          className="hp-btn-sm absolute left-[1178px] top-[2430px] w-[141px] h-[36px] z-20"
          aria-label="Shop Wooden"
        />

        {/* ── Footer Shop link ──────────────────────────────── */}
        <Link
          to="/shop"
          className="absolute left-[418px] top-[5458px] w-[50px] h-[24px] z-10"
          aria-label="Shop"
        />

        {/* ── GET STARTED button ───────────────────────────── */}
        <Link
          to="/shop"
          className="float cta-pulse hp-btn absolute left-[1055px] top-[3643px] w-[195px] h-[52.658px] z-10"
          aria-label="Get Started"
        />
      </div>
    </div>
  );
}
