export function AdminPageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="border-b border-neutral-200 px-4 py-4">
      <h1 className="font-heading text-xl font-bold text-brand-blue">
        {title}
      </h1>
      {subtitle && <p className="mt-1 text-sm text-neutral-600">{subtitle}</p>}
    </header>
  );
}
