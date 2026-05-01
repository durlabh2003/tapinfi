import { useState, DragEvent, ChangeEvent } from 'react';

type UploadSectionProps = {
  label: string;
  onFileSelect: (file: File) => void;
};

export default function UploadSection({ label, onFileSelect }: UploadSectionProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onFileSelect(file);
      generatePreview(file);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFileSelect(file);
      generatePreview(file);
    }
  };

  const generatePreview = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = ev => setPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="w-full">
      <label className="block mb-2 font-medium text-white">{label}</label>
      <div
        className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg transition-all ${dragActive ? 'border-[#5aa4f4] bg-[#100425] bg-opacity-60' : 'border-white/30'} bg-gradient-to-br from-[#0e0725] to-[#100425]`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        {preview ? (
          <img src={preview} alt="preview" className="max-h-48 object-contain mb-2 rounded" />
        ) : (
          <p className="text-white/70 mb-2">Drag & drop a file here, or click to select</p>
        )}
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={handleChange}
          className="hidden"
          id="upload-input"
        />
        <label htmlFor="upload-input" className="cursor-pointer px-4 py-2 bg-[#5aa4f4] text-[#100425] rounded hover:bg-[#4a8bd4] transition-colors">
          Choose File
        </label>
      </div>
    </div>
  );
}
