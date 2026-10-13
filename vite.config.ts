// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // 1. Cambiamos el comportamiento de Nitro para generar archivos estáticos puros
    deploymentPreset: "static", 
    // 2. Forzamos el prerrenderizado de las rutas en archivos HTML individuales
    prerender: {
      enabled: true,
      crawlLinks: true, // Rastrea automáticamente todas tus páginas internas
    },
    // Mantén esto si Lovable lo requiere para sus envoltorios de error
    server: { entry: "server" },
  },
});
