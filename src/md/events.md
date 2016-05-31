### Event types and data

* `loading`
* `loaded`
* `error`
* `subtree`
  * `node` - root of the subtree
* `updated`
  * `property` - the object key that was changed
  * `nodeIds` - array of ids that were updated


### Adding a Listener

```JavaScript
tree.on(`updated` ({ property, nodeIds }) => {
  if (property === 'selected') {
    console.log(nodeIds);
  }
});
```
