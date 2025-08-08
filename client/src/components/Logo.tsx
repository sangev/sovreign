import logoImage from "@assets/Untitled design_1754653093753.png";
import { useTheme } from "@/contexts/ThemeContext";

export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  const { darkMode } = useTheme();
  
  return (
    <div className={`${className} flex items-center justify-center`}>
      <img 
        src={logoImage} 
        alt="Atlas Logo" 
        className="w-full h-full object-contain transition-all duration-200"
        style={darkMode ? { 
          mixBlendMode: 'multiply',
          filter: 'brightness(1.1) contrast(1.1)'
        } : {}}
      />
    </div>
  );
}