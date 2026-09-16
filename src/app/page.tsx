import Link from "next/link";
import { business } from "@/config/business";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="font-heading text-4xl font-bold text-brand-blue">
        {business.shortName}
      </h1>
      <p className="text-lg">{business.tagline}</p>
      <p className="max-w-md text-sm text-neutral-600">
        The public site is being built in Milestone 2. For now, this is just
        the project foundation.
      </p>
      <Link
        href="/login"
        className="mt-4 rounded-full bg-brand-blue px-6 py-3 font-semibold text-white"
      >
        Admin login
      </Link>
    </main>
  );
}
