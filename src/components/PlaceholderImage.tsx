export default function PlaceholderImage({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-surface-container flex items-center justify-center ${className}`}
    >
      <span className="font-sans text-sm text-on-surface/30 text-center px-4">
        {label}
      </span>
    </div>
  );
}
