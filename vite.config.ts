import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Dejamos que Lovable use su configuración base pero aseguramos la compatibilidad
  tanstackStart: {
    server: { entry: "server" },
  },
});
