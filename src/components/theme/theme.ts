export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent?: string;
  [key: string]: string | undefined;
}

export interface Theme {
  name: string;
  mode: ThemeMode;
  colors: ThemeColors;
}