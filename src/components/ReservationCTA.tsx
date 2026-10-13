import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReservationCTA() {
  return (
    <section className="bg-sage px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
      <div className="mx-auto grid max-w-7xl items-end gap-8 md:grid-cols-[1fr_auto]">
        <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">¿Quieres reservar?</p><h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-primary sm:text-5xl lg:text-6xl">Tu cuerpo ya sabe que necesita una pausa.</h2></div>
        <Button asChild size="lg" className="h-13 w-full bg-deep-green text-cream hover:bg-primary md:w-auto"><Link to="/reservas">Reservar ahora <ArrowUpRight /></Link></Button>
      </div>
    </section>
  );
}
