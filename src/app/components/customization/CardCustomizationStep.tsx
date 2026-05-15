import React, { useRef, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import ScrollReveal from '../ScrollReveal';
import { CustomizationData } from '../../context/CartContext';

import { Product } from '../../data/products';
import { supabase } from '../../../lib/supabase';

interface Props {
  data: CustomizationData;
  onChange: (updates: Partial<CustomizationData>) => void;
  onFinish: () => void;
  product: Product;
}

export default function CardCustomizationStep({ data, onChange, onFinish, product }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);

  const frontFields = product.customization_options?.frontFields || ['personal_details'];
  const backFields = product.customization_options?.backFields || [];
  const hasDetails = frontFields.includes('personal_details') || 
                    frontFields.includes('name') || 
                    frontFields.includes('fullName') || 
                    frontFields.includes('company_name') || 
                    frontFields.includes('designation') || 
                    frontFields.includes('phone') || 
                    frontFields.includes('email');
  const hasLogo = frontFields.includes('company_logo') || frontFields.includes('logo');
  const hasQR = backFields.includes('qr_code');

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (data.frontOption === 'details') {
      const isFieldActive = (field: string) => frontFields.includes(field) || frontFields.includes('personal_details');

      // Name
      if (isFieldActive('name') || isFieldActive('fullName')) {
        if (!data.fullName.trim()) {
          newErrors.fullName = 'Full name is required';
        } else if (!/^[a-zA-Z\s]{2,50}$/.test(data.fullName)) {
          newErrors.fullName = 'Please enter a valid name';
        }
      }

      // Company Name
      if (isFieldActive('company_name') || isFieldActive('companyName')) {
        if (!data.companyName.trim()) {
          newErrors.companyName = 'Company name is required';
        }
      }

      // Designation
      if (isFieldActive('designation')) {
        if (!data.designation.trim()) {
          newErrors.designation = 'Designation is required';
        }
      }

      // Phone
      if (isFieldActive('phone') || isFieldActive('personal_details')) {
        if (!data.phone.trim()) {
          newErrors.phone = 'Phone number is required';
        } else if (!/^[6-9]\d{9}$/.test(data.phone)) {
          newErrors.phone = 'Please enter a valid 10-digit phone number';
        }
      }

      // Email
      if (isFieldActive('email') || isFieldActive('personal_details')) {
        if (!data.email.trim()) {
          newErrors.email = 'Email address is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
      }
    } else {
      if (!data.logoUrl) {
        newErrors.logo = 'Please upload a logo';
      }
    }

    return newErrors;
  };

  const currentErrors = validate();

  // If only logo is available, force it
  React.useEffect(() => {
    if (!hasDetails && hasLogo && data.frontOption !== 'logo') {
      onChange({ frontOption: 'logo' });
    } else if (hasDetails && !hasLogo && data.frontOption !== 'details') {
      onChange({ frontOption: 'details' });
    }
  }, [hasDetails, hasLogo, data.frontOption, onChange]);

  // QR is mandatory in all cases
  React.useEffect(() => {
    if (!data.printQR) {
      onChange({ printQR: true });
    }
  }, [data.printQR, onChange]);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `logos/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('uploads')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('uploads').getPublicUrl(filePath);
        onChange({ logoUrl: data.publicUrl });
      } catch (err) {
        console.error('Error uploading logo:', err);
        alert('Failed to upload logo. Please try again.');
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 h-full min-h-[600px]">
      {/* Left Column - Card Preview */}
      <ScrollReveal animation="fade-right" className="flex flex-col items-center justify-center gap-8">
        
        {/* Front Preview */}
        <div className="w-full max-w-[400px] aspect-[1.586/1] rounded-2xl shadow-xl overflow-hidden relative group bg-gray-100">
          <img src={product.front_mock_photo || product.img} alt="Card Front" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/5" />
          <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded-md font-['Inter'] backdrop-blur-sm">FRONT</div>
        </div>

        {/* Back Preview */}
        <div className="w-full max-w-[400px] aspect-[1.586/1] rounded-2xl shadow-xl overflow-hidden relative bg-gray-100">
           <img src={product.back_photo || product.img} alt="Card Back" className="absolute inset-0 w-full h-full object-cover" />
           <div className="absolute inset-0 bg-black/5 flex items-center justify-center" />
           <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded-md font-['Inter'] backdrop-blur-sm">BACK</div>
        </div>
      </ScrollReveal>

      {/* Right Column - Customization Form */}
      <ScrollReveal animation="fade-left" delay={200} className="flex flex-col">
        <h2 className="text-3xl font-bold text-[#100425] font-['Poppins'] mb-6">Customize Your Card</h2>
        
        {/* Front Customization Tabs */}
        <div className="mb-6">
           <div className="flex border-b border-gray-200">
              {hasDetails && (
                <button 
                  onClick={() => onChange({ frontOption: 'details' })}
                  className={`flex-1 py-3 text-sm font-semibold font-['Inter'] border-b-2 transition-colors ${data.frontOption === 'details' ? 'border-[#5aa4f4] text-[#0e2d6e]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Personal Details
                </button>
              )}
              {hasLogo && (
                <button 
                  onClick={() => onChange({ frontOption: 'logo' })}
                  className={`flex-1 py-3 text-sm font-semibold font-['Inter'] border-b-2 transition-colors ${data.frontOption === 'logo' ? 'border-[#5aa4f4] text-[#0e2d6e]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Company Logo
                </button>
              )}
           </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1">
           {data.frontOption === 'details' ? (
              <div className="space-y-4">
                  {(frontFields.includes('name') || frontFields.includes('fullName') || frontFields.includes('personal_details')) && (
                    <div>
                       <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-1">Full Name *</label>
                       <input 
                          type="text" 
                          value={data.fullName}
                          onChange={e => onChange({ fullName: e.target.value })}
                          placeholder="John Doe"
                          className={`w-full px-4 py-3 rounded-xl border ${currentErrors.fullName && data.fullName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#5aa4f4] focus:border-[#5aa4f4] outline-none font-['Inter'] transition-shadow`}
                       />
                       {currentErrors.fullName && data.fullName && (
                         <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1">
                           <AlertCircle className="w-3 h-3" /> {currentErrors.fullName}
                         </p>
                       )}
                    </div>
                  )}

                  {(frontFields.includes('company_name') || frontFields.includes('companyName')) && (
                    <div>
                       <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-1">Company Name *</label>
                       <input 
                          type="text" 
                          value={data.companyName}
                          onChange={e => onChange({ companyName: e.target.value })}
                          placeholder="Tapinfi Inc."
                          className={`w-full px-4 py-3 rounded-xl border ${currentErrors.companyName && data.companyName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#5aa4f4] focus:border-[#5aa4f4] outline-none font-['Inter'] transition-shadow`}
                       />
                       {currentErrors.companyName && data.companyName && (
                         <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1">
                           <AlertCircle className="w-3 h-3" /> {currentErrors.companyName}
                         </p>
                       )}
                    </div>
                  )}

                  {(frontFields.includes('designation')) && (
                    <div>
                       <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-1">Designation *</label>
                       <input 
                          type="text" 
                          value={data.designation}
                          onChange={e => onChange({ designation: e.target.value })}
                          placeholder="CEO & Founder"
                          className={`w-full px-4 py-3 rounded-xl border ${currentErrors.designation && data.designation ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#5aa4f4] focus:border-[#5aa4f4] outline-none font-['Inter'] transition-shadow`}
                       />
                       {currentErrors.designation && data.designation && (
                         <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1">
                           <AlertCircle className="w-3 h-3" /> {currentErrors.designation}
                         </p>
                       )}
                    </div>
                  )}

                  {(frontFields.includes('phone') || frontFields.includes('personal_details')) && (
                    <div>
                       <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-1">Phone Number *</label>
                       <input 
                          type="tel" 
                          value={data.phone}
                          onChange={e => {
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 10) onChange({ phone: value });
                          }}
                          placeholder="9876543210"
                          className={`w-full px-4 py-3 rounded-xl border ${currentErrors.phone && data.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#5aa4f4] focus:border-[#5aa4f4] outline-none font-['Inter'] transition-shadow`}
                       />
                       {currentErrors.phone && data.phone && (
                         <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1">
                           <AlertCircle className="w-3 h-3" /> {currentErrors.phone}
                         </p>
                       )}
                    </div>
                  )}

                  {(frontFields.includes('email') || frontFields.includes('personal_details')) && (
                    <div>
                       <label className="block text-sm font-medium text-gray-700 font-['Inter'] mb-1">Email Address *</label>
                       <input 
                          type="email" 
                          value={data.email}
                          onChange={e => onChange({ email: e.target.value })}
                          placeholder="john@example.com"
                          className={`w-full px-4 py-3 rounded-xl border ${currentErrors.email && data.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#5aa4f4] focus:border-[#5aa4f4] outline-none font-['Inter'] transition-shadow`}
                       />
                       {currentErrors.email && data.email && (
                         <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-1 ml-1">
                           <AlertCircle className="w-3 h-3" /> {currentErrors.email}
                         </p>
                       )}
                    </div>
                  )}
              </div>
           ) : (
              <div className="space-y-4">
                 <div 
                    className="border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer min-h-[240px]"
                    onClick={() => fileInputRef.current?.click()}
                 >
                    {data.logoUrl ? (
                       <img src={data.logoUrl} alt="Uploaded Logo" className="max-h-32 object-contain mb-4" />
                    ) : (
                       <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-[#5aa4f4]">
                          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                       </div>
                    )}
                    <p className="text-[#0e2d6e] font-semibold font-['Inter']">
                       {uploading ? 'Uploading...' : (data.logoUrl ? 'Change Logo' : 'Click to Upload Logo')}
                    </p>
                    <p className="text-gray-500 text-sm font-['Inter'] mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                    <input 
                       type="file" 
                       ref={fileInputRef}
                       onChange={handleLogoUpload}
                       accept="image/*"
                       className="hidden"
                    />
                 </div>
              </div>
           )}
        </div>

        {/* Backside Customization - QR is mandatory now, so we just show the message */}
        <div className="mt-8 mb-10 pt-8 border-t border-gray-200">
           <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#5aa4f4] shadow-sm">
                 <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zm-3 0h2v2h-2v-2zm3 3h3v2h-3v-2zm-3 0h2v2h-2v-2zm3 3h3v2h-3v-2zm-3 0h2v2h-2v-2z" /></svg>
              </div>
              <p className="text-sm font-medium text-[#0e2d6e] font-['Inter']">Profile QR code will be printed on the back of this card.</p>
           </div>
        </div>

        <button 
          onClick={onFinish}
          disabled={Object.keys(currentErrors).length > 0}
          className="mt-auto mt-6 h-[54px] w-full rounded-full flex items-center justify-center shadow-lg shadow-[#0e2d6e]/20 transition-transform hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
          style={{ backgroundImage: "linear-gradient(60.0131deg, rgb(90, 164, 244) 12.824%, rgb(14, 45, 110) 91.128%)" }}
        >
          <span className="text-white font-['Poppins'] font-semibold text-lg">
            Add to Cart
          </span>
        </button>
      </ScrollReveal>
    </div>
  );
}
