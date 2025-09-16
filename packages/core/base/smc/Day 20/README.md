# Day 20 - LazyMan

`LazyMan`除了吃就是睡，很lazy。

1. `LazyMan(name: string, logFn: (log: string) => void)` 通过传入logFn打印信息。

```js
LazyMan('Jack', console.log)
// Hi, I'm Jack.
```

2. 可以`eat(food: string)`

```js
LazyMan('Jack', console.log)
  .eat('banana')
  .eat('apple')
// Hi, I'm Jack.
// Eat banana.
// Eat Apple.
```

3. 可以`sleep(time: number)`，单位是秒。

```js
LazyMan('Jack', console.log)
  .eat('banana')
  .sleep(10)
  .eat('apple')
  .sleep(1)
// Hi, I'm Jack.
// Eat banana.
// Wake up after 10 seconds.
// Eat Apple.
// Wake up after 1 second.
```

4. `sleepFirst(time: number)`的话，无论顺序如何，最优先sleep。

```js
LazyMan('Jack', console.log)
  .eat('banana')
  .sleepFirst(10)
  .eat('apple')
  .sleep(1)
// Wake up after 10 seconds.
// Hi, I'm Jack.
// Eat banana
// Eat apple
// Wake up after 1 second.
```

请创建一个如此懒惰的`LazyMan()`。
