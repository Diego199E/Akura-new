import { createFileRoute } from "@tanstack/react-router";
import { ContactSection } from "@/components/ContactSection";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/contactos")({
  head: () => ({
    meta: [
      { title: "Contactos | Akura Spa Bogotá" },
      { name: "description", content: "Dirección, horarios, correo y ubicación de Akura Spa en Santa Bárbara, Bogotá: Carrera 15 #106-32." },
      { property: "og:title", content: "Contacto y ubicación | Akura Spa" },
      { property: "og:description", content: "Visítanos en Santa Bárbara, Bogotá, o escríbenos para resolver tus dudas." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Contactos" title="Estamos para acompañarte." description="Encuentra nuestra ubicación, horarios y canales de atención." />
      <ContactSection />
      <section className="bg-cream px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden border border-border">
          <iframe title="Ubicación de Akura Spa" src="https://www.google.com/maps?q=Carrera+15+%23106-32,+Bogot%C3%A1&output=embed" className="h-80 w-full sm:h-[28rem]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
    </>
  ),
});
