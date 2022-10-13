---
date: 1658504224000
title: 'Rust中的None'
visible: true
lang: 'zh'
---

rust 并没有空值，`None` 只是 `Option` 的一个枚举。rust 不允许在给变量赋值前使用此变量：

```rust
{
    let r;

    {
        let x = 5;
        r = &x;
    }

    println!("r: {}", r);
}
```

声明了没有初始值的变量：r，这乍看之下好像和 Rust 不允许存在空值相冲突。然而如果尝试在给它一个值之前使用这个变量，会出现一个编译时错误，这就说明了 Rust 确实不允许空值。

<small>
  *摘自[Rust
  程序设计语言简体中文版](https://kaisery.github.io/trpl-zh-cn/ch10-03-lifetime-syntax.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%81%BF%E5%85%8D%E4%BA%86%E6%82%AC%E5%9E%82%E5%BC%95%E7%94%A8)
</small>
