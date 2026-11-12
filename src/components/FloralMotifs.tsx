import React from 'react';

/**
 * Botanical vector illustrations featuring enhanced, realistic Lilies, Garden Roses, and Wax Seals.
 */

export const LilyIllustration: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <svg
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      {/* Petal gradients for rich, realistic lily blush */}
      <linearGradient id="lilyPetalGradTop" x1="80" y1="80" x2="80" y2="10" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#C88E96" stopOpacity="0.9" />
        <stop offset="45%" stopColor="#F3D8DA" stopOpacity="0.95" />
        <stop offset="85%" stopColor="#FDFBF7" stopOpacity="0.98" />
        <stop offset="100%" stopColor="#FFFFFF" />
      </linearGradient>

      <linearGradient id="lilyPetalGradLeft" x1="80" y1="80" x2="15" y2="50" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#A86B74" stopOpacity="0.85" />
        <stop offset="50%" stopColor="#F7E7E8" stopOpacity="0.95" />
        <stop offset="90%" stopColor="#FDFBF7" />
        <stop offset="100%" stopColor="#FFFFFF" />
      </linearGradient>

      <linearGradient id="lilyPetalGradRight" x1="80" y1="80" x2="145" y2="50" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#A86B74" stopOpacity="0.85" />
        <stop offset="50%" stopColor="#F7E7E8" stopOpacity="0.95" />
        <stop offset="90%" stopColor="#FDFBF7" />
        <stop offset="100%" stopColor="#FFFFFF" />
      </linearGradient>

      <linearGradient id="lilyPetalGradBottomLeft" x1="80" y1="80" x2="30" y2="125" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#C88E96" stopOpacity="0.9" />
        <stop offset="55%" stopColor="#F3D8DA" />
        <stop offset="100%" stopColor="#FAF7F5" />
      </linearGradient>

      <linearGradient id="lilyPetalGradBottomRight" x1="80" y1="80" x2="130" y2="125" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#C88E96" stopOpacity="0.9" />
        <stop offset="55%" stopColor="#F3D8DA" />
        <stop offset="100%" stopColor="#FAF7F5" />
      </linearGradient>

      <linearGradient id="leafGrad" x1="40" y1="140" x2="80" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6E7F6B" />
        <stop offset="100%" stopColor="#DDE5DC" />
      </linearGradient>
    </defs>

    {/* Botanical Lily Leaves Behind */}
    <path
      d="M72 90 C50 115 30 135 15 142 C35 140 60 125 76 96 Z"
      fill="url(#leafGrad)"
      opacity="0.8"
    />
    <path
      d="M88 90 C110 115 130 135 145 142 C125 140 100 125 84 96 Z"
      fill="url(#leafGrad)"
      opacity="0.8"
    />

    {/* Stem */}
    <path
      d="M80 88 Q81 125 77 155"
      stroke="#8F9E8B"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* Back Petals (Outer Tepals) */}
    {/* Upper-Left Outer Petal */}
    <path
      d="M80 80 C68 62 42 46 22 42 C24 58 48 72 80 80 Z"
      fill="url(#lilyPetalGradLeft)"
      stroke="#C88E96"
      strokeWidth="0.8"
    />
    {/* Upper-Right Outer Petal */}
    <path
      d="M80 80 C92 62 118 46 138 42 C136 58 112 72 80 80 Z"
      fill="url(#lilyPetalGradRight)"
      stroke="#C88E96"
      strokeWidth="0.8"
    />
    {/* Lower Central Outer Petal */}
    <path
      d="M80 80 C74 100 70 128 80 148 C90 128 86 100 80 80 Z"
      fill="url(#lilyPetalGradTop)"
      stroke="#C88E96"
      strokeWidth="0.8"
      transform="rotate(180 80 80)"
    />

    {/* Front Petals (Inner Tepals with undulating realistic curls) */}
    {/* Top Petal */}
    <path
      d="M80 80 C70 55 60 30 80 12 C100 30 90 55 80 80 Z"
      fill="url(#lilyPetalGradTop)"
      stroke="#C88E96"
      strokeWidth="0.9"
    />
    {/* Central Ridge on Top Petal */}
    <path d="M80 80 Q80 40 80 16" stroke="#A86B74" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />

    {/* Bottom-Left Petal */}
    <path
      d="M80 80 C62 82 38 98 28 120 C48 118 68 102 80 80 Z"
      fill="url(#lilyPetalGradBottomLeft)"
      stroke="#C88E96"
      strokeWidth="0.9"
    />
    <path d="M80 80 Q52 98 32 116" stroke="#A86B74" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />

    {/* Bottom-Right Petal */}
    <path
      d="M80 80 C98 82 122 98 132 120 C112 118 92 102 80 80 Z"
      fill="url(#lilyPetalGradBottomRight)"
      stroke="#C88E96"
      strokeWidth="0.9"
    />
    <path d="M80 80 Q108 98 128 116" stroke="#A86B74" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />

    {/* Lily Throat Speckles (Papillae) */}
    <circle cx="78" cy="72" r="0.9" fill="#6B2D38" />
    <circle cx="82" cy="70" r="0.8" fill="#6B2D38" />
    <circle cx="79" cy="65" r="0.7" fill="#6B2D38" />
    <circle cx="75" cy="76" r="0.8" fill="#6B2D38" />
    <circle cx="85" cy="75" r="0.8" fill="#6B2D38" />
    <circle cx="72" cy="81" r="0.7" fill="#6B2D38" />
    <circle cx="88" cy="80" r="0.7" fill="#6B2D38" />
    <circle cx="80" cy="58" r="0.6" fill="#6B2D38" />

    {/* Stamens with Pollen Anthers (Filaments curving gracefully outward) */}
    {/* Stamen 1 (Up) */}
    <path d="M80 80 Q78 55 74 38" stroke="#DDE5DC" strokeWidth="1.2" strokeLinecap="round" />
    <ellipse cx="74" cy="37" rx="3.5" ry="1.6" fill="#8B4513" stroke="#4A1521" strokeWidth="0.5" transform="rotate(-15 74 37)" />

    {/* Stamen 2 (Up-Right) */}
    <path d="M80 80 Q84 55 90 40" stroke="#DDE5DC" strokeWidth="1.2" strokeLinecap="round" />
    <ellipse cx="90" cy="39" rx="3.5" ry="1.6" fill="#8B4513" stroke="#4A1521" strokeWidth="0.5" transform="rotate(20 90 39)" />

    {/* Stamen 3 (Left) */}
    <path d="M80 80 Q62 72 48 68" stroke="#DDE5DC" strokeWidth="1.2" strokeLinecap="round" />
    <ellipse cx="47" cy="68" rx="3.5" ry="1.6" fill="#8B4513" stroke="#4A1521" strokeWidth="0.5" transform="rotate(-40 47 68)" />

    {/* Stamen 4 (Right) */}
    <path d="M80 80 Q98 72 112 68" stroke="#DDE5DC" strokeWidth="1.2" strokeLinecap="round" />
    <ellipse cx="113" cy="68" rx="3.5" ry="1.6" fill="#8B4513" stroke="#4A1521" strokeWidth="0.5" transform="rotate(40 113 68)" />

    {/* Stamen 5 (Bottom-Left) */}
    <path d="M80 80 Q66 88 56 100" stroke="#DDE5DC" strokeWidth="1.2" strokeLinecap="round" />
    <ellipse cx="55" cy="101" rx="3.5" ry="1.6" fill="#8B4513" stroke="#4A1521" strokeWidth="0.5" transform="rotate(-65 55 101)" />

    {/* Stamen 6 (Bottom-Right) */}
    <path d="M80 80 Q94 88 104 100" stroke="#DDE5DC" strokeWidth="1.2" strokeLinecap="round" />
    <ellipse cx="105" cy="101" rx="3.5" ry="1.6" fill="#8B4513" stroke="#4A1521" strokeWidth="0.5" transform="rotate(65 105 101)" />

    {/* Central Pistil (Longest, with green 3-lobed stigma) */}
    <path d="M80 80 Q80 50 80 32" stroke="#8F9E8B" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="80" cy="30" r="2.2" fill="#5F7A58" stroke="#3D5339" strokeWidth="0.5" />
  </svg>
);

