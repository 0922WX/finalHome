---
pubDatetime: 2024-10-02
title: rollup基本构建
featured: false
draft: false
tags:
  - 前端
description: rollup基本构建
---

#### 从`npm init`开始编

```bash
npm i react typescript @types/react tslib  --save-dev
```

新建`tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

### 构建rollup

```bash
npm i react typescript @types/react ts-lib  --save-dev
```

```css
rollup //构建源代码并输出，起点
@rollup/plugin-typescript   //处理ts语法与转换
@rollup/plugin-node-resolve //解析插件,把模块转化成js
@rollup/plugin-commonjs  //将commonjs转换成es6语法
rollup-plugin-dts  //生成类型文件的ts插件 生成组件的类型
@rollup/plugin-terser  //最小化代码
rollup-plugin-peer-deps-external  //排除指定的npm模块，对等依赖
tslib
```

`rollup.config.ts`

```typescript
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import peerDeps from "rollup-plugin-peer-deps-external";
import { dts } from "rollup-plugin-dts";

export default [
  {
    input: "src/index.ts", // 入口文件
    output: [
      {
        file: "dist/cjs/index.js",
        format: "cjs",
        sourcemap: true,
      }, //cjs
      {
        file: "dist/esm/index.js",
        format: "esm",
        sourcemap: true,
      }, //esm
    ],
    plugins: [
      peerDeps(), //解决对等依赖关系
      resolve(), // 解析node_modules中的模块
      commonjs(), // 转换commonjs模块
      typescript(), // 编译typescript
      terser(), //压缩代码
    ],
  },
  {
    input: "src/index.ts", // 类型入口文件
    output: [{ file: "dist/index.d.ts", format: "es" }], // 生成类型
    plugins: [dts()], // 编译类型文件
  },
];
```

`package.json`

```json
{
  "name": "wx-ui",
  "version": "1.0.0",
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "rollup -c --bundleConfigAsCjs"
  },
  "author": "wx",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "@types/react": "^18.3.10",
    "react": "^18.3.1",
    "ts-lib": "^0.0.5",
    "typescript": "^5.6.2"
  },
  "dependencies": {
    "@rollup/plugin-commonjs": "^28.0.0",
    "@rollup/plugin-node-resolve": "^15.3.0",
    "@rollup/plugin-terser": "^0.4.4",
    "@rollup/plugin-typescript": "^12.1.0",
    "rollup": "^4.23.0",
    "rollup-plugin-dts": "^6.1.1",
    "rollup-plugin-peer-deps-external": "^2.2.4",
    "tslib": "^2.7.0"
  }
}
```

`npm run build`

成功后生成dist文件夹(cjs,esm,index.d.ts)
