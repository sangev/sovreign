export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle with orange gradient */}
        <circle 
          cx="50" 
          cy="45" 
          r="35" 
          fill="#ff6b35"
          stroke="#e65100" 
          strokeWidth="2"
        />
        
        {/* Classical bearded face design in orange tones */}
        <g fill="#e65100">
          {/* Hair/crown decorative swirls */}
          <circle cx="35" cy="25" r="4" fill="#ff8a50" />
          <circle cx="50" cy="20" r="5" fill="#ff8a50" />
          <circle cx="65" cy="25" r="4" fill="#ff8a50" />
          
          {/* Eyes */}
          <ellipse cx="42" cy="40" rx="2" ry="4" />
          <ellipse cx="58" cy="40" rx="2" ry="4" />
          
          {/* Nose */}
          <ellipse cx="50" cy="48" rx="1.5" ry="3" />
          
          {/* Mustache curves */}
          <path d="M40 55 Q45 53 50 55 Q55 53 60 55" stroke="#e65100" strokeWidth="2" fill="none" />
          
          {/* Beard */}
          <ellipse cx="50" cy="65" rx="12" ry="8" fill="#ff8a50" />
          <ellipse cx="45" cy="68" rx="4" ry="6" fill="#e65100" />
          <ellipse cx="55" cy="68" rx="4" ry="6" fill="#e65100" />
          <ellipse cx="50" cy="72" rx="3" ry="5" fill="#e65100" />
        </g>
        
        {/* Atlas text */}
        <text
          x="50"
          y="92"
          fontFamily="Arial, sans-serif"
          fontSize="8"
          fontWeight="bold"
          textAnchor="middle"
          fill="#e65100"
        >
          ATLAS
        </text>
      </svg>
    </div>
  );
}