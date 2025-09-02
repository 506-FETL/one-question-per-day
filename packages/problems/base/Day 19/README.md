# undefinedToNull

null 与 undefined 之间的一个区别在于它们在 JSON.stringify() 中的处理方式不同。

```js
JSON.stringify({a: null})      // '{"a":null}'
JSON.stringify({a: undefined}) // '{}'
JSON.stringify([null])         // '[null]'
JSON.stringify([undefined])    // '[null]'
```

如果客户端和服务器之间缺少对齐，这种差异可能会带来问题。强制仅使用其中一种可能会有所帮助。

你需要实现一个函数，将副本中**所有的 undefined 替换为 null。**

```js
undefinedToNull({a: undefined, b: 'BFE.dev'})
// {a: null, b: 'BFE.dev'}
undefinedToNull({a: ['BFE.dev', undefined, 'bigfrontend.dev']})
// {a: ['BFE.dev', null, 'bigfrontend.dev']}
```
