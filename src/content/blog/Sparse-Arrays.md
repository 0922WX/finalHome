---
pubDatetime: 2024-10-07
title: Sparse Arrays 稀疏阵列
featured: false
draft: false
tags:
  - 算法
description: Sparse Arrays 稀疏阵列
---

[Sparse Arrays | HackerRank](https://www.hackerrank.com/challenges/three-month-preparation-kit-sparse-arrays/problem?h_l=interview&isFullScreen=true&playlist_slugs[][]=preparation-kits&playlist_slugs[][]=three-month-preparation-kit&playlist_slugs[][]=three-month-week-one)

有一个输入字符串集合和一个查询字符串集合。对于每个查询字符串，确定它在输入字符串列表中出现的次数。返回结果数组。

Example

strings = ['ab','ab','abc']

queries = ['ab','abc','bc]

对于query，在返回数组result= [2,1,0]

```typescript
function matchingStrings(strings: string[], queries: string[]): number[] {
  // Write your code here
  let res: number[] = [];
  for (let query of queries) {
    let count = 0;
    for (let item of strings) {
      if (item === query) {
        count++;
      }
    }
    res.push(count);
  }
  return res;
}
```
