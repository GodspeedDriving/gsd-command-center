import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { BrandStripes } from "@/components/marketing/brand-stripes";
import { business } from "@/config/business";

export function SiteHeader() {
  return (
    <header className="bg-white">
      <Container className="flex items-center justify-center gap-2 py-5">
        <Link
          href="/"
          aria-label={`${business.shortName} home`}
          className="flex items-center gap-2"
        >
          <Image
            src="/BRAND/wing-left.png"
            alt=""
            width={76}
            height={36}
            className="h-6 w-auto sm:h-7"
          />
          <span className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-brand-blue">GODSPEED</span>{" "}
            <span className="text-brand-red">DRIVING</span>
          </span>
          <Image
            src="/BRAND/wing-right.png"
            alt=""
            width={76}
            height={36}
            className="h-6 w-auto sm:h-7"
          />
        </Link>
      </Container>
      <BrandStripes />
    </header>
  );
}
