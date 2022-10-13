---
date: 1657640224000
title: 'cargo 更换国内（清华）镜像源'
visible: true
lang: 'zh'
---

进入 cargo 安装目录，新建**config**文件：

```text
[source.crates-io]
replace-with = 'tuna'

# 清华大学镜像源
[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
```
