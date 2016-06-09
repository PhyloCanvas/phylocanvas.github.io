# Plugins

We aim to foster a rich plugin ecosystem around Phylocanvas. The plugins maintained by us started life in the core library, but are now separated to keep the core as light as possible. These plugins are:

* [Context Menu](#context-menu)
* [History](#history)
* [Metadata](#metadata)
* [Ajax](#ajax)

## Context Menu
Adds contextual functions via a right-click.

### Install
```bash
npm install --save-dev phylocanvas-plugin-context-menu
```
### Register
```javascript
import contextMenu from 'phylocanvas-plugin-context-menu';

Phylocanvas.plugin(contextMenu);
```
### Example
```phyloscript--no-eval,plugin:context-menu
```
Right-click to see the context menu in action.
