---
pubDatetime: 2024-10-18
title: nest导入模块
featured: false
draft: false
tags:
  - 后端
description: nest导入模块
---

如果你想要在Amodule里使用Bmodule里的服务那么可以选择：

如果模块外导入你想要在Amodule里使用Bmodule里的服务那么可以选择：

1. 在Bmodule里写入`exports:[BService]`
2. 在Amodule里写入`import:[Bmodule]`

**没错，第二次是导入module，而不是service**

这是最容易看错的

导入之后，有两种方式注入依赖

1.属性注入依赖

```typescript
@Injectable()
export class OrderService {
  //依赖注入之属性注入共享的服务
  @Inject(BService)
  private bService: BService;

  getOrderDesc(): string {
    const name = this.userService.getUserName();
    return `Order for ${name}`;
  }
}
```

2.构造函数注入

```typescript
@Injectable()
export class OrderService {
  constructor(private userService: UserService) {}
  getOrderDesc(): string {
    const name = this.userService.getUserName();
    return `Order for ${name}`;
  }
}
```

#### 全局模块

用`@Global`装饰器声明就完事了（在module声明）

```typescript
import { Global, Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Global()
@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
```
