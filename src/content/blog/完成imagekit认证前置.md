---
pubDatetime: 2024-10-01
title: 完成imagekit认证前置
featured: false
draft: false
tags:
  - 前端
description: 完成imagekit认证前置
---

依据ImageKit的官方文档，我们需要在后台SDK传入API公钥，私钥和URL端点，前面已经配置好了。

但是，想要将图片上传到imagekit的媒体库，还需要后端服务器用私有密钥对请求进行验证

怎么验证？

使用imagekit-nestjs封装好的方法

我这里新建了user模块

```sql
nest g resource user
```

```typescript
//user.controller.ts
import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("keys")
  async getImageKitKeys() {
    const res = await this.userService.getAuthParameters();
    return res;
  }
}
```

```typescript
//user.service.ts
import { Injectable } from "@nestjs/common";
import { ImageKitService } from "imagekit-nestjs";

@Injectable()
export class UserService {
  constructor(private readonly imageKitService: ImageKitService) {} // 通过构造函数注入 ConfigService

  async getAuthParameters() {
    // 获取 ImageKit 的认证参数
    const keys = await this.imageKitService.getAuthenticationParameters();
    return keys; // 返回密钥
  }
}
```

开启跨域

```typescript
//main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3005);
}
bootstrap();
```

启动服务

```sql
nest start
```

根据官方文档所说，如果成功的话会返回三个参数

用postman试一下

# **完成!**

寥寥数笔，花了我三个多小时🫤

# 参考

[CodeVisionEvgen/imagekit-nestjs: Imagekit nestjs module (github.com)](https://github.com/CodeVisionEvgen/imagekit-nestjs)

[React (imagekit.io)](https://imagekit.io/docs/integration/react)

[API keys (imagekit.io)](https://imagekit.io/docs/api-keys#private-key)

[Nest 通关秘籍 - zxg\_神说要有光 - 掘金小册 (juejin.cn)](https://juejin.cn/book/7226988578700525605)
