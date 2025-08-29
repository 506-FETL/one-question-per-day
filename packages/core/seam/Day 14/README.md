Observable 决定了values如何传递给Observer，Observer本质上就是一些callback的集合。

来看看如下代码。

```js
const observer = {
  next: (value) => {
    console.log("we got a value", value);
  },
  error: (error) => {
    console.log("we got an error", error);
  },
  complete: () => {
    console.log("ok, no more values");
  },
};
```

上面就是一个Observer，很明显就是3个callback而已。

接下来我们可以把让这个Observer订阅一个Observable，Observable 会传递给这个Observer以值(value)或者error。

```js
const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  setTimeout(() => {
    subscriber.next(3);
    subscriber.next(4);
    subscriber.complete();
  }, 100);
});
```

上面的代码是在说，当一个subscriber订阅的时候：

1. 首先得到值 1
2. 然后得到值2
3. 等待100 ms
4. 得到值 3
5. 得到值 4
6. 没有更多的值了，结束。

如果我们现在把上面的observer 订阅给上述observable的话，next 和 complete 会被顺序调用。(注意到 2 和 3之间有些delay)

```js
const sub = observable.subscribe(subscriber);
// we got a value 1
// we got a value 2
// we got a value 3
// we got a value 4
// ok, no more values
```

注意subscribe() 返回的是一个Subscription ，这个subscription可以用来取消订阅。

```js
const sub = observable.subscribe(subscriber);
setTimeout(() => {
  // ok we only subscribe for 100ms
  sub.unsubscribe();
}, 100);
```

以上就是基本的Observable 和 Observer，后续会有更多有意思的题目，但是该题目就到这里了。

请你实现一个基本的Observable，使得上述描述的内容成为可能。

一些额外的要求列在了这里

1. error 和 complete只能触发一次。其后的next/error/complete 需要被忽略。
2. 在订阅的时候next/error/complete需要都不是必须。如果传入的是一个函数，这个函数需要被默认为next。
3. 需要支持多个订阅。
