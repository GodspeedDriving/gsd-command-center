import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { business } from "@/config/business";

export function SiteHeader() {
  return (
    <header className="border-b border-neutral-200 bg-white py-4">
      <Container className="flex items-center justify-center">
        <Link href="/" aria-label={`${business.shortName} home`}>
          <Image
            src="/BRAND/logo-wordmark.png"
            alt={business.name}
            width={320}
            height={64}
            priority
            className="h-14 w-auto sm:h-16"
          />
        </Link>
      </Container>
    </header>
  );
}
