export interface ThemeOption {
  id: string;
  name: string;
  color: string;
}

export const THEMES: ThemeOption[] = [
  { id: 'DirectorProfileTheme', name: 'Director Profile', color: 'bg-[#1e293b]' },
  { id: 'PinkBusinessCardTheme', name: 'Pink Business Card', color: 'bg-[#0f172a]' },
  { id: 'BusinessTheme', name: 'Business Theme', color: 'bg-[#334155]' },
  { id: 'EngineerTheme', name: 'Engineer Theme', color: 'bg-[#475569]' },
  { id: 'TapinfiTheme', name: 'Tapinfi Theme (Default)', color: 'bg-[#64748b]' },
];
