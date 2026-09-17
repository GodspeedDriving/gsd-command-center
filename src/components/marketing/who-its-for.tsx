import { Container } from "@/components/ui/container";
import { GsdMark } from "@/components/marketing/gsd-mark";
import { business } from "@/config/business";

export function WhoItsFor() {
  return (
    <section className="bg-brand-blue/5 py-16 sm:py-20">
      <Container>
        <h2 className="font-heading text-center text-3xl font-bold text-brand-blue sm:text-4xl">
          Who <GsdMark /> is for
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-neutral-600">
          If any of these sound like you, you&apos;re exactly who we built
          this for.
        </p>

        <ul className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
          {business.audiences.map((audience) => (
            <li
              key={audience}
              className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm"
            >
              <span
                aria-hidden
                className="h-2 w-2 shrink-0 rounded-full bg-brand-red"
              />
              <span className="font-medium text-neutral-800">{audience}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
