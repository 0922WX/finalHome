---
pubDatetime: 2024-09-02
title: React组件的TS类型
featured: false
draft: false
tags:
  - 前端
description: React组件的TS类型
---

平时常用的类型在@types/react这个包里，cra已经引入了。

# JSX类型

如果你想描述一个jsx类型，使用React.ReactElement。

比如

```typescript
interface AaaProps {
  name: string;
  content: React.Reactelement;
}
```

这样就只能传入jsx类型

**如果有时需要传入number,null呢？**

换成ReactNode就好了

```typescript
interface AaaProps {
  name: string;
  content: React.ReactNode;
}
```

ReactNode 包含 ReactElement、或者 number、string、null、boolean 等可以写在 JSX 里的类型。

这三个类型的关系 ReactNode > ReactElement > JSX.Element。

所以，一般情况下，如果你想描述一个参数接收 JSX 类型，就用 ReactNode 就行。

# 函数组件类型

FC 和 FunctionComponent 等价，参数是 Props，返回值是 ReactNode

```typescript
const Aaa:React.FunctionComponent<AaaProps> = (props) =>{
    return <div>aaa,{props.name}{props.content}</div>
}

function Aaa2(props:AaaProps) {
    return <div>aaa,{props.name}{props.content}</div>
}
```

类型定义

```typescript
type FC<p = {}> = FunctionComponent<p>;

interface FuctionComponent<p = {}> {
  (props: P, context?: any): ReactNode;
  propsTypes?: WeakValidationMap<p> | undefined;
  contextTypes?: ValidationMap<p> | undefined;
  defultProps?: Partial<p> | undefined;
  displayNmae?: string | undefined;
}
```

# Hook的类型

### useState

一般用推导的类型，或者手动声明。

useEffect 和 useLayoutEffect 没有类型参数。

### useRef

作为可以保存dom引用或者其他内容的钩子，它的类型有两种。

保存dom引用时，参数需要传个null，不然会报错

```typescript
const ref = useRef<HTMLDivElement>(null);
```

而保存别的内容的时候，不能传 null，不然也会报错，说是 current 只读,原因是当你传入 null 的时候，返回的是 RefObject，它的 current 是只读的。而不传 null 的时候，返回的 MutableRefObject，它的 current 就可以改了。因为 ref 既可以保存 dom 引用，又可以保存其他数据，而保存 dom 引用又要加上 readonly，所以才用 null 做了个区分。

**传 null 就是 dom 引用，返回 RefObject，不传就是其他数据，返回 MutableRefObject。**所以，这就是一种约定，知道传 null 和不传 null 的区别就行了。

# 参数类型

#### propsWithChildren

就是给 Props 加了一个 children 属性。

### CSSProperties

有时候组件可以通过 props 传入一些 css 的值，这时候怎么写类型呢？

用 CSSProperties。

### HTMLAttributes

如果你写的组件希望可以当成普通 html 标签一样用，也就是可以传很多 html 的属性作为参数呢？

那可以继承 HTMLAttributes。

### ComponentProps

效果与HTMLAttributes一样。

## EventHandler

很多时候，组件需要传入一些事件处理函数，这种参数就要用 xxxEventHandler 的类型，比如 MouseEventHandler、ChangeEventHandler 等，它的类型参数是元素的类型。

# 总结

- **ReactNode**：JSX 的类型，一般用 ReactNode，但要知道 ReactNode、ReactElement、JSX.Element 的关系。
- **FunctionComonent**：也可以写 FC，第一个类型参数是 props 的类型。
- **useRef 的类型**：传入 null 的时候返回的是 RefObj，current 属性只读，用来存 html 元素；不传 null 返回的是 MutableRefObj，current 属性可以修改，用来存普通对象。
- **ForwardRefRenderFunction**：第一个类型参数是 ref 的类型，第二个类型参数是 props 的类型。forwardRef 和它类型参数一样，也可以写在 forwardRef 上。
- **useReducer**：第一个类型参数是 Reducer<data 类型, action 类型>，第二个类型参数是初始化函数的参数类型。
- **PropsWithChildren**：可以用来写有 children 的 props。
- **CSSProperties**： css 样式对象的类型。
- **HTMLAttributes**：组件可以传入 html 标签的属性，也可以指定具体的 ButtonHTMLAttributes、AnchorHTMLAttributes。
- **ComponentProps**：类型参数传入标签名，效果和 HTMLAttributes 一样。
- **EventHandler**：事件处理器的类型。
