'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="
            relative
            border border-gray-400 dark:border-gray-600
            bg-transparent
            text-gray-900 dark:text-gray-100
            font-mono
            hover:bg-gray-900 hover:text-white
            dark:hover:bg-gray-100 dark:hover:text-black
            transition-colors
            rounded-none
          "
        >
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="
          rounded-none
          border border-gray-400 dark:border-gray-600
          bg-white dark:bg-black
          font-mono
        "
      >
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className="
            uppercase text-xs tracking-widest
            focus:bg-gray-900 focus:text-white
            dark:focus:bg-gray-100 dark:focus:text-black
          "
        >
          Light
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className="
            uppercase text-xs tracking-widest
            focus:bg-gray-900 focus:text-white
            dark:focus:bg-gray-100 dark:focus:text-black
          "
        >
          Dark
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className="
            uppercase text-xs tracking-widest
            focus:bg-gray-900 focus:text-white
            dark:focus:bg-gray-100 dark:focus:text-black
          "
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
