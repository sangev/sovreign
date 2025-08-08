import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference on mount
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      setDarkMode(isDark);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <header className="flex items-center justify-between p-4 max-w-4xl mx-auto">
      <div className="flex items-center space-x-3">
        <Logo className="w-10 h-10" />
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">aruna talent</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Atlas</p>
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle dark mode"
        className="text-gray-600 dark:text-gray-300"
      >
        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
    </header>
  );
}