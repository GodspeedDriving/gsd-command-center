import Link from "next/link";
import { Container } from "@/components/ui/container";
import { business } from "@/config/business";

export function Footer() {
  const contactLines = [
    business.contact.phone.confirmed && business.contact.phone.value,
    business.contact.email.confirmed && business.contact.email.value,
    business.contact.viber.confirmed && `Viber: ${business.contact.viber.value}`,
  ].filter(Boolean) as string[];

  return (
    <footer className="border-t border-neutral-200 bg-white py-10">
      <Container className="flex flex-col items-center gap-4 text-center">
        <p className="font-heading text-lg font-bold text-brand-blue">
          {business.shortName}
        </p>
        <p className="max-w-md text-sm text-neutral-500">
          {business.legal.footerRegistrationText.value}
        </p>

        {contactLines.length > 0 && (
          <div className="flex flex-col gap-1 text-sm text-neutral-600">
            {contactLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        )}

        <div className="mt-2 flex gap-6 text-sm font-medium text-neutral-500">
          <Link href="/privacy" className="hover:text-brand-blue">
            Privacy Notice
          </Link>
          <Link href="/terms" className="hover:text-brand-blue">
            Terms &amp; Policies
          </Link>
        </div>

        <p className="mt-2 text-xs text-neutral-400">
          &copy; {new Date().getFullYear()} {business.name}. GSD is a private
          driving tutorial service, not an LTO-accredited driving school.
        </p>
      </Container>
    </footer>
  );
}
