---
pubDatetime: 2024-10-07
title: Time Conversion
featured: false
draft: false
tags:
  - 算法
description: Time Conversion
---

[Time Conversion | HackerRank](https://www.hackerrank.com/challenges/three-month-preparation-kit-time-conversion/problem?h_l=interview&isFullScreen=true&playlist_slugs[][]=preparation-kits&playlist_slugs[][]=three-month-preparation-kit&playlist_slugs[][]=three-month-week-one)

给定12小时AM/PM格式的时间，将其转换为军用（24 小时）时间。

```typescript
function timeConversion(s) {
  // Write your code here
  let [hours, minutes, seconds] = s.split(":");
  const period = seconds.slice(-2); //AM or PM
  seconds = seconds.slice(0, 2);
  hours = parseInt(hours);
  if (period === "AM") {
    if (hours === 12) {
      hours = 0;
    }
  } else {
    if (hours !== 12) {
      hours += 12;
    }
  }
  const militratHours = String(hours).padStart(2, "0");
  return `${militratHours}:${minutes}:${seconds}`;
}
```
