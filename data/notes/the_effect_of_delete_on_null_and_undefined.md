---
date: 1653752224000
title: 'delete对null和undefined作用'
visible: true
lang: 'zh'
---

首先是`delete`的特性：

- 如果删除成功，返回 true，反之返回 false;
- 如果试图删除不存在的变量， delete 不会起任何作用（废话），但是返回 true;
- delete 只能删除对象自己的属性，不能删除其原型链上的属性
- 属性可配置（configurable）设置为 false 时也无法删除。

下面语句会有一个有趣的现象：

```javascript
console.log(delete null) // true
console.log(delete undefined) // false
```

下面是[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined#description)对`undefined`的解释：

> undefined 是全局对象的一个属性。也就是说，它是全局作用域的一个变量。undefined 的最初值就是原始数据类型 undefined。

在`window`下是可以输出`undefined`的：

![image-20220403175859377](https://res.zrain.fun/images/2022/04/image-20220403175859377-eb728c6f601ef83acebfda0b0134d9f7.png)

看到`configurable: false`就知道为什么删除`undefined`是 false 了。对于`null`，它是一个关键字，相当于没有，不管怎么删除只有返回 true。
