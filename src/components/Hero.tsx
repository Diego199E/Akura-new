import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/akura-head-spa-hero.jpg";

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-[92svh] overflow-hidden bg-deep-green text-cream">
      <img src={heroImage} alt="Ritual Head Spa de Akura Spa" width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover object-[67%_center]" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="relative mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 sm:pb-16 lg:px-10 lg:pb-20">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-cream/75">Bienvenido al ritual capilar japonés En Colombia
          </p>
          <h1 className="font-display text-[clamp(3.3rem,13vw,7.8rem)] leading-[0.86] text-cream">
            Equilibrio y <br /><span className="italic text-sage">Bienestar.</span>
          </h1>
          <p className="mt-7 max-w-lg text-base leading-7 text-cream/80 sm:text-lg">
            Nos dedicamos a capturar la esencia de la cultura japonesa en cada detalle desde los aromas hasta la música ambiental para ofrecerte una experiencia única.
          </p>
          <div className="mt-8 flex flex-col gap-3 min-[390px]:flex-row">
            <Button asChild size="lg" className="h-13 px-6 text-sm">
              <Link to="/reservas">Reservar experiencia <ArrowUpRight /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-13 border-cream/40 bg-transparent px-6 text-cream hover:bg-cream/10 hover:text-cream">
              <Link to="/experiencias">Descubrir rituales</Link>
            </Button>
          </div>
        </div>
        <a href="#nosotros" className="mt-12 flex w-fit items-center gap-3 text-xs uppercase tracking-[0.16em] text-cream/65">
          Explorar <span className="grid size-9 place-items-center rounded-full border border-cream/30"><ArrowDown className="size-4" /></span>
        </a>
      </div>
    </section>
  );
}