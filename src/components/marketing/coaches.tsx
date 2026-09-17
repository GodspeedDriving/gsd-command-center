import { Container } from "@/components/ui/container";
import { business } from "@/config/business";

const COACHES = [
  {
    unit: business.instructors.unitA,
    transmissionLabel: "Automatic (A/T)",
  },
  {
    unit: business.instructors.unitM,
    transmissionLabel: "Manual (M/T)",
  },
];

export function Coaches() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <h2 className="font-heading text-center text-3xl font-bold text-brand-blue sm:text-4xl">
          Our coaches
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-neutral-600">
          Every student gets one dedicated coach for their entire package —
          no rotating teachers, no starting over.
        </p>

        <div className="mx-auto mt-12 grid max-w-2xl gap-6 sm:grid-cols-2">
          {COACHES.map(({ unit, transmissionLabel }) => (
            <div
              key={transmissionLabel}
              className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm"
            >
              <div
                aria-hidden
                className="font-heading mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-blue/10 text-2xl font-bold text-brand-blue"
              >
                {transmissionLabel.includes("Automatic") ? "A/T" : "M/T"}
              </div>
              <p className="font-heading mt-4 text-lg font-bold text-neutral-900">
                {unit.displayName.value}
              </p>
              <p className="text-sm text-neutral-500">{transmissionLabel}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
