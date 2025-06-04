---
pubDatetime: 2024-10-11
title: Object.key,value和entries
featured: false
draft: false
tags:
  - 前端
description: Object.key,value和entries
---

key和value，键值对罢了

```typescript
console.log(Object.keys({name:"tom",age:11}); // ["name","age"]

console.log(Object.values({name:"tom",age:11}) // ['tom',11]
```

主要是记录一下entries()

```typescript
console.log(Object.entries({name:"tom",age:11})//[Array(2),Arrar(2)]
```

我去，二维数组

```typescript
console.log(Object.entries([1,2,3])//[Array(2),Arrar(2),Arrar(2)]
```

手工返回键值对组成的数组，第一个元素是属性的键（始终是字符串），第二个元素是属性值。

那么绝配map了

```typescript
const obj = { foo: "bar", baz: 42 };
const map = new Map(Object.entries(obj));
console.log(map); // 输出: Map(2) {"foo" => "bar", "baz" => 42}
```
