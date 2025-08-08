import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function Header() {
  const { darkMode, toggleDarkMode } = useTheme();

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
        onClick={toggleDarkMode}
        aria-label="Toggle dark mode"
        className="text-gray-600 dark:text-gray-300"
      >
        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
    </header>
  );
}