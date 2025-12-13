export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeName = 'default' | 'solarized' | 'kimbie' | 'monokai';

export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

export interface Theme {
  name: ThemeName;
  displayName: string;
  light: ThemeColors;
  dark: ThemeColors;
}

// Default theme (existing colors)
const defaultTheme: Theme = {
  name: 'default',
  displayName: 'Default',
  light: {
    background: '0 0% 100%',
    foreground: '222.2 84% 4.9%',
    card: '0 0% 100%',
    cardForeground: '222.2 84% 4.9%',
    popover: '0 0% 100%',
    popoverForeground: '222.2 84% 4.9%',
    primary: '221.2 83.2% 53.3%',
    primaryForeground: '210 40% 98%',
    secondary: '210 40% 96%',
    secondaryForeground: '222.2 84% 4.9%',
    muted: '210 40% 96%',
    mutedForeground: '215.4 16.3% 46.9%',
    accent: '210 40% 96%',
    accentForeground: '222.2 84% 4.9%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '210 40% 98%',
    border: '214.3 31.8% 91.4%',
    input: '214.3 31.8% 91.4%',
    ring: '221.2 83.2% 53.3%',
  },
  dark: {
    background: '222.2 84% 4.9%',
    foreground: '210 40% 98%',
    card: '222.2 84% 4.9%',
    cardForeground: '210 40% 98%',
    popover: '222.2 84% 4.9%',
    popoverForeground: '210 40% 98%',
    primary: '217.2 91.2% 59.8%',
    primaryForeground: '222.2 84% 4.9%',
    secondary: '217.2 32.6% 17.5%',
    secondaryForeground: '210 40% 98%',
    muted: '217.2 32.6% 17.5%',
    mutedForeground: '215 20.2% 65.1%',
    accent: '217.2 32.6% 17.5%',
    accentForeground: '210 40% 98%',
    destructive: '0 62.8% 30.6%',
    destructiveForeground: '210 40% 98%',
    border: '217.2 32.6% 17.5%',
    input: '217.2 32.6% 17.5%',
    ring: '224.3 76.3% 94.1%',
  },
};

// Solarized theme
const solarizedTheme: Theme = {
  name: 'solarized',
  displayName: 'Solarized',
  light: {
    background: '44 87% 94%', // base3
    foreground: '192 81% 14%', // base02
    card: '44 87% 94%',
    cardForeground: '192 81% 14%',
    popover: '44 87% 94%',
    popoverForeground: '192 81% 14%',
    primary: '205 69% 49%', // blue
    primaryForeground: '44 87% 94%',
    secondary: '45 100% 85%', // base2
    secondaryForeground: '192 81% 14%',
    muted: '45 100% 85%',
    mutedForeground: '194 14% 40%', // base01
    accent: '68 100% 30%', // green
    accentForeground: '44 87% 94%',
    destructive: '1 71% 52%', // red
    destructiveForeground: '44 87% 94%',
    border: '45 100% 85%',
    input: '45 100% 85%',
    ring: '205 69% 49%',
  },
  dark: {
    background: '192 100% 11%', // base03
    foreground: '45 100% 85%', // base2
    card: '192 100% 11%',
    cardForeground: '45 100% 85%',
    popover: '192 100% 11%',
    popoverForeground: '45 100% 85%',
    primary: '205 69% 49%', // blue
    primaryForeground: '192 100% 11%',
    secondary: '192 81% 14%', // base02
    secondaryForeground: '45 100% 85%',
    muted: '192 81% 14%',
    mutedForeground: '194 14% 40%', // base01
    accent: '68 100% 30%', // green
    accentForeground: '45 100% 85%',
    destructive: '1 71% 52%', // red
    destructiveForeground: '45 100% 85%',
    border: '192 81% 14%',
    input: '192 81% 14%',
    ring: '205 69% 49%',
  },
};

