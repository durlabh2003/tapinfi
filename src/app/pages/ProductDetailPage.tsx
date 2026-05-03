import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { products } from '../data/products';
import { THEMES } from '../data/themes';
import { useCart } from '../context/CartContext';
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
  
  const product = products.find(p => p.id === id);
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'front' | 'back' | 'profile'>('front');
  const [showThemeError, setShowThemeError] = useState(false);

  const selectedTheme = THEMES.find(t => t.id === selectedThemeId) || THEMES[0];

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
                    src={product.img} 
                    alt={product.name} 
                    className={`max-w-full max-h-full object-contain transition-transform duration-700 ${activeView === 'back' ? 'scale-x-[-1]' : ''}`} 
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
                
                {/* Thumbnails */}
                <div className="flex gap-4 justify-center">
                  <div className={`w-20 h-20 rounded-2xl border-2 cursor-pointer transition-all ${activeView === 'front' ? 'border-[#5aa4f4]' : 'border-gray-100 hover:border-gray-200'} bg-gray-50 p-2 flex items-center justify-center`} onClick={() => setActiveView('front')}>
                    <img src={product.img} alt="Front" className="w-full h-full object-contain" />
                  </div>
                  <div className={`w-20 h-20 rounded-2xl border-2 cursor-pointer transition-all ${activeView === 'back' ? 'border-[#5aa4f4]' : 'border-gray-100 hover:border-gray-200'} bg-gray-50 p-2 flex items-center justify-center`} onClick={() => setActiveView('back')}>
                    <img src={product.img} alt="Back" className="w-full h-full object-contain scale-x-[-1]" />
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
                    className="flex-1 h-16 rounded-2xl bg-[#0e2d6e] text-white font-bold font-['Poppins'] flex items-center justify-center gap-3 shadow-xl shadow-[#0e2d6e]/20 hover:scale-[1.02] transition-all active:scale-[0.98]"
                    style={{ backgroundImage: "linear-gradient(60.0131deg, rgb(90, 164, 244) 12.824%, rgb(14, 45, 110) 91.128%)" }}
                  >
                    <Zap className="w-5 h-5 fill-current" />
                    Customize & Buy
                  </button>
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 h-16 rounded-2xl border-2 border-[#0e2d6e] text-[#0e2d6e] font-bold font-['Poppins'] flex items-center justify-center gap-3 hover:bg-[#0e2d6e]/5 transition-colors"
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
                {/* Left: Large Phone Preview */}
                <div className="lg:w-1/2 flex justify-center relative scale-90 lg:scale-100">
                  <div className="w-[320px] h-[640px] border-[12px] border-gray-900 rounded-[56px] overflow-hidden relative shadow-2xl bg-white flex flex-col">
                    {/* Speaker/Dynamic Island */}
                    <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-[24px] w-40 mx-auto z-10 flex items-center justify-center">
                       <div className="w-12 h-1 bg-white/20 rounded-full" />
                    </div>
                    
                    {/* Screen Content */}
                    <div className={`flex-1 w-full ${selectedTheme.color} transition-all duration-700 relative flex flex-col overflow-hidden`}>
                       {/* Animated Background Shapes */}
                       <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                       <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                       {/* Profile Header */}
                       <div className="p-8 pt-20 flex flex-col items-center text-center z-10">
                          <div className="w-28 h-28 bg-white/20 rounded-[32px] mb-6 flex items-center justify-center backdrop-blur-md border border-white/30 shadow-2xl rotate-3 hover:rotate-0 transition-transform">
                             <svg className="w-14 h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                          </div>
                          <h2 className="text-3xl font-bold text-white font-['Poppins'] mb-2">{selectedTheme.name}</h2>
                          <p className="text-xs text-white/80 tracking-[0.2em] uppercase font-medium mb-12">DIGITAL BUSINESS PROFILE</p>
                          
                          {/* Profile Buttons Mockup */}
                          <div className="w-full space-y-4 px-2">
                             {[1, 2, 3, 4].map(i => (
                               <div key={i} className="h-16 bg-white/15 rounded-3xl flex items-center px-5 gap-4 backdrop-blur-md border border-white/20 hover:bg-white/25 transition-all cursor-pointer shadow-lg group/btn">
                                  <div className="w-10 h-10 bg-white/20 rounded-2xl shrink-0 flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                                     <div className="w-4 h-4 bg-white/40 rounded-sm" />
                                  </div>
                                  <div className="h-3 w-1/2 bg-white/30 rounded-full" />
                                  <ChevronRight className="w-5 h-5 text-white/40 ml-auto" />
                               </div>
                             ))}
                          </div>
                       </div>
                       
                       {/* Wave Decoration */}
                       <svg className="absolute bottom-0 w-full h-40 text-white/10" preserveAspectRatio="none" viewBox="0 0 1440 320"><path fill="currentColor" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,170.7C672,171,768,117,864,117.3C960,117,1056,171,1152,192C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                    </div>
                  </div>
                  
                  {/* Decorative element behind phone */}
                  <div className="absolute -z-10 w-[450px] h-[450px] bg-[#5aa4f4]/20 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>

                {/* Right: Theme Selection Grid */}
                <div className="lg:w-1/2 flex flex-col h-full w-full">
                  <div className={`grid grid-cols-3 gap-x-8 gap-y-12 mb-16 transition-all ${showThemeError ? 'scale-105' : ''}`}>
                    {THEMES.slice(0, 9).map((theme) => (
                      <div key={theme.id} className="flex flex-col items-center gap-4">
                        <button
                          onClick={() => {
                            setSelectedThemeId(theme.id);
                            setShowThemeError(false);
                          }}
                          className={`w-full aspect-square rounded-[36px] ${theme.color} shadow-2xl transition-all duration-500 relative group overflow-hidden ${selectedThemeId === theme.id ? 'ring-[6px] ring-[#5aa4f4] ring-offset-[6px] scale-105' : 'hover:scale-105 hover:shadow-3xl'} ${showThemeError && !selectedThemeId ? 'ring-2 ring-red-400 animate-pulse' : ''}`}
                        >
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                          {selectedThemeId === theme.id && (
                            <div className="absolute inset-0 flex items-center justify-center bg-[#0e2d6e]/30 backdrop-blur-[4px]">
                               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#0e2d6e] shadow-2xl">
                                  <Check className="w-7 h-7 stroke-[4]" />
                               </div>
                            </div>
                          )}
                        </button>
                        <span className={`text-sm font-['Poppins'] font-bold tracking-tight transition-colors ${selectedThemeId === theme.id ? 'text-[#0e2d6e]' : 'text-gray-400'}`}>
                          {theme.name}
                        </span>
                      </div>
                    ))}
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

                  {/* Continue Button */}
                  <div className="mt-auto flex justify-center lg:justify-end">
                    <button 
                      onClick={handleBuyNow}
                      className="group relative flex items-center justify-center px-20 h-20 rounded-[28px] text-white font-bold font-['Poppins'] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-[#0e2d6e]/30 w-full sm:w-auto"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#5AA4F4] to-[#0E2D6E] transition-transform duration-500 group-hover:scale-110" />
                      <span className="relative z-10 flex items-center gap-4 text-xl tracking-tight">
                        Continue to Personalize
                        <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
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
