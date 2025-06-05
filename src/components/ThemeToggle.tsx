
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-300"
    >
      {isDark ? (
        <>
          <Sun className="w-4 h-4 text-yellow-500" />
          <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-gray-700" />
          <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">Dark</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
