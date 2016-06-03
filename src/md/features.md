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
```phyloscript
/* no-eval */
const tree = Phylocanvas.createTree(elementOrId, config); // see API for config options
tree.load(newickString, () => console.log('tree loaded'));
// calls `tree.draw()` implicitly
```

## Set Tree Type
```phyloscript
tree.setTreeType('rectangular'); // or radial, circular, diagonal, hierarchical
// calls `tree.draw()` implicitly
```

## Show/Hide Labels
```phyloscript
tree.showLabels = false; // defaults to true
tree.draw();
```

## Align Labels
```phyloscript
tree.alignLabels = true; // false to reset
tree.draw();
```

## Collapse Branches
```phyloscript
tree.branches.E.collapsed = true;
tree.draw();
```

## Global Leaf and Text Sizes
```phyloscript
tree.setNodeSize(20);
tree.setTextSize(30);
```

## Style Branches Individually
```phyloscript
tree.leaves.forEach(function (leaf) {
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
});
tree.draw();
```

## Rotate Branches
```phyloscript
tree.branches.E.rotate({});
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
