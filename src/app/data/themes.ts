export interface ThemeOption {
  id: string;
  name: string;
  color: string;
}

export const THEMES: ThemeOption[] = [
  { id: 'theme-1', name: 'XYZ Profile Name', color: 'bg-[#1e293b]' },
  { id: 'theme-2', name: 'ABC Profile Name', color: 'bg-[#0f172a]' },
  { id: 'theme-3', name: 'PQR Profile Name', color: 'bg-[#334155]' },
  { id: 'theme-4', name: 'LMN Profile Name', color: 'bg-[#475569]' },
  { id: 'theme-5', name: 'RST Profile Name', color: 'bg-[#64748b]' },
  { id: 'theme-6', name: 'UVW Profile Name', color: 'bg-[#94a3b8]' },
];
