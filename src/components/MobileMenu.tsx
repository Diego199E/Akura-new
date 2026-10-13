import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/lib/nav";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-11 w-11 text-cream hover:bg-cream/10 hover:text-cream md:hidden" aria-label="Abrir menú">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[88%] border-primary/20 bg-background px-7 pt-20">
        <SheetTitle className="font-display text-3xl font-normal">Akura Spa</SheetTitle>
        <nav className="mt-12 flex flex-col" aria-label="Navegación móvil">
          {navLinks.map((link, index) => (
            <SheetClose asChild key={link.to}>
              <Link
                to={link.to}
                activeOptions={{ exact: true }}
                className="flex min-h-14 items-center justify-between border-b border-border py-4 text-lg text-foreground data-[status=active]:font-semibold data-[status=active]:text-primary"
              >
                {link.label}
                <span className="text-xs text-muted-foreground">0{index + 1}</span>
              </Link>
            </SheetClose>
          ))}
        </nav>
        <SheetClose asChild>
          <Button asChild size="lg" className="mt-10 h-12 w-full">
            <Link to="/reservas">Reservar ahora</Link>
          </Button>
        </SheetClose>
        <p className="mt-6 text-sm leading-6 text-muted-foreground">Carrera 15 #106-32<br />Santa Bárbara, Bogotá D.C.</p>
      </SheetContent>
    </Sheet>
  );
}
