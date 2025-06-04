---
pubDatetime: 2024-09-21
title: Bind Apply Call的区别
featured: false
draft: false
tags:
  - 前端
description: Bind Apply Call的区别
---

相通点:都可以改变this 指向

为什么要改变this指向？

```javascript
var name = "wx";
let obj = {
  name: "abc",
  say: function () {
    console.log(this.name);
  },
};
obj.say(); //显示abc
setTimeout(obj.say, 10); //显示wx
```

(实际我把var换成let或者const就不会打印出什么东西，因为那不再是全局变量，而是块级，输出一片空白捏)

同样调用obj,say,为什么结果不同呢?（涉及this绑定规则）

setTimeout所指向为window对象，其中的say方法是作为回调函数执行的，其中所传递的是函数的引用，并没有保留这个函数所属的对象，那么setTimeout调用函数时，其中的this取决于调用时的执行上下文(这里并没有指定上下文，所以10毫秒后在全局执行环境执行，浏览器自动绑定window。)

那么此时，如果想修改say方法中的this，就需要改变this指向了。

# apply绑定this

```javascript
setTimeout(function () {
  obj.say.apply(obj);
}, 10); //输出abc
```

参数传递：参数是在调用新函数时传递给它的参数。

(将所有参数放到一个数组里去)

调用时立即执行方法

比如

```javascript
let obj = {
  name: "abc",
  say: function (param1, param2) {
    console.log(param1 + "," + param2 + "," + this.name);
  },
};
setTimeout(function () {
  obj.say.apply(obj, ["hello", "world"]);
}, 10);
```

# call绑定this

跟apply差不多，唯一的区别是他需要的参数并非是一个数组，而是依次传入

调用时立即执行方法

所以需要注意与参数一一对应。

```javascript
setTimeout(function () {
  obj.say.call(obj, "hello", "world");
}, 10);
```

# bind绑定this

与其他两者最大的区别是，bind返回值是一个新的函数

调用时不直接执行

```javascript
let newFun = obj.say.bind(obj, "hello", "world");
newFun();
```

也不需要一次性传入所有参数

```javascript
let newFun = obj.say.bind(obj);
newFun("hello", "world");
```

## this的绑定规则

this和函数定义的位置没有关系，只和调用者有关系

在运行时被绑定

```javascript
function foo() {
  console.log(this);
}

foo(); //window

var obj = {
  name: "wx",
  foo: foo,
};
obj.foo(); // obj

foo.call("abc"); // string{ "abc" }
```

## 隐式绑定

1.通过对象调用函数绑定this

谁**直接**调用foo()，this就指向谁。

当然，这有个前置条件：对象所调用的函数必须是对象的属性。

```javascript
function foo() {
  console.log(this);
}
var obj = {
  name: "wx",
  foo: foo,
};

obj.foo();
```

## 显式绑定

如果obj对象上没有定义某个方法，但又想通过obj这个对象来调用这个方法？

也就是最上面的call,apply,bind了

## new绑定this

```javascript
function Student(name) {
  console.log(this); // student {}
  this.name = name;
}
var wx = new Student("abc");
console.log(wx); //student{name:'abc'}
```

涉及面试题：new 关键字创建一个新对象的步骤？ 构造函数如何创建新对象？

1.创建一个空对象。

2.空对象的-proto-属性指向构造函数的Prototype属性。

3.执行构造函数，如果构造函数中有this，则此this指向刚刚创建的空对象。

4.返回刚刚创建的对象。

返回值？

在构造函数中，如果有return的话会返回什么？

```javascript
function Student(name) {
  console.log(this);
  this.name = name;
  return {
    name: "我是对象",
  };
}

var wx = new Student("abc");
console.log(wx); // {name:"我是新对象"}
```

如果return的是**对象**，则直接返回对象

如果return的是基本类型，则return语句无效，仍然返回刚刚创建的新对象。

# 如果多种绑定都存在，优先级？

**隐式绑定和显式绑定同时存在，显式绑定优先级更高**

**new绑定优先级高于隐式绑定**(隐式垫底了说是)

**new绑定优先级高于bind**

总结：new > 显式(bind)>隐式
