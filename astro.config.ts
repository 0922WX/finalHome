import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";
import mdx from "@astrojs/mdx";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  redirects: {
    "/blog/react-redux-toolkit-with-typescript": "/blog/react-redux-toolkit-with-typescript/",
  },

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
    mdx(),
    // 压缩HTML、CSS、JS和SVG
    compress({
      CSS: true,
      HTML: true,
      Image: false, // 不压缩图片，使用Astro内置优化
      JavaScript: true,
      SVG: true,
    }),
  ],

  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "tokyo-night",
      wrap: true,
    },
  },

  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            search: ["fuse.js"],
          },
        },
      },
      // 启用CSS代码分割
      cssCodeSplit: true,
    },
    // 开发服务器优化
    server: {
      fs: {
        strict: false,
      },
    },
  },

  // 图片优化配置
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
    domains: ["wxiao.site"],
    remotePatterns: [
      {
        protocol: "https",
      },
    ],
  },

  // 预取配置
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },

  // 输出配置
  output: "static",

  // 实验性功能 - 启用性能优化
  experimental: {
    clientPrerender: true,
  },

  scopedStyleStrategy: "where",
  trailingSlash: "always",
});
