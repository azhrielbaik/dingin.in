import React from "react";

interface Icon3DProps {
  className?: string;
}

/**
 * 3D Glossy Ice Crystal / Snowflake Icon
 * Cyan-to-frost-blue crystalline structure with glossy specular shine
 */
export function IceCrystal3DIcon({ className = "w-7 h-7" }: Icon3DProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="iceCoreGrad" x1="12" y1="8" x2="36" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E0F2FE" />
          <stop offset="0.4" stopColor="#38BDF8" />
          <stop offset="0.8" stopColor="#0284C7" />
          <stop offset="1" stopColor="#0369A1" />
        </linearGradient>
        <radialGradient id="iceCenterGlow" cx="24" cy="24" r="10" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor="#BAE6FD" />
          <stop offset="1" stopColor="#38BDF8" />
        </radialGradient>
        <filter id="iceGlow" x="4" y="4" width="40" height="40" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#0284C7" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter="url(#iceGlow)">
        {/* Soft shadow */}
        <ellipse cx="24" cy="42" rx="14" ry="3" fill="#0C4A6E" fillOpacity="0.25" />

        {/* Diagonal Ice Crystals */}
        <path
          d="M13 13L35 35M35 13L13 35"
          stroke="url(#iceCoreGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Main Cross Crystals */}
        <path
          d="M24 7V41M7 24H41"
          stroke="url(#iceCoreGrad)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Crystal Chevrons / Branches */}
        <path
          d="M20 12L24 8L28 12M20 36L24 40L28 36M12 20L8 24L12 28M36 20L40 24L36 28"
          stroke="#38BDF8"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 3D Glossy Hexagonal Center Gem */}
        <polygon
          points="24,17 30,20.5 30,27.5 24,31 18,27.5 18,20.5"
          fill="url(#iceCenterGlow)"
          stroke="#E0F2FE"
          strokeWidth="1.2"
        />

        {/* Specular Gem Facet Highlight */}
        <polygon points="24,18 29,21 24,24 19,21" fill="#FFFFFF" fillOpacity="0.9" />
        <circle cx="21" cy="22" r="1.2" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

/**
 * 3D Glossy Halal Shield Icon
 * Emerald shield with gold border bevel, checkmark, and glossy volume
 */
export function HalalShield3DIcon({ className = "w-7 h-7" }: Icon3DProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shieldGoldRim" x1="10" y1="6" x2="38" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A" />
          <stop offset="0.3" stopColor="#F59E0B" />
          <stop offset="0.7" stopColor="#D97706" />
          <stop offset="1" stopColor="#92400E" />
        </linearGradient>
        <radialGradient id="shieldEmerald" cx="20" cy="18" r="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34D399" />
          <stop offset="0.5" stopColor="#10B981" />
          <stop offset="0.85" stopColor="#059669" />
          <stop offset="1" stopColor="#064E3B" />
        </radialGradient>
        <linearGradient id="checkGold" x1="16" y1="18" x2="32" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFBEB" />
          <stop offset="0.6" stopColor="#FDE68A" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
        <filter id="shieldShadow" x="4" y="4" width="40" height="42" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#064E3B" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter="url(#shieldShadow)">
        {/* Soft shadow */}
        <ellipse cx="24" cy="42" rx="14" ry="3" fill="#064E3B" fillOpacity="0.25" />

        {/* Outer Golden Shield Bevel */}
        <path
          d="M24 7L38 12V24C38 33 24 40 24 40C24 40 10 33 10 24V12L24 7Z"
          fill="url(#shieldGoldRim)"
        />

        {/* Inner Emerald Shield */}
        <path
          d="M24 9.5L35.5 13.8V23.5C35.5 31 24 37.5 24 37.5C24 37.5 12.5 31 12.5 23.5V13.8L24 9.5Z"
          fill="url(#shieldEmerald)"
        />

        {/* Left Side Specular 3D Highlight curve */}
        <path
          d="M15 15C18 20 18 27 22 34C19 32 15 28 15 23.5V15Z"
          fill="#FFFFFF"
          fillOpacity="0.25"
        />

        {/* 3D Golden Checkmark */}
        <path
          d="M17.5 23L22 27.5L30.5 18"
          stroke="url(#checkGold)"
          strokeWidth="3.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Checkmark 3D Highlighting */}
        <path
          d="M17.5 23L22 27.5L30.5 18"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.75"
        />

        {/* Sparkle star top-right */}
        <circle cx="33" cy="14" r="1.5" fill="#FFFBEB" />
      </g>
    </svg>
  );
}

