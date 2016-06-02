# Features

_N.B. Examples ending with `tree.draw()` below *must* call it to update the display. Phylocanvas 2.x gives you the responsibility to call `tree.draw()` when you need to. For best performance, it should always be called as the final step in a series of manipulations._

* [Load Newick String](#load-newick-string)
* [Set Tree Type](#set-tree-type)
* [Show/Hide Labels](#showhide-labels)
* [Align Labels](#align-labels)
* [Collapse Branches](#collapse-branches)
* [Global Leaf and Text Sizes](#global-leaf-and-text-sizes)
* [Style Branches Individually](#style-branches-individually)
* [Rotate Branches](#rotate-branches)
* [Select Branches](#select-branches)
* [Highlight Leaves](#highlight-leaves)
* [Find Leaves](#find-leaves)
* [Prune Branches](#prune-branches)
* [Fit in Panel](#fit-in-panel)

## Load Newick String
```JavaScript
const tree = Phylocanvas.createTree(elementOrId, config); // see API for config options
tree.load(newickString, () => console.log('tree loaded'));
// calls `tree.draw()` implicitly
```

## Set Tree Type
```JavaScript
tree.setTreeType('rectangular'); // or radial, circular, diagonal, hierarchical
// calls `tree.draw()` implicitly
```

## Show/Hide Labels
```JavaScript
tree.showLabels = false; // defaults to true
tree.draw();
```

## Align Labels
```JavaScript
tree.alignLabels = true; // false to reset
tree.draw();
```

## Collapse Branches
```JavaScript
tree.branches.branchNameOrId.collapsed = true;
tree.draw();
```

## Global Leaf and Text Sizes
```JavaScript
tree.setNodeSize(2);
tree.setTextSize(20);
```

## Style Branches Individually
```JavaScript
for (let leaf of tree.leaves) {
  leaf.setDisplay({
    colour: 'red',
    shape: 'circle', // or square, triangle, star
    size: 2,
    leafStyle: {
      strokeStyle: '#0000ff',
      fillStyle: 'rgb(0, 255, 0)',
      lineWidth: 2,
    },
    labelStyle: {
      colour: 'black',
      textSize: 20, // points
      font: 'Arial',
      format: 'bold',
    },
  });
}
tree.draw();
```

## Rotate Branches
```JavaScript
tree.branches.branchNameOrId.rotate();
tree.draw();
```

## Select Branches
```JavaScript
tree.branches.branchNameOrId.selected = true;
tree.branches.branchNameOrId.cascadeFlag('selected', true); // cascade to children
tree.draw();
```

## Highlight Leaves
```JavaScript
tree.leaves[0].highlighted = true;
tree.draw();
```

## Find Leaves
```JavaScript
tree.findLeaves(regex); // searches id by default
tree.findLeaves(regex, 'label'); // specify a property to search as the second param
```

## Prune Branches
```JavaScript
tree.branches.branchNameOrId.pruned = true;
tree.draw();
```

## Fit in Panel
```JavaScript
tree.fitInPanel();
tree.draw();
```
