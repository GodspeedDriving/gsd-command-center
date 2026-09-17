import { Container } from "@/components/ui/container";
import { getPublicPolicies } from "@/lib/data/public";

export async function Policies() {
  const policies = await getPublicPolicies();

  return (
    <section className="bg-brand-blue/5 py-16 sm:py-20">
      <Container className="max-w-3xl">
        <h2 className="font-heading text-center text-3xl font-bold text-brand-blue sm:text-4xl">
          Payment, reschedule &amp; weather policy
        </h2>

        {policies.length === 0 ? (
          <p className="mx-auto mt-8 max-w-md rounded-xl bg-white p-6 text-center text-neutral-600 shadow-sm">
            Our policies are being finalized. Please contact us directly for
            details before booking.
          </p>
        ) : (
          <dl className="mt-10 flex flex-col gap-4">
            {policies.map((policy) => (
              <div
                key={policy.key}
                className="rounded-xl bg-white p-5 shadow-sm"
              >
                <dt className="font-heading font-bold text-neutral-900">
                  {policy.title}
                </dt>
                <dd className="mt-1 text-sm text-neutral-600">
                  {policy.bodyMd}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </Container>
    </section>
  );
}
