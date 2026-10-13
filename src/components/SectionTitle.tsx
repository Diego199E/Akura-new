type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
};

export function SectionTitle({ eyebrow, title, description, light = false }: SectionTitleProps) {
  return (
    <div className="max-w-2xl">
      <div className="mb-5 flex items-center gap-3">
        <span className={light ? "h-px w-8 bg-cream/50" : "h-px w-8 bg-primary/50"} />
        <p
          className={`text-xs font-semibold uppercase tracking-[0.2em] ${light ? "text-cream/70" : "text-primary"}`}
        >
          {eyebrow}
        </p>
      </div>
      <h2 className={`font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl ${light ? "text-cream" : "text-foreground"}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-5 max-w-xl text-base leading-7 ${light ? "text-cream/70" : "text-muted-foreground"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}