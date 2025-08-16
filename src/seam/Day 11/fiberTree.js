export function commitNestedComponent(root, onCommitUnmount) {
  let dep = root

  while (dep) {
    onCommitUnmount(dep)

    if (dep.child) {
      dep = dep.child
      continue
    }

    if (dep === root)
      return

    while (!dep.sibling) {
      if (!dep.return || dep.return === root)
        return
      dep = dep.return
    }

    dep = dep.sibling
  }
}
