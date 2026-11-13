import React from "react";

interface Icon3DProps {
  className?: string;
}

/**
 * 3D Glossy Dimsum & Dumpling Icon
 * Features: 3D bamboo steamer basket, tender dumpling with steam and glossy reflections
 */
export function Dimsum3DIcon({ className = "w-7 h-7" }: Icon3DProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Steamer Basket Gradients */}
        <linearGradient id="steamerBody" x1="6" y1="20" x2="42" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="0.5" stopColor="#D97706" />
          <stop offset="1" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="steamerRim" x1="6" y1="16" x2="42" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
        {/* Dumpling Gradient */}
        <radialGradient id="dumplingGrad" cx="24" cy="19" r="13" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.6" stopColor="#FEF3C7" />
          <stop offset="1" stopColor="#FDE68A" />
        </radialGradient>
        {/* Soft Drop Shadow Filter */}
        <filter id="shadow3D" x="2" y="4" width="44" height="42" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#B45309" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#shadow3D)">
        {/* Base Basket Shadow */}
        <ellipse cx="24" cy="40" rx="17" ry="4" fill="#78350F" fillOpacity="0.25" />

        {/* Steamer Outer Wall */}
        <path
          d="M6 22C6 19 14.05 16.5 24 16.5C33.95 16.5 42 19 42 22V32C42 36.5 33.95 39 24 39C14.05 39 6 36.5 6 32V22Z"
          fill="url(#steamerBody)"
        />

        {/* Bamboo Texture Ring Lines */}
        <path
          d="M6 27C11 29.5 24 30.5 42 27"
          stroke="#92400E"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M6 33C11 35.5 24 36.5 42 33"
          stroke="#78350F"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Steamer Inner Rim */}
        <ellipse cx="24" cy="22" rx="18" ry="5.5" fill="url(#steamerRim)" />
        <ellipse cx="24" cy="22" rx="16" ry="4.5" fill="#78350F" fillOpacity="0.35" />

        {/* Cute Plump Dumpling */}
        <path
          d="M16 23C15 16 20 12 24 12C28 12 33 16 32 23C32 26 27 27 24 27C21 27 16 26 16 23Z"
          fill="url(#dumplingGrad)"
        />

        {/* Dumpling Pleat Folds */}
        <path
          d="M20 13.5C21 16 22 18.5 22 21M24 12C24 15 24 18 24 21M28 13.5C27 16 26 18.5 26 21"
          stroke="#F59E0B"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Glossy Dumpling Highlight */}
        <ellipse cx="21" cy="16" rx="3" ry="1.5" fill="#FFFFFF" fillOpacity="0.8" />

        {/* Steaming Vapor Wisps */}
        <path
          d="M20 10C19 8 20 6.5 21 5M25 9C26 7 25 5.5 24 4M29 10C30 8.5 29 7 28 5.5"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.85"
        />
      </g>
    </svg>
  );
}

/**
 * 3D Glossy Nugget & Sosis Icon
 * Features: Crispy golden chicken nugget + plump grilled sausage with sizzle marks
 */
