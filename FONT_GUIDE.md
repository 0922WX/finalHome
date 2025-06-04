# 霞鹜文楷字体使用指南

## 字体配置

本项目已经配置了霞鹜文楷字体，为中文内容提供更好的阅读体验。

## 使用方法

### 1. 默认字体
整个网站的默认字体现在已经包含霞鹜文楷，会自动应用于中文内容。

### 2. 使用Tailwind CSS类
您可以在任何元素上使用以下CSS类来显式应用霞鹜文楷字体：

```html
<!-- 使用霞鹜文楷字体 -->
<div class="font-wenkai">
  这段文字将使用霞鹜文楷字体显示
</div>

<!-- 使用中文字体组合 -->
<div class="font-chinese">
  这段文字将使用中文字体堆栈
</div>
```

### 3. 在Astro组件中使用

```astro
---
// 在Astro组件中
---

<div class="font-wenkai">
  <h1>霞鹜文楷标题</h1>
  <p>这是一段使用霞鹜文楷字体的中文段落。字体优雅，适合长篇阅读。</p>
</div>
```

### 4. 在Markdown内容中使用

在markdown文件中，您可以使用HTML标签来应用特定字体：

```markdown
<div class="font-wenkai">

# 霞鹜文楷标题

这是一段使用霞鹜文楷字体的内容。

</div>
```

## 字体源

霞鹜文楷字体通过CDN加载：
- CDN地址：https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.1.0/style.css
- 字体名称：LXGW WenKai / 霞鹜文楷

## 备用字体

配置了完整的字体堆栈，确保在霞鹜文楷无法加载时有适当的备用字体：

1. LXGW WenKai (霞鹜文楷)
2. 霞鹜文楷 (中文名)
3. -apple-system (苹果系统字体)
4. BlinkMacSystemFont
5. Segoe UI
6. Roboto
7. Helvetica Neue
8. Arial
9. sans-serif

## 性能优化

字体通过CDN提供，具有以下优势：
- 快速加载
- 自动缓存
- 减少服务器负载
- 支持现代浏览器的字体显示优化 