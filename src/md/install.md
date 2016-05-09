# Installing Phylocanvas

## Using npm
```
npm install --save-dev phylocanvas
```
We recommend installing phylocanvas as a dev dependency as it should be included in the bundle of your application.

Simply import the library to get started:
```JavaScript
import Phylocanvas from 'phylocanvas'
```

## Polyfill
Phylocanvas includes a polyfill for the following features:

- Symbols
- `Array.from`
- Array and String iterators
- Sets
- `Object.assign`

If your application needs to run in a environment that doesn't support one of these features, please import the polyfill *before* importing Phylocanvas as above, usually in the entry point of your application.

```JavaScript
import 'phylocanvas/polyfill'
```
