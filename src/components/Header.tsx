import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/MobileMenu";
import { navLinks } from "@/lib/nav";
import akuraLogo from "../assets/akura-logo.png";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-cream/15 bg-deep-green/85 backdrop-blur-md">
      <div className="mx-auto grid h-18 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-6 lg:px-10">

        <Link
          to="/"
          className="flex min-w-0 items-center gap-3 text-cream"
          aria-label="Akura Spa, Equilibrio y bienestar"
        >
          {/* Logo original de Akura */}
          <img
            src={akuraLogo}
            alt=""
            className="h-12 w-12 shrink-0 object-contain"
          />

          {/* Nombre y lema */}
          <span className="flex min-w-0 flex-col items-start gap-1">
            <span className="font-display text-3xl leading-tight">
              Akura Spa
            </span>

            <span className="rounded-full bg-charcoal px-3 py-1 text-[10px] font-medium tracking-wide text-cream sm:text-1xs">
              Equilibrio y bienestar
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navegación principal">
          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: true }}
              className="border-b border-transparent py-1 text-sm text-cream/70 transition-colors hover:text-cream data-[status=active]:border-sage data-[status=active]:text-cream"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild variant="secondary" className="h-11 bg-cream text-primary hover:bg-cream/90">
            <Link to="/reservas" activeProps={{ className: "ring-2 ring-sage ring-offset-2 ring-offset-deep-green" }}>Reservas</Link>
          </Button>
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}
