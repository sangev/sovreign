export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Orange gradient for the sentinel */}
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6b35" />
            <stop offset="30%" stopColor="#f7931e" />
            <stop offset="70%" stopColor="#ffa726" />
            <stop offset="100%" stopColor="#ffb74d" />
          </linearGradient>
          
          {/* Dark orange for shadows */}
          <linearGradient id="darkOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e65100" />
            <stop offset="100%" stopColor="#bf360c" />
          </linearGradient>
          
          {/* Light orange for highlights */}
          <linearGradient id="lightOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffcc80" />
            <stop offset="100%" stopColor="#ffe0b2" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Sentinel Guardian Design */}
        <g filter="url(#glow)">
          {/* Main head structure - angular geometric */}
          <polygon
            points="50,12 68,22 72,38 68,58 50,68 32,58 28,38 32,22"
            fill="url(#orangeGradient)"
            stroke="url(#lightOrange)"
            strokeWidth="0.8"
          />
          
          {/* Central visor/eye area */}
          <polygon
            points="38,28 62,28 66,40 62,52 38,52 34,40"
            fill="url(#darkOrange)"
            stroke="url(#lightOrange)"
            strokeWidth="0.5"
          />
          
          {/* Central core/eye */}
          <circle
            cx="50"
            cy="40"
            r="7"
            fill="url(#lightOrange)"
            stroke="#ffffff"
            strokeWidth="1"
          />
          
          {/* Inner eye glow */}
          <circle
            cx="50"
            cy="40"
            r="4"
            fill="#ffffff"
            opacity="0.8"
          />
          
          {/* Side armor panels */}
          <polygon
            points="28,32 32,28 32,52 28,48"
            fill="url(#darkOrange)"
          />
          <polygon
            points="72,32 68,28 68,52 72,48"
            fill="url(#darkOrange)"
          />
          
          {/* Crown/helmet crest */}
          <polygon
            points="42,12 50,6 58,12 50,18"
            fill="url(#lightOrange)"
            stroke="#ffffff"
            strokeWidth="0.5"
          />
          
          {/* Jaw/chin guard */}
          <polygon
            points="38,58 50,62 62,58 58,68 42,68"
            fill="url(#darkOrange)"
            stroke="url(#orangeGradient)"
            strokeWidth="0.5"
          />
          
          {/* Additional geometric details */}
          <polygon
            points="45,20 50,16 55,20 50,24"
            fill="url(#orangeGradient)"
            opacity="0.8"
          />
          
          {/* Side accent lines */}
          <line x1="30" y1="35" x2="30" y2="45" stroke="url(#lightOrange)" strokeWidth="1.5"/>
          <line x1="70" y1="35" x2="70" y2="45" stroke="url(#lightOrange)" strokeWidth="1.5"/>
        </g>
        
        {/* Atlas text */}
        <text
          x="50"
          y="88"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="10"
          fontWeight="700"
          textAnchor="middle"
          fill="url(#orangeGradient)"
          opacity="0.9"
        >
          ATLAS
        </text>
      </svg>
    </div>
  );
}