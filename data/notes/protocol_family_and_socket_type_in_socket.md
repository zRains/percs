---
date: 1655307424000
title: 'Socket函数中协议族和套接字类型'
visible: true
lang: 'zh'
---

Socket 函数声明如下：

```c
#include <sys/socket.h>

int socket(int family,int type,int protocol);
```

socket 函数中 family 参数指明协议族，type 指明生产的套接字类型。

| 套接字类型\协议族 | AF_INET | AF_INET6 |
| ----------------- | ------- | -------- |
| SOCK_STREAM       | TCP     | TCP      |
| SOCK_DGRAM        | UDP     | UDP      |
| SOCK_RAW          | IPV4    | IPV6     |
