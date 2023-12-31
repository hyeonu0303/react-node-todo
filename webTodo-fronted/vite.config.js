import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from 'path'
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'My Awesome App',
        short_name: 'MyApp',
        description: 'My Awesome App description',
        theme_color: '#ffffff',
        start_url:"/",
        icons: [
          {
            src: '/icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    }),
  ],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      {
        find: "@layout",
        replacement: path.resolve(__dirname, "src/layout"),
      },
      {
        find: "@pages",
        replacement: path.resolve(__dirname, "src/pages"),
      },
      {
        find: "@store",
        replacement: path.resolve(__dirname, "src/store"),
      },
    ],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/', // 백엔드 서버 주소
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/auth': {
        target: 'http://localhost:8080/',
        changeOrigin:true
      },
      '/data': {
        target: 'http://localhost:8080/',
        changeOrigin:true
      }
    },
  },
});

// target: 'https://webtodo1.du.r.appspot.com/',
// target: 'http://localhost:3000/',
// target: 'https://fly-builder-floral-sky-8617.fly.dev