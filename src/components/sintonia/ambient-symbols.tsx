import { useMemo } from "react";

const SYMBOLS = ["♥", "✦", "∞", "♡", "✧", "∞"] as const;

/** Number of floating glyphs. Kept low so mobile paint cost stays trivial. */
const COUNT = 22;

interface Glyph {
  id: number;
  char: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

/**
 * Ambient background layer: symbols drifting slowly top -> bottom.
 * Purely decorative, so it is hidden from assistive tech and never
 * intercepts pointer events.
 */
export function AmbientSymbols() {
  // Deterministic-enough pseudo random values computed once per mount.
  const glyphs = useMemo<Glyph[]>(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        id: i,
        char: SYMBOLS[i % SYMBOLS.length]!,
        left: (i * 37 + ((i * i * 13) % 29)) % 100,
        size: 12 + ((i * 7) % 20),
        duration: 22 + ((i * 5) % 26),
        delay: -((i * 3.7) % 30),
        opacity: 0.05 + ((i * 11) % 7) / 100,
      })),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {glyphs.map((g) => (
        <span
          key={g.id}
          className="absolute top-0 text-sintonia-pink"
          style={{
            left: `${g.left}%`,
            fontSize: `${g.size}px`,
            opacity: g.opacity,
            animation: `sintonia-drift ${g.duration}s linear ${g.delay}s infinite`,
          }}
        >
          {g.char}
        </span>
      ))}
    </div>
  );
}
