import Link from "next/link";
import { Container } from "@/components/ui/container";
import { BrandStripes } from "@/components/marketing/brand-stripes";
import { WingIcon } from "@/components/marketing/wing-icon";
import { business } from "@/config/business";

export function SiteHeader() {
  return (
    <header className="bg-white">
      <Container className="flex items-center justify-center gap-3 py-5">
        <Link
          href="/"
          aria-label={`${business.shortName} home`}
          className="flex items-center gap-3"
        >
          <WingIcon side="left" className="w-10 fill-brand-blue sm:w-12" />
          <span className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-brand-blue">GODSPEED</span>{" "}
            <span className="text-brand-red">DRIVING</span>
          </span>
          <WingIcon side="right" className="w-10 fill-brand-red sm:w-12" />
        </Link>
      </Container>
      <BrandStripes />
    </header>
  );
}
