import { useState } from 'react';
import Header from '../components/Header';
import UploadSection from '../components/UploadSection';

type Campaign = {
  id: string;
  name: string;
  date: string;
  fileName: string;
};

export default function MarketingPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: '1', name: 'Summer Sale 2024', date: '2024-05-15', fileName: 'summer_banner.jpg' },
    { id: '2', name: 'NFC Cards Launch', date: '2024-06-01', fileName: 'launch_video.mp4' },
  ]);
  const [name, setName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !selectedFile) {
      alert("Please provide a name and select a file.");
      return;
    }
    
    // Simulate upload
    const newCampaign: Campaign = {
      id: Date.now().toString(),
      name,
      date: new Date().toISOString().split('T')[0],
      fileName: selectedFile.name,
    };
    
    setCampaigns([newCampaign, ...campaigns]);
    setName('');
    setSelectedFile(null);
    alert('Campaign uploaded successfully!');
  };

  return (
    <div className="bg-[#020617] min-h-screen">
      <Header />
      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-8 text-[#5aa4f4]">Marketing Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Upload Section */}
        <div className="lg:col-span-1 bg-[#100425] border border-white/10 rounded-2xl p-6 h-fit">
          <h2 className="text-2xl font-semibold mb-6">New Campaign</h2>
          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Campaign Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Q4 Promo"
                className="w-full bg-[#0e0725] border border-white/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#5aa4f4] transition-colors"
              />
            </div>
            
            <UploadSection 
              label="Campaign Asset" 
              onFileSelect={(file) => setSelectedFile(file)} 
            />
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#5aa4f4] to-[#3a8bd4] text-[#100425] font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Upload Campaign
            </button>
          </form>
        </div>

        {/* Past Campaigns Section */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold mb-6">Past Campaigns</h2>
          
          <div className="grid gap-4">
            {campaigns.map((campaign) => (
              <div 
                key={campaign.id} 
                className="bg-[#100425]/50 border border-white/10 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:border-[#5aa4f4]/50 transition-colors gap-4"
              >
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-[#5aa4f4]">{campaign.name}</h3>
                  <p className="text-sm text-white/60 mt-1">Uploaded: {campaign.date}</p>
                </div>
                
                <div className="flex items-center gap-4 bg-[#0e0725] px-4 py-2 rounded-lg border border-white/5 w-full sm:w-auto">
                  <svg className="w-5 h-5 text-white/50 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  <span className="text-sm truncate max-w-[150px] sm:max-w-[200px] block">{campaign.fileName}</span>
                </div>
              </div>
            ))}
            
            {campaigns.length === 0 && (
              <div className="text-center py-12 text-white/50 bg-[#100425]/30 rounded-xl border border-white/5">
                No campaigns uploaded yet.
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  </div>
  );
}
