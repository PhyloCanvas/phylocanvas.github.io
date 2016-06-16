# Plugins

A plugin system allows developers to add functionality to Phylocanvas without having to change the source code or request changes, and allows us to keep the core library as small and simple as possible. We aim to foster a rich plugin ecosystem.

The following plugins are maintained by us, having started life in the core library, but now exist as separate entities in the spirit of the new philosophy:

* [Context Menu](#context-menu)
* [History](#history)
* [Metadata](#metadata)
* [Ajax](#ajax)

## Context Menu

### Install
```bash
npm install --save-dev phylocanvas-plugin-context-menu
```
### Register
```javascript
import contextMenu from 'phylocanvas-plugin-context-menu';

Phylocanvas.plugin(contextMenu);
```
### Usage
```phyloscript--noEval;plugin:context-menu
```
Right-click anywhere to see the standard options in the context menu. Right-click while hovering over a branch to see branch-specific options.


## History

### Install
```bash
npm install --save-dev phylocanvas-plugin-history
```
### Register
```javascript
import history from 'phylocanvas-plugin-history';

Phylocanvas.plugin(history);
```
### Usage
```phyloscript--plugin:history
tree.on('click', function (e) {
  var node = tree.getNodeAtMousePosition(e);
  if (node) {
    tree.redrawFromBranch(node);
  } else {
    tree.redrawOriginalTree();
  }
});
```
Click on the node between Leaf C and Leaf D to redraw a subtree, then open the history tab. Click a snapshot to switch between the original tree and the subtree.
