---
date: 1665629325000
title: '数字字面量方法调用'
scope: ['Browser']
visible: true
lang: 'zh'
---

JS 中在字符串后使用“.”运算符可以调用 String 上的一些方法，但这个对数字却无效：

```javascript
'hello'.split('').join('-') // h-e-l-l-o

23.toFixed(2) // Uncaught SyntaxError: Invalid or unexpected token
```

因为数字存在这样的写法：`23.`，即小数点后的 0 可以身略，而小数点保留。上面片段报错是因为`toFixed`被视作数字的一部分。这些是正确的调用：

```javascript
let a = 23..toFixed(2)
let b = 23 .toFixed(2)
let c = (23).toFixed(2)
```
