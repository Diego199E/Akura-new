
import { useCallback, useEffect, useRef, useState } from "react";

const images = [
  {
    src: "/images/experiencia-1.jpg",
    alt: "Espacio de relajación de Akura Spa",
  },
  {
    src: "/images/experiencia-2.jpg",
    alt: "Experiencia de bienestar en Akura Spa",
  },
  {
    src: "/images/experiencia-3.jpg",
    alt: "Ritual de cuidado y relajación",
  },
  {
    src: "/images/experiencia-4.jpg",
    alt: "Espacio de relajación de Akura Spa",
  },
];

type Phase = "idle" | "prepare" | "animate";

export function ExperiencesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const [phase, setPhase] = useState<Phase>("idle");

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frameRef = useRef<number | null>(null);

  const changeImage = useCallback(
    (step: number) => {
      if (phase !== "idle") return;

      const next = (currentIndex + step + images.length) % images.length;

      setDirection(step);
      setNextIndex(next);
      setPhase("prepare");
    },
    [currentIndex, phase]
  );

  // Primero posicionamos la nueva imagen fuera de la pantalla.
  // Después de que el navegador procese ese cambio, iniciamos el deslizamiento.
  useEffect(() => {
    if (phase !== "prepare") return;

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = requestAnimationFrame(() => {
        setPhase("animate");
      });
    });

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [phase]);

  // Finalizamos la transición cuando termina la animación.
  useEffect(() => {
    if (phase !== "animate" || nextIndex === null) return;

    timeoutRef.current = setTimeout(() => {
      setCurrentIndex(nextIndex);
      setNextIndex(null);
      setPhase("idle");
    }, 700);

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [phase, nextIndex]);

  // Cambio automático cada cinco segundos cuando el carrusel está quieto.
  useEffect(() => {
    if (phase !== "idle") return;

    const interval = setInterval(() => {
      changeImage(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, phase, changeImage]);

  const currentPosition =
    phase === "animate"
      ? direction === 1
        ? "-translate-x-full"
        : "translate-x-full"
      : "translate-x-0";

  const incomingPosition =
    phase === "animate"
      ? "translate-x-0"
      : direction === 1
        ? "translate-x-full"
        : "-translate-x-full";

  return (
    <section
      id="experiencias"
      className="bg-cream px-4 py-12 sm:px-6 sm:py-16 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-10">
          <h1 className="font-display text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Experiencias
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            ¡Te damos la bienvenida a tu espacio de equilibrio y bienestar!
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl">
          <div className="relative h-[300px] sm:h-[420px] lg:h-[520px]">
            {/* Imagen actual */}
            <div
              className={`absolute inset-0 ${
                phase === "animate"
                  ? "transition-transform duration-700 ease-in-out"
                  : ""
              } ${currentPosition}`}
            >
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className="h-full w-full object-contain"
              />
            </div>

            {/* Imagen entrante */}
            {nextIndex !== null && (
              <div
                className={`absolute inset-0 ${
                  phase === "animate"
                    ? "transition-transform duration-700 ease-in-out"
                    : ""
                } ${incomingPosition}`}
              >
                <img
                  src={images[nextIndex].src}
                  alt={images[nextIndex].alt}
                  className="h-full w-full object-contain"
                />
              </div>
            )}
          </div>

          {/* Imagen anterior */}
          <button
            type="button"
            onClick={() => changeImage(-1)}
            aria-label="Imagen anterior"
            disabled={phase !== "idle"}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition hover:bg-black/70 disabled:opacity-50"
          >
            &#10094;
          </button>

          {/* Imagen siguiente */}
          <button
            type="button"
            onClick={() => changeImage(1)}
            aria-label="Imagen siguiente"
            disabled={phase !== "idle"}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition hover:bg-black/70 disabled:opacity-50"
          >
            &#10095;
          </button>

          {/* Indicadores */}
          <div className="absolute bottom-4 left-0 z-20 flex w-full justify-center gap-2">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => {
                  if (index === currentIndex || phase !== "idle") return;

                  const forwardDistance =
                    (index - currentIndex + images.length) % images.length;

                  const backwardDistance =
                    (currentIndex - index + images.length) % images.length;

                  changeImage(
                    forwardDistance <= backwardDistance ? 1 : -1
                  );
                }}
                aria-label={`Ir a la imagen ${index + 1}`}
                aria-current={index === currentIndex ? "true" : undefined}
                disabled={phase !== "idle"}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
