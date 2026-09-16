import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="font-heading text-2xl font-bold text-brand-red">
        Not authorized
      </h1>
      <p className="max-w-sm text-sm text-neutral-600">
        You&apos;re logged in, but this email isn&apos;t on the admin list
        yet. Ask whoever set up the system to add your email to the{" "}
        <code className="rounded bg-neutral-100 px-1">admins</code> table in
        Supabase.
      </p>
      <Link href="/login" className="text-sm font-medium text-brand-blue">
        Back to login
      </Link>
    </main>
  );
}
