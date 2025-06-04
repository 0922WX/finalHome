---
pubDatetime: 2024-11-12
title: TS重载
featured: false
draft: false
tags:
  - 前端
description: TS重载
---

[【前端必备】用了 TS 条件类型，同事直呼 YYDS！\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1HR4y1N7ea?spm_id_from=333.788.videopod.sections&vd_source=0cd2e6b12fc6a8c4ab5fade5d98e7161)

在此之前，先了解

#### 条件类型

`T extends U ? X:Y`

T,U,X,Y都是类型占用符，爱怎么写怎么写

**这句话的意思是，当类型T可以赋值给类型U时，那么返回类型X，否则返回类型Y**

`type IsString<T> = T extends string ? true : false;`

`type I0 = IsString<number> //false`

```typescript
type IsString<T> = T extends string ? true : false;

type I0 = IsString<number>; //false

type TypeName<T> = T extends string
  ? "string"
  : T extends number
    ? "number"
    : T extends boolean
      ? "boolean"
      : T extends undefined
        ? "undefined"
        : T extends Function
          ? "function"
          : "object";

type T10 = TypeName<string | (() => void)>; //type T10 = "string" | "function"
```

如果传入联合类型，返回联合类型？

这里的TypeName属于**分布式条件类型**，在这之中

如果被检查的类型T为 **裸类型参数**（分布式条件类型，即没有被数组 元组 promise包裹）

当传入联合类型，就被分解成多个分支

#### infer

用于声明类型变量已存储在模式匹配过程中的所捕获的类型

`type UnpackedArray<T> = T extends (infer U)[] ? U : T;`

infer用于存储被推断的类型

```typescript
type UnpackedArray<T> = T extends (infer U)[] ? U : T;
type T4 = string[];
type T5 = UnpackedArray<T4>; // string
```
