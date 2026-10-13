import { createFileRoute } from "@tanstack/react-router";
import { AkuraHome } from "@/components/AkuraHome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Akura Spa Bogotá | Head Spa y masajes de relajación" },
      { name: "description", content: "Especialistas en ritual capilar japonés Head Spa, masajes relajantes y experiencias de bienestar en Santa Bárbara, Bogotá." },
      { property: "og:title", content: "Akura Spa Bogotá | Equilibrio que se siente" },
      { property: "og:description", content: "Ritual Head Spa japonés y masajes de relajación en Santa Bárbara, Bogotá." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: AkuraHome,
});
