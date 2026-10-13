import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Experience } from "@/lib/akura-data";
import { whatsappUrl } from "@/lib/akura-data";

export function ExperienceCard({ experience, reverse }: { experience: Experience; reverse?: boolean }) {
  return (
    <article className="grid items-center gap-7 border-t border-border py-10 md:grid-cols-2 md:gap-12 md:py-16">
      <div className={reverse ? "md:order-2" : ""}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted">
          <img src={experience.image} alt={experience.imageAlt} width={1200} height={912} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
          <span className="absolute left-4 top-4 bg-deep-green px-3 py-2 text-xs text-cream">{experience.number}</span>
        </div>
      </div>
      <div className={reverse ? "md:order-1" : ""}>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">{experience.eyebrow}</p>
        <h3 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">{experience.title}</h3>
        <p className="mt-5 max-w-xl leading-7 text-muted-foreground">{experience.description}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Modalidades">
          {experience.details.map((detail) => <li key={detail} className="rounded-full border border-primary/20 px-3 py-1.5 text-xs text-primary">{detail}</li>)}
        </ul>
        <Button asChild variant="link" className="mt-6 h-auto p-0 text-primary">
          <a href={whatsappUrl(`Hola, quisiera reservar: ${experience.title}.`)} target="_blank" rel="noreferrer">Consultar disponibilidad <ArrowUpRight /></a>
        </Button>
      </div>
    </article>
  );
}