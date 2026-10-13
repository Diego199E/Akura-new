import { useState, type FormEvent, type ReactNode } from "react";
import { Clock3, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionTitle } from "@/components/SectionTitle";
import { whatsappUrl } from "@/lib/akura-data";

export function ContactSection() {
  const [sending, setSending] = useState(false);

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const apiUrl = import.meta.env["VITE_API_URL"]?.replace(/\/$/, "");
    if (!apiUrl) {
      toast.info("Escríbenos a akura.spa0@gmail.com para completar tu solicitud.");
      return;
    }
    setSending(true);
    try {
      const payload = Object.fromEntries(new FormData(form));
      const response = await fetch(`${apiUrl}/contacto.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("No fue posible enviar el mensaje");
      form.reset();
      toast.success("Recibimos tu mensaje. Te contactaremos muy pronto.");
    } catch {
      toast.error("No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por correo.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="bg-cream px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionTitle eyebrow="Visítanos" title="Tu momento de pausa comienza aquí." description="Estamos en Santa Bárbara, al norte de Bogotá. Escríbenos y te ayudaremos a elegir la experiencia ideal." />
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-whatsapp px-5 text-sm font-medium text-cream">Escríbenos por WhatsApp</a>
          <div className="mt-10 space-y-7">
            <Info icon={MapPin} title="Dirección">Carrera 15 #106-32<br />Santa Bárbara, Bogotá D.C.</Info>
            <Info icon={Mail} title="Correo"><a className="underline decoration-primary/30 underline-offset-4" href="mailto:akura.spa0@gmail.com">akura.spa0@gmail.com</a></Info>
            <Info icon={Clock3} title="Horario del spa">Lunes a viernes: 8:00 am – 9:00 pm<br />Sábados: 8:00 am – 8:00 pm<br />Domingos y festivos: 8:00 am – 7:00 pm</Info>
            <p className="border-l-2 border-primary pl-4 text-sm text-muted-foreground"><strong className="text-foreground">Domicilios:</strong> lunes a domingo, 8:00 am – 10:00 pm.</p>
          </div>
        </div>
        <form onSubmit={submitContact} className="border border-border bg-card p-5 sm:p-8" noValidate>
          <h3 className="font-display text-3xl text-card-foreground">Cuéntanos qué necesitas</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Déjanos tus datos para ayudarte con tu reserva.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Field label="Nombre" htmlFor="nombre"><Input id="nombre" name="nombre" required minLength={2} placeholder="Tu nombre" className="h-12" /></Field>
            <Field label="Teléfono" htmlFor="telefono"><Input id="telefono" name="telefono" type="tel" required minLength={7} placeholder="Tu número" className="h-12" /></Field>
            <Field label="Correo" htmlFor="correo"><Input id="correo" name="correo" type="email" required placeholder="tucorreo@ejemplo.com" className="h-12" /></Field>
            <Field label="Experiencia" htmlFor="experiencia"><select id="experiencia" name="experiencia" required className="h-12 w-full rounded-md border border-input bg-transparent px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"><option value="">Selecciona una opción</option><option>Ritual Head Spa</option><option>Armonía de los Elementos</option><option>Masaje Terapéutico</option><option>Quiero asesoría</option></select></Field>
            <div className="sm:col-span-2"><Field label="Mensaje" htmlFor="mensaje"><Textarea id="mensaje" name="mensaje" required minLength={10} maxLength={1000} placeholder="Cuéntanos si prefieres una experiencia individual o en pareja…" className="min-h-32" /></Field></div>
          </div>
          <Button type="submit" size="lg" className="mt-6 h-12 w-full sm:w-auto" disabled={sending}>{sending ? "Enviando…" : "Enviar solicitud"}</Button>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">Al enviar aceptas que Akura Spa te contacte para responder tu solicitud.</p>
        </form>
      </div>
    </section>
  );
}

function Info({ icon: Icon, title, children }: { icon: typeof MapPin; title: string; children: ReactNode }) {
  return <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-primary"><Icon className="size-4" /></span><div className="min-w-0"><h3 className="text-sm font-semibold text-foreground">{title}</h3><div className="mt-1 text-sm leading-6 text-muted-foreground">{children}</div></div></div>;
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return <label htmlFor={htmlFor} className="grid gap-2 text-sm font-medium text-foreground">{label}{children}</label>;
}