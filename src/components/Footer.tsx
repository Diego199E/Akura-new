import { Link } from "@tanstack/react-router";
import { navLinks } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="bg-charcoal px-4 py-12 pb-28 text-cream sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 border-b border-cream/15 pb-10 md:grid-cols-[1fr_auto_auto] md:gap-16">
        <div><div className="font-display text-3xl">Akura Spa</div><p className="mt-3 max-w-sm text-sm leading-6 text-cream/60">Equilibrio, relajación y rituales creados para regresar a lo esencial.</p></div>
        <div><h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-cream/50">Explora</h3><div className="mt-4 grid gap-3 text-sm">{navLinks.map((l) => <Link key={l.to} to={l.to} className="text-cream/80 hover:text-cream">{l.label}</Link>)}</div></div>
        <div><h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-cream/50">Encuéntranos</h3><p className="mt-4 text-sm leading-6 text-cream/75">Carrera 15 #106-32<br />Bogotá D.C.<br /><a href="mailto:akura.spa0@gmail.com" className="underline underline-offset-4">akura.spa0@gmail.com</a></p></div>
      </div>
      <div className="mx-auto mt-6 flex max-w-7xl flex-col gap-2 text-xs text-cream/45 sm:flex-row sm:justify-between"><p>© 2026 Akura Spa. Todos los derechos reservados.</p><p>Bienestar consciente en Bogotá.</p></div>
    </footer>
  );
}
