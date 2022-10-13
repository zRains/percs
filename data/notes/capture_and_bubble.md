---
date: 1658763424000
title: '捕获与冒泡'
visible: true
lang: 'zh'
---

事件冒泡和事件捕获分别由微软和网景公司提出，这两个概念都是为了解决页面中事件流（事件发生顺序）的问题。下面是一个基本示例：

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <div>Hello zRain 🤗</div>
    <script>
      const DIV = document.querySelector('div')
      DIV.addEventListener(
        'click',
        function (event) {
          console.log('Click!')
        },
        false,
      )
    </script>
  </body>
</html>
```

大致对应：

![bubbling_and_capture#center;20;true#](https://res.zrain.fun/images/2022/05/bubbling_and_capture-ed43c2beeb5a8c65ad2d85c990b3a381.png)

在**事件函数**中通过下列方法阻止事件冒泡：

- `event.stopPropagation()`

- `return false`

但是这两种方式是有区别的。`return false` 不仅阻止了事件往上冒泡，而且阻止了事件本身(默认事件)。`event.stopPropagation()` 则只阻止事件往上冒泡，不阻止事件本身。

还有另一个相似的概念，阻止默认事件：`event.preventDefault()`。

<small>\* 参考于[你真的理解”事件冒泡“和”事件捕获“吗？](https://juejin.cn/post/6844903834075021326)</small>