export const RoseIllustration: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="50" cy="50" r="38" fill="#FDFBF7" stroke="#E5B4B9" strokeWidth="1" />
    <path
      d="M50 20 C65 20 78 30 78 50 C78 68 62 78 50 78 C35 78 22 65 22 50 C22 35 35 20 50 20 Z"
      fill="#F7E7E8"
      stroke="#C88E96"
      strokeWidth="1.1"
      opacity="0.85"
    />
    <path
      d="M50 32 C58 32 66 38 66 50 C66 60 58 66 50 66 C40 66 34 58 34 50 C34 40 42 32 50 32 Z"
      fill="#F3D8DA"
      stroke="#A86B74"
      strokeWidth="1"
      opacity="0.9"
    />
    <path
      d="M48 44 C53 42 56 46 54 51 C52 55 46 54 46 50 C46 47 48 45 48 44 Z"
      fill="#C88E96"
      stroke="#6B2D38"
      strokeWidth="0.8"
    />
    <path
      d="M20 62 C10 68 12 80 24 76 C28 75 25 66 20 62 Z"
      fill="#DDE5DC"
      stroke="#8F9E8B"
      strokeWidth="1"
    />
    <path
      d="M80 62 C90 68 88 80 76 76 C72 75 75 66 80 62 Z"
      fill="#DDE5DC"
      stroke="#8F9E8B"
      strokeWidth="1"
    />
  </svg>
);