/**
 * 3D Glossy Speed Delivery / Lightning Van Icon
 * Amber/orange delivery vehicle with energetic speed streaks and 3D depth
 */
export function SpeedDelivery3DIcon({ className = "w-7 h-7" }: Icon3DProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="speedGrad" x1="8" y1="12" x2="40" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBBF24" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="boltGrad" x1="18" y1="14" x2="30" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF08A" />
          <stop offset="0.5" stopColor="#FACC15" />
          <stop offset="1" stopColor="#EAB308" />
        </linearGradient>
        <filter id="speedShadow" x="4" y="4" width="40" height="42" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#B45309" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#speedShadow)">
        {/* Soft shadow */}
        <ellipse cx="24" cy="41" rx="16" ry="3.5" fill="#78350F" fillOpacity="0.25" />

        {/* 3D Round Golden Coin/Badge Backing */}
        <circle cx="24" cy="23" r="17" fill="url(#speedGrad)" />
        <ellipse cx="24" cy="11" rx="11" ry="4" fill="#FFFFFF" fillOpacity="0.35" />

        {/* Dynamic 3D Lightning Bolt */}
        <path
          d="M26 10L15 24H24L21 37L34 21H25L28 10H26Z"
          fill="url(#boltGrad)"
          stroke="#B45309"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* Bolt Glossy Ridge */}
        <path
          d="M26 11L18 23H24L22 33"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.8"
        />

        {/* Speed Wind Streaks */}
        <path d="M7 18H11M5 24H10M8 30H12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.85" />
      </g>
    </svg>
  );
}

/**
 * 3D Glossy Restaurant Chef Star / Award Icon
 * Warm amber-orange medallion with 3D star and glossy reflection
 */
