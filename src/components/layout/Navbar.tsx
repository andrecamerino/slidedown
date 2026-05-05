"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useConversion } from "@/lib/conversionContext";

function NavLink({ href, sectionId, children }: { href: string; sectionId: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { hasOutput } = useConversion();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (hasOutput) {
      const confirmed = window.confirm("You'll lose your converted file. Continue?");
      if (!confirmed) return;
    }

    if (pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(href);
    }
  };

  return (
    <a href={href} onClick={handleClick} className="hover:text-white/70 transition-colors">
      {children}
    </a>
  );
}

export function Navbar() {
  return (
    <nav className="border-b border-white/[0.07] bg-[#0c0c0f]/95 sticky top-0 z-50 backdrop-blur-sm">
      <div className={`px-6 py-4 flex items-center justify-between`}>
        <Link href="/" className="flex items-center gap-2 text-[15px] font-medium text-white">
          <div className="w-[22px] h-[22px] rounded-[6px] bg-gradient-to-br from-[#7F77DD] to-[#AFA9EC] flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
              <path d="M2 3h8M2 6h6M2 9h4" />
            </svg>
          </div>
          slidedown
        </Link>

        <div className="hidden md:flex items-center gap-5 text-[13px] text-white/40">
          <NavLink href="/#features" sectionId="features">features</NavLink>
          <NavLink href="/#how-it-works" sectionId="how-it-works">how it works</NavLink>
        </div>

        <Link
          href="/convert"
          className="text-[13px] px-4 py-[7px] rounded-lg border border-white/[0.14] text-white/80 bg-white/[0.05] cursor-pointer nav-cta-glow"
        >
          get started free
        </Link>
      </div>
    </nav>
  );
}
