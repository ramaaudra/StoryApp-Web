import { defineConfig } from "vite";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": resolve(fileURLToPath(new URL(".", import.meta.url)), "src"),
    },
  },
  server: {
    hmr: {
      protocol: "ws",
    },
    watch: {
      usePolling: true,
    },
  },
  plugins: [
    VitePWA({
      // Use injectManifest strategy to enable custom service worker with push notifications
      strategies: "injectManifest",
      registerType: "autoUpdate",
      srcDir: ".",
      filename: "sw.js",
      // Enable service worker in development with simpler configuration
      devOptions: {
        enabled: true,
        type: "classic",
        swSrc: "public/dev-sw.js",
      },
      injectManifest: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg}"],
      },
      manifest: {
        name: "Story App",
        short_name: "StoryApp",
        description: "Share your stories with the world",
        start_url: "/index.html",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#2196F3",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
        shortcuts: [
          {
            name: "Add Story",
            short_name: "Add",
            description: "Create a new story",
            url: "/#/add",
            icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
          },
          {
            name: "View Map",
            short_name: "Map",
            description: "View stories on map",
            url: "/#/map",
            icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
          },
        ],
        screenshots: [
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            form_factor: "wide",
            label: "StoryApp Home Screen",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            form_factor: "narrow",
            label: "StoryApp on Mobile",
          },
        ],
      },
    }),
  ],
});
