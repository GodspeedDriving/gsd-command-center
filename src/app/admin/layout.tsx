import { requireAdmin } from "@/lib/auth/get-admin";
import { BottomNav } from "@/components/admin/bottom-nav";

function SupabaseNotConfigured() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
      <h1 className="font-heading text-xl font-bold text-brand-red">
        Supabase isn&apos;t connected yet
      </h1>
      <p className="max-w-sm text-sm text-neutral-600">
        Add <code className="rounded bg-neutral-100 px-1">
          NEXT_PUBLIC_SUPABASE_URL
        </code>{" "}
        and{" "}
        <code className="rounded bg-neutral-100 px-1">
          NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
        </code>{" "}
        to <code className="rounded bg-neutral-100 px-1">.env.local</code>{" "}
        (see the setup instructions), then restart the app.
      </p>
    </main>
  );
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  ) {
    return <SupabaseNotConfigured />;
  }

  await requireAdmin();

  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1 pb-20">{children}</main>
      <BottomNav />
    </div>
  );
}
