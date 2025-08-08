import logoImage from "@assets/Untitled design_1754653093753.png";

export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <img 
        src={logoImage} 
        alt="Atlas Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
}