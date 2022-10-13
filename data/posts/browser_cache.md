---
toc: false
date: 1649942694481
title: '比较好理解的浏览器缓存'
scope: ['Browser']
visible: true
lang: 'zh'
---

## 缓存基本过程

浏览器与服务器通信的方式为应答模式，即是：浏览器发起 HTTP 请求 – 服务器响应该请求。那么浏览器第一次向服务器发起该请求后拿到请求结果，会根据响应报文中 HTTP 头的缓存标识，决定是否缓存结果，是则将请求结果和缓存标识存入浏览器缓存中，简单的过程如下图：

![browser_cache_first#center;40;true#](https://res.zrain.fun/images/2022/06/browser_cache_first_req-3212b9698ff882d8415f1499c6ae6ac6.png)

由上图我们可以知道：

- 浏览器每次发起请求，都会先在浏览器缓存中查找该请求的结果以及缓存标识
- 浏览器每次拿到返回的请求结果都会根据相应字段选择性将该结果和缓存标识存入浏览器缓存中

以上两点结论就是浏览器缓存机制的关键，他确保了每个请求的缓存存入与读取，只要我们再理解浏览器缓存的使用规则，那么所有的问题就迎刃而解了，本文也将围绕着这点进行详细分析。为了方便大家理解，这里我们根据是否需要向服务器重新发起 HTTP 请求将缓存过程分为两个部分，分别是强制缓存和协商缓存。

## 强制缓存

强制缓存就是向浏览器缓存查找该请求结果，并根据该结果的缓存规则来决定是否使用该缓存结果的过程，强制缓存的情况主要有三种（暂不分析协商缓存过程），如下：

不存在该缓存结果和缓存标识，强制缓存失效，则直接向服务器发起请求（跟第一次发起请求一致），如下图：

![browser_cache_force_caching_disable#center;40;true#](https://res.zrain.fun/images/2022/06/browser_cache_force_caching_disable-f87ce697c43a13dc647035f0971e1b14.png)

存在该缓存结果和缓存标识，但该结果已失效，强制缓存失效，则使用协商缓存(暂不分析)，如下图：

![browser_cache_force_caching_disable_part_2#center;40;true#](https://res.zrain.fun/images/2022/06/browser_cache_force_caching_disable_part_2-a1bdf16adf72c8ecb6444156dc58e2d8.png)

存在该缓存结果和缓存标识，且该结果尚未失效，强制缓存生效，直接返回该结果，如下图：

![browser_cache_force_caching_disable_part_3#center;40;true#](https://res.zrain.fun/images/2022/06/browser_cache_force_caching_disable_part_3-a675f644a319bb233c3fc6db6c7530d0.png)

那么强制缓存的缓存规则是什么？

当浏览器向服务器发起请求时，服务器会将缓存规则放入 HTTP 响应报文的 HTTP 头中和请求结果一起返回给浏览器，控制强制缓存的字段分别是 Expires 和 Cache-Control，其中 **Cache-Control 优先级比 Expires 高**。

### Expires

Expires 是 HTTP/1.0 控制网页缓存的字段，其值为服务器返回该请求结果缓存的到期时间，即再次发起该请求时，如果客户端的时间小于 Expires 的值时，直接使用缓存结果。

到了 HTTP/1.1，Expire 已经被 Cache-Control 替代，原因在于 Expires 控制缓存的原理是使用客户端的时间与服务端返回的时间做对比，那么如果客户端与服务端的时间因为某些原因（例如时区不同；客户端和服务端有一方的时间不准确）发生误差，那么强制缓存则会直接失效，这样的话强制缓存的存在则毫无意义，那么 Cache-Control 又是如何控制的呢？

### Cache-Control

在 HTTP/1.1 中，Cache-Control 是最重要的规则，主要用于控制网页缓存，主要取值为：

- public：所有内容都将被缓存（客户端和代理服务器都可缓存）。
- private：所有内容只有客户端可以缓存，Cache-Control 的默认取值。
- no-cache：客户端缓存内容，但是是否使用缓存则需要经过协商缓存来验证决定，相当于：

```txt
Cache-Control: max-age=0, must-revalidate
```

- no-store：所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存。
- max-age：设置缓存内容将在多少秒后失效。

### 浏览器处理缓存方式

了解强制缓存的过程后，我们拓展性的思考一下：浏览器的缓存存放在哪里，如何在浏览器中判断强制缓存是否生效？

![chrome_handle_cache#center;;#](https://res.zrain.fun/images/2022/06/chrome_handle_cache-fcabce753075c788d4b4978b40c35d45.png)

这里我们以博客的请求为例，状态码为灰色的请求则代表使用了强制缓存，请求对应的 Size 值则代表该缓存存放的位置，分别为 memory cache 和 disk cache。

memory cache 代表使用内存中的缓存，disk cache 则代表使用的是硬盘中的缓存，浏览器读取缓存的顺序为 memory –> disk。

#### memory cache

memory cache（内存缓存）具有两个特点：

- 快速读取：内存缓存会将编译解析后的文件，直接存入该进程的内存中，占据该进程一定的内存资源，以方便下次运行使用时的快速读取。
- 时效性：一旦该进程关闭，则该进程的内存则会清空。

#### disk cache

disk cache（硬盘缓存）则是直接将缓存写入硬盘文件中，读取缓存需要对该缓存存放的硬盘文件进行 I/O 操作，然后重新解析该缓存内容，读取复杂，速度比内存缓存慢。

在浏览器中，浏览器会在 js 和图片等文件解析执行后直接存入内存缓存中，那么当刷新页面时只需直接从内存缓存中读取；而 css 文件则会存入硬盘文件中，所以每次渲染页面都需要从硬盘读取缓存。

## 协商缓存

协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程，主要有以下两种情况：

协商缓存生效，返回 304，如下图：

![browser_cache_negotiation_caching_enable_part_1#center;40;true#](https://res.zrain.fun/images/2022/06/browser_cache_negotiation_caching_enable_part_1-eee330e15c5a9d17dc7adae6f3bc9c2e.png)

协商缓存失效，返回 200 和请求结果结果，如下图：

![browser_cache_negotiation_caching_enable_part_2#center;40;true#](https://res.zrain.fun/images/2022/06/browser_cache_negotiation_caching_enable_part_2-5fd0c8114015ebdca63eb85020310331.png)

同样，协商缓存的标识也是在响应报文的 HTTP 头中和请求结果一起返回给浏览器的，控制协商缓存的字段分别有：Last-Modified / If-Modified-Since 和 Etag / If-None-Match，其中 Etag / If-None-Match 的优先级比 Last-Modified / If-Modified-Since 高。

#### 总结

强制缓存优先于协商缓存进行，若强制缓存（Expires 和 Cache-Control）生效则直接使用缓存，若不生效则进行协商缓存（Last-Modified / If-Modified-Since 和 Etag / If-None-Match），协商缓存由服务器决定是否使用缓存，若协商缓存失效，那么代表该请求的缓存失效，重新获取请求结果，再存入浏览器缓存中；生效则返回 304，继续使用缓存，主要过程如下：

![browser_cache_process#center;40;true#](https://res.zrain.fun/images/2022/06/browser_cache_process-ee7b190293c3493de0916abce9454712.png)
