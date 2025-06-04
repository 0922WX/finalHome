---
pubDatetime: 2024-10-09
title: ThreeJs一些概念
featured: false
draft: false
tags:
  - 前端
description: ThreeJs一些概念
---

##### 三要素

1. 场景 Scene 容器
2. 相机 Camera 观察
3. 渲染器 Render 组合

##### 起步

随便找一个文件夹.`yarn init`,然后在设置里面写:

```json
 "scripts": {
    "dev": "vite"
  },
```

然后`yarn add -D vite`

`yarn add -D three`

OK

始于此

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script type="module">
      import * as THREE from "three";
    </script>
  </body>
</html>
```

创建场景->创建相机->创建渲染器

```html
<script type="module">
  import * as THREE from "three";
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
</script>
```

东西都有了，那要怎么才能看到呢？

`document.body.appendChild(renderer.domElement);`

获取camera元素

```javascript
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

//设置相机位置
camera.position.z = 3;
camera.position.y = 2;
camera.lookAt(0, 0, 0);

//创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial());
scene.add(cube);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
```
