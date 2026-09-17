import { Container } from "@/components/ui/container";
import { business } from "@/config/business";

export function Requirements() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <div className="rounded-2xl border-2 border-brand-blue/30 bg-brand-blue/5 p-8">
          <h2 className="font-heading text-2xl font-bold text-neutral-900">
            Before your first session
          </h2>
          <p className="mt-3 text-neutral-700">
            You&apos;ll need a valid <strong>LTO student permit or
            driver&apos;s license</strong> for on-road lessons — bring it to
            every session.
          </p>
          <p className="mt-3 text-sm text-neutral-600">
            GSD is a private driving tutorial service. We do not issue TDC or
            PDC certificates and cannot process your license. Any LTO
            requirements are completed separately through an LTO-accredited
            provider — we&apos;re here to build your confidence and skill
            behind the wheel.
          </p>
          {business.meetingPoints.confirmed &&
            business.meetingPoints.value.length > 0 && (
              <p className="mt-4 text-sm text-neutral-700">
                <strong>Meet-up point / Training Area:</strong>{" "}
                {business.meetingPoints.value.join(" / ")}
              </p>
            )}
        </div>
      </Container>
    </section>
  );
}