export function ChefSparkle3DIcon({ className = "w-7 h-7" }: Icon3DProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="awardGrad" x1="12" y1="8" x2="36" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE047" />
          <stop offset="0.4" stopColor="#EAB308" />
          <stop offset="0.8" stopColor="#CA8A04" />
          <stop offset="1" stopColor="#854D0E" />
        </linearGradient>
        <radialGradient id="starGrad" cx="24" cy="21" r="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.6" stopColor="#FEF08A" />
          <stop offset="1" stopColor="#FACC15" />
        </radialGradient>
        <filter id="chefShadow" x="4" y="4" width="40" height="42" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#854D0E" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#chefShadow)">
        {/* Soft shadow */}
        <ellipse cx="24" cy="42" rx="15" ry="3.5" fill="#713F12" fillOpacity="0.25" />

        {/* Medallion Ribbon Tails */}
        <path d="M17 30L14 42L22 38L24 33" fill="#DC2626" />
        <path d="M31 30L34 42L26 38L24 33" fill="#B91C1C" />

        {/* Medallion Badge Outer */}
        <circle cx="24" cy="21" r="16" fill="url(#awardGrad)" stroke="#FEF08A" strokeWidth="1.2" />

        {/* Outer Ring Inset */}
        <circle cx="24" cy="21" r="13.5" fill="#CA8A04" fillOpacity="0.4" />

        {/* 3D Shiny Center Star */}
        <path
          d="M24 11L27.5 18L35 19L29.5 24.5L31 32L24 28L17 32L18.5 24.5L13 19L20.5 18L24 11Z"
          fill="url(#starGrad)"
          stroke="#A16207"
          strokeWidth="0.8"
        />

        {/* Top Arc Gloss Highlight */}
        <path
          d="M14 15C17 10 31 10 34 15"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.75"
        />
        <circle cx="20" cy="15" r="1.5" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

/**
 * 3D Glossy WhatsApp Chat Icon
 * Vibrant emerald/mint message bubble with 3D thickness and phone symbol
 */
export function WhatsApp3DIcon({ className = "w-7 h-7" }: Icon3DProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="waGrad" cx="19" cy="15" r="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4ADE80" />
          <stop offset="0.4" stopColor="#22C55E" />
          <stop offset="0.85" stopColor="#16A34A" />
          <stop offset="1" stopColor="#14532D" />
        </radialGradient>
        <filter id="waShadow" x="4" y="4" width="40" height="42" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3.5" stdDeviation="2.5" floodColor="#14532D" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter="url(#waShadow)">
        {/* Soft shadow */}
        <ellipse cx="24" cy="42" rx="15" ry="3.5" fill="#052E16" fillOpacity="0.25" />

        {/* 3D Chat Bubble Body */}
        <path
          d="M24 6C13.5 6 5 14.5 5 25C5 28.5 6 31.8 7.8 34.6L6 42L13.7 40.2C16.8 42 20.3 43 24 43C34.5 43 43 34.5 43 25C43 14.5 34.5 6 24 6Z"
          fill="url(#waGrad)"
        />

        {/* Gloss Arc on Top Bubble */}
        <ellipse cx="24" cy="13" rx="13" ry="4.5" fill="#FFFFFF" fillOpacity="0.35" />

        {/* Crisp White Phone Receiver Icon */}
        <path
          d="M17 16.5C16.5 17 15.5 18.2 15.5 19.8C15.5 22.8 18 26.5 21 29.5C24 32.5 27.7 35 30.7 35C32.3 35 33.5 34 34 33.5L31.5 29.5L28.5 31C28 31.2 27.2 31 26 30C24 28.5 22 26.5 20.5 24.5C19.5 23.3 19.3 22.5 19.5 22L21 19L17 16.5Z"
          fill="#FFFFFF"
        />

        {/* Specular Sparkle */}
        <circle cx="33" cy="13" r="1.5" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

/**
 * 3D Glossy Shopping Bag Icon (How To Order - Step 1)
 * Royal blue shopping bag with tactile handles, fold shading, and glossy rim
 */
export function ShoppingBag3DIcon({ className = "w-7 h-7" }: Icon3DProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bagGrad" x1="12" y1="16" x2="36" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="0.4" stopColor="#0284C7" />
          <stop offset="0.9" stopColor="#0369A1" />
          <stop offset="1" stopColor="#075985" />
        </linearGradient>
        <filter id="bagShadow" x="4" y="4" width="40" height="42" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#075985" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#bagShadow)">
        {/* Soft shadow */}
        <ellipse cx="24" cy="42" rx="14" ry="3" fill="#0C4A6E" fillOpacity="0.25" />

        {/* 3D Bag Body */}
        <path
          d="M11 17L13.5 38.5C13.8 40.5 15.5 42 17.5 42H30.5C32.5 42 34.2 40.5 34.5 38.5L37 17H11Z"
          fill="url(#bagGrad)"
        />

        {/* Bag Top Rim Fold */}
        <rect x="10" y="15" width="28" height="3.5" rx="1.75" fill="#7DD3FC" />

        {/* Bag Handles (3D looped) */}
        <path
          d="M18 17V12C18 8.7 20.7 6 24 6C27.3 6 30 8.7 30 12V17"
          stroke="#E0F2FE"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Bag Front Pocket / Center Tag */}
        <rect x="18" y="23" width="12" height="11" rx="2.5" fill="#0369A1" fillOpacity="0.5" />
        <path d="M21 28H27" stroke="#BAE6FD" strokeWidth="1.8" strokeLinecap="round" />

        {/* Glossy Front Highlight */}
        <path
          d="M14 20L15.5 34"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />
      </g>
    </svg>
  );
}

/**
 * 3D Glossy Calculator & Invoice Icon (How To Order - Step 3)
 * Tactile teal/cyan modern calculator with 3D raised buttons and glowing display
 */
