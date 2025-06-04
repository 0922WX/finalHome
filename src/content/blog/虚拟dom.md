---
pubDatetime: 2024-09-23
title: 虚拟dom
featured: false
draft: false
tags:
  - 前端
  - React
description: 虚拟DOM的理解和实现
---

构思一下面试怎么回答这个问题。

## 为什么要使用虚拟dom

相对于操作真实dom更加方便（性能而言自然是操作真实的要好，因为那是命令式编程）

相比于innerHTML，虚拟dom在更新的时候比他性能更高（innerHTML需要销毁所有旧的dom

，再解析新的字符串，最后重新创建所有dom节点）

虚拟dom仅需要两层计算：用diff算法计算更新的节点，然后更新必要的dom就行了

总结：虚拟dom能够防止组件在重渲染时导致的性能恶化，

而且还能批量更新（收集多个更新操作然后一次性将这些更改应用到真实dom上）

减少不必要的dom操作，

跨平台
