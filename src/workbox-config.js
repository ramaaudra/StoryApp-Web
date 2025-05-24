export default {
  // Cache name prefix to avoid conflicts
  cacheId: "storyapp-",

  // Files to precache when service worker is installed
  globDirectory: "./",
  globPatterns: ["**/*.{html,css,js,png,jpg,svg,ico,woff2}"],
  globIgnores: ["node_modules/**/*", "**/sw.js", "**/workbox-*.js"],

  // Don't wait for service worker to install before page shows
  skipWaiting: true,

  // Take control immediately
  clientsClaim: true,

  // Service worker file output
  swDest: "./sw.js",

  // Runtime caching configurations
  runtimeCaching: [
    // Cache for API requests (network first strategy)
    {
      urlPattern: new RegExp("^https://story-api\\.dicoding\\.dev/v1/"),
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60, // 1 hour
        },
        backgroundSync: {
          name: "api-queue",
          options: {
            maxRetentionTime: 24 * 60 * 60, // 24 hours
          },
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },

    // Cache for images (cache first strategy)
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "images-cache",
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },

    // Cache for fonts (cache first strategy)
    {
      urlPattern: /\.(?:woff|woff2|ttf|otf)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "fonts-cache",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 24 * 60 * 60, // 60 days
        },
      },
    },

    // Cache for CSS and JS (stale while revalidate)
    {
      urlPattern: /\.(?:js|css)$/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-resources",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        },
      },
    },

    // Cache for HTML (network first)
    {
      urlPattern: /\.html$/,
      handler: "NetworkFirst",
      options: {
        cacheName: "html-cache",
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 24 * 60 * 60, // 1 day
        },
      },
    },

    // Default catch-all (network first with fallback)
    {
      urlPattern: ({ url }) => !url.pathname.startsWith("/api/"),
      handler: "NetworkFirst",
      options: {
        cacheName: "default-cache",
        networkTimeoutSeconds: 3,
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 1 day
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
};
