import { createFileRoute } from "@tanstack/react-router";
import { ExperienceSection } from "@/components/ExperienceSection";
import { PageHero } from "@/components/PageHero";
import { ReservationCTA } from "@/components/ReservationCTA";

export const Route = createFileRoute("/experiencias")({
  head: () => ({
    meta: [
      { title: "Experiencias | Akura Spa Bogotá" },
      { name: "description", content: "Ritual Head Spa japonés, Armonía de los Elementos y masajes relajante, deportivo y descontracturante. Individual o en pareja." },
      { property: "og:title", content: "Experiencias de bienestar | Akura Spa" },
      { property: "og:description", content: "Descubre el Ritual Head Spa y nuestros masajes terapéuticos en Bogotá." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Experiencias Akura" title="Rituales para volver al centro." description="Cada experiencia se adapta a tu momento y puede vivirse de forma individual o en pareja." />
      <ExperienceSection />
      <ReservationCTA />
    </>
  ),
});
