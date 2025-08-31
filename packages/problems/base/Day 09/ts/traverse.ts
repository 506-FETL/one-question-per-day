export class Node {
  value: number
  left: Node | null
  right: Node | null
  constructor(val: number) {
    this.value = val
    this.left = null
    this.right = null
  }
}

export default function traverse(root: Node | null): number[] {}
