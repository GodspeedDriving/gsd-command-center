import { Container } from "@/components/ui/container";
import { getPublicFaqs } from "@/lib/data/public";

export async function Faq() {
  const faqs = await getPublicFaqs();

  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h2 className="font-heading text-center text-3xl font-bold text-brand-blue sm:text-4xl">
          Frequently asked questions
        </h2>

        {faqs.length === 0 ? (
          <p className="mx-auto mt-8 max-w-md rounded-xl border border-neutral-200 p-6 text-center text-neutral-600">
            Our FAQ page is being finalized. Contact us directly with any
            questions in the meantime.
          </p>
        ) : (
          <div className="mt-10 flex flex-col divide-y divide-neutral-200 rounded-xl border border-neutral-200">
            {faqs.map((faq) => (
              <details key={faq.question} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-neutral-900">
                  {faq.question}
                  <span
                    aria-hidden
                    className="ml-4 shrink-0 text-brand-blue transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-neutral-600">
                  {faq.answerMd}
                </p>
              </details>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
