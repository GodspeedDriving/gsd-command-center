import Image from "next/image";
import clsx from "clsx";

/**
 * A large, faint GSD mark bleeding off the edge of a section, echoing the
 * ghosted-logo treatment on the owner's own email signature/marketing
 * graphics. Purely decorative — always aria-hidden.
 */
export function BrandWatermark({
  side = "right",
  className,
}: {
  side?: "left" | "right";
  className?: string;
}) {
  return (
    <Image
      src="/BRAND/logo-mark.png"
      alt=""
      aria-hidden
      width={700}
      height={700}
      className={clsx(
        "pointer-events-none absolute top-1/2 -translate-y-1/2 opacity-[0.05] select-none",
        side === "right" ? "-right-32 sm:-right-24" : "-left-32 sm:-left-24",
        className,
      )}
    />
  );
}
