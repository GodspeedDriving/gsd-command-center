import { AdminPageHeader } from "@/components/admin/page-header";

export default function MoneyPage() {
  return (
    <>
      <AdminPageHeader
        title="Money"
        subtitle="Payments, expenses, and profit & loss will show up here."
      />
      <div className="p-4 text-sm text-neutral-500">
        Nothing to show yet — this screen is built in Milestones 6 and 7.
      </div>
    </>
  );
}
