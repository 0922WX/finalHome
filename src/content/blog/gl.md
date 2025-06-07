---
pubDatetime: 2025-06-06
title: webgl入门
featured: false
draft: false
tags:
  - webgl
description: 堪堪入门
---

### WebGL是什么

WebGL是一个光栅化引擎，源自OpenGL和JS的绑定。依据代码绘制出点，线和三角形组合成图形。代码由成对的方法组成，一个叫顶点着色器，一个叫片段着色器，两个方法组合起来称作一个program(着色程序)。

### 线性代数

不得不品的一环，**Vector([x,y,z])**,矢量，分为顶点，线，面三个元素，两点组成线，三点组成面，无数的面可以组成体。
![vector](/blog-images/gl/helloGL.png)

**Matrix**，矩阵，在webgl中用于移动，旋转，缩放(统称变换，Transformation)三维物体(Model)——>本质即为变换Vectors。比如我们要将一个模型往右移动1个像素，就是把模型中所有的点向右移动1个像素。实现方法为：

**Matrix(变换规则)\*Vector(平移矩阵，旋转矩阵，缩放矩阵)**

矩阵\*向量，可实现线性变换(旋转，缩放)，仿射变换(平移)

### **顶**点与片段

顶点着色器用于计算顶点位置，依据这些位置对点，线和三角形在内的图元进行**光栅化处理**(这需要片段着色器)。片段着色器用于计算当前绘制当前绘制图元中每个像素的颜色值。

WebGL只关心的两件事：裁剪空间中的坐标和颜色值，这就是两个着色器需要做的事情，顶点着色器提供裁剪空间坐标值，片段着色器提供颜色值。

无论画布多大，裁剪空间坐标范围永远是-1到1。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <canvas id="canvas" width="500" height="500"></canvas>
  </body>
  // 顶点着色器
  <script id="vertex-shader-2d" type="notjs">
    // 一个属性变量，将会从缓冲中获取数据
    attribute vec4 a_position;
    // 所有着色器都有一个main方法
    void main() {
      // gl_Position 是一个顶点着色器主要设置的变量
      gl_Position = a_position;
    }
  </script>
  // 片段着色器
  <script id="fragment-shader-2d" type="notjs">
    // 片段着色器没有默认精度，所以我们需要设置一个精度
    // mediump是一个不错的默认值,代表“medium precision”(中等精度)
    precision mediump float;
    void main() {
      // gl_FragColor是一个片段着色器主要设置的变量
      gl_FragColor = vec4(1, 0, 0.5, 1); // 返回“瑞迪施紫色”
    }
  </script>

  <script>
    /** @type {HTMLCanvasElement} */
    const canvas = document.querySelector("#canvas");
    const gl = canvas.getContext("webgl");
  </script>
</html>
```
