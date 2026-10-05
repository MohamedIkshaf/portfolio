import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface StatsCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  href: string;
  color?: string;
  bg?: string;
}

export function StatsCard({
  label,
  value,
  icon: Icon,
  href,
  color = "text-brand-400",
  bg = "bg-brand-500/10",
}: StatsCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-xl glass p-5 transition-all hover:shadow-glow-sm hover:-translate-y-0.5 border border-border-subtle block"
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${bg}`}>
          <Icon size={18} className={color} />
        </div>
      </div>
      <p className="text-2xl font-bold text-text-primary">{value}</p>
      <p className="text-sm text-text-tertiary">{label}</p>
    </Link>
  );
}
