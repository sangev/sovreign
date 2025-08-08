import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Link, useLocation } from "wouter";

export default function Header() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [location] = useLocation();

  return (
    <header className="flex items-center justify-between p-4 max-w-6xl mx-auto">
      <div className="flex items-center space-x-6">
        <Link href="/">
          <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
            <Logo className="w-10 h-10" />
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">aruna talent</h1>
            </div>
          </div>
        </Link>
        
        {/* Navigation Links */}
        <nav className="flex items-center space-x-1">
          <Link href="/">
            <Button 
              variant={location === "/" ? "default" : "ghost"}
              size="sm"
              className="text-sm font-medium"
            >
              Atlas
            </Button>
          </Link>
          <Link href="/guardian">
            <Button 
              variant={location === "/guardian" ? "default" : "ghost"}
              size="sm"
              className="text-sm font-medium"
            >
              Guardian
            </Button>
          </Link>
        </nav>
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