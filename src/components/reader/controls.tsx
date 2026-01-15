'use client';

interface ControlsProps {
  wpm: number;
  setWpm: (wpm: number) => void;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  status: string;
  currentIndex: number;
  totalWords: number;
  elapsedSeconds: number;
  totalSeconds: number;
  disabled: boolean;
  showInput: boolean;
  onToggleInput: () => void;
}

export default function Controls({
  wpm,
  setWpm,
  isPlaying,
  onPlay,
  onPause,
  status,
  currentIndex,
  totalWords,
  elapsedSeconds,
  totalSeconds,
  disabled,
  showInput,
  onToggleInput,
}: ControlsProps) {
  // Formatear tiempo a mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  // Calcular progreso (0-100) basado en tiempo transcurrido
  const progress =
    totalSeconds > 0 ? (elapsedSeconds / totalSeconds) * 100 : 0;

  return (
    <div className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 p-6 space-y-6">
      {/* Speed Control */}
      <div>
        <label className="text-sm font-mono font-semibold text-gray-700 dark:text-gray-300 uppercase block mb-3">
          Speed (WPM)
        </label>

        <div className="flex items-center gap-4">
          <input
            type="range"
            min="50"
            max="1000"
            step="10"
            value={wpm}
            onChange={(e) => setWpm(Number(e.target.value))}
            className="flex-1 h-2 bg-gray-200 dark:bg-gray-800 appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, 
                ${isPlaying ? '#9ca3af' : '#374151'} 0%, 
                ${isPlaying ? '#9ca3af' : '#374151'} ${
                ((wpm - 50) / 950) * 100
              }%, 
                ${isPlaying ? '#1f2933' : '#e5e7eb'} ${
                ((wpm - 50) / 950) * 100
              }%, 
                ${isPlaying ? '#1f2933' : '#e5e7eb'} 100%)`,
            }}
          />

          <input
            type="number"
            min="50"
            max="1000"
            step="10"
            value={wpm}
            onChange={(e) => setWpm(Number(e.target.value))}
            className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black font-mono text-sm text-gray-900 dark:text-gray-100 text-center focus:outline-none focus:border-gray-500 dark:focus:border-gray-400"
          />
        </div>
      </div>

      {/* Playback Controls */}
      <div className="flex gap-3">
        <button
          onClick={onPlay}
          disabled={disabled || isPlaying}
          className="flex-1 px-6 py-3 bg-gray-900 dark:bg-gray-100 hover:bg-gray-700 dark:hover:bg-gray-300 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white dark:text-black font-mono font-semibold border border-gray-900 dark:border-gray-100 disabled:border-gray-300 dark:disabled:border-gray-700 transition-colors"
        >
          PLAY
        </button>

        <button
          onClick={onPause}
          disabled={disabled || !isPlaying}
          className="flex-1 px-6 py-3 bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-900 disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed text-gray-900 dark:text-gray-100 font-mono font-semibold border border-gray-900 dark:border-gray-100 disabled:border-gray-300 dark:disabled:border-gray-700 disabled:text-gray-400 dark:disabled:text-gray-600 transition-colors"
        >
          PAUSE
        </button>

        <button
          onClick={onToggleInput}
          disabled={disabled}
          className="px-6 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed text-gray-900 dark:text-gray-100 font-mono font-semibold border border-gray-400 dark:border-gray-600 disabled:border-gray-300 dark:disabled:border-gray-700 disabled:text-gray-400 dark:disabled:text-gray-600 transition-colors"
        >
          {showInput ? 'HIDE INPUT' : 'SHOW INPUT'}
        </button>
      </div>

      {/* Status Display */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div>
          <p className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase mb-1">
            Status
          </p>
          <p className="text-sm font-mono font-bold text-gray-900 dark:text-gray-100">
            {status}
          </p>
        </div>

        <div>
          <p className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase mb-1">
            Words
          </p>
          <p className="text-sm font-mono font-bold text-gray-900 dark:text-gray-100">
            {currentIndex + 1} / {totalWords}
          </p>
        </div>

        <div>
          <p className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase mb-1">
            Time
          </p>
          <p className="text-sm font-mono font-bold text-gray-900 dark:text-gray-100">
            {formatTime(elapsedSeconds)} / {formatTime(totalSeconds)}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
          <div
            className="h-full bg-gray-900 dark:bg-gray-100 transition-all duration-100"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mt-2 text-right">
          {progress.toFixed(1)}% complete
        </p>
      </div>
    </div>
  );
}
