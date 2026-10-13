export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="bg-deep-green px-4 pb-14 pt-32 text-cream sm:px-6 sm:pb-20 sm:pt-40 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.6rem,9vw,5.5rem)] leading-[0.95]">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-cream/75 sm:text-lg">{description}</p>
      </div>
    </section>
  );
}
