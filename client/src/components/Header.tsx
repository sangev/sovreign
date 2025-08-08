import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { Moon, Sun, ChevronDown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Link, useLocation } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [location] = useLocation();

  const getCurrentPageName = () => {
    if (location === "/guardian") return "Guardian";
    return "Atlas";
  };

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
        
        {/* Navigation Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              {getCurrentPageName()}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-40">
            <Link href="/">
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col">
                  <span className="font-medium">Atlas</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Conversation Analysis
                  </span>
                </div>
              </DropdownMenuItem>
            </Link>
            <Link href="/guardian">
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col">
                  <span className="font-medium">Guardian</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Analytics Dashboard
                  </span>
                </div>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
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