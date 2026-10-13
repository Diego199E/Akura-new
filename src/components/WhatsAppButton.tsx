import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/akura-data";

export function WhatsAppButton() {
  return <a href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Reservar por WhatsApp" className="fixed bottom-4 right-4 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-float transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:bottom-6 sm:right-6"><MessageCircle className="size-6" /></a>;
}