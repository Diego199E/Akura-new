// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Pasamos la configuración nativa de Nitro para sobreescribir el objetivo de Cloudflare
  nitro: {
    preset: "netlify-edge", // Cambia el destino interno de Cloudflare a Netlify Edge
  },
  tanstackStart: {
    // Si deseas mantener el SSR dinámico (recomendado para TanStack Start), elimina el preset static.
    // En su lugar, el preset de Nitro se encargará de todo de forma nativa.
    server: { entry: "server" },
  },
});
