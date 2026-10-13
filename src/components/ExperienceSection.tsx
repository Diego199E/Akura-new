import { ExperienceCard } from "@/components/ExperienceCard";
import { experiences } from "@/lib/akura-data";

export function ExperienceSection() {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {experiences.map((experience, index) => <ExperienceCard key={experience.title} experience={experience} reverse={index % 2 === 1} />)}
      </div>
    </section>
  );
}
