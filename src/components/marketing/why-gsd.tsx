import { Container } from "@/components/ui/container";
import { business } from "@/config/business";

export function WhyGsd() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-brand-blue sm:text-4xl">
            Why GSD
          </h2>
          <p className="mt-4 text-neutral-600">
            {business.positioning.betweenText}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {business.positioning.pillars.map((pillar, i) => (
            <div
              key={pillar}
              className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm"
            >
              <div
                aria-hidden
                className="font-heading mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue/10 text-lg font-bold text-brand-blue"
              >
                {i + 1}
              </div>
              <p className="font-medium text-neutral-800">{pillar}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
