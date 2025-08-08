export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Orange to coral gradient for head */}
          <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6b35" />
            <stop offset="30%" stopColor="#ff7961" />
            <stop offset="70%" stopColor="#ff8a80" />
            <stop offset="100%" stopColor="#ffab91" />
          </linearGradient>
          
          {/* Yellow to orange gradient for neck */}
          <linearGradient id="neckGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff176" />
            <stop offset="50%" stopColor="#ffb74d" />
            <stop offset="100%" stopColor="#ff8a65" />
          </linearGradient>
        </defs>
        
        {/* Human head silhouette */}
        <path
          d="M75 35 C75 25, 70 15, 60 10 C55 8, 50 8, 45 10 C35 15, 30 25, 30 35 C30 45, 32 55, 35 65 L40 75 L45 85 L55 85 L60 75 L65 65 C68 55, 75 45, 75 35 Z"
          fill="url(#headGradient)"
        />
        
        {/* Neck/shoulder area */}
        <path
          d="M45 85 L40 90 L35 95 L65 95 L60 90 L55 85 Z"
          fill="url(#neckGradient)"
        />
        
        {/* Neural network nodes and connections */}
        <g fill="#e53935" stroke="#e53935" strokeWidth="1.5">
          {/* Main network nodes */}
          <circle cx="20" cy="40" r="2.5" fill="#ff6b35" />
          <circle cx="15" cy="50" r="2" fill="#ff6b35" />
          <circle cx="10" cy="35" r="1.5" fill="#ff6b35" />
          <circle cx="8" cy="45" r="1" fill="#ff6b35" />
          <circle cx="25" cy="55" r="2" fill="#ff6b35" />
          <circle cx="18" cy="60" r="1.5" fill="#ff6b35" />
          <circle cx="12" cy="65" r="1" fill="#ff6b35" />
          
          {/* Connecting lines */}
          <line x1="20" y1="40" x2="15" y2="50" stroke="#ff6b35" strokeWidth="2" />
          <line x1="15" y1="50" x2="10" y2="35" stroke="#ff6b35" strokeWidth="1.5" />
          <line x1="10" y1="35" x2="8" y2="45" stroke="#ff6b35" strokeWidth="1" />
          <line x1="20" y1="40" x2="25" y2="55" stroke="#ff6b35" strokeWidth="2" />
          <line x1="25" y1="55" x2="18" y2="60" stroke="#ff6b35" strokeWidth="1.5" />
          <line x1="18" y1="60" x2="12" y2="65" stroke="#ff6b35" strokeWidth="1" />
          <line x1="15" y1="50" x2="25" y2="55" stroke="#ff6b35" strokeWidth="1.5" />
          <line x1="20" y1="40" x2="18" y2="60" stroke="#ff6b35" strokeWidth="1" />
          
          {/* Additional scattered nodes */}
          <circle cx="5" cy="25" r="0.8" fill="#ff8a65" />
          <circle cx="3" cy="55" r="1" fill="#ff8a65" />
          <circle cx="22" cy="70" r="1.2" fill="#ff8a65" />
        </g>
        
        {/* Atlas text */}
        <text
          x="50"
          y="92"
          fontFamily="Inter, sans-serif"
          fontSize="8"
          fontWeight="600"
          textAnchor="middle"
          fill="#e53935"
        >
          ATLAS
        </text>
      </svg>
    </div>
  );
}