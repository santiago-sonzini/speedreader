'use client';

interface TextInputProps {
  text: string;
  setText: (text: string) => void;
  onClear: () => void;
  totalSeconds: number;
  wpm: number;
}

export default function TextInput({
  text,
  setText,
  onClear,
  totalSeconds,
  wpm,
}: TextInputProps) {
  // Formatear segundos a mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-mono font-semibold text-gray-700 dark:text-gray-300 uppercase">
          Text Input
        </label>

        <button
          onClick={onClear}
          className="px-4 py-1 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-mono border border-gray-400 dark:border-gray-600 transition-colors"
        >
          CLEAR
        </button>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here..."
        className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black focus:outline-none focus:border-gray-500 dark:focus:border-gray-400 font-mono text-sm text-gray-900 dark:text-gray-100 resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
      />

      {/* Mostrar duración total estimada */}
      {text.trim() && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm font-mono text-gray-600 dark:text-gray-400">
            Estimated duration:{' '}
            <span className="font-bold text-gray-900 dark:text-gray-100">
              {formatTime(totalSeconds)}
            </span>{' '}
            at {wpm} WPM
          </p>
        </div>
      )}
    </div>
  );
}