export function Calculator3DIcon({ className = "w-7 h-7" }: Icon3DProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="calcBody" x1="10" y1="8" x2="38" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="0.5" stopColor="#0284C7" />
          <stop offset="1" stopColor="#0369A1" />
        </linearGradient>
        <filter id="calcShadow" x="4" y="4" width="40" height="42" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#0369A1" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#calcShadow)">
        {/* Soft shadow */}
        <ellipse cx="24" cy="42" rx="14" ry="3" fill="#0C4A6E" fillOpacity="0.25" />

        {/* Calculator Body */}
        <rect x="11" y="8" width="26" height="34" rx="6" fill="url(#calcBody)" />

        {/* Glass Screen Display */}
        <rect x="15" y="12" width="18" height="8" rx="2.5" fill="#082F49" />
        <rect x="16" y="13" width="16" height="3" rx="1" fill="#38BDF8" fillOpacity="0.35" />
        <rect x="25" y="16.5" width="6" height="1.8" rx="0.9" fill="#4ADE80" />

        {/* 3D Tactile Buttons */}
        {/* Row 1 */}
        <rect x="15" y="23" width="4.5" height="4" rx="1.5" fill="#E0F2FE" />
        <rect x="21.75" y="23" width="4.5" height="4" rx="1.5" fill="#E0F2FE" />
        <rect x="28.5" y="23" width="4.5" height="4" rx="1.5" fill="#FDE68A" />

        {/* Row 2 */}
        <rect x="15" y="29" width="4.5" height="4" rx="1.5" fill="#E0F2FE" />
        <rect x="21.75" y="29" width="4.5" height="4" rx="1.5" fill="#E0F2FE" />
        <rect x="28.5" y="29" width="4.5" height="4" rx="1.5" fill="#BAE6FD" />

        {/* Row 3 */}
        <rect x="15" y="35" width="4.5" height="4" rx="1.5" fill="#E0F2FE" />
        <rect x="21.75" y="35" width="11.25" height="4" rx="1.5" fill="#22C55E" />

        {/* Specular Highlight along Left Edge */}
        <path
          d="M13 12V36"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.65"
        />
      </g>
    </svg>
  );
}

/**
 * 3D Glossy Refrigerated Delivery Truck Icon (How To Order - Step 4)
 * Vibrant refrigerated vehicle with cold insulation badge, wheels, and glossy cab
 */
export function DeliveryTruck3DIcon({ className = "w-7 h-7" }: Icon3DProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="truckBody" x1="6" y1="14" x2="34" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F8FAFC" />
          <stop offset="0.6" stopColor="#E2E8F0" />
          <stop offset="1" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id="truckCab" x1="28" y1="18" x2="42" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="0.5" stopColor="#0284C7" />
          <stop offset="1" stopColor="#0369A1" />
        </linearGradient>
        <radialGradient id="wheelGrad" cx="24" cy="24" r="8" gradientUnits="userSpaceOnUse">
          <stop stopColor="#64748B" />
          <stop offset="0.7" stopColor="#1E293B" />
          <stop offset="1" stopColor="#0F172A" />
        </radialGradient>
        <filter id="truckShadow" x="2" y="4" width="44" height="42" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#0F172A" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#truckShadow)">
        {/* Soft shadow */}
        <ellipse cx="24" cy="42" rx="18" ry="3.5" fill="#0F172A" fillOpacity="0.25" />

        {/* Cargo Container (Insulated Box) */}
        <rect x="6" y="14" width="24" height="20" rx="3.5" fill="url(#truckBody)" stroke="#94A3B8" strokeWidth="1" />
        
        {/* Cold Snowflake Badge on Cargo Box */}
        <circle cx="18" cy="23" r="5" fill="#E0F2FE" />
        <path d="M18 19.5V26.5M14.5 23H21.5M15.5 20.5L20.5 25.5M20.5 20.5L15.5 25.5" stroke="#0284C7" strokeWidth="1.2" strokeLinecap="round" />

        {/* Truck Cabin (Front) */}
        <path
          d="M30 18H36C38 18 41 21 42 24L43 28C43.5 29.5 43.5 34 41 34H30V18Z"
          fill="url(#truckCab)"
        />

        {/* Cabin Windshield */}
        <path
          d="M32 20H35.5C36.8 20 38.5 21.8 39.2 24H32V20Z"
          fill="#E0F2FE"
          fillOpacity="0.9"
        />

        {/* Front Bumper / Headlight */}
        <rect x="41" y="30" width="3" height="3" rx="1.5" fill="#FACC15" />

        {/* Wheels with 3D rims */}
        {/* Rear Wheel */}
        <circle cx="14" cy="36" r="4.5" fill="url(#wheelGrad)" />
        <circle cx="14" cy="36" r="2" fill="#E2E8F0" />

        {/* Front Wheel */}
        <circle cx="36" cy="36" r="4.5" fill="url(#wheelGrad)" />
        <circle cx="36" cy="36" r="2" fill="#E2E8F0" />

        {/* Specular Top Roof Highlight */}
        <path d="M7 15H29" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.9" />
      </g>
    </svg>
  );
}

