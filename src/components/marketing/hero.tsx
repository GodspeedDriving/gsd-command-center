import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { business } from "@/config/business";

export function Hero() {
  const messengerUrl = business.contact.messengerPageHandle.confirmed
    ? `https://m.me/${business.contact.messengerPageHandle.value}`
    : null;

  return (
    <section className="relative overflow-hidden bg-brand-blue text-white">
      <div
        aria-hidden
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, white 0, transparent 40%), radial-gradient(circle at 80% 60%, white 0, transparent 35%)",
        }}
      />
      <Container className="relative flex flex-col items-center gap-6 py-16 text-center sm:py-24">
        <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium tracking-wide text-brand-yellow">
          {business.location.city} &middot; Automatic &amp; Manual
        </span>
        <h1 className="font-heading max-w-3xl text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl">
          {business.tagline}
        </h1>
        <p className="max-w-2xl text-lg font-medium text-white/90 sm:text-xl">
          {business.enrollmentHeadline}
        </p>
        <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <ButtonLink href="/reserve" variant="secondary" className="w-full sm:w-auto">
            Check available slots
          </ButtonLink>
          {messengerUrl && (
            <ButtonLink
              href={messengerUrl}
              variant="outline"
              className="w-full border-white text-white hover:bg-white hover:text-brand-blue sm:w-auto"
            >
              Message us on Messenger
            </ButtonLink>
          )}
        </div>
        <p className="text-sm text-white/70">
          Automatic and manual lessons &middot; One dedicated instructor
          &middot; Only 2 slots a day
        </p>
      </Container>
    </section>
  );
}