export function NuggetSosis3DIcon({ className = "w-7 h-7" }: Icon3DProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Golden Nugget Gradient */}
        <radialGradient id="nuggetGrad" cx="18" cy="22" r="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A" />
          <stop offset="0.6" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </radialGradient>
        {/* Sizzling Sausage Gradient */}
        <linearGradient id="sausageGrad" x1="16" y1="12" x2="38" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F87171" />
          <stop offset="0.3" stopColor="#EF4444" />
          <stop offset="0.8" stopColor="#B91C1C" />
          <stop offset="1" stopColor="#7F1D1D" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="24" cy="41" rx="17" ry="3.5" fill="#18181B" fillOpacity="0.15" />

      {/* Crispy Nugget (Behind/Left) */}
      <g>
        <path
          d="M10 24C9 18 13 13 19 13C25 13 29 17 28 23C27 30 22 34 16 34C11 34 10 30 10 24Z"
          fill="url(#nuggetGrad)"
        />
        {/* Crispy Crumb Texture Dots */}
        <circle cx="15" cy="18" r="1" fill="#B45309" fillOpacity="0.6" />
        <circle cx="21" cy="20" r="1" fill="#B45309" fillOpacity="0.6" />
        <circle cx="17" cy="26" r="1.2" fill="#B45309" fillOpacity="0.6" />
        <circle cx="23" cy="25" r="0.8" fill="#B45309" fillOpacity="0.6" />
        {/* Nugget Gloss Highlight */}
        <path
          d="M14 17C16 15 19 15 21 16"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.75"
        />
      </g>

      {/* Juicy 3D Grilled Sausage (Front/Right) */}
      <g transform="rotate(-20 31 27)">
        {/* Sausage Body */}
        <rect x="22" y="14" width="18" height="26" rx="9" fill="url(#sausageGrad)" />
        {/* Grill Marks */}
        <path d="M25 21C28 22.5 34 22.5 37 21" stroke="#450A0A" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M25 27C28 28.5 34 28.5 37 27" stroke="#450A0A" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M25 33C28 34.5 34 34.5 37 33" stroke="#450A0A" strokeWidth="1.8" strokeLinecap="round" />
        {/* 3D Glossy Reflection */}
        <path
          d="M25 16C28 15 34 15 37 16"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.85"
        />
        <rect x="24" y="17" width="2" height="12" rx="1" fill="#FFFFFF" fillOpacity="0.4" />
      </g>
    </svg>
  );
}

/**
 * 3D Glossy Bakso & Kuah Icon
 * Features: Steaming porcelain ceramic soup bowl with juicy meatballs and savoury broth
 */
export function Bakso3DIcon({ className = "w-7 h-7" }: Icon3DProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Porcelain Ceramic Bowl Gradient */}
        <linearGradient id="bowlGrad" x1="8" y1="20" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="0.4" stopColor="#0284C7" />
          <stop offset="1" stopColor="#0369A1" />
        </linearGradient>
        {/* Golden Broth Gradient */}
        <radialGradient id="brothGrad" cx="24" cy="22" r="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A" />
          <stop offset="0.7" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </radialGradient>
        {/* Savoury Meatball Gradient */}
        <radialGradient id="meatball1" cx="20" cy="18" r="7" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D6D3D1" />
          <stop offset="0.4" stopColor="#A8A29E" />
          <stop offset="1" stopColor="#78716C" />
        </radialGradient>
        <radialGradient id="meatball2" cx="28" cy="18" r="6" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E7E5E4" />
          <stop offset="0.5" stopColor="#A8A29E" />
          <stop offset="1" stopColor="#57534E" />
        </radialGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="24" cy="42" rx="16" ry="3.5" fill="#0C4A6E" fillOpacity="0.2" />

      {/* Ceramic Bowl Body */}
      <path
        d="M8 22C8 22 10 38 24 38C38 38 40 22 40 22H8Z"
        fill="url(#bowlGrad)"
      />
      {/* Bowl Rim Ring */}
      <ellipse cx="24" cy="22" rx="16" ry="6" fill="#0284C7" />
      {/* Savory Golden Broth */}
      <ellipse cx="24" cy="22" rx="14.5" ry="5" fill="url(#brothGrad)" />

      {/* Meatball 1 (Left Plump) */}
      <circle cx="19" cy="19" r="5.5" fill="url(#meatball1)" />
      <ellipse cx="17.5" cy="17" rx="1.5" ry="0.8" fill="#FFFFFF" fillOpacity="0.7" />

      {/* Meatball 2 (Right Juicy) */}
      <circle cx="28" cy="20" r="5" fill="url(#meatball2)" />
      <ellipse cx="26.5" cy="18" rx="1.3" ry="0.7" fill="#FFFFFF" fillOpacity="0.7" />

      {/* Scallion / Green Chives Garnish */}
      <rect x="23" y="19" width="2.5" height="1.2" rx="0.6" fill="#16A34A" />
      <rect x="22" y="23" width="2" height="1" rx="0.5" fill="#22C55E" />
      <rect x="30" y="24" width="2.2" height="1" rx="0.5" fill="#16A34A" />

      {/* Bowl Specular Curved Highlight */}
      <path
        d="M12 26C13 32 18 35 24 35"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />

      {/* Steaming Wisps */}
      <path
        d="M18 11C17 9 18 7 19 5.5M24 10C25 8 24 6.5 23 5M30 11C31 9 30 7.5 29 6"
        stroke="#FFFFFF"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeOpacity="0.8"
      />
    </svg>
  );
}

