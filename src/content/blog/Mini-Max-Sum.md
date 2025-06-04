---
pubDatetime: 2024-10-07
title: Mini-Max Sum
featured: false
draft: false
tags:
  - 算法
description: Mini-Max Sum
---

[Mini-Max Sum | HackerRank](https://www.hackerrank.com/challenges/three-month-preparation-kit-mini-max-sum/problem)

给定 5 个正整数，求 5 个整数中 4 个整数相加的最小值和最大值。然后将各自的最小值和最大值打印为一行两个空格分隔的长整数。

```typescript
function miniMaxSum(arr) {
  // Write your code here
  let Max = Math.max(...arr);
  let Min = Math.min(...arr);
  let sum = 0;
  for (let item of arr) {
    sum += item;
  }
  let minimun = sum - Max;
  let maximum = sum - Min;
  console.log(minimun, maximum);
}
```
