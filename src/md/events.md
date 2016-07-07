# Events

## loading
Fired when `tree.load()` is called.
```JavaScript
tree.on('loading', () => {
  // Do something
});
```

## beforeFirstDraw
Fired after `tree.load()` has been called, but before the tree is drawn for the first time.
```JavaScript
tree.on('beforeFirstDraw', () => {
  // Do setup that could not be added by config. Branches and leaves are now available.
});
```

## loaded
Fired when a tree has successfuly loaded and drawn for the first time.
```JavaScript
tree.on('loaded', () => {
  // Respond to fully-loaded tree.
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
