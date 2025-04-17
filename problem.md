有两个函数如下：

```jsx
function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello Async')
    }, 1000)
  })
}
function* myGenerator() {
  const data = yield getData()
  console.log(data) // "Hello Async"
  return 'Done'
}
```

写一个 `generatorToAsync` 函数，他接收一个函数，要求达到下面的效果

```jsx
const asyncFunc = generatorToAsync(myGenerator)

// 执行异步函数
asyncFunc().then((result) => {
  console.log(result) // "Done"
})
```
