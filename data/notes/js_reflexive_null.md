---
date: 1665643581000
title: 'JS中NaN的自反性'
visible: true
lang: 'zh'
---

`NaN`是一个特殊值，它和自身不相等，是唯一一个自反（自反，reflexive，即`x === x`不成立）的值。而`NaN != NaN`为`true`。在 ES6 的工具函数中我们可以使用`Number.isNaN()`进行检测，但不太准确：

```javascript
var a = 2 / 'foo' // NaN
var b = 'foo' // "foo"

window.isNaN(a) // true
window.isNaN(b) // true ???
```

代码片段表明`isNaN`会将参数转换为数字进行判断。利用其自反性来判断：

```javascript
if (!Number.isNaN) {
  Number.isNaN = function (n) {
    return n !== n
  }
}
```