export const BabysBreathSprig: React.FC<{ className?: string }> = ({ className = 'w-16 h-8' }) => (
  <svg
    viewBox="0 0 120 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M10 50 Q40 40 70 30 Q95 22 110 10"
      stroke="#8F9E8B"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.8"
    />
    <path d="M50 37 Q60 25 72 20" stroke="#8F9E8B" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
    <path d="M75 28 Q88 18 95 12" stroke="#8F9E8B" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
    <path d="M35 43 Q42 32 48 28" stroke="#8F9E8B" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
    
    <circle cx="110" cy="10" r="2.8" fill="#FFFFFF" stroke="#E5B4B9" strokeWidth="0.8" />
    <circle cx="95" cy="12" r="2.5" fill="#FFFFFF" stroke="#E5B4B9" strokeWidth="0.8" />
    <circle cx="72" cy="20" r="2.5" fill="#FFFFFF" stroke="#E5B4B9" strokeWidth="0.8" />
    <circle cx="48" cy="28" r="2.3" fill="#FFFFFF" stroke="#E5B4B9" strokeWidth="0.8" />
    <circle cx="85" cy="16" r="2.1" fill="#FFFFFF" stroke="#E5B4B9" strokeWidth="0.8" />
    <circle cx="62" cy="24" r="2.1" fill="#FFFFFF" stroke="#E5B4B9" strokeWidth="0.8" />
  </svg>
);

export const WaxSealStamp: React.FC<{ text?: string; color?: string; size?: number }> = ({
  text = 'A & Y',
  color = '#C88E96',
  size = 54,
}) => (
  <div
    className="relative flex items-center justify-center rounded-full shadow-md transition-transform duration-300 hover:scale-105 active:scale-95 select-none"
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      boxShadow: '0 4px 14px rgba(107, 45, 56, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.4), inset 0 -2px 4px rgba(0, 0, 0, 0.2)',
    }}
  >
    <div
      className="absolute inset-1 rounded-full border border-white/30 flex items-center justify-center pointer-events-none"
      style={{
        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.25)',
      }}
    >
      <span className="font-serif-editorial italic text-white/95 text-xs font-semibold tracking-wider">
        {text}
      </span>
    </div>
  </div>
);

export const BotanicalDivider: React.FC<{ className?: string }> = ({ className = 'my-8' }) => (
  <div className={`flex items-center justify-center gap-3 ${className}`}>
    <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#E5B4B9] to-transparent" />
    <div className="flex items-center gap-1.5 text-[#C88E96]">
      <span className="inline-block w-1 h-1 rounded-full bg-[#C88E96]" />
      <LilyIllustration className="w-6 h-6 opacity-85" />
      <span className="inline-block w-1 h-1 rounded-full bg-[#C88E96]" />
    </div>
    <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#E5B4B9] to-transparent" />
  </div>
);
