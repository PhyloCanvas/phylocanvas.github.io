# Plugins

A plugin system allows developers to add functionality to Phylocanvas without having to change the source code or request changes, and allows us to keep the core library as small and simple as possible. We aim to foster a rich plugin ecosystem.

The following plugins are maintained by us, having started life in the core library, but now exist as separate entities in the spirit of the new philosophy:

* [Context Menu](#context-menu "--smooth")
* [History](#history "--smooth")
* [Metadata](#metadata "--smooth")
* [Ajax](#ajax "--smooth")
* [Scale-bar](#scale-bar "--smooth")

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

[Context menu plugin on Github](https://github.com/phylocanvas/phylocanvas-plugin-context-menu)

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

[History plugin on Github](https://github.com/phylocanvas/phylocanvas-plugin-history)

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
```phyloscript--noLoad;plugin:metadata
tree.setTreeType('rectangular');
tree.alignLabels = true;

tree.on('beforeFirstDraw', function () {
  for (var i = 0; i < tree.leaves.length; i++) {
    tree.leaves[i].data = {
      column1: {
        colour: '#3C7383',
        label: 'Label' + (i + 1),
      },
      column2: '#9BB7BF',
      column3: '#3C7383',
      column4: '#9BB7BF',
    };
  }
});

tree.load('(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F;');
```
*N.B. It's more efficient to configure metadata before loading a newick string.*

[Metadata plugin on Github](https://github.com/phylocanvas/phylocanvas-plugin-metadata).

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

## Scale-bar

### Install
```bash
npm install --save-dev phylocanvas-plugin-scalebar
```
### Register
```javascript
import scalebar from 'phylocanvas-plugin-scalebar';

Phylocanvas.plugin(scalebar);
```
### Usage
```phyloscript--noEval;plugin:scalebar
```
Enable zoom and scroll on the canvas to see the value of the scale-bar chaange dynamically.

[Scale-bar plugin on Github](https://github.com/phylocanvas/phylocanvas-plugin-scalebar)
