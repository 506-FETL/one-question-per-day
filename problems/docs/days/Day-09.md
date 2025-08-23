# Day 09

# 二叉树的垂直遍历

从左到右，从上到下遍历二叉树。二叉树的节点的值为整数。
![alt text](../assets/image.png)

上述二叉树的垂直遍历结果为：[6,4,2,7,1,9,10,3,8,5]

位于相同位置的不同节点的顺序应当继承自其各自的父节点。比如9和10，因为8在7之后，所以10在9之后。

| 更复杂的例子：
![交叉循环树](https://cdn.bfe.dev/bfe/img/7g52BZ1fUZNxCJlEurAxtGrLNd54px7D_470x504_1604833181756.png)
上述二叉树的垂直遍历结果为：
[7, 2, 5, 8, 12, 1, 4, 6, 10, 11, 3, 9, 13]

## 代码

| 类型    | 路径                                     |
| ------- | ---------------------------------------- |
| JS 答案 | problems/days/Day 09/answer.js           |
| TS 答案 | problems/days/Day 09/ts/answer.ts        |
| 模板    | problems/days/Day 09/ts/traverse.ts      |
| 测试    | problems/days/Day 09/ts/traverse.spec.ts |
