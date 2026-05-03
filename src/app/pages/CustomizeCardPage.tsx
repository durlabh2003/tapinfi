import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { products } from '../data/products';
import { useCart, CustomizationData } from '../context/CartContext';
import CardCustomizationStep from '../components/customization/CardCustomizationStep';
import ScrollReveal from '../components/ScrollReveal';

export default function CustomizeCardPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id);
  const themeId = searchParams.get('theme') || 'theme-1';

  const [customization, setCustomization] = useState<CustomizationData>({
    themeId: themeId,
    frontOption: 'details',
    fullName: '',
    phone: '',
    email: '',
    logoUrl: null,
    printQR: false
  });

  useEffect(() => {
    if (!product) {
      navigate('/shop');
    }
  }, [product, navigate]);

  if (!product) return null;

  const handleFinish = () => {
    addToCart(product, 1, customization);
    // After adding to cart, since it was a "Buy Now" or "Customize" flow,
    // let's go straight to checkout/delivery
    navigate('/checkout/delivery');
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <Header />
      
      <main className="pt-[140px] px-4 sm:px-8 lg:px-20 max-w-[1440px] mx-auto">
        <ScrollReveal animation="fade-up">
           <div className="mb-10">
              <h1 className="text-3xl font-bold text-[#0e2d6e] font-['Poppins'] mb-2">Personalize Your Card</h1>
              <p className="text-gray-500 font-['Inter']">Complete the design of your physical card.</p>
           </div>
           
           <div className="bg-white rounded-[40px] border border-gray-100 shadow-2xl p-6 lg:p-12">
              <CardCustomizationStep 
                data={customization}
                onChange={(updates) => setCustomization(prev => ({ ...prev, ...updates }))}
                onFinish={handleFinish}
                cardImage={product.img}
              />
           </div>
        </ScrollReveal>
      </main>
    </div>
  );
}
