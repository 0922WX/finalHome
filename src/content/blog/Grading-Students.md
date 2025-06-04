---
pubDatetime: 2024-10-07
title: Grading Students
featured: false
draft: false
tags:
  - 算法
description: Grading Students
---

[Grading Students | HackerRank](https://www.hackerrank.com/challenges/three-month-preparation-kit-grading/problem?h_l=interview&isFullScreen=true&playlist_slugs[][]=preparation-kits&playlist_slugs[][]=three-month-preparation-kit&playlist_slugs[][]=three-month-week-two)

```typescript
function gradingStudents(grades: number[]): number[] {
  // Write your code here
  return grades.map(grades => {
    if (grades < 38) {
      return grades;
    }
    const currentGrades: number = grades;
    const nextFive = Math.ceil(grades / 5) * 5;
    if (nextFive - currentGrades < 3) {
      return nextFive;
    }
    return currentGrades;
  });
}
```

map方法遍历数组，为其每项执行回调函数，返回新数组
