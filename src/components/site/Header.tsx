import { Link } from "@tanstack/react-router";
import { Sun, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const nav = [
  { to: "/kalkulator", label: "Kalkulator" },
  { to: "/instalateri", label: "Instalateri" },
  { to: "/kako-funkcionira", label: "Kako funkcionira" },
  { to: "/financiranje", label: "Financiranje" },
  { to: "/blog", label: "Blog" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? "glass shadow-[0_1px_0_color-mix(in_oklab,var(--navy)_8%,transparent)]" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-navy text-solar transition-transform group-hover:rotate-12">
            <Sun className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-navy">Prosumer<span className="text-eco">.ba</span></span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-full px-4 py-2 text-sm font-medium text-navy/70 transition-colors hover:bg-secondary hover:text-navy"
              activeProps={{ className: "rounded-full px-4 py-2 text-sm font-medium bg-secondary text-navy" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/instalateri" className="text-sm font-medium text-navy/70 hover:text-navy">Za instalatere</Link>
          <Link to="/kalkulator" className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elevated transition-transform hover:scale-[1.03]">
            Zatraži ponude
          </Link>
        </div>
        <button onClick={() => setOpen(!open)} className="rounded-full p-2 lg:hidden" aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-base font-medium text-navy hover:bg-secondary">
                {n.label}
              </Link>
            ))}
            <Link to="/kalkulator" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-navy px-5 py-3 text-center text-sm font-semibold text-primary-foreground">
              Zatraži ponude
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
