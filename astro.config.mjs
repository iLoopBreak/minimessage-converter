import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from '@astrojs/vercel/static';


import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://miniconverter.loopbreak.me",
  output: "static",
  integrations: [react(), tailwind(), sitemap(), vercel({
    webAnalytics: true
  })]
});