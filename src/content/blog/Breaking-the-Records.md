---
pubDatetime: 2024-10-07
title: Breaking the Records
featured: false
draft: false
tags:
  - 算法
description: Breaking the Records
---

[Breaking the Records | HackerRank](https://www.hackerrank.com/challenges/three-month-preparation-kit-breaking-best-and-worst-records/problem?h_l=interview&isFullScreen=true&playlist_slugs[][]=preparation-kits&playlist_slugs[][]=three-month-preparation-kit&playlist_slugs[][]=three-month-week-one)

```typescript
function breakingRecords(scores: number[]): number[] {
  // Write your code here
  let minRecord = scores[0];
  let maxRecord = scores[0];
  let minCount = 0;
  let maxCount = 0;
  for (let i = 0; i < scores.length; i++) {
    if (scores[i] > maxRecord) {
      maxRecord = scores[i];
      maxCount++;
    } else if (scores[i] < minRecord) {
      minRecord = scores[i];
      minCount++;
    }
  }
  return [maxCount, minCount];
}
```
