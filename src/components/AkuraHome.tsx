import { ContactPreview, ExperiencePreview } from "@/components/HomePreviews";
import { Hero } from "@/components/Hero";
import { ExperiencesCarousel } from "@/components/ui/ExperiencesCarousel";
import { ReservationCTA } from "@/components/ReservationCTA";
import { Testimonials } from "@/components/Testimonials";

export function AkuraHome() {
  return (
    <>
      <Hero />

      <section
        id="nosotros"
        className="bg-cream px-4 py-20 sm:px-6 sm:py-28 lg:px-10"
      >
        <ExperiencesCarousel />
      </section>

      <Testimonials />
      <ReservationCTA />
      <ContactPreview />
    </>
  );
}