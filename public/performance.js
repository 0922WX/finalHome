// 轻量级性能优化脚本
(function () {
  "use strict";

  // 预加载重要页面
  function setupIntelligentPrefetch() {
    const prefetchLinks = document.querySelectorAll('a[rel="prefetch"]');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const link = entry.target;
            const href = link.getAttribute("href");

            // 创建预取link标签
            if (href && !document.querySelector(`link[href="${href}"]`)) {
              const prefetchLink = document.createElement("link");
              prefetchLink.rel = "prefetch";
              prefetchLink.href = href;
              document.head.appendChild(prefetchLink);
            }

            observer.unobserve(link);
          }
        });
      },
      {
        rootMargin: "100px",
      }
    );

    prefetchLinks.forEach(link => observer.observe(link));
  }

  // 优化图片加载
  function setupLazyLoading() {
    if ("loading" in HTMLImageElement.prototype) return; // 浏览器原生支持

    const images = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // 性能监控
  function trackPerformance() {
    if (!("performance" in window)) return;

    window.addEventListener("load", () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType("navigation")[0];
        if (perfData) {
          const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
          const domInteractive = perfData.domInteractive - perfData.navigationStart;

          // 可以发送到分析服务或在开发时打印
          if (
            typeof process !== "undefined" &&
            process.env &&
            process.env.NODE_ENV === "development"
          ) {
            console.log("页面性能指标:", {
              loadTime: `${loadTime}ms`,
              domInteractive: `${domInteractive}ms`,
              domComplete: `${perfData.domComplete - perfData.navigationStart}ms`,
            });
          }
        }
      }, 0);
    });
  }

  // 优化字体加载
  function optimizeFontLoading() {
    if ("fonts" in document) {
      // 预加载关键字体
      const fonts = ["LXGW WenKai", "Roboto Mono"];

      fonts.forEach(font => {
        document.fonts.load(`16px "${font}"`).catch(() => {
          // 字体加载失败时的降级处理
          console.warn(`字体 ${font} 加载失败，使用系统字体`);
        });
      });
    }
  }

  // 初始化所有优化
  function init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        setupIntelligentPrefetch();
        setupLazyLoading();
        optimizeFontLoading();
        trackPerformance();
      });
    } else {
      setupIntelligentPrefetch();
      setupLazyLoading();
      optimizeFontLoading();
      trackPerformance();
    }
  }

  init();

  // 导出给Astro transitions使用 - 添加类型声明
  if (typeof window !== "undefined") {
    // @ts-ignore - 为window对象添加自定义属性
    window.astroPerformance = {
      setupIntelligentPrefetch,
      setupLazyLoading,
    };
  }
})();
