import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/SectionTitle";
import { experiences } from "@/lib/akura-data";

export function ExperiencePreview() {
  return (
    <section className="bg-background px-4 py-20 sm:px-6 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionTitle eyebrow="Experiencias Akura" title="Rituales para volver al centro." />
          <Button asChild variant="outline" size="lg" className="h-12 w-full md:w-auto"><Link to="/experiencias">Ver todas las experiencias <ArrowUpRight /></Link></Button>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {experiences.map((e) => (
            <Link key={e.title} to="/experiencias" className="group block">
              <div className="aspect-[4/5] overflow-hidden bg-secondary"><img src={e.image} alt={e.imageAlt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">{e.number} · {e.eyebrow}</p>
              <h3 className="mt-2 font-display text-2xl text-foreground">{e.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactPreview() {
  return (
    <section className="bg-cream px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_1fr_auto] md:items-center">
        <div className="flex gap-4"><MapPin className="mt-1 size-5 shrink-0 text-primary" /><div><h3 className="font-display text-2xl text-foreground">Santa Bárbara, Bogotá</h3><p className="mt-1 text-sm text-muted-foreground">Carrera 15 #106-32</p></div></div>
        <div className="flex gap-4"><Clock3 className="mt-1 size-5 shrink-0 text-primary" /><div><h3 className="font-display text-2xl text-foreground">Todos los días</h3><p className="mt-1 text-sm text-muted-foreground">Desde las 8:00 am · Domicilios hasta las 10:00 pm</p></div></div>
        <Button asChild size="lg" variant="outline" className="h-12 w-full md:w-auto"><Link to="/contactos">Ver contacto completo</Link></Button>
      </div>
    </section>
  );
}
