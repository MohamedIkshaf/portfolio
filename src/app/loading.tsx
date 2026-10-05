export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-0">
      <div className="flex flex-col items-center gap-4">
        {/* Spinning logo */}
        <div className="relative">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 animate-spin-slow" />
          <div className="absolute inset-0 h-12 w-12 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 blur-xl opacity-50 animate-glow-pulse" />
        </div>
        <p className="text-sm text-text-tertiary animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
