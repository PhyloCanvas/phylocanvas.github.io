# Plugins

A plugin system allows developers to add functionality to Phylocanvas without having to change the source code or request changes, and allows us to keep the core library as small and simple as possible. We aim to foster a rich plugin ecosystem.

The following plugins are maintained by us, having started life in the core library, but now exist as separate entities in the spirit of the new philosophy:

* [Context Menu](#context-menu)
* [History](#history)
* [Metadata](#metadata)
* [Ajax](#ajax)

## Context Menu
Adds contextual functions when right-clicking.

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
Right-click to see the context menu in action.
