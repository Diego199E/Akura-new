import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // 1. Forzamos a que compile como un sitio estático plano
    deploymentPreset: "static", 
    // 2. Le ordenamos generar archivos HTML reales para cada una de tus rutas
    prerender: {
      enabled: true,
      crawlLinks: true,
    },
  },
});
