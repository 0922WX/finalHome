---
pubDatetime: 2024-08-28
title: 浅拷贝与深拷贝
featured: false
draft: false
tags:
  - 前端
description: 浅拷贝与深拷贝
---

记录于7月3号，语雀

**首先明确JS的数据类型能分成基本数字类型和引用类型**

```javascript
let a = 10;
let b = a;
a = 100;
console.log(b); //结果为10
```

基本数字类型之间拷贝传递的就是值。在栈中，声明一个变量a，再将a赋值给b，此时栈中a=10，b=10，两者相互独立，所以a值的修改并不影响b。

```javascript
let a = [1, 2, 3, 4];
let b = a;
a[0] = 100;
console.log(b); //结果为[100,2,3,4]
```

我们修改了数组a，却也影响了数组b，**引用类型的值(栈中)存放的并非数值本身，而是内存地址，仅拷贝地址，就是浅拷贝**。

# 一些深拷贝的方法

```javascript
let a = [1, 2, 3, 4];
let b = [...a];
a[0] = 100;
console.log(b);
console.log(a);
//b:[1,2,3,4]
//a:[100,2,3,4]
```

从内存里面开辟一块新的空间存放数组，利用展开运算符把a的每一项存入数组中，**虽然有效，然有其局限，遇上多维数组就不管用了**。

## 为什么不管用？

二维数组内的数组仍然是引用类型，对应另一个地址存储了这个数组。虽然我们经过了拷贝，在堆里开辟一个新空间存储给b，但是001中的二维数组存的就是一个地址，所以新开辟的空间拿到的也是一个地址。

**所以我们要想办法实现多层拷贝，各自开辟独立空间，互不干扰**。

如果是基本类型数据，他们的拷贝就是深拷贝；对于引用类型数据，不论数据是一层还是多层，只要把内部的引用类型数据全部独立开辟内存空间，数据完全互不干扰，就是深拷贝，只要有共用数据就是浅拷贝。

# 多层拷贝

## 常用方法:Json格式转化

```javascript
let a = [1, 2, 3, 4, [5, 6, { name: "wx" }]];
let b = JSON.parse(stringify(a));
console.log(b);
console.log(typeof b);
//[1,2,3,4[5,6,{name:'wx'}]]
//object
```

为数不多的缺点就是无法转化拷贝函数类型(这真的是我要考虑的东西吗)。

## 所以说，接下来就是实现函数的拷贝。

如果没有嵌套数据，使用展开运算符即可解决，能解决的原因是这里修改一个函数等于重写一个函数，重写就会在内存里开辟一个新空间。所以，如果我们的数据里没有嵌套数组和对象，又有函数，是可以直接用展开运算符来拷贝的(好用，爱用，虽然我还没有实际用到过)。

```javascript
let a = {
  name: "wx",
  age: 18,
  fn() {
    console.log(this.name);
  },
};
let b = { ...a };
console.log("a为:", a); //{name:'wx',age:18,fn:f}
console.log("b为:", b); //{name:'wx',age:18,fn:f}
```

# 手写一个递归实现相对完美的深拷贝

```javascript
function deepClone(oldData) {
  //进入循坏条件为数组或者对象,具体是什么得继续判断
  if (typeof oldData === "object" && oldData !== null) {
    //如果是数组就新建一个新数组，否则就新建一个对象
    let res = Array.isArray(oldData) ? [] : {};
    for (let k in oldData) {
      res[k] = deepClone(oldData[k]);
    }
    return res;
  } else {
    return oldData;
  }
}
```
