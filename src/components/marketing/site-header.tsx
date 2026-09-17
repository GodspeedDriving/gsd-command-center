import Link from "next/link";
import { Container } from "@/components/ui/container";
import { BrandStripes } from "@/components/marketing/brand-stripes";
import { business } from "@/config/business";

export function SiteHeader() {
  return (
    <header className="bg-white">
      <Container className="flex items-center justify-center py-5">
        {/* TODO(OWNER): swap back to the wordmark image once we have a
            clean, higher-resolution export (the current file is only
            341x148px and has a stray gray line along the top edge). */}
        <Link
          href="/"
          aria-label={`${business.shortName} home`}
          className="font-heading text-3xl font-bold tracking-tight sm:text-4xl"
        >
          <span className="text-brand-blue">GODSPEED</span>{" "}
          <span className="text-brand-red">DRIVING</span>
        </Link>
      </Container>
      <BrandStripes />
    </header>
  );
}
