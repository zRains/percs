---
date: 1653061024000
title: '一些有用的Linux命令'
visible: true
lang: 'zh'
---

防止别人 ping 你的服务器

```bash
echo 1 > /proc/sys/net/ipv4/icmp_echo_ignore_all
```

查看端口

```bash
ps aux
```

查看所有进程

```bash
netstat -tlunp
```
