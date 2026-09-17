import { Container } from "@/components/ui/container";
import { business } from "@/config/business";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Privacy Notice — ${business.shortName}`,
};

export default function PrivacyPage() {
  return (
    <main className="py-16">
      <Container className="max-w-2xl">
        <h1 className="font-heading text-3xl font-bold text-brand-blue">
          Privacy Notice
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Last updated: this is a draft notice prepared alongside our booking
          system and has not yet been reviewed by a lawyer. It follows the
          Philippine Data Privacy Act of 2012 (RA 10173) but should be
          reviewed before being treated as final.
        </p>

        <div className="mt-8 flex flex-col gap-4 text-neutral-700 [&_h2]:font-heading [&_h2]:mt-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-neutral-900">
          <h2>What we collect</h2>
          <p>
            When you reach out to {business.name} ({business.shortName}) or
            submit a reservation, we collect information such as your name,
            mobile number, email address, Facebook name, driving experience
            and goals, and — where relevant to on-road lessons — your LTO
            student permit or driver&apos;s license details and expiry date.
            If you upload a copy of your permit or license, or proof of
            payment, we store that file securely and privately.
          </p>

          <h2>Why we collect it</h2>
          <p>
            We use this information to respond to your inquiry, confirm your
            qualification for on-road lessons, schedule and run your driving
            sessions, process payments, and follow up with you about your
            booking. We do not sell your personal data.
          </p>

          <h2>Who can see it</h2>
          <p>
            Your information is visible only to {business.shortName}&apos;s
            owner and your assigned coach, to the extent needed to
            deliver your lessons. We do not share your data with third
            parties except service providers that help us run this system
            (such as our database and hosting providers), who are bound to
            keep it confidential.
          </p>

          <h2>How long we keep it</h2>
          <p>
            We keep your information for as long as you remain an active
            lead or student. If your inquiry goes cold, is marked lost, or
            you were unable to proceed without a valid permit, we delete
            uploaded permit/license files and personal details after 12
            months of inactivity, unless you ask us to delete it sooner.
          </p>

          <h2>Your rights</h2>
          <p>
            Under RA 10173, you have the right to be informed, to access
            your data, to object to its processing, to request correction
            or erasure, and to file a complaint with the National Privacy
            Commission (privacy.gov.ph) if you believe your rights have
            been violated. To exercise any of these rights, contact us
            using the details on our homepage and ask us to update or
            delete your information.
          </p>

          <h2>Consent</h2>
          <p>
            By submitting a reservation or contacting us, you consent to
            the collection and use of your personal data as described in
            this notice, for the purpose of providing GSD&apos;s driving
            tutorial services.
          </p>
        </div>
      </Container>
    </main>
  );
}
