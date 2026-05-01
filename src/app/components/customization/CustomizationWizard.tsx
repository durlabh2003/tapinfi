import React, { useState } from 'react';
import ThemeSelectionStep from './ThemeSelectionStep';
import CardCustomizationStep from './CardCustomizationStep';
import { CustomizationData, useCart } from '../../context/CartContext';
import { Product } from '../../data/products';

interface Props {
  product: Product;
}

export default function CustomizationWizard({ product }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const { addToCart } = useCart();
  
  const [customization, setCustomization] = useState<CustomizationData>({
    themeId: 'theme-1',
    frontOption: 'details',
    fullName: '',
    phone: '',
    email: '',
    logoUrl: null,
    printQR: false
  });

  const handleUpdateData = (updates: Partial<CustomizationData>) => {
    setCustomization(prev => ({ ...prev, ...updates }));
  };

  const handleFinish = () => {
    addToCart(product, 1, customization);
    // User will be visually notified by the cart opening
  };

  return (
    <div className="w-full">
      {/* Progress Indicator */}
      <div className="max-w-[400px] mx-auto mb-12 relative">
         <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0" />
         <div 
            className="absolute top-1/2 left-0 h-1 bg-[#5aa4f4] -translate-y-1/2 z-0 transition-all duration-500" 
            style={{ width: step === 1 ? '50%' : '100%' }}
         />
         <div className="flex justify-between relative z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 1 ? 'bg-[#0e2d6e] text-white shadow-lg shadow-[#0e2d6e]/30' : 'bg-gray-200 text-gray-500'}`}>
               1
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 2 ? 'bg-[#0e2d6e] text-white shadow-lg shadow-[#0e2d6e]/30' : 'bg-gray-200 text-gray-500'}`}>
               2
            </div>
         </div>
      </div>

      {step === 1 && (
        <ThemeSelectionStep 
          selectedThemeId={customization.themeId}
          onSelectTheme={id => handleUpdateData({ themeId: id })}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <CardCustomizationStep 
          data={customization}
          onChange={handleUpdateData}
          onFinish={handleFinish}
          cardImage={product.img}
        />
      )}
    </div>
  );
}
