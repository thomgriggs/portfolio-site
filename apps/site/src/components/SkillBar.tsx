export function SkillBar({ label, level }: { label: string; level: number }) {
  const pct = Math.max(0, Math.min(100, level ?? 0));
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted">
        <div className="h-2 rounded-full bg-primary transition-[width] duration-700 ease-out" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
