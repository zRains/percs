---
date: 1659022624000
title: 'Rust中可派生的Trait'
visible: true
lang: 'zh'
---

1. 比较 trait: Eq、PartialEq、Ord、PartialOrd。
2. Clone, 用来从 &T 创建副本 T。
3. Copy，使类型具有 “复制语义”（copy semantics）而非 “移动语义”（move semantics）。
4. Hash，从 &T 计算哈希值（hash）。
5. Default, 创建数据类型的一个空实例。
6. Debug，使用 `{:?}` formatter 来格式化一个值。
