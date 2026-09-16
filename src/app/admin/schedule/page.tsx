import { AdminPageHeader } from "@/components/admin/page-header";

export default function SchedulePage() {
  return (
    <>
      <AdminPageHeader
        title="Schedule"
        subtitle="The Day / Week / Month calendar for Unit A and Unit M will show up here."
      />
      <div className="p-4 text-sm text-neutral-500">
        Nothing to show yet — this screen is built in Milestone 4.
      </div>
    </>
  );
}