// Kimbie theme
const kimbieTheme: Theme = {
  name: 'kimbie',
  displayName: 'Kimbie',
  light: {
    background: '48 100% 93%', // light cream
    foreground: '25 25% 18%', // dark brown
    card: '48 100% 93%',
    cardForeground: '25 25% 18%',
    popover: '48 100% 93%',
    popoverForeground: '25 25% 18%',
    primary: '340 82% 52%', // pink/red
    primaryForeground: '48 100% 93%',
    secondary: '48 100% 85%', // lighter cream
    secondaryForeground: '25 25% 18%',
    muted: '48 100% 85%',
    mutedForeground: '25 25% 45%', // medium brown
    accent: '45 100% 51%', // yellow/orange
    accentForeground: '25 25% 18%',
    destructive: '0 100% 67%', // bright red
    destructiveForeground: '48 100% 93%',
    border: '48 100% 85%',
    input: '48 100% 85%',
    ring: '340 82% 52%',
  },
  dark: {
    background: '25 25% 18%', // dark brown
    foreground: '48 100% 93%', // light cream
    card: '25 25% 18%',
    cardForeground: '48 100% 93%',
    popover: '25 25% 18%',
    popoverForeground: '48 100% 93%',
    primary: '340 82% 52%', // pink/red
    primaryForeground: '25 25% 18%',
    secondary: '25 25% 25%', // slightly lighter brown
    secondaryForeground: '48 100% 93%',
    muted: '25 25% 25%',
    mutedForeground: '25 25% 65%', // light brown
    accent: '45 100% 51%', // yellow/orange
    accentForeground: '25 25% 18%',
    destructive: '0 100% 67%', // bright red
    destructiveForeground: '48 100% 93%',
    border: '25 25% 25%',
    input: '25 25% 25%',
    ring: '340 82% 52%',
  },
};

// Monokai theme
const monokaiTheme: Theme = {
  name: 'monokai',
  displayName: 'Monokai',
  light: {
    background: '0 0% 97%', // light gray
    foreground: '0 0% 13%', // dark gray
    card: '0 0% 97%',
    cardForeground: '0 0% 13%',
    popover: '0 0% 97%',
    popoverForeground: '0 0% 13%',
    primary: '326 100% 74%', // pink
    primaryForeground: '0 0% 13%',
    secondary: '0 0% 90%', // light gray
    secondaryForeground: '0 0% 13%',
    muted: '0 0% 90%',
    mutedForeground: '0 0% 40%', // medium gray
    accent: '81 100% 61%', // green
    accentForeground: '0 0% 13%',
    destructive: '0 100% 67%', // red
    destructiveForeground: '0 0% 97%',
    border: '0 0% 90%',
    input: '0 0% 90%',
    ring: '326 100% 74%',
  },
  dark: {
    background: '70 8% 15%', // dark gray-green
    foreground: '0 0% 97%', // light gray
    card: '70 8% 15%',
    cardForeground: '0 0% 97%',
    popover: '70 8% 15%',
    popoverForeground: '0 0% 97%',
    primary: '326 100% 74%', // pink
    primaryForeground: '70 8% 15%',
    secondary: '70 8% 20%', // slightly lighter dark
    secondaryForeground: '0 0% 97%',
    muted: '70 8% 20%',
    mutedForeground: '0 0% 70%', // light gray
    accent: '81 100% 61%', // green
    accentForeground: '70 8% 15%',
    destructive: '0 100% 67%', // red
    destructiveForeground: '0 0% 97%',
    border: '70 8% 20%',
    input: '70 8% 20%',
    ring: '326 100% 74%',
  },
};

export const themes: Theme[] = [
  defaultTheme,
  solarizedTheme,
  kimbieTheme,
  monokaiTheme,
];

export const getTheme = (name: ThemeName): Theme => {
  return themes.find(theme => theme.name === name) || defaultTheme;
};

export const applyTheme = (themeName: ThemeName, mode: 'light' | 'dark') => {
  const theme = getTheme(themeName);
  const colors = theme[mode];
  
  const root = document.documentElement;
  
  Object.entries(colors).forEach(([key, value]) => {
    const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    root.style.setProperty(cssVar, value);
  });
};
