---
pubDatetime: 2024-10-20
title: 一些用得到的nest插件
featured: false
draft: false
tags:
  - 前端
description: 一些用得到的nest插件
---

`class-transformer `

在DTO中转化类型，毕竟url里的都是字符串，总得改一下类型，不然报错

`class-validator`

一些判断条件,IsInt()什么的

`@nestjs/mapped-types`

ts工具类的效果

比如

```typescript
import {PartialType} from '@nestjs/mapped-types'
import {CreateUserDto} from './create-user.dto'


export class PatchUserDto extend PartialType(CreateUserDto){}
```

全部可选

`@nestjs/swagger`

集成swagger

> D:\BaiduNetdiskDownload\NestJS Masterclass - From Beginner To Advanced\5. Documenting Code \ 3. Enabling Swagger in NestJS

`nestjs/config`

环境变量相关
