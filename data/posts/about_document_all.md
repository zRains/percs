---
date: 1665582660000
title: '关于document.all'
scope: ['Browser']
visible: true
lang: 'zh'
---

得知了一个很奇特的属性的`document.all`，在[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/all)中这样描述它：

> document.all is the only **falsy** object accessible to JavaScript, because it has the **[[IsHTMLDDA]]** internal slot. This was done because of compatibility with older versions of Internet Explorer.

得知`document.all`存在的意义就是与旧的浏览器做兼容，是 IE 4.0 及以上版本的专有属性，是一个表示当前文档的所有对象的娄组，不仅包括页面上可见的实体对象，还包括一些不可见的对象，比如 html 注释等等。至于它出现的原因就要从 20 年前浏览器之战说起了。

当时还没有统一的浏览器标准，微软一家独大推出了 IE4 来打压同样流行的网景浏览器 Navigator 4.x，由于这两个浏览器存在巨大差异，也使开发者面临了一个使网页跨浏览器兼容的噩梦。为了能在两种浏览器上运行代码，开发者不得不适配两个浏览器，而便捷高效的方式就是借用`document.layer`和`document.all`，前者网景独有，后者 IE 独有。

```javascript
// 远古时期的兼容代码，现在已不再适用
document.all ? 'IE' : 'Netscape'
```

之后标准制定出来后网景浏览器也几乎成为历史了，但历史遗留已经不允许将`all`这个属性删除了，这将导致许多网页无法正常运行，而它也就成了 W3C 中的一个“特殊”标准，在 MDN 的浏览器兼容图上几乎所有浏览器都有这个属性。至于为什么特殊，下面会解释到。

## 为何特殊

在上面 MDN 解释注意到：它是唯一一个为假值的对象！在[TC39](https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot)也说明了它的特殊性：

> Objects with an [[IsHTMLDDA]] internal slot are never created by this specification. However, the document.all object in web browsers is a host-defined exotic object with this slot that exists for web compatibility purposes. There are no other known examples of this type of object and implementations should not create any with the exception of document.all.

<small>\* 下面会说明[[IsHTMLDDA]]的特殊性</small>

可以在浏览器（chrome 105.0.5195.125 arm64）中得到验证：

```javascript
typeof document.all === 'undefined' // true
if (document.all) console.log('access!') // undefined
```

在 ECMAScript 标准中的`ToBoolean(condition)`有大致这样的说明：

| Argument type                           | Result                     |
| --------------------------------------- | -------------------------- |
| undefined                               | false                      |
| null                                    | false                      |
| boolean                                 | same as input              |
| number                                  | +0, -0, NaN ? false : true |
| string                                  | "" ? false : true          |
| object(array, Date, Regex, Function...) | true                       |

`object`转化后到布尔值为`true`，这就是`document.all`特殊的地方。其实仔细一点可以发现直接在控制台打印它不是`undefined`，而是一个实现**HTMLAllCollection**接口的对象的特殊数组。

![document_all_in_console](https://res.zrain.fun/images/2022/10/document_all_in_console.png)

关于`HTMLAllCollection`的资料在 MDN 上也待补充。在[W3C](https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#the-htmlallcollection-interface)上有较为完整的说明：

> HTMLAllCollection 是服务于历史遗留属性 `document.all`的。其操作方法类似于 HTMLCollection。它可以被当作函数调用来代替属性调用。

```c
[Exposed=Window,LegacyUnenumerableNamedProperties]
interface HTMLAllCollection {
  readonly attribute unsigned long length;
  getter Element (unsigned long index);
  getter (HTMLCollection or Element)? namedItem(DOMString name);
  (HTMLCollection or Element)? item(optional DOMString nameOrIndex);

  // Note: HTMLAllCollection objects have a custom [[Call]] internal method and an [[IsHTMLDDA]] internal slot.
};
```

在上面 IDL 结构中我们得知`HTMLAllCollection`内部包含了一个特殊的插槽：[[IsHTMLDDA]]，这个插槽解释了为什么`document.all`会在控制台中出现怪异的行为。在 W3C 中了解到：

实现 `HTMLALLCollection` 接口的对象（下面称为特殊对象）具有多种**异常行为**，因为它们具有[[ISHTMLDDA]]内部插槽:

1. 当给特殊对象执行`ToBoolean()`操作时将会返回`false`；
2. 当给特殊对象执行[抽象松散比较运算操作](https://tc39.es/ecma262/#sec-abstract-equality-comparison)（IsLooselyEqual），如果比较对象是`undefined`或`null`则返回`true`。[抽象严格比较运算操作](https://tc39.es/ecma262/#sec-strict-equality-comparison)（IsStrictlyEqual）不受影响；
3. 当给特殊对象执行`typeof`操作，则直接返回`undefined`。

我们可以对其进行验证：

```javascript
// ToBoolean() 操作
Boolean(document.all) // false

// 抽象松散比较运算操作
document.all == undefined // true
document.all == null // true

// 抽象严格比较运算操作
document.all === undefined // false
document.all === null // false

// typeof 省去
```

最后，在我寻找资料时看见一个评论：

> 感觉这样的知识价值不大。

其实我认评判一个知识，并不只是它给你带来的价值，还有探索过程中的收获。

## Refer

[HTML Standard](https://html.spec.whatwg.org/)

[TC39](https://tc39.es/ecma262/)

[stackoverflow](https://stackoverflow.com/a/10394873)
