---
pubDatetime: 2024-10-18
title: Permuting Two Arrays某种排列
featured: false
draft: false
tags:
  - 算法
description: Permuting Two Arrays某种排列
---

123

[Permuting Two Arrays | HackerRank](https://www.hackerrank.com/challenges/three-month-preparation-kit-two-arrays/problem?h_l=interview&isFullScreen=true&playlist_slugs[][]=preparation-kits&playlist_slugs[][]=three-month-preparation-kit&playlist_slugs[][]=three-month-week-three)

将有A,B和K组成的q查询。对于每个查询，如果存在满足关系的排列A,B，则返回YES,否则NO

比如：

> A = [0,1]
>
> B = [0,2]
>
> k = 1
>
> 1+0 >= 1 0+2 >= 1 RETURN YES

一开始只想着一个一个对过去就好，没想到要排序

```typescript
function twoArrays(k: number, A: number[], B: number[]): string {
  for (let i = 0; i < A.length; i++) {
    if (A[i] + B[i] < k) {
      return "No";
    }
  }
  return "Yes";
}
```

修改后

```typescript
function twoArrays(k: number, A: number[], B: number[]): string {
  // Write your code here
  A.sort((a, b) => a - b);
  B.sort((a, b) => b - a);

  for (let i = 0; i < A.length; i++) {
    if (A[i] + B[i] < k) {
      return "NO";
    }
  }
  return "YES";
}
```
