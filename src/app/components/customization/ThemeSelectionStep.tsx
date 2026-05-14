import React from 'react';
import ScrollReveal from '../ScrollReveal';
import { THEMES as STATIC_THEMES } from '../../data/themes';
import { supabase } from '../../../lib/supabase';

interface Props {
  selectedThemeId: string;
  onSelectTheme: (id: string) => void;
  onNext: () => void;
}

export default function ThemeSelectionStep({ selectedThemeId, onSelectTheme, onNext }: Props) {
  const [profileThemes, setProfileThemes] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchThemes() {
      try {
        const { data, error } = await supabase
          .from('user_themes')
          .select('*')
          .eq('status', 'Active');
        
        if (error) throw error;
        setProfileThemes(data || []);
      } catch (err) {
        console.error('Error fetching themes:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchThemes();
  }, []);

  const selectedTheme = profileThemes.find(t => t.id === selectedThemeId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 h-full min-h-[600px]">
      {/* Left Column - Preview (No Phone Mockup) */}
      <ScrollReveal animation="fade-right" className="flex items-center justify-center">
        <div className="w-full max-w-[340px] aspect-[9/16] rounded-[32px] overflow-hidden relative shadow-2xl bg-gray-50 flex flex-col border border-gray-100">
          {/* Preview Content */}
          <div className="flex-1 w-full relative flex flex-col transition-all duration-500 overflow-hidden">
             {selectedTheme?.cover_photo ? (
                <img 
                  src={selectedTheme.cover_photo} 
                  alt="Theme Preview" 
                  className="absolute inset-0 w-full h-full object-contain animate-in fade-in duration-700 p-2"
                />
             ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                   <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
             )}
          </div>
        </div>
      </ScrollReveal>

      {/* Right Column - Theme Selection Grid */}
      <ScrollReveal animation="fade-left" delay={200} className="flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-[#100425] font-['Poppins'] mb-2">Select Digital Profile Design</h2>
        <p className="text-[#656565] font-['Inter'] mb-8">Choose a theme for your digital profile that people will see when they tap your card.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
          {isLoading ? (
            [1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="animate-pulse flex flex-col items-center gap-3">
                <div className="w-full aspect-[4/5] rounded-xl bg-gray-100" />
                <div className="h-4 w-20 bg-gray-100 rounded" />
              </div>
            ))
          ) : (
            profileThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => onSelectTheme(theme.id)}
                className={`flex flex-col items-center gap-3 p-2 rounded-2xl transition-all duration-300 border-2 ${selectedThemeId === theme.id ? 'border-[#5aa4f4] bg-[#5aa4f4]/5 shadow-lg scale-105' : 'border-transparent hover:bg-gray-50'}`}
              >
                <div className="w-full aspect-[4/5] rounded-xl bg-gray-100 flex items-center justify-center shadow-inner overflow-hidden relative">
                   {theme.cover_photo ? (
                      <img src={theme.cover_photo} alt={theme.name} className="w-full h-full object-contain p-1" />
                   ) : (
                      <svg className="w-8 h-8 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                   )}
                   {selectedThemeId === theme.id && (
                      <div className="absolute inset-0 bg-[#0e2d6e]/20 flex items-center justify-center backdrop-blur-[2px]">
                         <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#0e2d6e] shadow-lg">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                         </div>
                      </div>
                   )}
                </div>
                <span className={`text-[10px] uppercase tracking-wider font-['Poppins'] font-bold ${selectedThemeId === theme.id ? 'text-[#0e2d6e]' : 'text-gray-400'}`}>
                  {theme.name}
                </span>
              </button>
            ))
          )}
        </div>

        {/* Pagination placeholder */}
        <div className="flex justify-center items-center gap-4 mb-10 text-sm font-['Inter'] text-gray-500">
           <button className="hover:text-[#5aa4f4]">Prev</button>
           <button className="w-8 h-8 rounded-full bg-[#0e2d6e] text-white flex items-center justify-center">1</button>
           <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center">2</button>
           <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center">3</button>
           <button className="hover:text-[#5aa4f4]">Next</button>
        </div>

        <button 
          onClick={onNext}
          className="mt-auto h-[54px] w-full rounded-full flex items-center justify-center shadow-lg shadow-[#0e2d6e]/20 transition-transform hover:-translate-y-1"
          style={{ backgroundImage: "linear-gradient(60.0131deg, rgb(90, 164, 244) 12.824%, rgb(14, 45, 110) 91.128%)" }}
        >
          <span className="text-white font-['Poppins'] font-semibold text-lg">
            Continue to Card Customization
          </span>
        </button>
      </ScrollReveal>
    </div>
  );
}
