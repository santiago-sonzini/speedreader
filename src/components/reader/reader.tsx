'use client';

interface ReaderProps {
  currentWord: string;
  isActive: boolean;
  onTogglePlayPause: () => void;
}

export default function Reader({
  currentWord,
  isActive,
  onTogglePlayPause,
}: ReaderProps) {
  // Calcular índice de la letra central
  const getCentralLetterIndex = (word: string) => {
    return Math.floor(word.length / 2);
  };

  // Renderizar palabra con letra central en rojo
  const renderWordWithCentralLetter = () => {
    if (!currentWord) return null;

    const centralIndex = getCentralLetterIndex(currentWord);

    return (
      <span className="inline-block">
        <span className="text-gray-900 dark:text-gray-100">
          {currentWord.slice(0, centralIndex)}
        </span>
        <span className="text-red-600 dark:text-red-500">
          {currentWord[centralIndex]}
        </span>
        <span className="text-gray-900 dark:text-gray-100">
          {currentWord.slice(centralIndex + 1)}
        </span>
      </span>
    );
  };

  return (
    <div
      className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 p-12 flex items-center justify-center min-h-[300px] cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
      onClick={onTogglePlayPause}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onTogglePlayPause();
        }
      }}
    >
      {isActive ? (
        <div className="text-center">
          <div className="text-6xl font-mono font-bold tracking-tight">
            {renderWordWithCentralLetter()}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-400 dark:text-gray-500 font-mono text-lg">
            No text loaded
          </p>
        </div>
      )}
    </div>
  );
}
