# Features

## Load Tree
```JavaScript
const tree = Phylocanvas.createTree(elementOrId, config);
tree.load(newickString);
```

## Set Tree Type
```JavaScript
tree.setTreeType('rectangular'); // or radial, circular, diagonal, hierarchical
```

## Show/Hide Labels
```JavaScript
tree.showLabels = true; // false to hide
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
  })
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
tree.findLeaves(regex, 'label');
```
