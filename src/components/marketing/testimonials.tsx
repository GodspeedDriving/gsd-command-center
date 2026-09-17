import { Container } from "@/components/ui/container";
import { getPublicTestimonials } from "@/lib/data/public";

export async function Testimonials() {
  const testimonials = await getPublicTestimonials();

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="bg-brand-blue/5 py-16 sm:py-20">
      <Container>
        <h2 className="font-heading text-center text-3xl font-bold text-brand-blue sm:text-4xl">
          What our students say
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.studentNameDisplay + t.quote.slice(0, 20)}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <p className="text-neutral-700">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4 text-sm font-semibold text-brand-blue">
                {t.studentNameDisplay}
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
