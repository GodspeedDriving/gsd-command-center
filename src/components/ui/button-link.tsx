import Link from "next/link";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "outline";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-brand-blue text-white hover:bg-brand-blue/90",
  secondary: "bg-brand-yellow text-neutral-900 hover:bg-brand-yellow/90",
  outline:
    "border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white",
};

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold transition-colors",
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
