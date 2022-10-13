---
date: 1653579424000
title: '容易忘记的 Math.random()'
visible: true
lang: 'zh'
---

Math.random()方法返回大于等于 0 小于 1 的一个随机数。

产生 1-10 的随机数（两端包含）：

```javascript
var rand1 = Math.floor(Math.random() * 10 + 1)
```

产生 0-10 的随机数（两端包含）：

```javascript
var rand1 = Math.floor(Math.random() * 11)
var rand1 = Math.ceil(Math.random() * 10)
```
