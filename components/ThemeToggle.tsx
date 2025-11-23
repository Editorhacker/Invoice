import React from 'react';
import { useTheme } from './ThemeContext';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dusty-pink focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export default ThemeToggle;