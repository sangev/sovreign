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
          {/* Orange gradient for the face */}
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff8a50" />
            <stop offset="50%" stopColor="#ff6b35" />
            <stop offset="100%" stopColor="#e65100" />
          </linearGradient>
          
          {/* Light orange for highlights */}
          <linearGradient id="lightOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffcc80" />
            <stop offset="100%" stopColor="#ffab40" />
          </linearGradient>
        </defs>
        
        {/* Classical Face Design - inspired by your reference */}
        <g>
          {/* Decorative hair/crown curls - top */}
          <path
            d="M35 20 C32 15, 28 12, 25 15 C22 18, 25 22, 30 20 C28 18, 32 16, 35 20"
            fill="url(#orangeGradient)"
          />
          <path
            d="M50 12 C47 8, 43 6, 40 8 C37 11, 40 15, 45 13 C43 11, 47 9, 50 12"
            fill="url(#orangeGradient)"
          />
          <path
            d="M65 20 C68 15, 72 12, 75 15 C78 18, 75 22, 70 20 C72 18, 68 16, 65 20"
            fill="url(#orangeGradient)"
          />
          
          {/* Main face outline */}
          <ellipse
            cx="50"
            cy="50"
            rx="22"
            ry="28"
            fill="url(#lightOrange)"
            stroke="url(#orangeGradient)"
            strokeWidth="1"
          />
          
          {/* Forehead and brow area */}
          <path
            d="M32 35 C35 30, 40 28, 50 28 C60 28, 65 30, 68 35 C65 38, 60 36, 50 36 C40 36, 35 38, 32 35"
            fill="url(#orangeGradient)"
          />
          
          {/* Eyes */}
          <ellipse cx="42" cy="42" rx="3" ry="5" fill="url(#orangeGradient)" />
          <ellipse cx="58" cy="42" rx="3" ry="5" fill="url(#orangeGradient)" />
          
          {/* Nose */}
          <path
            d="M50 45 C48 48, 48 52, 50 54 C52 52, 52 48, 50 45"
            fill="url(#orangeGradient)"
          />
          
          {/* Mustache - decorative swirls */}
          <path
            d="M38 58 C35 56, 32 58, 35 60 C38 62, 42 60, 45 58 C47 56, 50 56, 50 58"
            fill="url(#orangeGradient)"
          />
          <path
            d="M62 58 C65 56, 68 58, 65 60 C62 62, 58 60, 55 58 C53 56, 50 56, 50 58"
            fill="url(#orangeGradient)"
          />
          
          {/* Beard - flowing curves */}
          <path
            d="M50 62 C45 64, 40 66, 38 70 C36 74, 38 78, 42 76 C46 74, 48 70, 50 68"
            fill="url(#orangeGradient)"
          />
          <path
            d="M50 62 C55 64, 60 66, 62 70 C64 74, 62 78, 58 76 C54 74, 52 70, 50 68"
            fill="url(#orangeGradient)"
          />
          <path
            d="M50 68 C48 72, 46 76, 50 80 C54 76, 52 72, 50 68"
            fill="url(#orangeGradient)"
          />
          
          {/* Side hair curls */}
          <path
            d="M28 45 C25 42, 22 45, 25 48 C28 51, 32 49, 30 45"
            fill="url(#orangeGradient)"
          />
          <path
            d="M72 45 C75 42, 78 45, 75 48 C72 51, 68 49, 70 45"
            fill="url(#orangeGradient)"
          />
        </g>
        
        {/* Atlas text */}
        <text
          x="50"
          y="92"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="9"
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