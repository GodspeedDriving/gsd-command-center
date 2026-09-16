import { AdminPageHeader } from "@/components/admin/page-header";
import { ownerTodos } from "@/config/business";
import { requireAdmin } from "@/lib/auth/get-admin";
import { signOut } from "@/app/admin/actions";

export default async function MorePage() {
  const admin = await requireAdmin();

  return (
    <>
      <AdminPageHeader title="More" subtitle={`Logged in as ${admin.email}`} />

      <section className="p-4">
        <h2 className="font-heading text-base font-bold text-brand-blue">
          Things to confirm ({ownerTodos.length})
        </h2>
        <p className="mt-1 text-sm text-neutral-600">
          These decisions from SPEC.md Section 11 aren&apos;t made yet.
          Nothing here shows on the public site until you confirm it.
        </p>
        <ul className="mt-3 flex flex-col gap-2">
          {ownerTodos.map((todo) => (
            <li
              key={todo}
              className="flex items-start gap-2 rounded-lg border border-brand-yellow/60 bg-brand-yellow/10 px-3 py-2 text-sm"
            >
              <span
                aria-hidden
                className="mt-0.5 rounded bg-brand-yellow px-1.5 py-0.5 text-[10px] font-bold text-neutral-900"
              >
                TODO
              </span>
              <span>{todo}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-neutral-200 p-4">
        <form action={signOut}>
          <button
            type="submit"
            className="w-full rounded-full border border-brand-red px-6 py-3 text-base font-semibold text-brand-red"
          >
            Log out
          </button>
        </form>
      </section>
    </>
  );
}
