import Link from "next/link";
import { Container } from "@/components/ui/container";
import { business } from "@/config/business";

export default function ReservePage() {
  return (
    <main className="flex flex-1 items-center justify-center py-20">
      <Container className="max-w-lg text-center">
        <h1 className="font-heading text-3xl font-bold text-brand-blue">
          Online booking is almost ready
        </h1>
        <p className="mt-4 text-neutral-600">
          We&apos;re putting the finishing touches on online reservations for{" "}
          {business.shortName}. In the meantime, please contact us directly
          and we&apos;ll get you scheduled.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-blue px-7 py-3.5 text-base font-semibold text-white"
        >
          Back to home
        </Link>
      </Container>
    </main>
  );
}
