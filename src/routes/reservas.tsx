import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { ReservationFlow } from "@/components/ReservationFlow";

export const Route = createFileRoute("/reservas")({
  head: () => ({
    meta: [
      { title: "Reservas | Akura Spa Bogotá" },
      { name: "description", content: "Reserva tu Ritual Head Spa o masaje en Akura Spa por WhatsApp. Individual o en pareja, en el spa o a domicilio." },
      { property: "og:title", content: "Reserva tu experiencia | Akura Spa" },
      { property: "og:description", content: "Elige tu experiencia y envía tu reserva por WhatsApp en segundos." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Reservas" title="Reserva tu momento de pausa." description="Cuéntanos qué experiencia deseas y cuándo. Te confirmaremos la disponibilidad por WhatsApp." />
      <ReservationFlow />
    </>
  ),
});
