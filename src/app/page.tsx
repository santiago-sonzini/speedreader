'use client';

import Header from '@/components/layout/header';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [hovered, setHovered] = useState<'reader' | 'habits' | null>(null);

  return (
    <main className="h-screen w-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 font-mono">
      {/* Header */}
     < Header/>

      {/* Split Screen */}
      <div className="h-full flex">
        {/* SPEED */}
        <Panel
          title="Speed Reader"
          subtitle="Cognitive Throughput System"
          description="Optimize reading velocity. Control time, perception, and processing bandwidth."
          action="ENTER SPEED MODE"
          active={hovered === 'reader'}
          inactive={hovered === 'habits'}
          onHover={() => setHovered('reader')}
          onLeave={() => setHovered(null)}
          onClick={() => router.push('/reader')}
          align="left"
        />

        {/* HABITS */}
        <Panel
          title="Habits"
          subtitle="Behavior Consistency Engine"
          description="Track discipline patterns. Visualize momentum. Compare performance vectors."
          action="ENTER HABIT MODE"
          active={hovered === 'habits'}
          inactive={hovered === 'reader'}
          onHover={() => setHovered('habits')}
          onLeave={() => setHovered(null)}
          onClick={() => router.push('/habits')}
          align="right"
        />
      </div>
    </main>
  );
}

interface PanelProps {
  title: string;
  subtitle: string;
  description: string;
  action: string;
  active: boolean;
  inactive: boolean;
  align: 'left' | 'right';
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

function Panel({
  title,
  subtitle,
  description,
  action,
  active,
  inactive,
  align,
  onHover,
  onLeave,
  onClick,
}: PanelProps) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={`
        relative flex flex-col justify-center cursor-pointer transition-all duration-500
        border-gray-300 dark:border-gray-700
        ${align === 'left' ? 'border-r' : 'border-l'}
        ${active ? 'flex-[1.2]' : 'flex-1'}
        ${inactive ? 'opacity-100' : 'opacity-100'}
        ${active
          ? 'bg-gray-900 text-white dark:bg-gray-900 dark:text-white'
          : 'bg-gray-900 text-white dark:bg-black dark:text-gray-100'}
      `}
    >
      {/* Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(to right, #999 1px, transparent 1px), linear-gradient(to bottom, #999 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div className="relative px-12 space-y-6 max-w-xl">
        <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
          {subtitle}
        </p>

        <h2 className="text-4xl uppercase tracking-tight">
          {title}
        </h2>

        <div
          className={`
            transition-all duration-500 overflow-hidden
            ${active ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
            {description}
          </p>
        </div>

        {/* Action Bar */}
        <div
          className={`
            mt-8 inline-block border border-gray-900 dark:border-gray-100 px-6 py-3 text-xs uppercase tracking-widest
            transition-all duration-300
            ${active
              ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-black'
              : 'bg-transparent'}
          `}
        >
          {action}
        </div>
      </div>

      {/* Edge Indicator */}
      <div
        className={`
          absolute top-0 ${align === 'left' ? 'right-0' : 'left-0'}
          h-full w-1 transition-all duration-300
          ${active
            ? 'bg-gray-900 dark:bg-gray-100'
            : 'bg-gray-300 dark:bg-gray-700'}
        `}
      />
    </div>
  );
}
