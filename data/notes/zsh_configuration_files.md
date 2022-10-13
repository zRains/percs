---
date: 1660837024000
title: 'zsh配置文件'
visible: true
lang: 'zh'
---

.zshenv - 它存放的环境变量配置项在任何场景下都能被读取，这里通常把$PATH 等变量写在这里，这样无论是在交互 shell，或者运行程序都会读取此文件。

.zshrc - 它主要用在交互 shell。对终端交互 shell 有用。

.zlogin - 在 login shell 的时候读取，比如系统启动的时候会读取此文件。

.zprofile - 是.zlogin 的替代品，如果使用了.zlogin 就不必再关心此文件。

.zlogout - 退出终端的时候读取，用于做一些清理工作。

> 读取顺序：.zshenv → [.zprofile if login] → [.zshrc if interactive] → [.zlogin if login] → [.zlogout sometimes]。