/**
 * 3D Glossy Seafood & Ikan Icon
 * Features: Ocean-fresh fish & golden shrimp with sparkling bubbles
 */
export function Seafood3DIcon({ className = "w-7 h-7" }: Icon3DProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Ocean Fish Gradient */}
        <linearGradient id="fishGrad" x1="10" y1="14" x2="38" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="0.5" stopColor="#0284C7" />
          <stop offset="1" stopColor="#0369A1" />
        </linearGradient>
        {/* Juicy Shrimp Gradient */}
        <linearGradient id="shrimpGrad" x1="16" y1="20" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FB923C" />
          <stop offset="0.5" stopColor="#F97316" />
          <stop offset="1" stopColor="#EA580C" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="24" cy="41" rx="16" ry="3.5" fill="#0C4A6E" fillOpacity="0.2" />

      {/* 3D Ocean Fish (Top Swimming) */}
      <g>
        <path
          d="M8 20C14 14 26 13 36 19C33 21 33 24 36 26C26 31 14 30 8 20Z"
          fill="url(#fishGrad)"
        />
        {/* Fish Tail */}
        <path d="M34 22L42 16V28L34 22Z" fill="#0284C7" />
        {/* Fish Eye */}
        <circle cx="14" cy="19" r="2" fill="#FFFFFF" />
        <circle cx="13.5" cy="19" r="1" fill="#0F172A" />
        {/* Fish Fin */}
        <path d="M22 23C24 26 27 26 26 23" fill="#0369A1" />
        {/* Specular Highlight */}
        <path
          d="M16 16C22 14 28 15 32 18"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.75"
        />
      </g>

      {/* Fresh Coral Shrimp (Bottom Accent) */}
      <g>
        <path
          d="M18 29C17 34 22 38 28 38C34 38 37 34 36 30C36 27 33 26 31 28C29 30 26 32 23 31C20 30 19 28 18 29Z"
          fill="url(#shrimpGrad)"
        />
        {/* Shrimp Tail Flukes */}
        <path d="M35 31L40 30L38 35L35 31Z" fill="#C2410C" />
        {/* Shrimp Segments */}
        <path d="M24 34C26 35 29 35 31 34" stroke="#C2410C" strokeWidth="1" strokeLinecap="round" />
      </g>

      {/* Aquatic Sparkle Bubbles */}
      <circle cx="11" cy="12" r="2" fill="#E0F2FE" fillOpacity="0.8" />
      <circle cx="16" cy="8" r="1.2" fill="#E0F2FE" fillOpacity="0.9" />
    </svg>
  );
}

/**
 * 3D Glossy Camilan & Gorengan Icon
 * Features: Crispy golden snack pastry / crunchy bite with golden sparkle
 */
export function Snack3DIcon({ className = "w-7 h-7" }: Icon3DProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="snackGrad" cx="22" cy="18" r="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#B45309" />
        </radialGradient>
        <linearGradient id="crispGrad" x1="14" y1="24" x2="34" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="1" stopColor="#92400E" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="24" cy="41" rx="16" ry="3.5" fill="#78350F" fillOpacity="0.2" />

      {/* Crispy Pastel / Puff Shell */}
      <path
        d="M10 28C10 18 16 11 26 12C36 13 40 20 38 29C36 37 28 37 20 36C13 35 10 33 10 28Z"
        fill="url(#snackGrad)"
      />

      {/* Twisted Braided Crust (Pastel Edge) */}
      <path
        d="M10 29C13 32 17 33 21 34C25 35 30 35 34 33C37 31 38 29 38 29"
        stroke="url(#crispGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Crust Ridge Details */}
      <path d="M14 30L16 32M20 32L22 34M26 33L28 35M32 32L34 34" stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" />

      {/* Specular Crisp Highlight */}
      <path
        d="M16 17C20 14 26 14 30 16"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.85"
      />

      {/* Crispy Sparkle Stars */}
      <path
        d="M38 12L39.5 15.5L43 17L39.5 18.5L38 22L36.5 18.5L33 17L36.5 15.5L38 12Z"
        fill="#FBBF24"
      />
      <circle cx="41" cy="9" r="1" fill="#FDE68A" />
    </svg>
  );
}

