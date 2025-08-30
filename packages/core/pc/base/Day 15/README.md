[Function.prototype.call](https://tc39.es/ecma262/#sec-function.prototype.call)可以用来很方便的修改函数的this。

你能实现一个myCall来模拟Function.prototype.call吗？

根据最新的 [ECMAScript spec](https://tc39.es/ecma262/#sec-function.prototype.call)，thisArg 不会被类型转换，在 [Strict Mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)下也不会被更改为window。

你的代码需要遵从上述逻辑，实现非strict mode的情况。

Function.prototype.call/apply/bind和 [Reflect.apply](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/apply) 可以了解，但请不要在这里使用。
