import { AdminPageHeader } from "@/components/admin/page-header";

export default function LeadsPage() {
  return (
    <>
      <AdminPageHeader
        title="Leads"
        subtitle="Your lead list, scoring, and quick-add will show up here."
      />
      <div className="p-4 text-sm text-neutral-500">
        Nothing to show yet — this screen is built in Milestone 3.
      </div>
    </>
  );
}
