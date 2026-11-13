"use client";

import React, { useRef, useEffect, useState } from "react";

interface AnimatedStarsProps {
  /** Actual rating (1–5) */
  rating: number;
  /** Max possible stars, default 5 */
  maxRating?: number;
  /** Per-star delay between fill-wave steps (ms), default 110 */
  starStepMs?: number;
  /** Additional offset before the FIRST star starts filling (ms), default 0 */
  initialDelayMs?: number;
  /** Size class for each star, default "w-4 h-4" */
  sizeClass?: string;
}

/**
 * Animated 5-star rating component.
 *
 * Stars begin as empty golden outlines. Once the row enters the viewport,
 * each star fills from bottom-to-top (liquid pour effect) in staggered
 * sequence using CSS clip-path transitions — no heavy JS animation library
 * required.
 */
export function AnimatedStars({
  rating,
  maxRating = 5,
  starStepMs = 110,
  initialDelayMs = 0,
  sizeClass = "w-4 h-4",
}: AnimatedStarsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Already triggered (e.g. hot reload) — stay filled
    if (triggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <div ref={containerRef} className="flex items-center gap-1">
      {Array.from({ length: maxRating }).map((_, i) => {
        const isFilled = i < rating;
        // Each filled star gets a staggered delay
        const fillDelay = isFilled ? initialDelayMs + i * starStepMs : 0;

        return (
          <div key={i} className={`relative ${sizeClass}`}>
            {/* ── Layer 1: Outline star (always visible as ghost) ── */}
            <svg
              viewBox="0 0 24 24"
              className={`absolute inset-0 ${sizeClass}`}
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"
                stroke="#FCD34D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>

            {/* ── Layer 2: Filled star, clipped bottom→top on trigger ── */}
            {isFilled && (
              <svg
                viewBox="0 0 24 24"
                className={`absolute inset-0 ${sizeClass}`}
                aria-hidden="true"
                style={{
                  /*
                   * clip-path: inset(top right bottom left)
                   * Start: inset(100% 0 0 0) → visible rect height = 0, star hidden
                   * End:   inset(0 0 0 0)   → full star visible
                   * As `top` shrinks from 100→0 the visible band rises from bottom,
                   * creating the "liquid gold being poured upward" effect.
                   */
                  clipPath: triggered
                    ? "inset(0% 0% 0% 0%)"
                    : "inset(100% 0% 0% 0%)",
                  transition: triggered
                    ? `clip-path 0.55s cubic-bezier(0.34, 1.52, 0.64, 1) ${fillDelay}ms`
                    : "none",
                  willChange: "clip-path",
                }}
              >
                {/* Gradient gold fill for a richer 3D look */}
                <defs>
                  <linearGradient
                    id={`starGold-${i}`}
                    x1="12"
                    y1="2"
                    x2="12"
                    y2="21"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#FDE68A" />
                    <stop offset="50%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill={`url(#starGold-${i})`}
                  stroke="#D97706"
                  strokeWidth="0.6"
                  strokeLinejoin="round"
                />
                {/* Tiny specular glint inside the star */}
                <ellipse cx="10" cy="8" rx="1.8" ry="0.9" fill="#FFFBEB" fillOpacity="0.75" transform="rotate(-25 10 8)" />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}

