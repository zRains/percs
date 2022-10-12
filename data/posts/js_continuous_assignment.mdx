---
toc: false
date: 1649942694483
title: 'JS连续赋值执行分析'
scope: ['JS']
visible: true
lang: 'zh'
---

## 问题

一个很经典的问题，下面一段代码输出是？

```javascript
let a = { n: 2 }
let b = a
a.x = a = { l: 2 }

console.log(a.x)
console.log(b.x)
```

## 思考

我第一次是这样想的：

- 最初`a`和`b`共同指向同一个堆地址，即`{ n: 2 }`。
- 当遇到连续赋值时，先看最右边，执行`a = { l: 2 }`，此时`a`已经指向新的堆地址，即`{ l: 2 }`。
- 之后执行`a.x = a`，这样看来产生了循环引用。
- 最后得出`a.x`的值为`{ l: 2, x: a }`，而`b.x`的值为`{ l: undefined }`

## 解决

但看了答案才发现自己再第三点想错了，下面用图说明：

当执行完`let b = a`时，变量情况如下：

![js_continuous_assignment_part_1#center;60;true#](https://res.zrain.fun/images/2022/06/js_continuous_assignment_part_1-1053778e4998c1b17a5f77e70989a918.png)

之后执行`a.x = a = {n:2}`，首先进行一遍**左查找**。这里得提一个概念：结合性。

### 结合性

所谓结合性，是指表达式中同一个运算符出现多次时，是左边的优先计算还是右边的优先计算。赋值表达式是右结合的。这意味着：

```javascript
A1 = A2 = A3 = A4
```

等价于

```javascript
A1 = A2 = A3 = A4
```

回到问题，此时语句可变成：

```javascript
a.x = a = { n: 2 }
```

首先对`a.x`进行左查找，发现`x`不存在，那就先赋个`undefined`：

![js_continuous_assignment_part_2#center;60;true#](https://res.zrain.fun/images/2022/06/js_continuous_assignment_part_2-308084d8cf9275c33d0ad6fdfb3272ab.png)

然后现在进行右查找，右查找是个赋值表达式`a = {n: 2}`，所以得先处理这个赋值表达式。而前面的`a.x`还在等待后面表达式处理返回的结果。

![js_continuous_assignment_part_3#center;60;true#](https://res.zrain.fun/images/2022/06/js_continuous_assignment_part_3-bb1b8afda6a0fb7f8367863f6bafcccc.png)

重要的是，此时的`a.x`已经指向了内存中的`{ n: 1, x: undefined }`中的`x`，目前他正等待被赋值，所以下面在处理赋值表达式`a = {n: 2}`时候，即使 a 发生了指向的变化，**但也不再影响此刻的`a.x`了**，因为已经对`a.x`进行了指向的确定，只不过他现在正在等待被赋值。

因为赋值操作符的返回值，是返回右边的部分，对`a.x`的赋值操作也变成了：

```javascript
a.x = { l: 2 }
```

现在答案应该清楚了：

```javascript
console.log(a.x) // undefined
console.log(b.x) // { l: 2 }
```

## Rrfer

[javascript 面试题，关于连续赋值的坑？ - 知乎](https://www.zhihu.com/question/41220520)

[由 ES 规范学 JavaScript(二)：深入理解“连等赋值”问题 - 思否](https://segmentfault.com/a/1190000004224719)
