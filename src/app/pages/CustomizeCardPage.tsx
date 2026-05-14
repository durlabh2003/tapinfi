import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { products, Product } from '../data/products';
import { useCart, CustomizationData } from '../context/CartContext';
import { supabase } from '../../lib/supabase';
import CardCustomizationStep from '../components/customization/CardCustomizationStep';
import ScrollReveal from '../components/ScrollReveal';

export default function CustomizeCardPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const productStatic = products.find(p => p.id === id);
  const [product, setProduct] = useState<Product | null>(productStatic || null);
  const [isLoading, setIsLoading] = useState(!productStatic);
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
            shortDesc: data.description?.slice(0, 100) || 'Premium Smart Business Card',
            description: data.description || '',
            front_mock_photo: data.front_mock_photo,
            back_photo: data.back_photo,
            customization_options: data.customization_options
          });
        }
      } catch (err) {
        console.error('Error fetching product in customize page:', err);
      } finally {
        setIsLoading(false);
      }
    }

    if (!productStatic) {
      fetchProduct();
    } else {
      setIsLoading(false);
    }
  }, [id, productStatic]);

  useEffect(() => {
    if (!isLoading && !product) {
      navigate('/shop');
    }
  }, [product, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <Header />
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0e2d6e]"></div>
        <p className="mt-4 text-[#0e2d6e]">Loading product details...</p>
      </div>
    );
  }


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
                product={product}
              />
           </div>
        </ScrollReveal>
      </main>
    </div>
  );
}
