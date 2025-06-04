---
pubDatetime: 2024-10-31
title: TS工具类型
featured: false
draft: false
tags:
  - 前端
description: TS工具类型
---

也是被问了两次了

`Awaited<Type>`:用来取出 Promise 的返回值类型，适合用在描述`then()`方法和 await 命令的参数类型。

`Partial`：将所有类型设置为可选`Partial<A>`

`Required`:所有属性必选

`readonly`：将属性标记为只读

`Record`:声明属性名还未确定的接口类型

#### Awaited

> `Awaited<Type>`

```typescript
// string
type A = Awaited<Promise<string>>; //Awaited<Type>会返回 Promise 的返回值类型（string）
```

还能返回多重promise的返回值类型

```typescript
// number
type B = Awaited<Promise<Promise<number>>>;
```

如果它的类型参数不是 Promise 类型，那么就会原样返回

```typescript
// number | boolean
type C = Awaited<boolean | Promise<number>>;
```

## ConstructorParameters

`ConstructorParameters<Type>`提取构造方法`Type`的参数类型，组成一个元组类型返回。也就是用来获取构造函数的构造参数

最看不懂的一集

```typescript
type T1 = ConstructorParameters<new (x: string, y: number) => object>; // [x: string, y: number]
type T2 = ConstructorParameters<new (x?: string) => object>; // [x?: string | undefined]
```

可以返回一些内置构造方法的参数类型

```typescript
type T1 = ConstructorParameters<ErrorConstructor>; // [message?: string]
type T2 = ConstructorParameters<FunctionConstructor>; // string[]
type T3 = ConstructorParameters<RegExpConstructor>; // [pattern:string|RegExp, flags?:string]
```

参数类型不是构造方法，就会报错

#### Record

> `Record<K,T>`构造具有给定类型`T`的一组属性`K`的类型。在将一个类型的属性映射到另一个类型的属性时，`Record`非常方便。

```typescript
type UserProps = "name" | "job" | "email";
// 等价于你一个个实现这些属性了
type User = Record<UserProps, string>;
const user: User = {
  name: "John Doe",
  job: "fe-developer",
  email: "john.doe@example.com",
};
```

##### Pick

> `Pick`:接收一个对象类型，以及一个字面量类型组成的联合类型，这个联合类型只能是由对象类型的属性名组成的。它会对这个对象类型进行裁剪，只保留你传入的属性名组成的部分

```typescript
type User = {
  name: string;
  age: number;
  email: string;
  phone: string;
};
// 只提取其中的 name 与 age 信息
type UserBasicInfo = Pick<User, "name" | "age">;
```

#### Omit

> `Omit`:就是 Pick 类型的另一面，它的入参和 Pick 类型一致，但效果却是相反的——它会移除传入的属性名的部分，只保留剩下的部分作为新的对象类型

```>typescript
type User = {
  name: string;
  age: number;
  email: string;
  phone: string;
};

// 只移除 phone 属性
type UserWithoutPhone = Omit<User, 'phone'>;
```

#### Exclude和Extract

> `Exclude` 和`Extract`:差集和交集

```typescript
type UserProps = "name" | "age" | "email" | "phone" | "address";
type RequiredUserProps = "name" | "email";
// OptionalUserProps = UserProps - RequiredUserProps
type OptionalUserProps = Exclude<UserProps, RequiredUserProps>;
const optionalUserProps: OptionalUserProps = "age"; // 'age' | 'phone' | 'address';
```

```typescript
type UserProps = "name" | "age" | "email" | "phone" | "address";
type RequiredUserProps = "name" | "email";
type RequiredUserPropsOnly = Extract<UserProps, RequiredUserProps>;
const requiredUserPropsOnly: RequiredUserPropsOnly = "name"; // 'name' | 'email';
```
