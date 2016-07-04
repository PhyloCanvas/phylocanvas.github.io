# Plugins

A plugin system allows developers to add functionality to Phylocanvas without having to change the source code or request changes, and allows us to keep the core library as small and simple as possible. We aim to foster a rich plugin ecosystem.

The following plugins are maintained by us, having started life in the core library, but now exist as separate entities in the spirit of the new philosophy:

* [Context Menu](#context-menu "--smooth")
* [History](#history "--smooth")
* [Metadata](#metadata "--smooth")
* [Ajax](#ajax "--smooth")

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
[More details on Github](https://github.com/phylocanvas/phylocanvas-plugin-context-menu).

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
tree.setTreeType('rectangular');
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


## Metadata

### Install
```bash
npm install --save-dev phylocanvas-plugin-metadata
```
### Register
```javascript
import metadata from 'phylocanvas-plugin-metadata';

Phylocanvas.plugin(metadata);
```
### Usage
```phyloscript--plugin:metadata
tree.setTreeType('rectangular');
tree.alignLabels = true;
for (var i = 0; i < tree.leaves.length; i++) {
  tree.leaves[i].data = {
    column1: '#3C7383',
    column2: '#9BB7BF',
    column3: '#3C7383',
    column4: '#9BB7BF',
  };
}
tree.viewMetadataColumns();
```
Assign data to each leaf as above and call `viewMetadataColumns` to see the result.

## Ajax

### Install
```bash
npm install --save-dev phylocanvas-plugin-ajax
```
### Register
```javascript
import ajax from 'phylocanvas-plugin-ajax';

Phylocanvas.plugin(ajax);
```
### Usage
```phyloscript--noLoad;plugin:ajax
tree.load('/v1.x/docs/data/tree.nwk');
```
Pass a URL to `tree.load` instead of a newick string. The plugin then uses XHR to fetch the string before attempting to build the tree.
