# Features

_N.B. Examples ending with `tree.draw()` below indicate that `tree.draw()` must be called for the display to update. Phylocanvas 2.x gives you the responsibility to call `tree.draw()` when you need to. For best performance, it should always be called as the final step in a series of manipulations._

* [Load Newick String](#load-newick-string "--smooth")
* [Set Tree Type](#set-tree-type "--smooth")
* [Show/Hide Labels](#show-hide-labels "--smooth")
* [Align Labels](#align-labels "--smooth")
* [Collapse Branches](#collapse-branches "--smooth")
* [Global Styles](#global-styles "--smooth")
* [Style Branches Individually](#style-branches-individually "--smooth")
* [Rotate Branches](#rotate-branches "--smooth")
* [Select Branches](#select-branches "--smooth")
* [Highlight Leaves](#highlight-leaves "--smooth")
* [Prune Branches](#prune-branches "--smooth")
* [Fit Leaves in Panel](#fit-leaves-in-panel "--smooth")

## Load Newick String
```phyloscript--noEval
const tree = Phylocanvas.createTree(elementOrId, config); // see API for config options
tree.load('(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F;', () => console.log('tree loaded'));
// calls `tree.draw()` implicitly
```

## Set Tree Type
```phyloscript
tree.setTreeType('radial'); // The default tree type
// calls `tree.draw()` implicitly
```
```phyloscript
tree.setTreeType('rectangular');
// calls `tree.draw()` implicitly
```
```phyloscript
tree.setTreeType('circular');
// calls `tree.draw()` implicitly
```
```phyloscript
tree.setTreeType('diagonal');
// calls `tree.draw()` implicitly
```
```phyloscript
tree.setTreeType('hierarchical');
// calls `tree.draw()` implicitly
```

## Show/Hide Labels
```phyloscript
tree.showLabels = false; // defaults to true
tree.draw();
```

## Align Labels
```phyloscript
tree.setTreeType('rectangular'); // Supported for rectangular, circular, and hierarchical tree types
tree.alignLabels = true; // false to reset
tree.draw();
```

## Collapse Branches
```phyloscript
tree.branches.E.collapsed = true;
tree.draw();
```

## Global Styles
```phyloscript
tree.setNodeSize(30);
tree.setTextSize(30);
tree.lineWidth = 3;
tree.draw();
```

## Style Branches Individually
```phyloscript
tree.leaves[0].setDisplay({
  colour: 'red',
  shape: 'circle', // or square, triangle, star
  size: 3, // ratio of the base node size
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
tree.draw();
```

## Rotate Branches
```phyloscript
tree.branches.E.rotate();
tree.draw();
```

## Select Branches
```phyloscript
tree.branches.B.selected = true;
tree.branches.E.cascadeFlag('selected', true); // cascade to children
tree.draw();
```

## Highlight Leaves
```phyloscript
tree.leaves[0].highlighted = true;
tree.draw();
```

## Prune Branches
```phyloscript
tree.branches.E.pruned = true;
tree.draw();
```

## Fit Leaves in Panel
```phyloscript
tree.fitInPanel(tree.findLeaves(/C|D/));
tree.draw();
```
