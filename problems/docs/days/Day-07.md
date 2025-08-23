# Day 07

# 实现 middleware

你是否使用过 [Express Middleware](https://expressjs.com/zh-cn/guide/using-middleware.html) ?

Middleware函数是指可以串联起来的，有特定interface的函数。比如在 express 中，你可以：

```javascript
app.use(
  "/user/:id",
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    next(new Error("sth wrong"));
  },
);
```

下面是对这个系统的类型描述：

```typescript
type Request = object;
type NextFunc = (error?: any) => void;
type MiddlewareFunc = (req: Request, next: NextFunc) => void;
type ErrorHandler = (error: Error, req: Request, next: NextFunc) => void;
class Middleware {
  use(func: MiddlewareFunc | ErrorHandler) {
    // do any async operations
    // call next() to trigger next function
  }

  start(req: Request) {
    // trigger all functions with a req object
  }
}
```

有了上述之后，我们可以支持类似Express的用法。

```javascript
const middleware = new Middleware();
middleware.use((req, next) => {
  req.a = 1;
  next();
});
middleware.use((req, next) => {
  req.b = 2;
  next();
});
middleware.use((req, next) => {
  console.log(req);
});
middleware.start({});
// {a: 1, b: 2}
```

注意到 use() 支持ErrorHandler，ErrorHandler有3个参数，在发生Error或者next()被含参数调用的时候触发，比如这样。

```javascript
const middleware = new Middleware();
// throw an error at first function
middleware.use((req, next) => {
  req.a = 1;
  throw new Error("sth wrong");
  // or `next(new Error('sth wrong'))`
});
// since error occurs, this is skipped
middleware.use((req, next) => {
  req.b = 2;
});
// since error occurs, this is skipped
middleware.use((req, next) => {
  console.log(req);
});
// since error occurs, this is called
middleware.use((error, req, next) => {
  console.log(error);
  console.log(req);
});
middleware.start({});
// Error: sth wrong
// {a: 1}
```

## 代码

| 类型    | 路径                                        |
| ------- | ------------------------------------------- |
| JS 答案 | problems/days/Day 07/answer.js              |
| TS 答案 | problems/days/Day 07/ts/answer.ts           |
| 模板    | problems/days/Day 07/ts/middle_ware.ts      |
| 模板    | problems/days/Day 07/ts/types.ts            |
| 测试    | problems/days/Day 07/ts/middle_ware.spec.ts |
