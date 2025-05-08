// const promise = new Promise(resolve => {
//   setTimeout(() => resolve("完成"), 1000);
// });

// promise.then(result => {
//   console.log("回调1:", result);
// });

// promise.then(result => {
//   console.log("回调2:", result);
// });

// promise.then(result => {
//   console.log("回调3:", result);
// });
// new Promise((resolve) => {
//   setTimeout(() => resolve("Step 1"), 1000);
// })
//   .then((result) => {
//     console.log(result); // 输出: Step 1
//     return new Promise((resolve) => setTimeout(() => resolve("Step 2"), 2000));
//   })
//   .then((result) => {
//     console.log(result); // 输出: Step 2
//     return 1
//   }).then((res)=>{
//     console.log(res);
    
//   })
new Promise((resolve) => {
  console.log('123 :>> ', 123);
  setTimeout(resolve(1234))
})
  .then((result) => {
    console.log(result); // 输出: Step 1
    return new Promise((resolve) => setTimeout(() => {
      resolve("Step 2")
      console.log('1111111')
    }, 2000));
  })