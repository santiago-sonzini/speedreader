import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import { UserNav } from './user-nav';
import Link from 'next/link';

interface HeaderProps {
  name?: string;
  showThemeToggle?: boolean;
}

export default function Header({
  name,
  showThemeToggle = true,
}: HeaderProps) {
  return (
    <div
      className={cn(
        'fixed left-0 right-0 top-0 z-20',
        'border-b border-gray-300 dark:border-gray-700',
        'bg-white/95 dark:bg-black/95',
        'backdrop-blur font-mono'
      )}
    >
      <nav className="flex h-14 items-center justify-between px-4">
        {/* Left — Brand / System Name */}
        <div className="hidden lg:block">
          <Link
            href={'https://speed.nomosdelta.xyz/'}
            target="_blank"
            className={cn(
              'uppercase tracking-widest text-base p-8',
              'text-gray-900 dark:text-gray-100',
              'hover:text-gray-600 dark:hover:text-gray-400',
              'transition-colors'
            )}
          >
            Delta{name ? ` | ${name}` : ''}
          </Link>
        </div>

       

        {/* Right — Controls */}
        <div className="flex items-center gap-2">
          {showThemeToggle && (
           
              <ThemeToggle />
          )}

          {/* Optional slots if you want them later */}
          {/* <MobileSidebar /> */}
          {/* <UserNav /> */}
        </div>
      </nav>

      {/* Bottom System Bar */}
  
    </div>
  );
}
