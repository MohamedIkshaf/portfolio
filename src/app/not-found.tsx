import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-0">
      <div className="text-center px-6">
        {/* Animated 404 number */}
        <div className="relative mb-8">
          <h1 className="text-[10rem] sm:text-[14rem] font-black leading-none gradient-text opacity-20 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-medium text-text-secondary mb-1">
                Page not found
              </p>
              <p className="text-sm text-text-tertiary max-w-sm">
                The page you&apos;re looking for doesn&apos;t exist or has been
                moved.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-glow-md"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
