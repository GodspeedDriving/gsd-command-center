import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { getPublicPackages } from "@/lib/data/public";
import { formatPeso, splitIncludes } from "@/lib/format";

export async function Packages() {
  const packages = await getPublicPackages();

  if (packages.length === 0) {
    return null;
  }

  return (
    <section id="packages" className="py-16 sm:py-20">
      <Container>
        <h2 className="font-heading text-center text-3xl font-bold text-brand-blue sm:text-4xl">
          Packages
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-neutral-600">
          Every package pairs you with one dedicated coach for every session.
          Prices are per package, not per hour.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((pkg) => {
            const includes = pkg.includesMd ? splitIncludes(pkg.includesMd) : null;
            return (
              <div
                key={pkg.code}
                className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-heading text-xl font-bold text-brand-blue">
                  {pkg.name}
                </h3>
                <p className="mt-1 text-sm text-neutral-500">
                  {pkg.sessionsCount}{" "}
                  {pkg.sessionsCount === 1 ? "session" : "sessions"} &middot;{" "}
                  {pkg.hoursPerSession} hrs each
                </p>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-heading text-2xl font-bold text-neutral-900">
                    {formatPeso(pkg.priceWeekday)}
                  </span>
                  <span className="text-xs text-neutral-500">weekday</span>
                </div>
                <p className="text-sm text-neutral-500">
                  {formatPeso(pkg.priceWeekend)} weekend
                </p>

                {pkg.audienceMd && (
                  <p className="mt-4 text-sm text-neutral-600">
                    {pkg.audienceMd}
                  </p>
                )}

                {includes && includes.items.length > 0 && (
                  <div className="mt-4 flex-1">
                    {includes.lead && (
                      <p className="text-sm font-semibold text-neutral-800">
                        {includes.lead}
                      </p>
                    )}
                    <ul className="mt-2 space-y-1.5">
                      {includes.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-neutral-600"
                        >
                          <span
                            aria-hidden
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <ButtonLink
                  href={`/reserve?package=${pkg.code}`}
                  className="mt-6"
                >
                  Reserve this package
                </ButtonLink>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
