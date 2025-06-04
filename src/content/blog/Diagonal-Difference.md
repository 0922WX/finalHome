---
pubDatetime: 2024-10-07
title: Diagonal Difference对角线差
featured: false
draft: false
tags:
  - 前端
description: Diagonal Difference对角线差
---

[Diagonal Difference | HackerRank](https://www.hackerrank.com/challenges/three-month-preparation-kit-diagonal-difference/problem?h_l=interview&isFullScreen=true&playlist_slugs[][]=preparation-kits&playlist_slugs[][]=three-month-preparation-kit&playlist_slugs[][]=three-month-week-two)

计算矩阵的对角线差

力扣有道求对角线和

[1572. 矩阵对角线元素的和 - 力扣（LeetCode）](https://leetcode.cn/problems/matrix-diagonal-sum/description/)

只要你知道两边的对角线怎么求，一切都会好起来的

左边的对角线就`arr[i][i]`,右边的的是`arr[i][length-1-i]`

HackerRank让你求的是左右对角线的差的绝对值

```typescript
function diagonalDifference(arr: number[][]): number {
  // Write your code here
  const length = arr.length;
  let primarySum = 0;
  let secondarySum = 0;
  for (let i = 0; i < length; i++) {
    primarySum += arr[i][i];
    secondarySum += arr[i][length - 1 - i];
  }
  return Math.abs(primarySum - secondarySum);
}
```

遍历途中记录就行了

力扣的是求和，还需要关心到元素项是不是偶数，(说起来求差不用关心吗)：

```typescript
var diagonalSum = function (mat) {
  const length = mat.length;
  const mid = Math.floor(length / 2);
  let sum = 0;
  for (let i = 0; i < length; i++) {
    sum += mat[i][i] + mat[i][length - 1 - i];
  }
  return sum - mat[mid][mid] * (length & 1);
};
```

`return sum - mat[mid][mid] * (length & 1)` 检查是否是奇数，如果是奇数，即中间元素被计算了两次，所以要减一次中心元素值

为什么会重复计算？

因为奇数项的话，会有一个中心值

> 1 2 3
>
> 4 5 6
>
> 7 8 9

> 第一轮
>
> 1+3 sum=4
>
> 5+5 sum=4+10 =14 这里算了两次
>
> 9+7 sum=14+16 = 30

`length & 1` &与 两个位都为1时，结果才为1

如果`length`是偶数，那他二进制最后一位就是0，相反就是1

##### 那为什么求差就不用考虑奇偶呢

因为是求差，相同的早变成0了，没有的东西就不用考虑了
