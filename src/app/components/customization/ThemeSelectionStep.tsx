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
          .from('products')
          .select('*')
          .eq('theme_type', 'Profile')
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
      {/* Left Column - Phone Mockup Preview */}
      <ScrollReveal animation="fade-right" className="flex items-center justify-center">
        <div className="w-[300px] h-[600px] border-[8px] border-gray-900 rounded-[40px] overflow-hidden relative shadow-2xl bg-white flex flex-col">
          {/* Mockup Notch */}
          <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-3xl w-40 mx-auto z-10" />
          
          {/* Preview Content */}
          <div className="flex-1 w-full relative flex flex-col bg-[#0e2d6e] transition-all duration-500 overflow-hidden">
             {selectedTheme?.cover_photo ? (
                <img 
                  src={selectedTheme.cover_photo} 
                  alt="Theme Preview" 
                  className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-700"
                />
             ) : (
                <div className="absolute inset-0 bg-[#0e2d6e]" />
             )}
             
             {/* Overlay */}
             {selectedTheme?.cover_photo && <div className="absolute inset-0 bg-black/20" />}

             <div className="flex-1 flex flex-col items-center justify-center text-white px-6 text-center z-10 mt-10">
                <div className="w-20 h-20 bg-white/10 rounded-full mb-6 flex items-center justify-center backdrop-blur-sm border border-white/20">
                   <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <h2 className="text-xl font-bold font-['Poppins'] mb-2">{selectedTheme?.name || 'Your Profile'}</h2>
                <p className="text-sm text-white/70 font-['Inter'] mb-8 uppercase tracking-widest">Digital Business Profile</p>
                
                <div className="w-full space-y-3 px-4">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="h-10 bg-white/10 rounded-xl border border-white/20" />
                   ))}
                </div>
             </div>
             
             {/* Decorative bottom wave */}
             <svg className="absolute bottom-0 w-full h-32 text-white/5" preserveAspectRatio="none" viewBox="0 0 1440 320"><path fill="currentColor" fillOpacity="1" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,170.7C672,171,768,117,864,117.3C960,117,1056,171,1152,192C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
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
                      <img src={theme.cover_photo} alt={theme.name} className="w-full h-full object-cover" />
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
