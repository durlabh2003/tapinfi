import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { products, Product } from '../data/products';
import { THEMES as STATIC_THEMES, ThemeOption } from '../data/themes';
import { useCart } from '../context/CartContext';
import { supabase } from '../../lib/supabase';
import ScrollReveal from '../components/ScrollReveal';

// Reusing images from Frame1 for How It Works
import img1400 from "../../imports/Frame1-1/c99f7f3f82a0bf28a3d5a01e39607bd48ab97bc7.png";
import imgHowItWorkPhotoroom11 from "../../imports/Frame1-1/bd34e50c9e83b17704482ec7b4642d0cecf35adb.png";
import imgShareConnectivityPhotoroom11 from "../../imports/Frame1-1/311951e40237148d45e9ff8e5da3ddabb5b2f118.png";
import { Check, ChevronLeft, ChevronRight, Star, ShoppingCart, Zap } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const productStatic = products.find(p => p.id === id);
  const [product, setProduct] = useState<Product | null>(productStatic || null);
  const [profileThemes, setProfileThemes] = useState<any[]>([]);
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(!productStatic);
  const [isLoadingThemes, setIsLoadingThemes] = useState(true);
  const [activeView, setActiveView] = useState<'front' | 'back' | 'profile'>('front');
  const [showThemeError, setShowThemeError] = useState(false);

  // Fetch product from Supabase if not in static list
  React.useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('theme_type', 'Card')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        if (data) {
          setProduct({
            id: data.id,
            name: data.name,
            price: data.selling_price || 0,
            img: data.cover_photo || '',
            shortDesc: data.description?.slice(0, 150) || 'Premium Smart Business Card',
            description: data.description || 'No description available.',
            front_mock_photo: data.front_mock_photo,
            back_photo: data.back_photo,
            customization_options: data.customization_options
          });
        }
      } catch (err) {
        console.error('Error fetching product from DB:', err);
      } finally {
        setIsLoadingProduct(false);
      }
    }
    
    if (!productStatic) {
      fetchProduct();
    } else {
      setIsLoadingProduct(false);
    }
  }, [id, productStatic]);


  // Fetch themes from Supabase
  React.useEffect(() => {
    async function fetchThemes() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('theme_type', 'Profile')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setProfileThemes(data || []);
      } catch (err) {
        console.error('Error fetching themes:', err);
      } finally {
        setIsLoadingThemes(false);
      }
    }
    fetchThemes();
  }, []);

  const selectedTheme = profileThemes.find(t => t.id === selectedThemeId);

  if (isLoadingProduct) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Header />
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0e2d6e]"></div>
        <p className="mt-4 text-[#0e2d6e] font-medium">Loading Product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Header />
        <h1 className="text-3xl font-bold text-[#0e2d6e] mb-4">Product Not Found</h1>
        <Link to="/shop" className="text-[#5aa4f4] hover:underline">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedThemeId) {
      setShowThemeError(true);
      document.getElementById('customize-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    navigate(`/customize/${product.id}?theme=${selectedThemeId}`);
  };

  const handleBuyNow = () => {
    if (!selectedThemeId) {
      setShowThemeError(true);
      document.getElementById('customize-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    navigate(`/customize/${product.id}?theme=${selectedThemeId}`);
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />
      
      <main className="pt-[140px] pb-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-['Inter']">
            <Link to="/" className="hover:text-[#5aa4f4]">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/shop" className="hover:text-[#5aa4f4]">Shop</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#0e2d6e] font-semibold">{product.name}</span>
          </div>

          {/* Product Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-32">
            {/* Left: Product Image Section */}
            <ScrollReveal animation="fade-right">
              <div className="space-y-6">
                <div className="aspect-[4/3] bg-gray-50 rounded-[40px] overflow-hidden border border-gray-100 relative group shadow-inner flex items-center justify-center p-8 lg:p-12 transition-all duration-500">
                  <img 
                    src={activeView === 'front' ? (product.front_mock_photo || product.img) : (product.back_photo || product.img)} 
                    alt={product.name} 
                    className={`max-w-full max-h-full object-contain transition-transform duration-700`} 
                  />
                  
                  {/* View Toggles */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                    <button 
                      onClick={() => setActiveView('front')}
                      className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-widest transition-all ${activeView === 'front' ? 'bg-[#0e2d6e] text-white shadow-lg' : 'bg-white text-gray-500 shadow-sm'}`}
                    >
                      FRONT
                    </button>
                    <button 
                      onClick={() => setActiveView('back')}
                      className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-widest transition-all ${activeView === 'back' ? 'bg-[#0e2d6e] text-white shadow-lg' : 'bg-white text-gray-500 shadow-sm'}`}
                    >
                      BACK
                    </button>
                  </div>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <div className={`w-20 h-20 rounded-2xl border-2 cursor-pointer transition-all ${activeView === 'front' ? 'border-[#5aa4f4]' : 'border-gray-100 hover:border-gray-200'} bg-gray-50 p-2 flex items-center justify-center`} onClick={() => setActiveView('front')}>
                    <img src={product.front_mock_photo || product.img} alt="Front" className="w-full h-full object-contain" />
                  </div>
                  <div className={`w-20 h-20 rounded-2xl border-2 cursor-pointer transition-all ${activeView === 'back' ? 'border-[#5aa4f4]' : 'border-gray-100 hover:border-gray-200'} bg-gray-50 p-2 flex items-center justify-center`} onClick={() => setActiveView('back')}>
                    <img src={product.back_photo || product.img} alt="Back" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Product Details Section */}
            <ScrollReveal animation="fade-left" delay={200}>
              <div className="flex flex-col h-full pt-4">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#5aa4f4]/10 text-[#5aa4f4] text-xs font-bold rounded-full tracking-widest">BEST SELLER</span>
                  <div className="flex items-center text-yellow-400">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                    <span className="text-gray-400 text-[10px] ml-2 font-medium">4.9 (120+ Orders)</span>
                  </div>
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-[#0A0A0A] font-['Poppins'] leading-tight mb-4">
                  {product.name} NFC Card
                </h1>
                
                <p className="text-gray-500 font-['Inter'] mb-8 text-lg leading-relaxed">
                  {product.shortDesc}
                </p>

                <div className="flex items-baseline gap-4 mb-10 pb-10 border-b border-gray-100">
                  <div className="text-5xl font-bold text-[#0e2d6e] font-['Poppins']">
                    ₹ {product.price}
                  </div>
                  <div className="text-gray-400 line-through text-xl font-['Inter']">₹ {Math.round(product.price * 1.5)}</div>
                  <div className="text-green-500 font-bold text-sm bg-green-50 px-2 py-1 rounded-md">Save 33%</div>
                </div>

                <div className="mb-12">
                   <h3 className="text-lg font-bold text-[#100425] font-['Poppins'] mb-4">Product Details</h3>
                   <div className="text-gray-600 font-['Inter'] text-base leading-relaxed space-y-4">
                      {product.description.split('\n\n').slice(0, 2).map((para, i) => <p key={i}>{para}</p>)}
                   </div>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => {
                      const element = document.getElementById('customize-section');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full sm:flex-1 h-14 sm:h-16 rounded-full bg-[#0e2d6e] text-white font-bold font-['Poppins'] flex items-center justify-center gap-3 shadow-xl shadow-[#0e2d6e]/30 hover:scale-[1.02] transition-all active:scale-[0.98] text-base sm:text-lg"
                    style={{ backgroundImage: "linear-gradient(60.0131deg, rgb(90, 164, 244) 12.824%, rgb(14, 45, 110) 91.128%)" }}
                  >
                    <Zap className="w-5 h-5 fill-current" />
                    Customize Now
                  </button>
                  <button 
                    onClick={handleAddToCart}
                    className="w-full sm:flex-1 h-14 sm:h-16 rounded-full border-2 border-[#0e2d6e] text-[#0e2d6e] font-bold font-['Poppins'] flex items-center justify-center gap-3 hover:bg-[#0e2d6e]/5 transition-all shadow-xl shadow-[#0e2d6e]/10 active:scale-[0.98] text-base sm:text-lg"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Digital Profile Customization Section */}
          <section id="customize-section" className="mb-32 pt-20">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-[#0e2d6e] font-['Poppins'] mb-4">Make A Powerful First Impression</h2>
                <p className="text-gray-400 font-['Inter'] text-lg">Select a theme that represents your professional brand</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-white rounded-[48px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] border border-gray-100 p-8 lg:p-20 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                {/* Left: Theme Preview (No Phone Mockup) */}
                <div className="lg:w-1/2 flex justify-center relative">
                  <div className="w-full max-w-[400px] aspect-[9/16] rounded-[32px] overflow-hidden relative shadow-2xl bg-white flex flex-col border border-gray-100">
                    {/* Screen Content */}
                    <div className="flex-1 w-full transition-all duration-700 relative flex flex-col overflow-hidden bg-gray-50">
                       {/* Background Image - Object Contain to avoid cropping */}
                       {selectedTheme?.cover_photo ? (
                          <img 
                            src={selectedTheme.cover_photo} 
                            alt="Theme Preview" 
                            className="absolute inset-0 w-full h-full object-contain animate-in fade-in duration-700 p-2"
                          />
                       ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                             <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          </div>
                       )}
                    </div>
                  </div>
                  
                  {/* Decorative element behind preview */}
                  <div className="absolute -z-10 w-full h-full bg-[#5aa4f4]/10 blur-[100px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>

                {/* Right: Theme Selection Grid */}
                <div className="lg:w-1/2 flex flex-col h-full w-full">
                  <div className={`grid grid-cols-2 sm:grid-cols-3 gap-6 mb-16 transition-all ${showThemeError ? 'scale-105' : ''}`}>
                    {isLoadingThemes ? (
                      [1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="animate-pulse flex flex-col items-center gap-4">
                          <div className="w-full aspect-square rounded-[36px] bg-gray-100" />
                          <div className="h-4 w-20 bg-gray-100 rounded" />
                        </div>
                      ))
                    ) : (
                      profileThemes.map((theme) => (
                        <div key={theme.id} className="flex flex-col items-center gap-4">
                          <button
                            onClick={() => {
                              setSelectedThemeId(theme.id);
                              setShowThemeError(false);
                            }}
                            className={`w-full aspect-square rounded-[36px] bg-gray-50 shadow-xl transition-all duration-500 relative group overflow-hidden ${selectedThemeId === theme.id ? 'ring-[6px] ring-[#5aa4f4] ring-offset-[6px] scale-105' : 'hover:scale-105 hover:shadow-2xl'} ${showThemeError && !selectedThemeId ? 'ring-2 ring-red-400 animate-pulse' : ''}`}
                          >
                            {theme.cover_photo ? (
                              <img src={theme.cover_photo} alt={theme.name} className="absolute inset-0 w-full h-full object-contain p-1" />
                            ) : (
                              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center text-white font-bold">No Image</div>
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                            {selectedThemeId === theme.id && (
                              <div className="absolute inset-0 flex items-center justify-center bg-[#0e2d6e]/30 backdrop-blur-[4px]">
                                 <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#0e2d6e] shadow-2xl">
                                    <Check className="w-7 h-7 stroke-[4]" />
                                 </div>
                              </div>
                            )}
                          </button>
                          <span className={`text-xs font-['Poppins'] font-bold tracking-tight transition-colors ${selectedThemeId === theme.id ? 'text-[#0e2d6e]' : 'text-gray-400'}`}>
                            {theme.name}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {showThemeError && !selectedThemeId && (
                    <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-center font-bold font-['Poppins'] animate-bounce">
                      Please select a theme to continue
                    </div>
                  )}

                  {/* Pagination placeholder */}
                  <div className="flex items-center justify-center gap-3 mb-16">
                    <button className="w-10 h-10 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                    <button className="w-10 h-10 rounded-2xl bg-[#0e2d6e] text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-[#0e2d6e]/20">1</button>
                    <button className="w-10 h-10 rounded-2xl border border-gray-100 flex items-center justify-center text-sm text-gray-400 hover:bg-gray-50 transition-colors">2</button>
                    <button className="w-10 h-10 rounded-2xl border border-gray-100 flex items-center justify-center text-sm text-gray-400 hover:bg-gray-50 transition-colors">3</button>
                    <button className="w-10 h-10 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors"><ChevronRight className="w-5 h-5" /></button>
                  </div>

                  <div className="mt-auto flex justify-center lg:justify-end">
                    <button 
                      onClick={handleBuyNow}
                      className="group relative flex items-center justify-center px-10 sm:px-20 h-14 sm:h-16 rounded-2xl text-white font-bold font-['Poppins'] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-[#0e2d6e]/30 w-full sm:w-auto"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#5AA4F4] to-[#0E2D6E] transition-transform duration-500 group-hover:scale-110" />
                      <span className="relative z-10 flex items-center gap-3 sm:gap-4 text-base sm:text-xl tracking-tight">
                        Continue to Personalize
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-2" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* How It Works Section - Refined to match Home Page */}
          <section className="py-24 border-t border-gray-100 bg-[#F9FBFF] rounded-[64px] -mx-4 sm:-mx-8 lg:-mx-20 px-8 lg:px-20 mb-20">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0e2d6e] text-center font-['Poppins'] mb-24">How It Works</h2>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
              {[
                {
                  step: "1",
                  title: "Choose a Tapinfi Card",
                  desc: "Choose between our range of Tapinfi basics for a card that suits your style, or design a custom card. The choice is yours.",
                  image: img1400
                },
                {
                  step: "2",
                  title: "Set Up Your Profile",
                  desc: "Tap your Tapinfi card to your phone to activate the link, follow the instructions to create your profile.",
                  image: imgHowItWorkPhotoroom11
                },
                {
                  step: "3",
                  title: "Network Like A Pro",
                  desc: "You can now tap and share your contact info, social media handles, and so much more with your own Tapinfi.",
                  image: imgShareConnectivityPhotoroom11
                }
              ].map((item, i) => (
                <ScrollReveal key={i} animation="fade-up" delay={i * 200} className="flex flex-col items-center text-center">
                  <div className="w-full h-80 flex items-center justify-center mb-10 transition-transform hover:scale-105 duration-500">
                    <img alt={item.title} className="max-w-full max-h-full object-contain" src={item.image} />
                  </div>
                  
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-full border-2 border-[#5aa4f4] flex items-center justify-center text-[#5aa4f4] font-bold text-lg">
                      {item.step}
                    </div>
                    <h3 className="text-2xl font-bold text-[#0e2d6e] font-['Poppins'] leading-tight">{item.title}</h3>
                  </div>
                  
                  <div className="bg-[#5aa4f4] h-1 w-40 mb-8 rounded-full" />
                  
                  <p className="text-gray-500 font-['Inter'] text-base leading-relaxed max-w-[340px]">
                    {item.desc}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
