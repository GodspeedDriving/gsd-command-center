import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { BrandStripes } from "@/components/marketing/brand-stripes";
import { business } from "@/config/business";

export function SiteHeader() {
  return (
    <header className="bg-white">
      <Container className="flex items-center justify-center py-5">
        <Link href="/" aria-label={`${business.shortName} home`}>
          <Image
            src="/BRAND/logo-wordmark-cropped.png"
            alt={business.name}
            width={399}
            height={43}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </Link>
      </Container>
      <BrandStripes />
    </header>
  );
}
