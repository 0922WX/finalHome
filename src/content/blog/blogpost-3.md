---
pubDatetime: 2025-05-21
title: 第一次跑通接口
featured: false
draft: false
tags:
  - 日常
description: 阿巴阿巴，记录过程。
---

虽然我之前没有正儿八经在公司里跑通接口，但根据我的脑测。对接口应该是后端给我一份文档，我照着里面的参数一个一个对进去，再去前端页面执行方法渲染数据就好了就好了。这个流程听上去非常的简单。其实执行起来还是有那么点麻烦的。

## vite配置

今天第一次对接口，不知道后端有自己的端口号，先是对着测试库的端口对半天，发现啥都没有。询问后得知，测试库不会更新太快，要对接口得问他们要他们自己的端口号。我们公司项目端口配置在vite.config.ts中，使用proxy代理端口，找后端要接口、文档、端口这是第一步。

## axios配置

最神头鬼脸的一集，花了一天才对好接口就是因为这一步。我把

```typescript
export const getMedicalUserList = (data: any) =>
  ajax({ url: "/v3/xx/getxx", params: data, type: "GET" });
```

写成了

```typescript
export const getMedicalUserList = (data: any) => {
  ajax({ url: "/v3/xx/getxx", params: data, type: "GET" });
};
```

众所周知，如果你箭头函数加了括号，是要写return返回值的，调用 `ajax()` 后，函数不会自动返回它的结果。如果你不写，这只会返回一个undefined。

但是我也没写，只能看着undefined发呆，思考是哪一步出了问题。

## ahook

公司使用ahook处理异步方法，非常好用，尤其是`usePagination()`。使用这个方法就不需要搞一堆分页器配置，一个方法中即可完成，用起来也简单，我对着先人代码抄也抄出来了。

## 总结

主要还是axios那边配烂了，导致我一下午都在找bug。在我接手的这个项目里能看到先人的进步，从写大量全局状态管理用来配置接口参数和分页，到使用`useRequest()`，再到`usePagination()`，有种看人类进化的过程，，
