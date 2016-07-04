# Events

## loading
Fired when `tree.load()` is called.
```JavaScript
tree.on('loading', () => {
  // Do something
});
```

## loaded
Fired when a tree has successfuly loaded.
```JavaScript
tree.on('loaded', () => {
  // Branches and leaves now available
});
```

## error
Fired when a tree has failed to load.
```JavaScript
tree.on('error', ({ error }) => {
  console.log(error);
});
```

## subtree
Fired when a subtree is drawn, supplying the new root node.
```JavaScript
tree.on('subtree', ({ node }) => {
  console.log(node.id);
});
```

## updated
Fired when the user clicks on the tree, or via `tree.updateLeaves()`.
```JavaScript
tree.on('updated', ({ property, nodeIds }) => {
  if (property === 'selected') {
    console.log(nodeIds);
  }
});
```
