import clsx from "clsx";

/**
 * Hand-drawn vector approximation of the GSD wing mark (no source file
 * available at high enough resolution to use directly — see SPEC.md
 * Section 11 fonts/logo TODO). Always sharp at any size since it's SVG.
 */
export function WingIcon({
  side,
  className,
}: {
  side: "left" | "right";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 50"
      aria-hidden
      className={clsx("h-auto w-full", side === "right" && "-scale-x-100", className)}
    >
      <polygon points="0,14 58,14 100,26 58,20 0,20" />
      <polygon points="8,25 62,25 94,34 62,30 8,30" />
      <polygon points="16,36 66,36 88,42 66,39 16,39" />
    </svg>
  );
}
