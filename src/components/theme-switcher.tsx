'use client';

import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Glasses } from 'lucide-react';

type Theme = 'default' | 'protanopia' | 'deuteranopia' | 'tritanopia';

const themes: { value: Theme; label: string; className: string }[] = [
  { value: 'default', label: 'Default', className: '' },
  { value: 'protanopia', label: 'Protanopia', className: 'theme-protanopia' },
  { value: 'deuteranopia', label: 'Deuteranopia', className: 'theme-deuteranopia' },
  { value: 'tritanopia', label: 'Tritanopia', className: 'theme-tritanopia' },
];

export function ThemeSwitcher() {
  const [theme, setTheme] = React.useState<Theme>('default');

  React.useEffect(() => {
    document.body.classList.remove(...themes.map(t => t.className).filter(Boolean));
    const selectedTheme = themes.find(t => t.value === theme);
    if (selectedTheme && selectedTheme.className) {
      document.body.classList.add(selectedTheme.className);
    }
  }, [theme]);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Glasses className="h-5 w-5" />
          <span className="sr-only">Toggle accessibility theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t) => (
            <DropdownMenuItem key={t.value} onClick={() => setTheme(t.value)}>
                {t.label}
            </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
