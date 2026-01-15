'use client';

import Header from '@/components/layout/header';
import Controls from '@/components/reader/controls';
import Reader from '@/components/reader/reader';
import TextInput from '@/components/reader/text-input';
import { useState, useEffect, useCallback } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [words, setWords] = useState<string[]>([]);
  const [wpm, setWpm] = useState(500);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showInput, setShowInput] = useState(true);

  // Calcular duración total en segundos
  const totalSeconds =
    words.length > 0 ? (words.length * (60000 / wpm)) / 1000 : 0;

  // Procesar texto en palabras cuando cambia
  useEffect(() => {
    if (text.trim()) {
      const wordArray = text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);

      setWords(wordArray);
      setCurrentIndex(0);
      setElapsedSeconds(0);
    } else {
      setWords([]);
      setCurrentIndex(0);
      setElapsedSeconds(0);
    }
  }, [text]);

  // Control del reproductor
  useEffect(() => {
    if (!isPlaying || words.length === 0) return;

    const msPerWord = 60000 / wpm;

    const wordInterval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= words.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, msPerWord);

    // Actualizar tiempo transcurrido cada 100ms
    const timeInterval = setInterval(() => {
      setElapsedSeconds((prev) => {
        const newTime = prev + 0.1;
        if (newTime >= totalSeconds) return totalSeconds;
        return newTime;
      });
    }, 100);

    return () => {
      clearInterval(wordInterval);
      clearInterval(timeInterval);
    };
  }, [isPlaying, wpm, words.length, totalSeconds]);

  const handlePlay = useCallback(() => {
    if (words.length === 0) return;

    if (currentIndex >= words.length - 1) {
      setCurrentIndex(0);
      setElapsedSeconds(0);
    }

    setIsPlaying(true);
  }, [words.length, currentIndex]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleTogglePlayPause = useCallback(() => {
    if (words.length === 0) return;

    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  }, [isPlaying, words.length, handlePlay, handlePause]);

  // Listener para tecla espacio
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        handleTogglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTogglePlayPause]);

  const handleClear = useCallback(() => {
    setText('');
    setIsPlaying(false);
    setCurrentIndex(0);
    setElapsedSeconds(0);
    setShowInput(true);
  }, []);

  const getStatus = () => {
    if (
      currentIndex >= words.length - 1 &&
      words.length > 0 &&
      !isPlaying &&
      elapsedSeconds >= totalSeconds
    ) {
      return 'Finished';
    }
    return isPlaying ? 'Playing' : 'Paused';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 container mt-10 mx-auto px-6 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Text Input Section */}
          {showInput && (
            <TextInput
              text={text}
              setText={setText}
              onClear={handleClear}
              totalSeconds={totalSeconds}
              wpm={wpm}
            />
          )}

          {/* Reader Display */}
          <Reader
            currentWord={words[currentIndex] || ''}
            isActive={words.length > 0}
            onTogglePlayPause={handleTogglePlayPause}
          />

          {/* Controls */}
          <Controls
            wpm={wpm}
            setWpm={setWpm}
            isPlaying={isPlaying}
            onPlay={handlePlay}
            onPause={handlePause}
            status={getStatus()}
            currentIndex={currentIndex}
            totalWords={words.length}
            elapsedSeconds={elapsedSeconds}
            totalSeconds={totalSeconds}
            disabled={words.length === 0}
            showInput={showInput}
            onToggleInput={() => setShowInput(!showInput)}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-black border-t border-gray-300 dark:border-gray-700 px-6 py-4">
        <p className="text-sm font-mono text-gray-500 dark:text-gray-400 text-center">
          Paste text, set speed, and read word by word • Press SPACE to play/pause
        </p>
      </footer>
    </div>
  );
}
