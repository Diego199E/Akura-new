import headSpaImage from "@/assets/ritual-head-spa.png";
import elementsImage from "@/assets/armonia-elementos.jpg";
import therapeuticImage from "@/assets/masaje-terapeutico.jpg";

export type Experience = {
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  details: string[];
  image: string;
  imageAlt: string;
};

export type Testimonial = {
  id: number;
  nombre: string;
  comentario?: string;
  valoracion: number | null;
};

export const experiences: Experience[] = [
  {
    number: "01",
    title: "Ritual Head Spa",
    eyebrow: "Nuestra especialidad",
    description:
      "Una circulación continua de agua abraza la cabeza para revitalizar el cuero cabelludo, aliviar el estrés y llevarte a un estado de relajación profunda.",
    details: ["Individual", "En pareja", "Ritual capilar japonés"],
    image: headSpaImage,
    imageAlt: "Ritual capilar japonés con circulación de agua en Akura Spa",
  },
  {
    number: "02",
    title: "Armonía de los Elementos",
    eyebrow: "Ritual corporal",
    description:
      "Un masaje relajante que integra tierra, agua, fuego y aire mediante técnicas especializadas para devolverle armonía al cuerpo.",
    details: ["Individual", "En pareja", "Relajación integral"],
    image: elementsImage,
    imageAlt: "Masaje relajante inspirado en los cuatro elementos",
  },
  {
    number: "03",
    title: "Masajes Terapéuticos",
    eyebrow: "Bienestar a tu medida",
    description:
      "Elige entre masaje relajante para calma y bienestar, deportivo para recuperación muscular o descontracturante para liberar tensión.",
    details: ["Relajante", "Deportivo", "Descontracturante"],
    image: therapeuticImage,
    imageAlt: "Masaje terapéutico profesional en Akura Spa",
  },
];

export const fallbackTestimonials: Testimonial[] = [
  { id: 1, nombre: "Dorelly", valoracion: 1},
  { id: 2, nombre: "Antonia López Negrete", valoracion: 2 },
  { id: 3, nombre: "Emmanuel", valoracion: 3 },
  { id: 4, nombre: "Johanna León", valoracion: 4 },
  { id: 5, nombre: "Óscar Mauricio Salazar", valoracion: 5 },
  { id: 6, nombre: "Marcela Rueda", valoracion: 5 },
  { id: 7, nombre: "Adriana Casas", valoracion: 5 },
  { id: 8, nombre: "Liliana", valoracion: 5 },
];

export function whatsappUrl(message = "Hola, quisiera reservar una experiencia en Akura Spa.") {
  const configuredNumber = import.meta.env["VITE_WHATSAPP_NUMBER"]?.replace(/\D/g, "") ?? "";
  const base = configuredNumber ? `https://wa.me/${configuredNumber}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(message)}`;
}