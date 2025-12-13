import React from 'react';
import { useTheme } from '../lib/theme-context';
import { themes, ThemeName, ThemeMode } from '../lib/themes';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { ComputerIcon } from './icons/ComputerIcon';

export function ThemeToggle() {
  const { mode, theme, setMode, setTheme } = useTheme();

  const modeOptions: { value: ThemeMode; label: string; icon: React.ReactElement }[] = [
    { value: 'light', label: 'Light', icon: <SunIcon className="w-4 h-4" /> },
    { value: 'dark', label: 'Dark', icon: <MoonIcon className="w-4 h-4" /> },
    { value: 'system', label: 'System', icon: <ComputerIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-foreground mb-3 block">
          Theme Mode
        </label>
        <div className="grid grid-cols-3 gap-2">
          {modeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setMode(option.value)}
              className={`
                flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${mode === option.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }
              `}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-3 block">
          Color Theme
        </label>
        <div className="grid grid-cols-2 gap-2">
          {themes.map((themeOption) => (
            <button
              key={themeOption.name}
              onClick={() => setTheme(themeOption.name as ThemeName)}
              className={`
                flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${theme === themeOption.name
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }
              `}
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full border border-border"
                  style={{ 
                    backgroundColor: `hsl(${themeOption.light.primary})` 
                  }}
                />
                {themeOption.displayName}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
