---
pubDatetime: 2024-10-07
title: Flipping bits
featured: false
draft: false
tags:
  - 算法
description: Flipping bits
---

[Flipping bits | HackerRank](https://www.hackerrank.com/challenges/three-month-preparation-kit-flipping-bits/problem?h_l=interview&isFullScreen=true&playlist_slugs[][]=preparation-kits&playlist_slugs[][]=three-month-preparation-kit&playlist_slugs[][]=three-month-week-two)

给你一个32-bits位无符号整数的列表，要求你输出你把它们中每个数二进制表示中的每位翻转之后的结果得到的新列表（即0变成1，1变成0）。

**属于是知道js有左移右移就能秒了**

[右移（>>） - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Right_shift)

```typescript
function flippingBits(n: number): number {
  // Write your code here
  return ~n >>> 0;
}
```

翻译：按位取反并无符号右移32位
