---
date: 1668178935000
title: 'Proxy下修改数组触发两次拦截钩子'
visible: true
lang: 'zh'
---

一段很简单的`Proxy`代码，运行结果中`console.log(idx, value)`触发两次：

```javascript
const foo = [1, 2, 3]

const _foo = new Proxy(foo, {
  set(target, idx, value, receiver) {
    /**
     * 第一次输出：3 4
     * 第一次输出：length 4
     */
    console.log(idx, value)
    target[idx] = value
    return true
  },
})

_foo.push(4) // 4 => [1, 2, 3, 4]
```

[Stackoverflow](https://stackoverflow.com/a/71188372)上解释的很清楚：

1. 第一次出发是因为`set`拦截到数组添加了一个新值；
2. 第二次是因为数组的`length`属性被重新设置。

如果是普通对象则不会出现这种情况。
