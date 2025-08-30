以下是非常简单的Jest测试代码。

```js
expect(3).toBe(3) // ✅
expect(4).toBe(3) // ❌
```

我们可以通过`not`将其反过来。

```js
expect(3).not.toBe(3) // ❌
expect(4).not.toBe(3) // ✅
```

请实现myExpect()并支持toBe()及not.

**✨ 如果考虑到代码的健壮性，如何避免硬编码？**
