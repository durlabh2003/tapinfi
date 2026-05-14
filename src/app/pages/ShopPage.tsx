import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import ScrollReveal from '../components/ScrollReveal';
import { supabase } from '../../lib/supabase';
import { Product } from '../data/products';

import Footer from '../components/Footer';

const SHOP_BTN = 'linear-gradient(63.8351deg, rgb(90, 164, 244) 14.564%, rgb(14, 45, 110) 74.668%)';

const features = [
  { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1', title: 'Premium Quality', desc: 'High-quality materials with custom printing options'           },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z',                                                                                                                          title: 'Fast Delivery',   desc: 'Quick shipping across India within 5–7 business days'      },
  { icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',                                                            title: 'Secure Payment',  desc: 'Safe and secure payment options with buyer protection'     },
];

export default function ShopPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialMaterial = searchParams.get('material') || 'All';

  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMaterial, setSelectedMaterial] = useState(initialMaterial);

  // Update URL when selectedMaterial changes
  useEffect(() => {
    if (selectedMaterial === 'All') {
      window.history.replaceState(null, '', '/shop');
    } else {
      window.history.replaceState(null, '', `/shop?material=${selectedMaterial}`);
    }
  }, [selectedMaterial]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('theme_type', 'Card')
          .eq('status', 'Active');

        if (error) throw error;

        if (data) {
          const mappedProducts: Product[] = data.map((p: any) => ({
            id: p.id,
            name: p.name,
            price: p.selling_price || 0,
            img: p.cover_photo || '',
            shortDesc: p.description?.slice(0, 100) || 'Premium Smart Business Card',
            description: p.description || 'No description available.',
            card_type: p.card_type
          }));
          setDbProducts(mappedProducts);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const displayedProducts = dbProducts.filter(p => 
    selectedMaterial === 'All' || 
    (p.card_type && p.card_type.toLowerCase() === selectedMaterial.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="pt-[110px]">
        {/* ── Hero ─────────────────────────────────────────── */}
        <div className="px-4 sm:px-8 lg:px-20 py-12 lg:py-16 text-center">
          <ScrollReveal animation="fade-up">
            <h1
              className="text-[28px] sm:text-[36px] lg:text-[48px] text-[#100425] mb-4"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}
            >
              Shop Our Products
            </h1>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={120}>
            <p
              className="text-[16px] sm:text-[18px] lg:text-[20px] text-[#656565] max-w-[700px] mx-auto"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Premium NFC business cards designed to make networking seamless and eco-friendly
            </p>
          </ScrollReveal>
        </div>

        {/* ── Products Grid ─────────────────────────────────── */}
        <div className="px-4 sm:px-8 lg:px-20 pb-16">
          <div className="max-w-[1280px] mx-auto">
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {['All', 'PVC', 'Matt'].map(mat => (
                <button 
                  key={mat}
                  onClick={() => setSelectedMaterial(mat)}
                  className={`px-6 py-2 rounded-full border-2 transition-all font-semibold ${
                    selectedMaterial.toLowerCase() === mat.toLowerCase() 
                      ? 'border-[#5aa4f4] bg-[#5aa4f4] text-white shadow-md' 
                      : 'border-gray-200 text-gray-600 hover:border-[#5aa4f4] hover:text-[#5aa4f4]'
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {mat}
                </button>
              ))}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse border-2 border-gray-100 rounded-[25px] p-6 h-[400px] flex flex-col">
                    <div className="h-6 w-3/4 bg-gray-100 rounded mb-4" />
                    <div className="flex-1 bg-gray-50 rounded-xl mb-4" />
                    <div className="h-10 bg-gray-100 rounded-full" />
                  </div>
                ))}
              </div>
            ) : displayedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
                {displayedProducts.map((p, i) => (
                  <ScrollReveal key={p.id} animation="fade-up" delay={i * 100}>
                    <Link to={`/product/${p.id}`} className="group block h-full">
                      <div className="border-2 border-[#5aa4f4]/40 rounded-[25px] p-6 h-full
                          flex flex-col cursor-pointer
                          transition-all duration-300
                          hover:border-[#5aa4f4]
                          hover:-translate-y-2
                          hover:shadow-[0_20px_40px_rgba(90,164,244,0.18)]
                          card-glow">
                        <p className="text-[18px] text-[#0e2d6e] mb-4 font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {p.name}
                        </p>
                        <div className="flex-1 flex items-center justify-center py-4 overflow-hidden rounded-xl bg-gray-50/50 mb-4">
                          <img
                            alt={`${p.name} NFC Card`}
                            className="max-h-[240px] w-auto object-contain
                              transition-transform duration-500
                              group-hover:scale-110"
                            src={p.img}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-baseline gap-1">
                            <span className="text-[15px] text-[#0e2d6e]" style={{ fontFamily: "'Inter', sans-serif" }}>INR</span>
                            <span className="text-[28px] text-[#0e2d6e] font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>{p.price}</span>
                          </div>
                          <div
                            className="h-[36px] rounded-[100px] px-5 flex items-center justify-center cursor-pointer
                              transition-all duration-200
                              hover:opacity-90 hover:scale-105 btn-shimmer"
                            style={{ backgroundImage: SHOP_BTN }}
                          >
                            <span className="text-[13px] text-white font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>SHOP NOW</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products found in the shop.</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Features ──────────────────────────────────────── */}
        <div className="bg-gray-50 px-4 sm:px-8 lg:px-20 py-16">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} animation="zoom" delay={i * 100}>
                <div className="text-center p-8 bg-gradient-to-br from-[#5aa4f4]/10 to-[#0e2d6e]/10 rounded-2xl
                    transition-all duration-300
                    hover:shadow-xl hover:-translate-y-1
                    hover:from-[#5aa4f4]/20 hover:to-[#0e2d6e]/20">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#5aa4f4] to-[#0e2d6e]
                      flex items-center justify-center mx-auto mb-4
                      transition-transform duration-300 hover:scale-110">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.icon} />
                    </svg>
                  </div>
                  <h3 className="text-[20px] text-[#0e2d6e] mb-3 font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>{f.title}</h3>
                  <p className="text-[15px] text-[#656565]" style={{ fontFamily: "'Inter', sans-serif" }}>{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}
