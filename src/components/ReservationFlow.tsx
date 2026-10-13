import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { whatsappUrl } from "@/lib/akura-data";

const options = ["Ritual Head Spa", "Armonía de los Elementos", "Masaje Relajante", "Masaje Deportivo", "Masaje Descontracturante", "Quiero asesoría"];
const steps = ["Elige tu experiencia y modalidad.", "Indica la fecha y hora que prefieres.", "Envía tu solicitud por WhatsApp y confirmamos disponibilidad."];

export function ReservationFlow() {
  const [modalidad, setModalidad] = useState("Individual");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const d = new FormData(form);
    const lines = [
      "Hola, quisiera reservar en Akura Spa.",
      `Nombre: ${d.get("nombre")}`,
      `Experiencia: ${d.get("experiencia")}`,
      `Modalidad: ${modalidad}`,
      `Fecha preferida: ${d.get("fecha")}${d.get("hora") ? ` · ${d.get("hora")}` : ""}`,
      `Servicio: ${d.get("lugar")}`,
    ];
    const notas = String(d.get("notas") ?? "").trim();
    if (notas) lines.push(`Notas: ${notas}`);
    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <section className="bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">Cómo reservar</h2>
          <ol className="mt-8 space-y-6">
            {steps.map((s, i) => (
              <li key={s} className="grid grid-cols-[auto_1fr] gap-4"><span className="grid size-10 place-items-center rounded-full bg-deep-green font-display text-cream">{i + 1}</span><p className="pt-2 leading-7 text-muted-foreground">{s}</p></li>
            ))}
          </ol>
          <p className="mt-10 border-l-2 border-primary pl-4 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Horario del spa:</strong> lunes a viernes 8:00 am – 9:00 pm, sábados 8:00 am – 8:00 pm, domingos y festivos 8:00 am – 7:00 pm.<br /><strong className="text-foreground">Domicilios:</strong> lunes a domingo 8:00 am – 10:00 pm.</p>
        </div>
        <form onSubmit={submit} noValidate className="border border-border bg-card p-5 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium sm:col-span-2">Nombre<Input name="nombre" required minLength={2} placeholder="Tu nombre" className="h-12" /></label>
            <label className="grid gap-2 text-sm font-medium sm:col-span-2">Experiencia
              <select name="experiencia" required className="h-12 w-full rounded-md border border-input bg-transparent px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"><option value="">Selecciona una opción</option>{options.map((o) => <option key={o}>{o}</option>)}</select>
            </label>
            <fieldset className="grid gap-2 sm:col-span-2">
              <legend className="mb-2 text-sm font-medium">Modalidad</legend>
              <div className="grid grid-cols-2 gap-3">
                {["Individual", "En pareja"].map((m) => (
                  <button type="button" key={m} onClick={() => setModalidad(m)} aria-pressed={modalidad === m} className={`h-12 rounded-md border text-sm transition-colors ${modalidad === m ? "border-primary bg-primary text-primary-foreground" : "border-input text-foreground hover:bg-secondary"}`}>{m}</button>
                ))}
              </div>
            </fieldset>
            <label className="grid gap-2 text-sm font-medium">Fecha preferida<Input name="fecha" type="date" required className="h-12" /></label>
            <label className="grid gap-2 text-sm font-medium">Hora aproximada<Input name="hora" type="time" className="h-12" /></label>
            <label className="grid gap-2 text-sm font-medium sm:col-span-2">¿Dónde?
              <select name="lugar" className="h-12 w-full rounded-md border border-input bg-transparent px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"><option>En el spa (Santa Bárbara)</option><option>A domicilio</option></select>
            </label>
            <label className="grid gap-2 text-sm font-medium sm:col-span-2">Notas (opcional)<Textarea name="notas" maxLength={500} placeholder="Algo que debamos saber…" className="min-h-24" /></label>
          </div>
          <Button type="submit" size="lg" className="mt-6 h-12 w-full sm:w-auto"><MessageCircle /> Enviar reserva por WhatsApp</Button>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">Tu reserva queda confirmada cuando te respondamos con la disponibilidad.</p>
        </form>
      </div>
    </section>
  );
}
