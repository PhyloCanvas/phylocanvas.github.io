### Breaking Changes

* Trees should be created using `Phylocanvas.createTree`
* `canvasEl` has been renamed to `containerElement`.
* `selected` event is now called `updated`, provides the updated property as event data.
* `findBranch` is now `findLeaves`, only ever returned leaves.
* `setSelected` and `setHighlighted` have been removed, please use `cascadeFlag`.
* `tree.load` no longer makes AJAX calls without the AJAX plugin.
* `nodeAlign` has been renamed to `alignLabels`, which is a getter/setter.
* `hierarchy` tree type is now `hierarchical` for consistency.

### Configuration

As of v2.3, all configuration can now be passed via the config object parameter, as it will simply be assigned to the tree instance.
