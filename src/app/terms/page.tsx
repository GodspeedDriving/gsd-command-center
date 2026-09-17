import { Container } from "@/components/ui/container";
import { business } from "@/config/business";
import { getPublicPolicies } from "@/lib/data/public";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Terms & Policies — ${business.shortName}`,
};

export default async function TermsPage() {
  const policies = await getPublicPolicies();

  return (
    <main className="py-16">
      <Container className="max-w-2xl">
        <h1 className="font-heading text-3xl font-bold text-brand-blue">
          Terms &amp; Policies
        </h1>

        <div className="mt-8 flex flex-col gap-4 text-neutral-700 [&_h2]:font-heading [&_h2]:mt-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-neutral-900">
          <h2>About GSD</h2>
          <p>
            {business.name} ({business.shortName}) is a private driving
            tutorial service registered with the DTI. We are not an
            LTO-accredited driving school, we do not issue TDC or PDC
            certificates, and we cannot process your driver&apos;s license.
            &ldquo;GSD Approved&rdquo; and &ldquo;Godspeed-Certified&rdquo;
            are internal completion standards we use to track student
            progress, not government certifications. We never guarantee
            that a student will pass the LTO exam or obtain a license.
          </p>

          <h2>Requirement to hold a valid permit or license</h2>
          <p>
            Philippine law requires a learner to hold a valid LTO student
            permit or driver&apos;s license, with a licensed driver beside
            them, to legally drive on public roads. You must bring a valid,
            unexpired permit or license to every on-road session.
          </p>

          <h2>Payment, reschedule &amp; weather policy</h2>
          {policies.length === 0 ? (
            <p>
              Our detailed payment, reschedule, and weather policies are
              being finalized. Please contact us directly for current
              terms before booking.
            </p>
          ) : (
            <ul className="flex list-disc flex-col gap-2 pl-5">
              {policies.map((policy) => (
                <li key={policy.key}>
                  <strong>{policy.title}:</strong> {policy.bodyMd}
                </li>
              ))}
            </ul>
          )}

          <h2>Limitation of liability</h2>
          <p>
            Driving lessons carry inherent risk. Students and, where
            applicable, their parent or guardian, agree to follow coach
            guidance and applicable traffic laws at all times. GSD is not
            liable for outcomes outside our reasonable control, including
            LTO exam results, weather-related disruptions, or third-party
            actions on public roads.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may update these terms from time to time. Continued use of
            our services after changes are posted means you accept the
            updated terms.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to us using the contact
            details on our homepage.
          </p>
        </div>
      </Container>
    </main>
  );
}
