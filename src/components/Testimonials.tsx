
import { useEffect, useState, type FormEvent } from "react";
import { Quote, Star } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { fallbackTestimonials, type Testimonial } from "@/lib/akura-data";

export function Testimonials() {
  const [testimonials, setTestimonials] =
    useState<Testimonial[]>(fallbackTestimonials);

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [comentario, setComentario] = useState("");
  const [valoracion, setValoracion] = useState(5);
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const apiUrl = import.meta.env["VITE_API_URL"]?.replace(/\/$/, "");
    if (!apiUrl) return;

    const controller = new AbortController();

    fetch(`${apiUrl}/comentarios.php`, {
      signal: controller.signal,
    })
      .then((response) =>
        response.ok
          ? response.json()
          : Promise.reject(new Error("No disponible"))
      )
      .then((payload: { comentarios?: Testimonial[] }) => {
        if (payload.comentarios?.length) {
          setTestimonials(payload.comentarios);
        }
      })
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  async function enviarComentario(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMensaje("");
    setError("");

    const apiUrl = import.meta.env["VITE_API_URL"]?.replace(/\/$/, "");

    if (!apiUrl) {
      setError("No se ha configurado la dirección del servidor.");
      return;
    }

    setEnviando(true);

    try {
      const response = await fetch(`${apiUrl}/crearComentario.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          correo,
          comentario,
          valoracion,
        }),
      });

      const payload: { mensaje?: string; error?: string } =
        await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "No fue posible enviar tu opinión.");
      }

      setMensaje(
        payload.mensaje ||
          "Gracias. Tu comentario será revisado antes de publicarse."
      );

      setNombre("");
      setCorreo("");
      setComentario("");
      setValoracion(5);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No fue posible conectar con el servidor. Inténtalo de nuevo."
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section
      id="testimonios"
      className="overflow-hidden bg-deep-green px-4 py-20 text-cream sm:px-6 sm:py-28 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          light
          eyebrow="Voces de bienestar"
          title="Personas que ya hicieron una pausa."
          description="Clientes que han compartido su experiencia con Akura Spa."
        />

        {/* Testimonios existentes */}
        <div className="scrollbar-none -mx-4 mt-12 flex snap-x gap-4 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:px-0">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="min-h-56 min-w-[82vw] snap-center border border-cream/50 bg-primary/50 p-6 sm:min-w-80 lg:min-w-0"
            >
              <Quote
                className="size-7 text-sage"
                strokeWidth={1.3}
                aria-hidden="true"
              />

              <div
                className="mt-4 flex gap-1"
                aria-label={`Valoración: ${testimonial.valoracion ?? 0} de 5 estrellas`}
              >
                {[1, 2, 3, 4, 5].map((estrella) => (
                  <Star
                    key={estrella}
                    className={`size-4 ${
                      estrella <= (Number(testimonial.valoracion) || 0)
                        ? "fill-star text-star"
                        : "text-cream/30"
                    }`}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <p className="mt-8 font-display text-2xl leading-snug">
                {testimonial.comentario ||
                  "Una experiencia compartida con la comunidad de Akura Spa."}
              </p>

              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-cream/65">
                {testimonial.nombre}
              </p>
            </article>
          ))}
        </div>

        {/* Formulario para nuevos comentarios */}
        <div className="mx-auto mt-16 max-w-2xl border border-cream/50 bg-primary/50 p-6 sm:mt-20 sm:p-10">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
              Tu experiencia también cuenta
            </p>

            <h3 className="mt-3 font-display text-3xl sm:text-4xl">
              Comparte tu opinión.
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-cream/70">
              Cuéntanos cómo fue tu experiencia en Akura Spa y ayuda a otras
              personas a descubrir un espacio de bienestar.
            </p>
          </div>

          <form onSubmit={enviarComentario} className="space-y-6">
            <div>
              <label
                htmlFor="testimonio-nombre"
                className="mb-2 block text-sm font-medium"
              >
                Nombre
              </label>

              <input
                id="testimonio-nombre"
                name="nombre"
                type="text"
                autoComplete="name"
                minLength={2}
                maxLength={100}
                required
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                placeholder="¿Cómo te llamas?"
                className="w-full border border-cream/20 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-sage focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="testimonio-correo"
                className="mb-2 block text-sm font-medium"
              >
                Correo electrónico
              </label>

              <input
                id="testimonio-correo"
                name="correo"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
                value={correo}
                onChange={(event) => setCorreo(event.target.value)}
                placeholder="tu@correo.com"
                className="w-full border border-cream/20 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-sage focus:outline-none"
              />

              <p className="mt-2 text-xs text-cream/50">
                Tu correo no se mostrará públicamente.
              </p>
            </div>

            <fieldset>
              <legend className="mb-3 text-sm font-medium">
                ¿Cómo calificas tu experiencia?
              </legend>

              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((estrella) => (
                  <button
                    key={estrella}
                    type="button"
                    onClick={() => setValoracion(estrella)}
                    aria-label={`${estrella} ${estrella === 1 ? "estrella" : "estrellas"}`}
                    aria-pressed={valoracion === estrella}
                    className="rounded-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sage"
                  >
                    <Star
                      className={`size-8 ${
                        estrella <= valoracion
                          ? "fill-star text-star"
                          : "text-cream/30"
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                ))}

                <span className="ml-2 text-sm text-cream/70">
                  {valoracion}/5
                </span>
              </div>
            </fieldset>

            <div>
              <label
                htmlFor="testimonio-comentario"
                className="mb-2 block text-sm font-medium"
              >
                Tu comentario
              </label>

              <textarea
                id="testimonio-comentario"
                name="comentario"
                minLength={10}
                maxLength={1000}
                rows={5}
                required
                value={comentario}
                onChange={(event) => setComentario(event.target.value)}
                placeholder="Cuéntanos qué fue lo que más te gustó..."
                className="w-full resize-y border border-cream/20 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-sage focus:outline-none"
              />

              <p className="mt-2 text-right text-xs text-cream/50">
                {comentario.length}/1000 caracteres
              </p>
            </div>

            {error && (
              <p
                role="alert"
                className="border border-red-300/30 bg-red-950/30 p-3 text-sm text-red-200"
              >
                {error}
              </p>
            )}

            {mensaje && (
              <p
                role="status"
                className="border border-sage/30 bg-sage/10 p-3 text-sm text-cream"
              >
                {mensaje}
              </p>
            )}

            <button
              type="submit"
              disabled={enviando}
              className="w-full bg-sage px-6 py-4 text-sm font-semibold text-primary transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {enviando ? "Enviando..." : "Enviar mi opinión"}
            </button>

            <p className="text-xs leading-relaxed text-cream/50">
              Los comentarios serán revisados antes de publicarse. Al enviar tu
              opinión, aceptas que el nombre y el comentario puedan aparecer
              públicamente si son aprobados.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
