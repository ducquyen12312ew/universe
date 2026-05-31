import Link from "next/link";

interface OverleafTopBarProps {
  projectRoute?: string;
}

export default function OverleafTopBar({ projectRoute }: OverleafTopBarProps) {
  const navLinks = ["Product", "Solutions", "Templates", "Pricing"];

  return (
    <header
      className="flex items-center justify-between px-6 py-3 border-b shrink-0"
      style={{ backgroundColor: "#1b2638", borderColor: "#2d3d56" }}
    >
      {/* Logo */}
      <Link href="/apps/overleaf" className="flex items-center gap-2">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Z"
            fill="#4caf50"
          />
          <path
            d="M8 7c0 0 2 1 2 5s-2 5-2 5M13 7c1.5 1.5 3 3 3 5s-1.5 3.5-3 5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <div className="flex flex-col leading-none">
          <span className="text-white font-semibold text-lg tracking-tight" style={{ fontFamily: "serif" }}>
            Overleaf
          </span>
          <span className="text-[10px] text-gray-400 tracking-wide">A Digital Science Solution</span>
        </div>
      </Link>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <button
            key={link}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition-colors"
          >
            {link}
            {(link === "Product" || link === "Solutions") && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5H7Z" />
              </svg>
            )}
          </button>
        ))}
      </nav>
    </header>
  );
}
