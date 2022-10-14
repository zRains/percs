---
date: 1665731612000
title: 'JS标签语句'
visible: true
lang: 'zh'
---

goto 被公认为是一种极为糟糕的编码方式，它会让代码变得晦涩难懂（也叫作 [spaghetti code](https://en.wikipedia.org/wiki/Spaghetti_code)），好在 JS 不支持 goto。但 JS 的标签语句可以实现部分 goto 功能：continue 和 break 语句都可以带一个标签，因此能够像 goto 那样进行跳转：

```javascript
foo: for (var i = 0; i < 4; i++) {
  for (var j = 0; j < 4; j++) {
    // 如果j和i相等，继续外层循环
    if (j == i) {
      // 跳转到foo的下一个循环，或者使用 break foo 提前结束外层循环
      continue foo
    }
    // 跳过奇数结果
    if ((j * i) % 2 == 1) {
      // 继续内层循环（没有标签的）
      continue
    }
    console.log(i, j)
  }
}
```

需要注意的是：`contine foo` 并不是指“跳转到标签 foo 所在位置继续执行”，而是“执行 foo 循环的下一轮循环”。所以这里的 foo 并非 goto。
