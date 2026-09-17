import { Container } from "@/components/ui/container";

const STEPS = [
  "Send a message or reserve online",
  "Choose a package",
  "Book a slot",
  "Learn to drive",
  "Become GSD Approved",
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <h2 className="font-heading text-center text-3xl font-bold text-brand-blue sm:text-4xl">
          How it works
        </h2>

        <ol className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-5">
          {STEPS.map((step, i) => (
            <li key={step} className="flex flex-col items-center text-center">
              <span className="font-heading flex h-10 w-10 items-center justify-center rounded-full bg-brand-red text-lg font-bold text-white">
                {i + 1}
              </span>
              <p className="mt-3 text-sm font-medium text-neutral-800">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
