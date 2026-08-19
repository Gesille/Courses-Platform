export default function NextLearnLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" className="fill-brand" />
      <rect x="8" y="18" width="4" height="7" rx="1.5" className="fill-brand-foreground" />
      <rect x="14" y="14" width="4" height="11" rx="1.5" className="fill-brand-foreground" />
      <rect x="20" y="10" width="4" height="15" rx="1.5" className="fill-brand-foreground" />
      <circle cx="22" cy="8" r="2.25" fill="#F0D883" />
    </svg>
  );
}