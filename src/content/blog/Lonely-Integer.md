---
pubDatetime: 2024-10-07
title: Lonely Integer
featured: false
draft: false
tags:
  - 算法
description: Lonely Integer
---

[Lonely Integer | HackerRank](https://www.hackerrank.com/challenges/three-month-preparation-kit-lonely-integer/problem?isFullScreen=true&h_l=interview&playlist_slugs[]=preparation-kits&playlist_slugs[]=three-month-preparation-kit&playlist_slugs[]=three-month-week-two)

给定一个整数数组，其中除一个元素外所有元素都出现两次，请找出唯一的元素。

用set做

```typescript
function lonelyinteger(a: number[]): number {
  // Write your code here
  const numSet = new Set<number>();
  for (const num of a) {
    if (numSet.has(num)) {
      numSet.delete(num);
    } else {
      numSet.add(num);
    }
  }
  return Array.from(numSet)[0];
}
```
