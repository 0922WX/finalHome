---
pubDatetime: 2024-10-11
title: FirstofArray
featured: false
draft: false
tags:
  - 前端
description: FirstofArray
---

实现一个`First<T>`泛型，它接受一个数组`T`并返回它的第一个元素的类型。

```typescript
type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];
type head1 = First<arr1>; // 应推导出 'a'
type head2 = First<arr2>; // 应推导出 3
```

```typescript
// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
]

// ============= Your Code Here =============
type First<T extends any[]> =
```

##### what can i say?

毫无头绪捏

`type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never;`

通过条件类型提取数组的第一个元素 `F`。`[infer F, ...any[]]` 表示一个数组，`F` 是第一个元素，`...any[]` 表示剩余的元素可以是任意类型。

我怎么感觉好像没看过这种东西

什么遍历 infer，完全找不到地方看
