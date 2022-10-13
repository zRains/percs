---
date: 1650296224000
title: '正确使用TypeScript检查对象'
visible: true
lang: 'zh'
---

体现于：[TC-9: Deep Readonly](/wraps/type_challenge/9_medium_deep_readonly)

```typescript
// Note: Record<string, any> accept all types:
// https://github.com/microsoft/TypeScript/issues/41746
const a1: Record<string, any> = [22]
const a2: Record<string, any> = /\d/
const a3: Record<string, any> = {}
let a4: Record<string, any> = { name: '张三' }
a4 = []
const a5: Record<string, any> = new Map()
const a6: Record<string, any> = new Set()
const a7: Record<string, any> = class Person {}
const a8: Record<string, any> = new Promise(() => {})

// Record<string, unknown> only accept obj:
const b: Record<string, unknown> = () => 22 // error
const b1: Record<string, unknown> = [22] // error
const b2: Record<string, unknown> = /\d/ // error
const b3: Record<string, unknown> = {}
let b4: Record<string, unknown> = { name: '张三' }
b4 = [] // error
const b5: Record<string, unknown> = new Map() // error
const b6: Record<string, unknown> = new Set() // error
const b7: Record<string, unknown> = class Person {} // error
const b8: Record<string, unknown> = new Promise(() => {}) // error
```
