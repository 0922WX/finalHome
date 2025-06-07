const primaryColorScheme = ""; // "light" | "dark"

// 避免重复获取主题
const getPreferTheme = (() => {
  let cachedTheme = null;
  return () => {
    if (cachedTheme) return cachedTheme;

    // 从localStorage获取主题
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
      cachedTheme = currentTheme;
      return currentTheme;
    }

    // 使用主要颜色方案
    if (primaryColorScheme) {
      cachedTheme = primaryColorScheme;
      return primaryColorScheme;
    }

    // 使用系统偏好
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    cachedTheme = systemTheme;
    return systemTheme;
  };
})();

let themeValue = getPreferTheme();

function setPreference() {
  localStorage.setItem("theme", themeValue);
  reflectPreference();
}

function reflectPreference() {
  // 批量DOM操作
  const html = document.documentElement;
  const themeBtn = document.querySelector("#theme-btn");
  const themeColorMeta = document.querySelector("meta[name='theme-color']");

  html.setAttribute("data-theme", themeValue);

  if (themeBtn) {
    themeBtn.setAttribute("aria-label", themeValue);
  }

  // 优化背景色获取
  if (themeColorMeta) {
    // 使用requestAnimationFrame确保样式已应用
    requestAnimationFrame(() => {
      const bgColor = getComputedStyle(document.body).backgroundColor;
      themeColorMeta.setAttribute("content", bgColor);
    });
  }
}

// 如果主题已经在HTML中设置，则跳过
if (!document.documentElement.getAttribute("data-theme")) {
  reflectPreference();
}

// 使用防抖优化性能
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const debouncedReflectPreference = debounce(reflectPreference, 16); // ~60fps

window.addEventListener("load", () => {
  function setThemeFeature() {
    reflectPreference();

    const themeBtn = document.querySelector("#theme-btn");
    if (themeBtn && !themeBtn.hasAttribute("data-listener")) {
      themeBtn.setAttribute("data-listener", "true");
      themeBtn.addEventListener("click", () => {
        themeValue = themeValue === "light" ? "dark" : "light";
        setPreference();
      });
    }
  }

  setThemeFeature();

  // 运行在视图转换导航上
  document.addEventListener("astro:after-swap", setThemeFeature);
});

// 监听系统主题变化
window.matchMedia("(prefers-color-scheme: dark)").addEventListener(
  "change",
  debounce(({ matches: isDark }) => {
    themeValue = isDark ? "dark" : "light";
    setPreference();
  }, 100)
);
