import { AdminPageHeader } from "@/components/admin/page-header";

export default function TodayPage() {
  return (
    <>
      <AdminPageHeader
        title="Today"
        subtitle="Today's and tomorrow's sessions, pending payment proofs, and follow-ups will show up here."
      />
      <div className="p-4 text-sm text-neutral-500">
        Nothing to show yet — this screen is built in Milestone 4.
      </div>
    </>
  );
}
